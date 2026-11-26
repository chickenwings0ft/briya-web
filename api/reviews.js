// Google reviews for Briya via Places API (New).
// Needs Vercel env vars: GOOGLE_PLACES_API_KEY, GOOGLE_PLACE_ID
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const placeId = process.env.GOOGLE_PLACE_ID;
  const apiKey  = process.env.GOOGLE_PLACES_API_KEY;

  if (!placeId || !apiKey) {
    return res.status(500).json({ error: 'Missing GOOGLE_PLACE_ID or GOOGLE_PLACES_API_KEY env vars.' });
  }

  try {
    const r = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'rating,userRatingCount,reviews,googleMapsUri',
      },
    });
    const place = await r.json();

    if (!r.ok) {
      return res.status(502).json({ error: place?.error?.status || r.status, message: place?.error?.message || '' });
    }

    // Cache 1 hour on Vercel's edge, serve stale while revalidating (keeps API usage tiny)
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');

    return res.status(200).json({
      rating: place.rating,
      total:  place.userRatingCount,
      url:    place.googleMapsUri || null,
      reviews: (place.reviews || []).map(rv => ({
        name:   rv.authorAttribution?.displayName || 'Google user',
        photo:  rv.authorAttribution?.photoUri || null,
        rating: rv.rating,
        text:   rv.text?.text || rv.originalText?.text || '',
        time:   rv.relativePublishTimeDescription || '',
      })),
    });
  } catch (err) {
    console.error('Reviews fetch error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}

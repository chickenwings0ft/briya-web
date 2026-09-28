export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const placeId = process.env.GOOGLE_PLACE_ID;
  const apiKey  = process.env.GOOGLE_PLACES_API_KEY;

  if (!placeId || !apiKey) {
    return res.status(500).json({ error: 'Missing GOOGLE_PLACE_ID or GOOGLE_PLACES_API_KEY env vars.' });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=rating,user_ratings_total,reviews&reviews_sort=newest&key=${apiKey}`;
    const r = await fetch(url);
    const data = await r.json();

    if (data.status !== 'OK') {
      return res.status(502).json({ error: data.status, message: data.error_message || '' });
    }

    const place = data.result;

    // Cache 1 hour on Vercel Edge, serve stale while revalidating
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');

    return res.status(200).json({
      rating: place.rating,
      total:  place.user_ratings_total,
      reviews: (place.reviews || []).map(rv => ({
        name:   rv.author_name,
        photo:  rv.profile_photo_url || null,
        rating: rv.rating,
        text:   rv.text,
        time:   rv.relative_time_description,
      })),
    });
  } catch (err) {
    console.error('Reviews fetch error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}

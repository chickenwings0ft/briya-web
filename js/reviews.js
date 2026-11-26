/* ─────────────────────────────────────────────────────────────────────────
   Briya — Google reviews module (no API, no third-party widget)

   TO ADD A NEW REVIEW: copy one block in REVIEWS below, paste it at the top,
   edit the fields and update RATING / TOTAL. That's it — every page updates.
   Reviews are copied verbatim from the Google Business Profile.
───────────────────────────────────────────────────────────────────────── */
(function () {
  var RATING = '5.0';
  var TOTAL = 9;
  var GOOGLE_URL = 'https://share.google/Ac2kitQs3sNzt26U0';
  var MAPS_URL = 'https://www.google.com/maps?cid=15599943453628292475';

  var REVIEWS = [
    { name: 'Daniela M.', date: 'Jun 2026', service: 'Driveway & gutters',
      text: 'We are extremely happy with the service! Jony did an amazing job cleaning our driveway and gutters. Everything looks spotless and has come up like new. He was very professional, punctual, and very thorough throughout the entire process. Highly recommend his services and would definitely use them again.' },
    { name: 'Jody R.', date: 'Nov 2026', service: 'Pressure & soft wash',
      text: 'Jonny is an absolute professional. His exterior clean on our new house looks brilliant. He was so meticulous with stubborn marks, scrubbing them with a small brush at times until he was happy. We also got him back to hang some pictures for us. Again, meticulous with measuring and left not a trace of plaster anywhere. Highly recommend Jonny.' },
    { name: 'Jessica B.', date: 'Nov 2026', service: 'Window cleaning',
      text: 'Jon was super responsive, professional and friendly and did a great job cleaning our windows, tracks and screens. He went above and beyond. We’d definitely recommend him!' },
    { name: 'Adam D.', date: 'Aug 2026', service: 'Exterior cleaning',
      text: 'BRIYA Exterior Cleaning did an excellent job. Jonathan was friendly, professional and took great care throughout the whole service. The final result looked fantastic, and I was very happy with the quality of the work. I would definitely recommend BRIYA to anyone looking for reliable exterior cleaning.' },
    { name: 'Beverly K.', date: 'Oct 2026', service: 'Window cleaning',
      text: 'Johnny did a great job cleaning our windows they look amazing! He was friendly, reliable and really thorough. Very happy with the result and would definitely recommend him. We’ll be using him again for sure!' },
    { name: 'Minsox', date: 'Sep 2026', service: 'Pressure cleaning & windows', guide: true,
      text: 'I highly recommend Jonathan and BRIYA. He did an outstanding job- pressure cleaning, interior painting, cleaning windows and security screens, patching up an outside crack and much more for the presale of my house. He is a great communicator and extremely punctual. You won’t be disappointed. His charges are very fair and he is a hard worker.' },
    { name: 'Alejandro P.', date: 'Jun 2026', service: 'Pool area',
      text: 'We recently hired Jony to clean our pool area and he did such a great job. The pool area has never looked so spotless. Would definitely use his Services again.' },
    { name: 'Laura G.', date: 'Aug 2026', service: '', guide: true,
      text: 'Amazing service. Was super easy to communicate with them, they gave us all the facilities to make it suitable for us, and also the Jobe the did was extraordinary.' },
    { name: 'Michael D.', date: 'Oct 2026', service: '',
      text: 'Good solid service, 👌 highly recomend' }
  ];

  var COLORS = ['#1557a8', '#0f8a6c', '#b4428c', '#c2631b', '#6046c4', '#0e7490', '#a3343a', '#3b6d11', '#334155'];
  var STAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.94 5.96 6.56.95-4.75 4.63 1.12 6.53L12 17.5l-5.87 3.07 1.12-6.53L2.5 9.41l6.56-.95z"/></svg>';
  var G = '<svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>';
  function stars(n) { var s = ''; for (var i = 0; i < n; i++) s += STAR; return s; }
  function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  var CSS = '' +
    '.brv{--brv-ink:#0b1b30;--brv-muted:#607289;--brv-line:#dce6f0;--brv-blue:#1557a8;--brv-navy:#091d38;--brv-r:14px;font-family:inherit;color:var(--brv-ink);}' +
    '.brv *{box-sizing:border-box;}' +
    '.brv-top{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px;padding:18px 20px;margin-bottom:18px;border-radius:20px;background:#fff;border:1px solid var(--brv-line);}' +
    '.brv-score{display:flex;align-items:center;gap:14px;}' +
    '.brv-g{width:44px;height:44px;border-radius:12px;background:#fff;border:1px solid var(--brv-line);display:grid;place-items:center;flex-shrink:0;}' +
    '.brv-g svg{width:24px;height:24px;}' +
    '.brv-num{font-size:34px;font-weight:700;letter-spacing:-.04em;line-height:1;}' +
    '.brv-stars{display:flex;gap:2px;}' +
    '.brv-stars svg{width:17px;height:17px;fill:#fbbc04;}' +
    '.brv-meta{font-size:13.5px;color:var(--brv-muted);margin-top:3px;line-height:1.3;}' +
    '.brv-meta b{color:var(--brv-ink);}' +
    '.brv-actions{display:flex;gap:8px;flex-wrap:wrap;}' +
    '.brv-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:44px;padding:0 18px;border-radius:var(--r-btn,var(--brv-r));font-weight:700;font-size:14px;text-decoration:none;white-space:nowrap;transition:background-color .25s,border-color .25s,color .25s;}' +
    '.brv-btn svg{width:16px;height:16px;}' +
    '.brv-btn-dark{background:var(--brv-navy);color:#fff;}' +
    '.brv-btn-line{border:1.5px solid var(--brv-line);color:var(--brv-ink);background:#fff;}' +
    '.brv-wrap{position:relative;}' +
    '.brv-track{display:grid;grid-auto-flow:column;grid-auto-columns:86%;gap:12px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;-webkit-overflow-scrolling:touch;padding:4px 2px 18px;overscroll-behavior-x:contain;}' +
    '.brv-track::-webkit-scrollbar{display:none;}' +
    '.brv-card{scroll-snap-align:start;display:flex;flex-direction:column;padding:22px 20px 20px;border-radius:20px;background:#fff;border:1px solid var(--brv-line);box-shadow:0 1px 2px rgba(9,29,56,.04),0 6px 18px -10px rgba(9,29,56,.12);min-width:0;}' +
    '.brv-card-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;}' +
    '.brv-card-top .brv-g{width:28px;height:28px;border:0;border-radius:0;}' +
    '.brv-card-top .brv-g svg{width:20px;height:20px;}' +
    '.brv-text{font-size:15px;line-height:1.65;color:#33465c;display:-webkit-box;-webkit-line-clamp:6;-webkit-box-orient:vertical;overflow:hidden;}' +
    '.brv-card.open .brv-text{-webkit-line-clamp:unset;display:block;}' +
    '.brv-more{align-self:flex-start;margin-top:6px;padding:4px 0;border:0;background:none;font:inherit;font-size:13.5px;font-weight:700;color:var(--brv-blue);cursor:pointer;}' +
    '.brv-who{display:flex;align-items:center;gap:11px;margin-top:auto;padding-top:18px;}' +
    '.brv-av{width:40px;height:40px;border-radius:50%;display:grid;place-items:center;color:#fff;font-weight:700;font-size:15px;flex-shrink:0;}' +
    '.brv-who b{display:block;font-size:14.5px;line-height:1.3;}' +
    '.brv-who small{display:block;font-size:12.5px;color:var(--brv-muted);line-height:1.4;}' +
    '.brv-tag{display:inline-block;margin-top:14px;align-self:flex-start;padding:4px 10px;border-radius:999px;background:#eaf3fc;color:var(--brv-blue);font-size:12px;font-weight:700;}' +
    '.brv-nav{display:none;}' +
    '.brv-dots{display:flex;justify-content:center;gap:6px;}' +
    '.brv-dots i{width:7px;height:7px;border-radius:50%;background:#c9d6e4;transition:background-color .3s,width .3s;}' +
    '.brv-dots i.on{width:22px;border-radius:4px;background:var(--brv-blue);}' +
    '@media (min-width:600px){.brv-track{grid-auto-columns:calc((100% - 12px)/2);}.brv-top{padding:20px 24px;}}' +
    '@media (min-width:1024px){.brv-track{grid-auto-columns:calc((100% - 32px)/3);gap:16px;}' +
      '.brv-nav{display:flex;gap:8px;}' +
      '.brv-nav button{width:44px;height:44px;border-radius:var(--r-btn,var(--brv-r));border:1.5px solid var(--brv-line);background:#fff;color:var(--brv-ink);display:grid;place-items:center;cursor:pointer;transition:background-color .25s,border-color .25s,color .25s,opacity .25s;}' +
      '.brv-nav button:disabled{opacity:.35;cursor:default;}' +
      '.brv-nav svg{width:18px;height:18px;}}' +
    '@media (hover:hover) and (pointer:fine){.brv-btn-dark:hover{background:#173a69;}.brv-btn-line:hover{border-color:var(--brv-blue);color:var(--brv-blue);}.brv-nav button:not(:disabled):hover{background:var(--brv-navy);border-color:var(--brv-navy);color:#fff;}}';

  function render(root) {
    var cards = REVIEWS.map(function (r, i) {
      var tag = r.service ? '<span class="brv-tag">' + esc(r.service) + '</span>' : '';
      return '<article class="brv-card">' +
        '<div class="brv-card-top"><span class="brv-stars" aria-label="5 out of 5 stars">' + stars(5) + '</span><span class="brv-g" title="Google review">' + G + '</span></div>' +
        '<p class="brv-text">' + esc(r.text) + '</p>' +
        '<button type="button" class="brv-more" hidden>Read more</button>' + tag +
        '<div class="brv-who"><span class="brv-av" style="background:' + COLORS[i % COLORS.length] + '">' + esc(r.name.charAt(0)) + '</span>' +
        '<span><b>' + esc(r.name) + '</b><small>' + (r.guide ? 'Local Guide · ' : '') + esc(r.date) + '</small></span></div>' +
        '</article>';
    }).join('');

    root.innerHTML =
      '<div class="brv-top">' +
        '<div class="brv-score"><span class="brv-g">' + G + '</span>' +
          '<span class="brv-num">' + RATING + '</span>' +
          '<span><span class="brv-stars" aria-label="Rated ' + RATING + ' out of 5">' + stars(5) + '</span>' +
          '<span class="brv-meta" style="display:block"><b>Excellent</b> · ' + TOTAL + ' Google reviews</span></span></div>' +
        '<div class="brv-actions">' +
          '<span class="brv-nav"><button type="button" data-dir="-1" aria-label="Previous reviews"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg></button>' +
          '<button type="button" data-dir="1" aria-label="Next reviews"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></button></span>' +
          '<a class="brv-btn brv-btn-dark" href="' + GOOGLE_URL + '" target="_blank" rel="noopener">See all on Google <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17L17 7M8 7h9v9"/></svg></a>' +
        '</div>' +
      '</div>' +
      '<div class="brv-wrap"><div class="brv-track" tabindex="0" aria-label="Customer reviews">' + cards + '</div></div>' +
      '<div class="brv-dots" aria-hidden="true"></div>';

    var track = root.querySelector('.brv-track');
    var dotsEl = root.querySelector('.brv-dots');
    var prev = root.querySelector('[data-dir="-1"]');
    var next = root.querySelector('[data-dir="1"]');

    // "Read more" only where the text is actually clamped
    root.querySelectorAll('.brv-card').forEach(function (card) {
      var p = card.querySelector('.brv-text'), btn = card.querySelector('.brv-more');
      if (p.scrollHeight > p.clientHeight + 2) btn.hidden = false;
      btn.addEventListener('click', function () {
        var open = card.classList.toggle('open');
        btn.textContent = open ? 'Show less' : 'Read more';
      });
    });

    function perView() {
      var c = track.querySelector('.brv-card');
      return c ? Math.max(1, Math.round(track.clientWidth / c.offsetWidth)) : 1;
    }
    function pages() { return Math.max(1, Math.ceil(REVIEWS.length - perView() + 1)); }
    function step() { var c = track.querySelector('.brv-card'); return c ? c.offsetWidth + parseFloat(getComputedStyle(track).columnGap || 12) : 300; }
    function update() {
      var idx = Math.round(track.scrollLeft / step());
      var n = pages();
      if (dotsEl.children.length !== n) dotsEl.innerHTML = new Array(n + 1).join('<i></i>');
      [].forEach.call(dotsEl.children, function (d, i) { d.className = i === Math.min(idx, n - 1) ? 'on' : ''; });
      if (prev) prev.disabled = track.scrollLeft < 4;
      if (next) next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    }
    root.querySelectorAll('.brv-nav button').forEach(function (b) {
      b.addEventListener('click', function () {
        track.scrollBy({ left: step() * perView() * Number(b.getAttribute('data-dir')), behavior: 'smooth' });
      });
    });
    track.addEventListener('scroll', function () { window.requestAnimationFrame(update); }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  function init() {
    if (!document.getElementById('brv-css')) {
      var st = document.createElement('style'); st.id = 'brv-css'; st.textContent = CSS;
      document.head.appendChild(st);
    }
    document.querySelectorAll('[data-briya-reviews]').forEach(render);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();

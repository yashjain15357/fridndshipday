/* ═══════════════════════════════════════════════════════
  LUXURY FRIENDSHIP DAY — JAVASCRIPT
  ═══════════════════════════════════════════════════════ */

'use strict';

/* ──────────────────────────────────────────
   1. INITIAL FADE FROM BLACK
────────────────────────────────────────── */
(function () {
  const overlay = document.createElement('div');
  overlay.className = 'page-fade-black';
  document.body.appendChild(overlay);
  setTimeout(() => overlay.remove(), 2400);
})();

/* ──────────────────────────────────────────
   2. FONT PRELOAD — prevent flash
────────────────────────────────────────── */
document.body.style.opacity = '0';
document.fonts.ready.then(() => {
  document.body.style.transition = 'opacity 0.6s';
  document.body.style.opacity = '1';
});
setTimeout(() => { document.body.style.opacity = '1'; }, 900);

/* ──────────────────────────────────────────
   3. TINY FLOWERS
────────────────────────────────────────── */
const flowerEmojis = ['🌸', '🌺', '🌼', '🌷', '💐', '🌹', '✿', '❀'];
function spawnTinyFlowers(containerId, count) {
  const c = document.getElementById(containerId);
  if (!c) return;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'tiny-flower';
    el.textContent = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
    el.style.cssText = `
      left: ${Math.random() * 100}%;
      top:  ${Math.random() * 100}%;
      font-size: ${10 + Math.random() * 10}px;
      animation-delay: ${Math.random() * 5}s;
      animation-duration: ${4 + Math.random() * 4}s;
      opacity: ${0.4 + Math.random() * 0.4};
    `;
    c.appendChild(el);
  }
}
spawnTinyFlowers('tinyFlowers1', 20);
spawnTinyFlowers('tinyFlowers2', 18);

/* ──────────────────────────────────────────
   4. BUTTERFLIES — Page 1
────────────────────────────────────────── */
(function () {
  const layer = document.getElementById('butterflies1');
  if (!layer) return;
  ['🦋', '🦋', '🦋'].forEach((b, i) => {
    const el = document.createElement('span');
    el.className = 'butterfly';
    el.textContent = b;
    el.style.cssText = `
      left: ${15 + Math.random() * 65}%;
      top:  ${10 + Math.random() * 55}%;
      animation-delay: ${i * 3.5 + Math.random() * 2}s;
      animation-duration: ${9 + Math.random() * 5}s;
      font-size: ${16 + Math.random() * 8}px;
    `;
    layer.appendChild(el);
  });
})();

/* ──────────────────────────────────────────
   5. CARD SPARKLES
────────────────────────────────────────── */
(function () {
  const container = document.getElementById('cardSparkles1');
  if (!container) return;
  for (let i = 0; i < 12; i++) {
    const s = document.createElement('div');
    s.className = 'c-sparkle';
    s.style.cssText = `
      left: ${5 + Math.random() * 90}%;
      top:  ${5 + Math.random() * 90}%;
      width: ${3 + Math.random() * 5}px;
      height: ${3 + Math.random() * 5}px;
      background: ${Math.random() > 0.5 ? '#f9d342' : '#f06292'};
      animation-delay: ${Math.random() * 3}s;
      animation-duration: ${1.5 + Math.random() * 2}s;
    `;
    container.appendChild(s);
  }
})();

/* ──────────────────────────────────────────
   6. CANVAS PARTICLE SYSTEM
────────────────────────────────────────── */
class ParticleSystem {
  constructor(canvasId, pageEl) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.page = pageEl;
    this.particles = [];
    this.raf = null;
    this.resize();
    this.init();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = this.page.clientWidth;
    this.canvas.height = this.page.clientHeight;
  }

  createParticle() {
    const types = ['petal', 'heart', 'sparkle', 'bokeh'];
    const type = types[Math.floor(Math.random() * types.length)];
    return {
      type,
      x: Math.random() * this.canvas.width,
      y: -18,
      size: type === 'bokeh' ? 20 + Math.random() * 40 : 6 + Math.random() * 10,
      speedY: 0.5 + Math.random() * 1.2,
      speedX: (Math.random() - 0.5) * 0.6,
      opacity: 0.65 + Math.random() * 0.35,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.04,
      life: 0,
      maxLife: 180 + Math.random() * 140,
      color: this.randomColor(type),
    };
  }

  randomColor(type) {
    const petals = ['#f8bbd9', '#f06292', '#ffb3c8', '#ff7096', '#fce4ec', '#e91e8c'];
    const hearts = ['#e91e8c', '#f06292', '#ff4081', '#c2185b'];
    const sparks = ['#f9d342', '#fffde7', '#fff59d', '#ffeb3b'];
    const bokeh  = ['rgba(248,187,217,', 'rgba(252,228,236,', 'rgba(255,179,200,'];
    if (type === 'petal')   return petals[Math.floor(Math.random() * petals.length)];
    if (type === 'heart')   return hearts[Math.floor(Math.random() * hearts.length)];
    if (type === 'sparkle') return sparks[Math.floor(Math.random() * sparks.length)];
    return bokeh[Math.floor(Math.random() * bokeh.length)] + (0.08 + Math.random() * 0.12) + ')';
  }

  init() {
    for (let i = 0; i < 28; i++) {
      const p = this.createParticle();
      p.y = Math.random() * this.canvas.height;
      p.life = Math.random() * 120;
      this.particles.push(p);
    }
  }

  drawPetal(ctx, p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.globalAlpha = p.opacity * (1 - p.life / p.maxLife);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, p.size * 0.55, p.size, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  drawHeart(ctx, p) {
    const s = p.size * 0.55;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.globalAlpha = p.opacity * (1 - p.life / p.maxLife);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.moveTo(0, s * 0.4);
    ctx.bezierCurveTo(-s, -s * 0.2, -s * 1.4, s * 0.8, 0, s * 1.6);
    ctx.bezierCurveTo(s * 1.4, s * 0.8, s, -s * 0.2, 0, s * 0.4);
    ctx.fill();
    ctx.restore();
  }

  drawSparkle(ctx, p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.globalAlpha = p.opacity * Math.sin((p.life / p.maxLife) * Math.PI);
    ctx.fillStyle = p.color;
    const r = p.size * 0.5;
    for (let i = 0; i < 4; i++) {
      ctx.save();
      ctx.rotate((i * Math.PI) / 2);
      ctx.beginPath();
      ctx.moveTo(0, -r);
      ctx.lineTo(r * 0.18, -r * 0.18);
      ctx.lineTo(r, 0);
      ctx.lineTo(r * 0.18, r * 0.18);
      ctx.lineTo(0, r);
      ctx.lineTo(-r * 0.18, r * 0.18);
      ctx.lineTo(-r, 0);
      ctx.lineTo(-r * 0.18, -r * 0.18);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
    ctx.restore();
  }

  drawBokeh(ctx, p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.globalAlpha = p.opacity * 0.35 * Math.sin((p.life / p.maxLife) * Math.PI);
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
    grad.addColorStop(0, p.color);
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, p.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  tick() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.particles.length < 55 && Math.random() < 0.35) {
      this.particles.push(this.createParticle());
    }
    this.particles = this.particles.filter(p => {
      p.x += p.speedX; p.y += p.speedY;
      p.rotation += p.rotationSpeed; p.life++;
      if (p.type === 'petal')   this.drawPetal(ctx, p);
      if (p.type === 'heart')   this.drawHeart(ctx, p);
      if (p.type === 'sparkle') this.drawSparkle(ctx, p);
      if (p.type === 'bokeh')   this.drawBokeh(ctx, p);
      return p.life < p.maxLife && p.y < this.canvas.height + 30;
    });
    this.raf = requestAnimationFrame(() => this.tick());
  }

  start() { this.tick(); }
  stop() { cancelAnimationFrame(this.raf); }
}

const page1El = document.getElementById('page1');
const page2El = document.getElementById('page2');
const ps1 = new ParticleSystem('canvas1', page1El);
ps1.start();

/* ──────────────────────────────────────────
   7. FLOATING HEARTS & GOLDEN SPARKLES
────────────────────────────────────────── */
function spawnFloatingHeart(page) {
  const heart = document.createElement('span');
  heart.className = 'floating-heart';
  heart.textContent = Math.random() > 0.5 ? '❤️' : '💗';
  const dur = 5 + Math.random() * 5;
  heart.style.cssText = `
    left: ${5 + Math.random() * 88}%;
    bottom: -20px;
    font-size: ${10 + Math.random() * 12}px;
    animation-duration: ${dur}s;
    z-index: 4;
  `;
  page.appendChild(heart);
  setTimeout(() => heart.remove(), dur * 1000 + 200);
}

function spawnGoldenSparkle(page) {
  const s = document.createElement('div');
  s.className = 'g-sparkle';
  const dur = 2 + Math.random() * 2;
  s.style.cssText = `
    left: ${Math.random() * 95}%;
    top:  ${Math.random() * 90}%;
    width:  ${4 + Math.random() * 6}px;
    height: ${4 + Math.random() * 6}px;
    animation-duration: ${dur}s;
    animation-delay: ${Math.random() * 1.5}s;
    z-index: 5;
  `;
  page.appendChild(s);
  setTimeout(() => s.remove(), (dur + 2) * 1000);
}

setInterval(() => spawnFloatingHeart(page1El), 1800);
setInterval(() => spawnGoldenSparkle(page1El), 1000);

/* ──────────────────────────────────────────
   8. PAGE 1 → PAGE 2 TRANSITION
────────────────────────────────────────── */
let ps2 = null;
let transitionDone = false;

function goToPage2() {
  if (transitionDone) return;
  transitionDone = true;

  // Re-bloom flowers
  document.querySelectorAll('#page1 .bloom-anim').forEach(el => {
    el.style.animation = 'none';
    requestAnimationFrame(() => { el.style.animation = ''; });
  });

  triggerPetalBurst();

  setTimeout(() => {
    const overlay = document.getElementById('transitionOverlay');
    overlay.classList.add('fade-in');

    setTimeout(() => {
      page1El.classList.remove('active');
      page2El.classList.add('active');

      if (!ps2) { ps2 = new ParticleSystem('canvas2', page2El); ps2.start(); }

      setInterval(() => spawnFloatingHeart(page2El), 2000);
      setInterval(() => spawnGoldenSparkle(page2El), 900);

      // ── Auto-open envelope after page settles ──
      setTimeout(() => openEnvelope(), 1200);

      setTimeout(() => {
        overlay.classList.remove('fade-in');
        overlay.classList.add('fade-out');
        setTimeout(() => overlay.classList.remove('fade-out'), 750);
      }, 500);
    }, 680);
  }, 600);
}

/* ──────────────────────────────────────────
   9. PETAL BURST
────────────────────────────────────────── */
function triggerPetalBurst() {
  const container = document.getElementById('petalBurst');
  const btn = document.getElementById('openBtn');
  if (!btn) return;
  const rect = btn.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const petals = ['🌸', '🌺', '🌹', '💗', '✨', '🌷', '💕', '⭐'];

  for (let i = 0; i < 28; i++) {
    const p = document.createElement('span');
    p.className = 'burst-petal';
    p.textContent = petals[Math.floor(Math.random() * petals.length)];
    const angle = Math.random() * Math.PI * 2;
    const dist  = 80 + Math.random() * 180;
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist;
    p.style.cssText = `
      left: ${cx}px; top: ${cy}px;
      font-size: ${10 + Math.random() * 14}px;
      animation-duration: ${1.2 + Math.random() * 0.8}s;
      animation-delay: ${Math.random() * 0.3}s;
      --target: translate(${tx}px, ${ty}px);
    `;
    container.appendChild(p);
    setTimeout(() => p.remove(), 2200);
  }
}

/* ──────────────────────────────────────────
   10. ENVELOPE OPEN + LETTER OVERLAY
────────────────────────────────────────── */
let envelopeOpened = false;

// Envelope can also be tapped manually (before auto-open fires)
function onEnvelopeTap() {
  if (!envelopeOpened) openEnvelope();
}

function openEnvelope() {
  if (envelopeOpened) return;
  envelopeOpened = true;

  const wrapper = document.getElementById('envelopeWrapper');
  const hint    = document.getElementById('envelopeHint');
  const overlay = document.getElementById('letterOverlay');

  // Disable further taps on envelope
  wrapper.style.pointerEvents = 'none';

  // Fade out hint
  if (hint) {
    hint.style.transition = 'opacity 0.4s ease';
    hint.style.opacity = '0';
  }

  // Open flap via CSS class
  wrapper.classList.add('opened');

  // After flap opens, show the letter overlay (centered, scaled in)
  setTimeout(() => {
    overlay.classList.add('visible');
    // Start typewriter after scale-in animation finishes (0.7s)
    setTimeout(() => startTypewriter(), 800);
  }, 800);
}


/* ──────────────────────────────────────────
   11. TYPEWRITER LETTER
────────────────────────────────────────── */
const LETTER_LINES = [
  'Happy Friendship Day! 🎉💕',
  '',
  'Today, I just wanted to remind you how special you are to me. 💖',
  '',
  'You bring so much light into my life with your beauty and kind heart. ✨😍',
  'You make me smile and feel happy every day. 😊',
  '',
  'Thank you so much for singing that song when I asked. 🎶',
  'No one else would do that, and it meant a lot to me. 🙏❤️',
  'Thank you for always listening to my problems and talking with me—it truly means the world. 🫶',
  '',
  'Listening to you sing is pure magic. ✨🎤',
  'Your voice is beautiful and I could listen all day. 🎧💫',
  '',
  'Thank you for filling my life with smiles, memories, and moments I will always cherish. 🌷😊',
  '',
  'No matter where life takes us, you will always have a special place in my heart. ❤️',
  '',
  'To be honest, I think I am falling for you... 💞',
  '🥹❤️',
  '',
  'Thank you for being in my life as my friend and for being your amazing self. 🌹✨',
];

function startTypewriter() {
  const textEl   = document.getElementById('letterText');
  const heartEl  = document.getElementById('letterHeart');
  const footerEl = document.getElementById('letterFooter');
  const bodyEl   = document.getElementById('sheetBody');
  const galleryWrap = document.getElementById('rotGalleryWrap');

  textEl.classList.add('typing');

  // Join with actual newlines for pre-wrap rendering
  const fullText = LETTER_LINES.join('\n');
  const chars = fullText.split('');
  let i = 0;
  let display = '';

  function typeNext() {
    if (i >= chars.length) {
      // Typing done
      textEl.classList.remove('typing');
      heartEl.classList.add('beating');

      // Also start footer heart beating
      const footerHeart = document.getElementById('footerHeart');
      if (footerHeart) footerHeart.style.animationPlayState = 'running';

      // Fade in footer
      footerEl.style.opacity = '1';
      footerEl.style.pointerEvents = 'all';
      footerEl.style.transition = 'opacity 1s ease';

      if (galleryWrap) galleryWrap.classList.add('visible');

      // Extra gold sparkles on completion
      for (let k = 0; k < 20; k++) {
        setTimeout(() => spawnGoldenSparkle(page2El), k * 130);
      }
      return;
    }

    const ch = chars[i++];
    display += ch;
    textEl.textContent = display;

    // Smooth auto-scroll (track typed paragraph only)
    bodyEl.scrollTop = textEl.offsetTop + textEl.offsetHeight;

    // Pacing
    let delay = 28;
    if (ch === ',') delay = 180;
    else if (ch === '.') delay = 340;
    else if (ch === '!') delay = 300;
    else if (ch === '\n') delay = 260;

    setTimeout(typeNext, delay);
  }

  typeNext();
}

/* ──────────────────────────────────────────
   12. ROTATABLE GLASS GALLERY
────────────────────────────────────────── */
function initRotatableGallery() {
  const scene = document.getElementById('rotGalleryScene');
  const gallery = document.getElementById('rotGallery');
  if (!scene || !gallery) return;

  const cards = [...gallery.querySelectorAll('.gallery-item')];
  if (!cards.length) return;

  const state = {
    angle: 0,
    targetAngle: 0,
    velocity: 0,
    dragging: false,
    lastX: 0,
    raf: null,
    radius: 140,
  };

  function layoutCards() {
    const step = 360 / cards.length;
    state.radius = Math.max(110, Math.min(170, scene.clientWidth * 0.36));
    cards.forEach((card, i) => {
      card.style.transform = `rotateY(${i * step}deg) translateZ(${state.radius}px)`;
    });
  }

  function animate() {
    if (!state.dragging) {
      state.targetAngle += 0.1;
      state.velocity *= 0.95;
      state.targetAngle += state.velocity;
    }
    state.angle += (state.targetAngle - state.angle) * 0.12;
    gallery.style.transform = `translateZ(0) rotateX(-7deg) rotateY(${state.angle}deg)`;
    state.raf = requestAnimationFrame(animate);
  }

  scene.addEventListener('pointerdown', e => {
    state.dragging = true;
    state.lastX = e.clientX;
    state.velocity = 0;
    scene.setPointerCapture(e.pointerId);
  });

  scene.addEventListener('pointermove', e => {
    if (!state.dragging) return;
    const dx = e.clientX - state.lastX;
    state.lastX = e.clientX;
    state.velocity = dx * 0.05;
    state.targetAngle += dx * 0.4;
  });

  function stopDragging(e) {
    if (!state.dragging) return;
    state.dragging = false;
    if (e && typeof e.pointerId === 'number') {
      scene.releasePointerCapture(e.pointerId);
    }
  }

  scene.addEventListener('pointerup', stopDragging);
  scene.addEventListener('pointercancel', stopDragging);
  scene.addEventListener('pointerleave', () => { state.dragging = false; });

  window.addEventListener('resize', layoutCards);
  layoutCards();
  animate();
}

/* ──────────────────────────────────────────
   13. BOKEH LIGHTS — Page 2
────────────────────────────────────────── */
setTimeout(() => {
  for (let i = 0; i < 10; i++) {
    const b = document.createElement('div');
    b.className = 'bokeh';
    const size = 30 + Math.random() * 80;
    b.style.cssText = `
      left: ${Math.random() * 90}%;
      top:  ${Math.random() * 90}%;
      width: ${size}px; height: ${size}px;
      animation-duration: ${4 + Math.random() * 5}s;
      animation-delay: ${Math.random() * 4}s;
      z-index: 1;
    `;
    page2El.appendChild(b);
  }
}, 50);

initRotatableGallery();

/* ──────────────────────────────────────────
  14. MISC
────────────────────────────────────────── */
document.addEventListener('contextmenu', e => e.preventDefault());

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (ps1) ps1.resize();
    if (ps2) ps2.resize();
  }, 200);
});

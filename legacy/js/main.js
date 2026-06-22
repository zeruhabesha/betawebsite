/* ============================================================
   Beta Tech Hub — interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Nav: scrolled state + scroll progress ---------- */
  var nav = document.getElementById("nav");
  var progress = document.getElementById("scrollProgress");
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    if (nav) nav.classList.toggle("is-scrolled", y > 30);
    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Active link highlight on scroll ---------- */
  var sections = document.querySelectorAll("section[id]");
  var navAnchors = links ? links.querySelectorAll("a") : [];
  function setActive() {
    var pos = (window.scrollY || 0) + 120;
    var current = "";
    sections.forEach(function (s) {
      if (s.offsetTop <= pos) current = s.id;
    });
    navAnchors.forEach(function (a) {
      a.classList.toggle("is-active", a.getAttribute("href") === "#" + current);
    });
  }
  window.addEventListener("scroll", setActive, { passive: true });
  setActive();

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (r) { io.observe(r); });
  } else {
    reveals.forEach(function (r) { r.classList.add("is-visible"); });
  }

  /* ---------- Animated counters ---------- */
  var counters = document.querySelectorAll(".stat__num[data-count]");
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    var suffix = el.getAttribute("data-suffix") || "";
    var dur = 1400, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window) {
    var cIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { animateCount(e.target); cIO.unobserve(e.target); }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach(function (c) { cIO.observe(c); });
  } else {
    counters.forEach(function (c) {
      c.textContent = c.getAttribute("data-count") + (c.getAttribute("data-suffix") || "");
    });
  }

  /* ---------- Product tabs ---------- */
  var tabBtns = document.querySelectorAll(".tabs__btn");
  var tabPanels = document.querySelectorAll(".tabs__panel");
  tabBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = btn.getAttribute("data-tab");
      tabBtns.forEach(function (b) {
        var active = b === btn;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-selected", active ? "true" : "false");
      });
      tabPanels.forEach(function (p) {
        var match = p.id === "tab-" + id;
        p.classList.toggle("is-active", match);
        if (match) p.removeAttribute("hidden");
        else p.setAttribute("hidden", "");
      });
    });
  });

  /* ---------- Contact form (front-end only) ---------- */
  var form = document.getElementById("contactForm");
  var note = document.getElementById("formNote");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      if (note) note.hidden = false;
      form.reset();
      setTimeout(function () { if (note) note.hidden = true; }, 5000);
    });
  }

  /* ---------- Real video: show it only if it actually loads ---------- */
  var video = document.querySelector(".hero__video");
  if (video) {
    video.addEventListener("loadeddata", function () {
      if (video.readyState >= 2 && video.videoWidth > 0) {
        video.classList.add("is-ready");
      }
    });
  }

  /* ============================================================
     Hero canvas — animated "defender vs. cyber-attack" scene.
     A glowing shield at the center repels incoming attack
     particles travelling along a connected network grid.
     Acts as a rich fallback until a real hero video is supplied.
     ============================================================ */
  var canvas = document.getElementById("heroCanvas");
  if (!canvas || !canvas.getContext) return;
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var ctx = canvas.getContext("2d");
  var W, H, DPR, cx, cy;
  var nodes = [], attacks = [], pulses = [];

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = W * DPR; canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    cx = W * 0.5; cy = H * 0.5;
    buildNodes();
  }

  function buildNodes() {
    nodes = [];
    var count = Math.max(26, Math.floor((W * H) / 42000));
    for (var i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.6
      });
    }
  }

  function spawnAttack() {
    // Launch from a random edge toward the shield (center).
    var edge = Math.floor(Math.random() * 4), x, y;
    if (edge === 0) { x = Math.random() * W; y = -20; }
    else if (edge === 1) { x = W + 20; y = Math.random() * H; }
    else if (edge === 2) { x = Math.random() * W; y = H + 20; }
    else { x = -20; y = Math.random() * H; }
    var ang = Math.atan2(cy - y, cx - x);
    var sp = 1.6 + Math.random() * 1.8;
    attacks.push({
      x: x, y: y, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp,
      life: 1, blocked: false
    });
  }

  var shieldR = 70;
  function step(t) {
    ctx.clearRect(0, 0, W, H);
    shieldR = Math.min(W, H) * 0.13 + 12;

    // --- network nodes + links ---
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    }
    ctx.lineWidth = 1;
    for (var a = 0; a < nodes.length; a++) {
      for (var b = a + 1; b < nodes.length; b++) {
        var dx = nodes[a].x - nodes[b].x, dy = nodes[a].y - nodes[b].y;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d < 130) {
          ctx.strokeStyle = "rgba(47,123,255," + (0.12 * (1 - d / 130)) + ")";
          ctx.beginPath();
          ctx.moveTo(nodes[a].x, nodes[a].y);
          ctx.lineTo(nodes[b].x, nodes[b].y);
          ctx.stroke();
        }
      }
    }
    for (var k = 0; k < nodes.length; k++) {
      ctx.fillStyle = "rgba(120,160,220,.55)";
      ctx.beginPath();
      ctx.arc(nodes[k].x, nodes[k].y, nodes[k].r, 0, Math.PI * 2);
      ctx.fill();
    }

    // --- shield (the defender) ---
    var breath = 1 + Math.sin(t / 700) * 0.04;
    var rad = shieldR * breath;
    var grad = ctx.createRadialGradient(cx, cy, rad * 0.2, cx, cy, rad);
    grad.addColorStop(0, "rgba(24,224,200,.30)");
    grad.addColorStop(0.7, "rgba(47,123,255,.14)");
    grad.addColorStop(1, "rgba(47,123,255,0)");
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.arc(cx, cy, rad, 0, Math.PI * 2); ctx.fill();

    ctx.strokeStyle = "rgba(24,224,200,.65)";
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(cx, cy, rad * 0.82, 0, Math.PI * 2); ctx.stroke();

    // shield emblem
    ctx.save();
    ctx.translate(cx, cy);
    var s = rad * 0.5;
    ctx.beginPath();
    ctx.moveTo(0, -s);
    ctx.lineTo(s * 0.8, -s * 0.55);
    ctx.lineTo(s * 0.8, s * 0.25);
    ctx.quadraticCurveTo(s * 0.8, s, 0, s * 1.05);
    ctx.quadraticCurveTo(-s * 0.8, s, -s * 0.8, s * 0.25);
    ctx.lineTo(-s * 0.8, -s * 0.55);
    ctx.closePath();
    ctx.strokeStyle = "rgba(231,236,245,.85)";
    ctx.lineWidth = 2;
    ctx.stroke();
    // check mark
    ctx.beginPath();
    ctx.moveTo(-s * 0.32, 0);
    ctx.lineTo(-s * 0.08, s * 0.28);
    ctx.lineTo(s * 0.38, -s * 0.3);
    ctx.strokeStyle = "rgba(24,224,200,1)";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    ctx.restore();

    // --- attacks ---
    for (var p = attacks.length - 1; p >= 0; p--) {
      var at = attacks[p];
      if (!at.blocked) {
        at.x += at.vx; at.y += at.vy;
        var ddx = at.x - cx, ddy = at.y - cy;
        var dist = Math.sqrt(ddx * ddx + ddy * ddy);
        if (dist < rad * 0.86) {
          at.blocked = true;
          pulses.push({ x: at.x, y: at.y, r: 2, life: 1 });
        }
      } else {
        at.life -= 0.06;
      }
      // trail
      ctx.strokeStyle = at.blocked
        ? "rgba(255,90,110," + Math.max(at.life, 0) + ")"
        : "rgba(255,90,110,.9)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(at.x, at.y);
      ctx.lineTo(at.x - at.vx * 6, at.y - at.vy * 6);
      ctx.stroke();
      ctx.fillStyle = at.blocked
        ? "rgba(255,140,90," + Math.max(at.life, 0) + ")"
        : "rgba(255,90,110,1)";
      ctx.beginPath();
      ctx.arc(at.x, at.y, 3, 0, Math.PI * 2);
      ctx.fill();

      if (at.life <= 0 || at.x < -40 || at.x > W + 40 || at.y < -40 || at.y > H + 40) {
        attacks.splice(p, 1);
      }
    }

    // --- block pulses (impact ripples on the shield) ---
    for (var q = pulses.length - 1; q >= 0; q--) {
      var pu = pulses[q];
      pu.r += 2.4; pu.life -= 0.04;
      ctx.strokeStyle = "rgba(24,224,200," + Math.max(pu.life, 0) + ")";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(pu.x, pu.y, pu.r, 0, Math.PI * 2);
      ctx.stroke();
      if (pu.life <= 0) pulses.splice(q, 1);
    }

    if (attacks.length < 9 && Math.random() < 0.06) spawnAttack();

    rafId = requestAnimationFrame(step);
  }

  var rafId;
  resize();
  window.addEventListener("resize", resize);

  if (prefersReduced) {
    // Draw a single static frame.
    step(0);
    cancelAnimationFrame(rafId);
  } else {
    // Pause animation when hero is off-screen to save CPU.
    var hero = document.getElementById("home");
    var running = true;
    function start() { if (!running) { running = true; rafId = requestAnimationFrame(step); } }
    function stop() { running = false; cancelAnimationFrame(rafId); }
    rafId = requestAnimationFrame(step);
    if ("IntersectionObserver" in window && hero) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { e.isIntersecting ? start() : stop(); });
      }, { threshold: 0.05 }).observe(hero);
    }
  }
})();

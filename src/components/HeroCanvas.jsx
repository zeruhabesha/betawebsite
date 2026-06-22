import { useEffect, useRef } from "react";

/* ============================================================
   Animated "defender vs. cyber-attack" scene.
   A glowing shield at the centre repels incoming attack
   particles travelling along a connected network grid.
   Always-on visual base layer beneath the optional hero video.
   ============================================================ */
export default function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext("2d");
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W, H, DPR, cx, cy;
    let nodes = [];
    const attacks = [];
    const pulses = [];
    let rafId;
    let running = true;

    const buildNodes = () => {
      nodes = [];
      const count = Math.max(26, Math.floor((W * H) / 42000));
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: Math.random() * 1.6 + 0.6,
        });
      }
    };

    const resize = () => {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      cx = W * 0.5;
      cy = H * 0.5;
      buildNodes();
    };

    const spawnAttack = () => {
      const edge = Math.floor(Math.random() * 4);
      let x, y;
      if (edge === 0) { x = Math.random() * W; y = -20; }
      else if (edge === 1) { x = W + 20; y = Math.random() * H; }
      else if (edge === 2) { x = Math.random() * W; y = H + 20; }
      else { x = -20; y = Math.random() * H; }
      const ang = Math.atan2(cy - y, cx - x);
      const sp = 1.6 + Math.random() * 1.8;
      attacks.push({ x, y, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, life: 1, blocked: false });
    };

    let shieldR = 70;
    const step = (t) => {
      ctx.clearRect(0, 0, W, H);
      shieldR = Math.min(W, H) * 0.13 + 12;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      }
      ctx.lineWidth = 1;
      for (let a = 0; a < nodes.length; a++) {
        for (let b = a + 1; b < nodes.length; b++) {
          const dx = nodes[a].x - nodes[b].x;
          const dy = nodes[a].y - nodes[b].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            ctx.strokeStyle = "rgba(28,115,168," + 0.12 * (1 - d / 130) + ")";
            ctx.beginPath();
            ctx.moveTo(nodes[a].x, nodes[a].y);
            ctx.lineTo(nodes[b].x, nodes[b].y);
            ctx.stroke();
          }
        }
      }
      for (let k = 0; k < nodes.length; k++) {
        ctx.fillStyle = "rgba(90,130,200,.55)";
        ctx.beginPath();
        ctx.arc(nodes[k].x, nodes[k].y, nodes[k].r, 0, Math.PI * 2);
        ctx.fill();
      }

      const breath = 1 + Math.sin(t / 700) * 0.04;
      const rad = shieldR * breath;
      const grad = ctx.createRadialGradient(cx, cy, rad * 0.2, cx, cy, rad);
      grad.addColorStop(0, "rgba(46,151,212,.30)");
      grad.addColorStop(0.7, "rgba(28,115,168,.14)");
      grad.addColorStop(1, "rgba(28,115,168,0)");
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.arc(cx, cy, rad, 0, Math.PI * 2); ctx.fill();

      ctx.strokeStyle = "rgba(46,151,212,.65)";
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(cx, cy, rad * 0.82, 0, Math.PI * 2); ctx.stroke();

      ctx.save();
      ctx.translate(cx, cy);
      const s = rad * 0.5;
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.lineTo(s * 0.8, -s * 0.55);
      ctx.lineTo(s * 0.8, s * 0.25);
      ctx.quadraticCurveTo(s * 0.8, s, 0, s * 1.05);
      ctx.quadraticCurveTo(-s * 0.8, s, -s * 0.8, s * 0.25);
      ctx.lineTo(-s * 0.8, -s * 0.55);
      ctx.closePath();
      ctx.strokeStyle = "rgba(60,80,120,.85)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-s * 0.32, 0);
      ctx.lineTo(-s * 0.08, s * 0.28);
      ctx.lineTo(s * 0.38, -s * 0.3);
      ctx.strokeStyle = "rgba(46,151,212,1)";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
      ctx.restore();

      for (let p = attacks.length - 1; p >= 0; p--) {
        const at = attacks[p];
        if (!at.blocked) {
          at.x += at.vx; at.y += at.vy;
          const ddx = at.x - cx, ddy = at.y - cy;
          const dist = Math.sqrt(ddx * ddx + ddy * ddy);
          if (dist < rad * 0.86) {
            at.blocked = true;
            pulses.push({ x: at.x, y: at.y, r: 2, life: 1 });
          }
        } else {
          at.life -= 0.06;
        }
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

      for (let q = pulses.length - 1; q >= 0; q--) {
        const pu = pulses[q];
        pu.r += 2.4; pu.life -= 0.04;
        ctx.strokeStyle = "rgba(46,151,212," + Math.max(pu.life, 0) + ")";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(pu.x, pu.y, pu.r, 0, Math.PI * 2);
        ctx.stroke();
        if (pu.life <= 0) pulses.splice(q, 1);
      }

      if (attacks.length < 9 && Math.random() < 0.06) spawnAttack();
      rafId = requestAnimationFrame(step);
    };

    resize();
    window.addEventListener("resize", resize);

    if (prefersReduced) {
      step(0);
      cancelAnimationFrame(rafId);
    } else {
      rafId = requestAnimationFrame(step);
      const onVisibility = () => {
        if (document.hidden) {
          running = false;
          cancelAnimationFrame(rafId);
        } else if (!running) {
          running = true;
          rafId = requestAnimationFrame(step);
        }
      };
      document.addEventListener("visibilitychange", onVisibility);
      return () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener("resize", resize);
        document.removeEventListener("visibilitychange", onVisibility);
      };
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas className="hero__canvas" ref={canvasRef} aria-hidden="true" />;
}

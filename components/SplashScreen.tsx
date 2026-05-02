"use client";

import { useEffect, useRef, useState } from "react";

export function SplashScreen({ onEnter }: { onEnter: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [visible, setVisible] = useState(true);

  /* ── refs to animated elements ── */
  const glowRef    = useRef<SVGGElement>(null);
  const outerRef   = useRef<SVGGElement>(null);
  const innerRef   = useRef<SVGGElement>(null);
  const rRef       = useRef<SVGGElement>(null);
  const dotsRef    = useRef<SVGGElement>(null);
  const shimRef    = useRef<SVGRectElement>(null);
  const mainRef    = useRef<HTMLDivElement>(null);
  const subRef     = useRef<HTMLDivElement>(null);
  const tagRef     = useRef<HTMLDivElement>(null);
  const btnRef     = useRef<HTMLButtonElement>(null);

  function later(fn: () => void, ms: number) {
    const id = setTimeout(fn, ms);
    timeoutsRef.current.push(id);
  }

  function clearAll() {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d")!;
    let W = 0, H = 0;

    type Pt = { x:number; y:number; vx:number; vy:number; life:number; max:number; s:number; del:number };
    let pts: Pt[] = [];

    function resize() {
      W = cvs!.offsetWidth || 680;
      H = cvs!.offsetHeight || 600;
      cvs!.width = W; cvs!.height = H;
    }
    resize();
    window.addEventListener("resize", resize);

    function mkPt(): Pt {
      const a = Math.random() * Math.PI * 2;
      const r = 60 + Math.random() * 220;
      return {
        x: W / 2 + Math.cos(a) * r, y: H / 2 + Math.sin(a) * r,
        vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
        life: 0, max: 100 + Math.random() * 200,
        s: Math.random() * 1.4 + .2, del: Math.random() * 120,
      };
    }

    function drawBg() {
      ctx.clearRect(0, 0, W, H);
      const g = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, 320);
      g.addColorStop(0, "rgba(30,20,5,0.4)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      pts.forEach(p => {
        if (p.del > 0) { p.del--; return; }
        p.life++; p.x += p.vx; p.y += p.vy;
        const pr = p.life / p.max;
        const a = pr < .3 ? pr / .3 : pr > .75 ? (1 - pr) / .25 : 1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${a * .55})`; ctx.fill();
        if (p.life >= p.max) Object.assign(p, mkPt());
      });
    }

    function loop() { drawBg(); rafRef.current = requestAnimationFrame(loop); }

    /* ── animation sequence ── */
    pts = Array.from({ length: 80 }, mkPt);
    cancelAnimationFrame(rafRef.current);
    loop();

    const set = (el: { style: CSSStyleDeclaration } | null, props: Partial<CSSStyleDeclaration>) => {
      if (el) Object.assign(el.style, props);
    };

    later(() => { set(glowRef.current, { transition: "opacity 1200ms ease", opacity: "1" }); }, 400);
    later(() => { set(outerRef.current, { transition: "opacity 600ms ease", opacity: "1" }); }, 1000);
    later(() => { set(innerRef.current, { transition: "opacity 500ms ease", opacity: "1" }); }, 1500);
    later(() => { set(rRef.current, { transition: "opacity 800ms cubic-bezier(.34,1.56,.64,1)", opacity: "1" }); }, 2100);
    later(() => { set(dotsRef.current, { transition: "opacity 400ms ease", opacity: "1" }); }, 2700);
    later(() => { shimRef.current?.setAttribute("x", "400"); }, 3000);
    later(() => { set(mainRef.current, { transition: "opacity 900ms ease, transform 900ms ease", opacity: "1", transform: "translateY(0)" }); }, 3400);
    later(() => { set(subRef.current, { transition: "opacity 700ms ease, transform 700ms ease", opacity: "1", transform: "translateY(0)" }); }, 3900);
    later(() => { set(tagRef.current, { transition: "opacity 600ms ease", opacity: "1" }); }, 4500);
    later(() => { set(btnRef.current, { transition: "opacity 600ms ease", opacity: "1" }); }, 5000);

    return () => {
      clearAll();
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  function handleEnter() {
    setVisible(false);
    setTimeout(onEnter, 700);
  }

  if (!visible) {
    return (
      <div
        className="pointer-events-none fixed inset-0 z-[999] bg-black"
        style={{ opacity: 0, transition: "opacity 700ms ease" }}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center overflow-hidden bg-black">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Logo */}
      <div className="relative z-10 flex flex-col items-center gap-0">
        <svg id="logoSvg" width="200" height="210" viewBox="0 0 200 210" style={{ overflow: "visible" }}>
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f0d98a"/>
              <stop offset="25%" stopColor="#c9a84c"/>
              <stop offset="50%" stopColor="#f5e070"/>
              <stop offset="75%" stopColor="#a07820"/>
              <stop offset="100%" stopColor="#e8c84a"/>
            </linearGradient>
            <linearGradient id="goldGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f5e88a"/>
              <stop offset="40%" stopColor="#c9a84c"/>
              <stop offset="100%" stopColor="#7a5c10"/>
            </linearGradient>
            <linearGradient id="shimmerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0)"/>
              <stop offset="45%" stopColor="rgba(255,255,255,0)"/>
              <stop offset="50%" stopColor="rgba(255,240,180,0.7)"/>
              <stop offset="55%" stopColor="rgba(255,255,255,0)"/>
              <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="softglow">
              <feGaussianBlur stdDeviation="6" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <clipPath id="logoClip"><rect x="0" y="0" width="200" height="210"/></clipPath>
          </defs>

          <g ref={glowRef} style={{ opacity: 0 }}>
            <polygon points="100,4 196,100 100,196 4,100" fill="none" stroke="url(#goldGrad)" strokeWidth="0.5" opacity="0.3" filter="url(#softglow)"/>
          </g>
          <g ref={outerRef} style={{ opacity: 0 }}>
            <polygon points="100,8 192,100 100,192 8,100" fill="none" stroke="url(#goldGrad)" strokeWidth="2.2" strokeLinejoin="round"/>
            <polygon points="100,8 192,100 100,192 8,100" fill="none" stroke="rgba(245,220,100,0.15)" strokeWidth="6"/>
          </g>
          <g ref={innerRef} style={{ opacity: 0 }}>
            <polygon points="100,22 178,100 100,178 22,100" fill="rgba(15,12,5,0.95)" stroke="url(#goldGrad2)" strokeWidth="1.4"/>
          </g>
          <g ref={rRef} style={{ opacity: 0 }} transform="translate(100,100)">
            <text textAnchor="middle" dominantBaseline="central"
              fontFamily="'Cormorant Garamond',serif"
              fontSize="90" fontWeight="400"
              fill="url(#goldGrad)"
              filter="url(#glow)"
              dy="4">R</text>
          </g>
          <g ref={dotsRef} style={{ opacity: 0 }}>
            <circle cx="100" cy="8" r="2.5" fill="#c9a84c"/>
            <circle cx="192" cy="100" r="2.5" fill="#c9a84c"/>
            <circle cx="100" cy="192" r="2.5" fill="#c9a84c"/>
            <circle cx="8" cy="100" r="2.5" fill="#c9a84c"/>
          </g>
          <rect
            ref={shimRef}
            x="-200" y="0" width="200" height="210"
            fill="url(#shimmerGrad)"
            clipPath="url(#logoClip)"
            opacity="0.8"
            style={{ transition: "x 900ms cubic-bezier(.4,0,.2,1)" }}
          />
        </svg>

        {/* Wordmark */}
        <div className="mt-6 flex flex-col items-center gap-1.5">
          <div
            ref={mainRef}
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "32px",
              fontWeight: 500,
              letterSpacing: "0.22em",
              color: "#c9a84c",
              opacity: 0,
              transform: "translateY(18px)",
            }}
          >
            RAZZAQ LUXE
          </div>
          <div
            ref={subRef}
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "11px",
              fontWeight: 400,
              letterSpacing: "0.65em",
              color: "#8a6f30",
              opacity: 0,
              transform: "translateY(10px)",
            }}
          >
            F &nbsp; R &nbsp; A &nbsp; G &nbsp; R &nbsp; A &nbsp; N &nbsp; C &nbsp; E
          </div>
        </div>
      </div>

      {/* Tagline */}
      <div
        ref={tagRef}
        style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: "9px",
          fontWeight: 200,
          letterSpacing: "0.5em",
          textTransform: "uppercase",
          color: "rgba(180,140,60,0.55)",
          opacity: 0,
          marginTop: "28px",
        }}
      >
        Where Scent Becomes Identity
      </div>

      {/* Enter button */}
      <button
        ref={btnRef}
        onClick={handleEnter}
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "9px",
          letterSpacing: "0.38em",
          textTransform: "uppercase",
          color: "#c9a84c",
          border: "1px solid rgba(201,168,76,0.4)",
          padding: "14px 40px",
          borderRadius: "1px",
          opacity: 0,
          marginTop: "36px",
          cursor: "pointer",
          background: "transparent",
          position: "relative",
          zIndex: 5,
          transition: "border-color .3s, color .3s, background .3s",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "#c9a84c";
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,168,76,0.06)";
          (e.currentTarget as HTMLButtonElement).style.color = "#f0d98a";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,168,76,0.4)";
          (e.currentTarget as HTMLButtonElement).style.background = "transparent";
          (e.currentTarget as HTMLButtonElement).style.color = "#c9a84c";
        }}
      >
        Enter the Collection
      </button>
    </div>
  );
}

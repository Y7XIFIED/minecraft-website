import { useEffect, useRef } from "react";

export function PixelRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      canvas!.width  = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const DROPS = 80;
    type Drop = { x: number; y: number; speed: number; size: number; opacity: number; color: string };
    const COLORS = ["#5caf00","#3a7a00","#ffffff","#fcbe04","#4488ff"];

    const drops: Drop[] = Array.from({ length: DROPS }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight * -1,
      speed: 1.5 + Math.random() * 2.5,
      size: 2 + Math.floor(Math.random() * 3) * 2,
      opacity: 0.04 + Math.random() * 0.06,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    let raf: number;
    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      for (const d of drops) {
        ctx!.globalAlpha = d.opacity;
        ctx!.fillStyle = d.color;
        ctx!.fillRect(d.x, d.y, d.size, d.size * 3);
        d.y += d.speed;
        if (d.y > canvas!.height) {
          d.y = -20;
          d.x = Math.random() * canvas!.width;
        }
      }
      ctx!.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 1 }}
    />
  );
}

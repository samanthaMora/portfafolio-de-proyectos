import { useEffect, useRef } from "react";

const FondoSeaAnemone = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const numParticles = 150;

    for (let i = 0; i < numParticles; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 100 + Math.random() * 300; // más alejados del centro
      particles.push({
        baseX: canvas.width / 2,
        baseY: canvas.height / 2,
        angle,
        radius,
        speed: 0.01 + Math.random() * 0.01,
        size: 1 + Math.random() * 2,
        color: `hsl(${Math.random() * 360}, 100%, 70%)`
      });
    }

    const animate = () => {
      ctx.fillStyle = "rgba(13, 17, 23, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let p of particles) {
        const x = p.baseX + Math.cos(p.angle) * p.radius;
        const y = p.baseY + Math.sin(p.angle) * p.radius;

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        p.angle += p.speed;
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
      }}
    />
  );
};

export default FondoSeaAnemone;

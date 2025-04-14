import { useEffect, useRef, useState } from "react";

const ParticlesBackground = () => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!vantaEffect && window.VANTA?.RINGS && vantaRef.current) {
      const effect = window.VANTA.RINGS({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        backgroundColor: 0x0d1117, // fondo oscuro
        color: 0xc68efd,           // lila fuerte visible
        shininess: 80,
        waveSpeed: 1.0,
        ringCount: 4
      });
      setVantaEffect(effect);
    }

    return () => {
      vantaEffect?.destroy();
    };
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1
      }}
    />
  );
};

export default ParticlesBackground;














import { useEffect } from "react";

const FondoAnemona = () => {
  useEffect(() => {
    const loadParticles = async () => {
      if (window.tsParticles && window.tsParticles.load) {
        await window.tsParticles.load("tsparticles", {
          preset: "seaAnemone",
          background: {
            color: "#0d1117" // asegúrate que haya un fondo oscuro para verlas bien
          },
          fullScreen: {
            enable: true,
            zIndex: -1
          }
        });
      }
    };

    loadParticles();
  }, []);

  return (
    <div
      id="tsparticles"
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
        zIndex: -1
      }}
    />
  );
};

export default FondoAnemona;



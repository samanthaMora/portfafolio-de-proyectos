import { useRef, useLayoutEffect, useState } from "react";
import NavButtonGroup from "../../shared/NavButtons/NavButtonGroup";
import SearchInputGroup from "../../shared/SearchInputGroup";
import { motion } from "framer-motion";

const Home = () => {
  const headerRef = useRef(null);
  const footerRef = useRef(null);
  const [mainMinHeight, setMainMinHeight] = useState("auto");

  useLayoutEffect(() => {
    const headerHeight = headerRef.current?.offsetHeight || 0;
    const footerHeight = footerRef.current?.offsetHeight || 0;
    const totalOffset = headerHeight + footerHeight;

    setMainMinHeight(`calc(100vh - ${totalOffset}px)`);
  }, []);

  return (
    <div className="flex flex-col text-center min-h-screen">
      {/* Header */}
      <header
        ref={headerRef}
        className="bg-white shadow-md py-4"
      >
        <motion.h1
          className="text-4xl font-bold text-indigo-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Portafolio de Proyectos Digitales
        </motion.h1>
      </header>

      {/* Main con altura dinámica */}
      <main
        className="flex flex-col items-center justify-center gap-6 px-4 bg-gradient-to-br from-blue-50 via-white to-blue-100"
        style={{ minHeight: mainMinHeight }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-3xl"
        >
          <SearchInputGroup />
        </motion.div>

        <motion.h2
          className="text-xl font-semibold text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          ¡Bienvenido! Estás conectado.
        </motion.h2>

        <motion.div
          className="mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <NavButtonGroup />
        </motion.div>
      </main>

      {/* Footer */}
      <footer
        ref={footerRef}
        className="bg-white shadow-inner py-2 text-gray-500 text-sm"
      >
        <p>© 2025 Portafolio Digital. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;

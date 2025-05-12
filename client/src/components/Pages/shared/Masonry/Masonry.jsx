// File: src/components/common/Masonry.jsx
import { useState, useEffect, useMemo, useRef } from "react";
import { useTransition, a } from "@react-spring/web";
import "./Masonry.css";

/**
 * Componente Masonry con opciones de eliminar.
 * @param {{ data: Array<{id:string, image:string, width:number, height:number}>, onDelete?: function }} props
 */
export default function Masonry({ data, onDelete }) {
  const [columns, setColumns] = useState(2);

  // Ajustar columnas según ancho
  useEffect(() => {
    const updateColumns = () => {
      if (window.matchMedia("(min-width: 1500px)").matches) setColumns(5);
      else if (window.matchMedia("(min-width: 1000px)").matches) setColumns(4);
      else if (window.matchMedia("(min-width: 600px)").matches) setColumns(3);
      else setColumns(1);
    };
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  // Obtener ancho del container
  const ref = useRef();
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      if (ref.current) setWidth(ref.current.offsetWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calcular posición y tamaño de cada ítem
  const [heights, gridItems] = useMemo(() => {
    const heightsArr = new Array(columns).fill(0);
    const items = data.map((child) => {
      const col = heightsArr.indexOf(Math.min(...heightsArr));
      const w = width / columns;
      const h = (child.height / child.width) * w;
      const x = w * col;
      const y = (heightsArr[col] += h);
      return { ...child, x, y: y - h, width: w, height: h };
    });
    return [heightsArr, items];
  }, [columns, data, width]);

  // Animaciones
  const transitions = useTransition(gridItems, {
    keys: (item) => item.id,
    from: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 0 }),
    enter: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 1 }),
    update: ({ x, y, width, height }) => ({ x, y, width, height }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 100 },
    trail: 25,
  });

  return (
    <div
      ref={ref}
      className="masonry"
      style={{ height: Math.max(...gridItems.map((i) => i.y + i.height)) }}
    >
      {transitions((style, item) => (
        <a.div key={item.id} style={style} className="masonry-item">
          <div
            className="masonry-img"
            style={{
              backgroundImage: `url(${item.image})`,
            }}
          />
          {onDelete && (
            <button
              className="delete-btn"
              onClick={() => onDelete(item.id)}
            >
              ×
            </button>
          )}
        </a.div>
      ))}
    </div>
  );
}

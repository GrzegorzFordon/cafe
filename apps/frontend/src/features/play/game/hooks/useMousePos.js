import { useEffect, useCallback, useState } from "react";

const useMousePos = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = useCallback((e) => {
    setMousePos({ x: Math.round(e.clientX), y: Math.round(e.clientY) });
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", handleMouseMove);
    return () => {
      window.removeEventListener("pointermove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return mousePos;
};

export default useMousePos;

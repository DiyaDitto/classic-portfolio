import { useState, useEffect } from "react";

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const h = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0,
      width: `${progress}%`,
      height: "2px",
      background: "var(--accent)",
      zIndex: 99999,
      transition: "width 0.1s ease",
      boxShadow: "0 0 8px rgba(184,147,90,0.6)",
    }} />
  );
}
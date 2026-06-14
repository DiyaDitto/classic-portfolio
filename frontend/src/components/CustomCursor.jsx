import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const mouse   = useRef({ x: 0, y: 0 });
  const ring    = useRef({ x: 0, y: 0 });
  const rafRef  = useRef(null);

  useEffect(() => {
    const dot    = dotRef.current;
    const ringEl = ringRef.current;

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
    };
    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      ringEl.style.transform = `translate(${ring.current.x - 16}px, ${ring.current.y - 16}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };
    const onEnter = () => {
      dot.style.opacity    = "1";
      ringEl.style.opacity = "1";
    };
    const onLeave = () => {
      dot.style.opacity    = "0";
      ringEl.style.opacity = "0";
    };
    const onHoverIn = () => {
      ringEl.style.width       = "44px";
      ringEl.style.height      = "44px";
      ringEl.style.borderColor = "var(--accent)";
    };
    const onHoverOut = () => {
      ringEl.style.width       = "32px";
      ringEl.style.height      = "32px";
      ringEl.style.borderColor = "rgba(184,147,90,0.5)";
    };

    document.addEventListener("mousemove",  onMove);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);

    const clickables = document.querySelectorAll("a, button, .tag, .stat-box, .project-row");
    clickables.forEach((el) => {
      el.addEventListener("mouseenter", onHoverIn);
      el.addEventListener("mouseleave", onHoverOut);
    });

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      clickables.forEach((el) => {
        el.removeEventListener("mouseenter", onHoverIn);
        el.removeEventListener("mouseleave", onHoverOut);
      });
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
import { useEffect } from "react";

const sections = ["hero", "about", "skills", "projects", "experience", "education", "certifications", "contact"];

export function useKeyNav() {
  useEffect(() => {
    const handleKey = (e) => {
      const num = parseInt(e.key);
      if (num >= 1 && num <= sections.length) {
        const el = document.getElementById(sections[num - 1]);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);
}
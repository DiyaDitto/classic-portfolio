import { useState, useEffect } from "react";
import { useMagnetic } from "../hooks/useMagnetic";
import { useTheme } from "../hooks/useTheme";

const links = [
  "about",
  "skills",
  "projects",
  "experience",
  "education",
  "contact",
];

function MagneticLink({ href, children, active }) {
  const ref = useMagnetic(0.2);

  return (
    <a
      ref={ref}
      href={href}
      style={{
        display: "inline-block",
        color: active ? "var(--accent)" : "var(--text)",
      }}
    >
      {children}
    </a>
  );
}

export default function NavBar({ name }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const { theme, toggle } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      let current = "";

      links.forEach((id) => {
        const el = document.getElementById(id);

        if (
          el &&
          el.getBoundingClientRect().top <= 120
        ) {
          current = id;
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav className={scrolled ? "scrolled" : ""}>
        <span className="nav-logo">
          {name || "Diya Ditto"}
        </span>

        <ul className="nav-links">
          {links.map((l) => (
            <li key={l}>
              <MagneticLink
                href={`#${l}`}
                active={active === l}
              >
                {l}
              </MagneticLink>
            </li>
          ))}
        </ul>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <button
            onClick={toggle}
            title="Toggle theme"
            style={{
              background: "none",
              border:
                "1px solid var(--border)",
              color: "var(--muted)",
              padding: "0.5rem",
              cursor: "pointer",
            }}
          >
            {theme === "light"
              ? "🌙"
              : "☀️"}
          </button>

          <button
            className="hamburger"
            onClick={() =>
              setMenuOpen((o) => !o)
            }
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div
        className="mobile-menu"
        style={{
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen
            ? "auto"
            : "none",
          transform: menuOpen
            ? "translateY(0)"
            : "translateY(-12px)",
        }}
      >
        <ul>
          {links.map((l) => (
            <li key={l}>
              <a
                href={`#${l}`}
                onClick={() =>
                  setMenuOpen(false)
                }
                style={{
                  color:
                    active === l
                      ? "var(--accent)"
                      : "",
                }}
              >
                {l}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {menuOpen && (
        <div
          className="menu-backdrop"
          onClick={() =>
            setMenuOpen(false)
          }
        />
      )}
    </>
  );
}
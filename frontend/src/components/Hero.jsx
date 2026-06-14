import { useState, useEffect, useRef } from "react";
import { useMagnetic } from "../hooks/useMagnetic";
import Spotlight from "./Spotlight";
import Particles from "./Particles";

const TYPING_LINES = [
  "building things",
  "that matter.",
];

function useTypingEffect(lines) {
  const [displayed, setDisplayed] =
    useState([]);

  const [lineIndex, setLineIndex] =
    useState(0);

  const [charIndex, setCharIndex] =
    useState(0);

  const [done, setDone] =
    useState(false);

  useEffect(() => {
    if (done) return;

    if (lineIndex >= lines.length) {
      setDone(true);
      return;
    }

    if (
      charIndex <=
      lines[lineIndex].length
    ) {
      const t = setTimeout(() => {
        setDisplayed((prev) => {
          const next = [...prev];

          next[lineIndex] =
            lines[lineIndex].slice(
              0,
              charIndex
            );

          return next;
        });

        setCharIndex((c) => c + 1);
      }, 55);

      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setLineIndex((l) => l + 1);
      setCharIndex(0);
    }, 180);

    return () => clearTimeout(t);
  }, [
    lines,
    lineIndex,
    charIndex,
    done,
  ]);

  return {
    displayed,
    done,
    lineIndex,
  };
}

export default function Hero({
  hero,
}) {
  if (!hero) return null;

  const {
    name,
    label,
    description,
  } = hero;

  const {
    displayed,
    done,
    lineIndex,
  } =
    useTypingEffect(
      TYPING_LINES
    );

  const magPrimary =
    useMagnetic(0.25);

  const magOutline =
    useMagnetic(0.25);

  const magResume =
    useMagnetic(0.25);

  
  const nameRef =
    useRef(null);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (nameRef.current) {
            const y =
              window.scrollY;

            nameRef.current.style.transform =
              `translateY(${
                y * 0.15
              }px)`;

            nameRef.current.style.opacity =
              Math.max(
                0,
                1 - y * 0.002
              );
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener(
      "scroll",
      onScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        onScroll
      );
  }, []);

  return (
    <section
      id="hero"
      aria-label="Hero Section"
      style={{
        position:
          "relative",
      }}
    >
      <Particles />
      <Spotlight />

    <div
  style={{
    position: "relative",
    zIndex: 10,
    paddingTop: "2rem",
  }}
>
        {/* Learning */}

        <div
          className="fade-0"
          style={{
            display:
              "inline-flex",

            alignItems:
              "center",

            gap:
              "0.5rem",

            fontFamily:
              "var(--mono)",

            fontSize:
              "0.68rem",

            color:
              "var(--accent)",

            border:
              "1px solid rgba(184,147,90,.3)",

            padding:
              "0.35rem 0.85rem",

            marginBottom:
              "1.5rem",

            letterSpacing:
              ".1em",
          }}
        >
          <span
            style={{
              width:
                "6px",

              height:
                "6px",

              borderRadius:
                "50%",

              background:
                "var(--accent)",

              animation:
                "pulse 1.8s infinite",
            }}
          />

          Currently learning —
          Cloud Computing
        </div>

        <div className="hero-rule fade-0" />

        <p className="hero-eyebrow fade-0">
          {label}
        </p>

        <h1
          ref={nameRef}
          className="
          hero-name
          fade-1
          gradient-text
          "
        >
          {name}
        </h1>

        <p className="hero-tagline fade-2">
          {TYPING_LINES.map(
            (
              line,
              i
            ) => (
              <span
                key={i}
                style={{
                  display:
                    "block",
                }}
              >
                {
                  displayed[
                    i
                  ]
                }

                {!done &&
                  i ===
                    lineIndex && (
                    <span className="cursor-blink">
                      |
                    </span>
                  )}
              </span>
            )
          )}
        </p>

        <p className="hero-desc fade-3">
          {
            description
          }
        </p>

        <div className="hero-cta fade-4">
          <a
            ref={
              magPrimary
            }
            href="#projects"
            className="
            btn
            btn-primary
            "
          >
            View
            Projects
          </a>

          <a
            ref={
              magOutline
            }
            href="#contact"
            className="
            btn
            btn-outline
            "
          >
            Get in
            Touch
          </a>

          <a
            ref={
              magResume
            }
            href={`${import.meta.env.BASE_URL}resume.pdf`}
            download
            aria-label="Download Resume"
            className="
            btn
            btn-outline
            "
          >
            Resume
          </a>

          
        </div>

        <div className="scroll-hint fade-4">
          scroll
        </div>

        <div className="hero-deco">
          D
        </div>
      </div>
    </section>
  );
}
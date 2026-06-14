import SectionHeader from "./SectionHeader";
import { useReveal } from "../hooks/useReveal";

function CertCard({ cert, index }) {
  const ref = useReveal(index * 100, "right");

  return (
    <div
      ref={ref}
      style={{
        border: "1px solid var(--border)",
        padding: "1.5rem 1.75rem",
        background: "var(--surface)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "1rem",
        transition: "border-color 0.2s, transform 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--accent)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.transform = "none";
      }}
    >
      <div>
        <div
          style={{
            fontFamily: "var(--serif)",
            fontSize: "0.95rem",
            fontWeight: 600,
            color: "var(--text)",
            marginBottom: "0.3rem",
          }}
        >
          {cert.name}
        </div>

        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: "0.72rem",
            color: "var(--accent)",
            marginBottom: "0.25rem",
          }}
        >
          {cert.issuer}
        </div>

        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: "0.68rem",
            color: "var(--muted)",
          }}
        >
          {cert.date}
        </div>
      </div>

      <a
        href={`${window.location.origin}${cert.link}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        style={{
          fontFamily: "var(--mono)",
          fontSize: "0.7rem",
          color: "var(--muted)",
          textDecoration: "none",
          border: "1px solid var(--border)",
          padding: "0.35rem 0.75rem",
          whiteSpace: "nowrap",
          display: "flex",
          alignItems: "center",
          gap: "0.35rem",
          transition: "all 0.2s",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--accent)";
          e.currentTarget.style.color = "var(--accent)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.color = "var(--muted)";
        }}
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15,3 21,3 21,9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>

        View
      </a>
    </div>
  );
}

export default function Certifications({ certifications }) {
  if (!certifications?.length) return null;

  return (
    <section
      id="certifications"
      style={{
        borderTop: "1px solid var(--border)",
      }}
    >
      <SectionHeader num="06" title="Certifications" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1rem",
        }}
      >
        {certifications.map((c, i) => (
          <CertCard
            key={i}
            cert={c}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}
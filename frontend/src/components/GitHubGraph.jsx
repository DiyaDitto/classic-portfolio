import SectionHeader  from "./SectionHeader";
import { useReveal }  from "../hooks/useReveal";
import { useTheme }   from "../hooks/useTheme";

export default function GitHubGraph({ username }) {
  const ref = useReveal(0, "up");
  const { theme } = useTheme();
  if (!username) return null;

  const isDark  = theme === "dark";
  const surface = isDark ? "15171a" : "ede8de";
  const text    = isDark ? "e8eaf0" : "1a1410";
  const accent  = "b8935a";

  return (
    <section
      id="github"
      style={{
        borderTop: "1px solid var(--border)",
        padding: "6rem 4rem",
      }}
    >
      <SectionHeader num="07" title="GitHub" />

      <div
        ref={ref}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          maxWidth: "720px",
        }}
      >

        {/* Contribution graph */}
        <div style={{
          border: "1px solid var(--border)",
          padding: "1.5rem",
          background: "var(--surface)",
        }}>
          <div style={{
            fontFamily: "var(--mono)",
            fontSize: "0.65rem",
            color: "var(--muted)",
            letterSpacing: "0.12em",
            marginBottom: "1rem",
            textTransform: "uppercase",
          }}>
            Contributions — {username}
          </div>
          <img
            src={`https://ghchart.rshah.org/${accent}/${username}`}
            alt="GitHub contribution graph"
            style={{
              width: "100%",
              display: "block",
              filter: isDark ? "brightness(0.85)" : "sepia(15%)",
            }}
          />
        </div>

        {/* Stats row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.25rem",
        }}>
          <div style={{
            border: "1px solid var(--border)",
            overflow: "hidden",
            background: "var(--surface)",
          }}>
            <img
              src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&hide_title=true&hide_border=true&bg_color=${surface}&icon_color=${accent}&text_color=${text}&ring_color=${accent}&hide=contribs`}
              alt="GitHub stats"
              style={{ width: "100%", display: "block" }}
            />
          </div>
          <div style={{
            border: "1px solid var(--border)",
            overflow: "hidden",
            background: "var(--surface)",
          }}>
            <img
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&hide_border=true&bg_color=${surface}&title_color=${accent}&text_color=${text}&langs_count=5`}
              alt="Top languages"
              style={{ width: "100%", display: "block" }}
            />
          </div>
        </div>

        {/* Link */}
        <div>
          
           <a href={`https://github.com/${username}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.72rem",
              padding: "0.65rem 1.25rem",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
            View GitHub Profile
          </a>
        </div>
      </div>
    </section>
  );
}
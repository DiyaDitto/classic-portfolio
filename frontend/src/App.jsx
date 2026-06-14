import { useState } from "react";
import { usePortfolio }   from "./hooks/usePortfolio";
import { useLenis }       from "./hooks/useLenis";
import PageLoader         from "./components/PageLoader";
import ProgressBar        from "./components/ProgressBar";
import CustomCursor       from "./components/CustomCursor";
import BackToTop          from "./components/BackToTop";
import NavBar             from "./components/NavBar";
import Hero               from "./components/Hero";
import About              from "./components/About";
import Skills             from "./components/Skills";
import Projects           from "./components/Projects";
import Experience         from "./components/Experience";
import Education          from "./components/Education";
import Certifications     from "./components/Certifications";
import GitHubGraph        from "./components/GitHubGraph";
import Contact            from "./components/Contact";
import Footer             from "./components/Footer";
import { useKeyNav } from "./hooks/useKeyNav";

function LoadingScreen() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: "1.5rem",
      background: "var(--bg)",
    }}>
      <div className="spinner" />
      <p style={{
        fontFamily: "var(--mono)",
        fontSize: "0.75rem",
        color: "var(--muted)",
        letterSpacing: "0.1em",
      }}>
        loading portfolio…
      </p>
    </div>
  );
}

function ErrorScreen() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: "1rem", padding: "2rem", textAlign: "center",
      background: "var(--bg)",
    }}>
      <p style={{
        fontFamily: "var(--serif)",
        fontSize: "1.1rem",
        color: "var(--text)",
        fontStyle: "italic",
      }}>
        Could not connect to the backend.
      </p>
      <p style={{
        fontFamily: "var(--mono)",
        fontSize: "0.72rem",
        color: "var(--muted)",
      }}>
        Make sure the Express server is running on port 5001.
      </p>
      <code style={{
        fontFamily: "var(--mono)", fontSize: "0.72rem",
        background: "var(--surface)", padding: "0.5rem 1rem",
        border: "1px solid var(--border)", color: "var(--accent)",
      }}>
        cd backend && npm run dev
      </code>
    </div>
  );
}

export default function App() {
  const { data, loading, error } = usePortfolio();
  const [loaderDone, setLoaderDone] = useState(false);
  useLenis();
  useKeyNav();

  if (loading) return <LoadingScreen />;
  if (error)   return <ErrorScreen />;
  
  return (
    <>
      {!loaderDone && <PageLoader onDone={() => setLoaderDone(true)} />}
      
<div style={{
  position: "fixed",
  bottom: 0, left: 0, right: 0,
  background: "var(--accent)",
  color: "var(--bg)",
  fontFamily: "var(--mono)",
  fontSize: "0.72rem",
  letterSpacing: "0.15em",
  textAlign: "center",
  padding: "0.6rem",
  zIndex: 998,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.75rem",
}}>
  <span style={{
    width: "6px", height: "6px",
    borderRadius: "50%",
    background: "var(--bg)",
    animation: "blink 1.5s ease-in-out infinite",
    flexShrink: 0,
  }} />
  Open to work — Available for full-time roles & internships
  <span style={{
    width: "6px", height: "6px",
    borderRadius: "50%",
    background: "var(--bg)",
    animation: "blink 1.5s ease-in-out infinite",
    flexShrink: 0,
  }} />
      </div>
      
      <ProgressBar />
      <CustomCursor />
      <NavBar          name={data.hero.name} />
      <Hero            hero={data.hero} />
      <About           about={data.about} />
      <Skills          skills={data.skills} />
      <Projects        projects={data.projects} />
      <Experience      experience={data.experience} />
      <Education       education={data.education} />
      <Certifications  certifications={data.certifications} />
      <GitHubGraph     username="DiyaDitto" />
      <Contact         contact={data.contact} />
      <Footer          name={data.hero.name} />
      <BackToTop />
    </>
  );
}
import { useEffect, useRef } from "react";
import SectionHeader from "./SectionHeader";
import { useReveal } from "../hooks/useReveal";

function AnimatedTag({
  tag,
  index,
}) {
  const ref =
    useRef(null);

  useEffect(() => {
    const el =
      ref.current;

    if (!el)
      return;

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (
            entry.isIntersecting
          ) {
            el.style.opacity =
              "1";

            el.style.transform =
              "translateY(0)";
          }
        },
        {
          threshold:
            0.15,
        }
      );

    el.style.opacity =
      "0";

    el.style.transform =
      "translateY(12px)";

    el.style.transition = `
      opacity .45s ease ${
        index *
        70
      }ms,
      transform .45s ease ${
        index *
        70
      }ms
    `;

    observer.observe(
      el
    );

    return () =>
      observer.disconnect();
  }, [index]);

  return (
    <span
      ref={ref}
      className="tag"
    >
      {tag}
    </span>
  );
}

export default function Skills({
  skills,
}) {
  const ref =
    useReveal(
      0,
      "up"
    );

  if (
    !skills
  )
    return null;

  return (
    <section id="skills">
      <SectionHeader
        num="02"
        title="Skills"
      />

      <div
        ref={ref}
        className="skills-grid"
      >
        {skills.map(
          (
            group,
            i
          ) => (
            <div
              key={i}
              className="skill-group"
            >
              <div className="skill-group-label">
                {
                  group.label
                }
              </div>

              <div className="skill-tags">
                {group.tags.map(
                  (
                    tag,
                    j
                  ) => (
                    <AnimatedTag
                      key={
                        tag
                      }
                      tag={
                        tag
                      }
                      index={
                        j
                      }
                    />
                  )
                )}
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}
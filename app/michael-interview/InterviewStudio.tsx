"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./interview.module.css";

const STORAGE_KEY = "growthgains:michael-interview:v1";

const prompts = [
  {
    id: "why-this-work",
    kicker: "Your story",
    prompt: "What changed in your own life that made transition work matter to you?",
    helper: "Do not write a résumé. Tell the part of the story that explains why this work feels personal to you.",
  },
  {
    id: "first-need",
    kicker: "Your point of view",
    prompt: "When someone is in the in-between, what do you think they need first?",
    helper: "Think about the first useful shift before goals, plans or action steps.",
  },
  {
    id: "misunderstood",
    kicker: "What you notice",
    prompt: "What do people often mistake for a lack of direction?",
    helper: "What looks like being stuck from the outside but means something different to you as a coach?",
  },
  {
    id: "identity",
    kicker: "Your definition",
    prompt: "What does identity mean to you outside of job titles, relationships and roles?",
    helper: "Use your own language. This answer can become one of the strongest pieces of copy on the site.",
  },
  {
    id: "question",
    kicker: "Inside a session",
    prompt: "What is a question you ask that tends to slow people down in a useful way?",
    helper: "Give the actual question, then explain what it helps someone notice.",
  },
  {
    id: "expect",
    kicker: "The experience",
    prompt: "What should someone expect from a conversation with you?",
    helper: "Describe the feel of the room and how you work without promising an outcome.",
  },
  {
    id: "never-do",
    kicker: "Your boundaries",
    prompt: "What will you never do as a coach?",
    helper: "This is a trust question. Think about advice-giving, judgment, pressure, clinical treatment or deciding for someone.",
  },
  {
    id: "fit",
    kicker: "Who this is for",
    prompt: "Who tends to be a strong fit for GrowthGains?",
    helper: "Describe the person and the season they are in, not a demographic profile.",
  },
  {
    id: "name",
    kicker: "The brand",
    prompt: "Why did you choose the name GrowthGains?",
    helper: "What does the name mean to you beyond sounding positive or motivational?",
  },
  {
    id: "hope",
    kicker: "The larger purpose",
    prompt: "What do you hope someone becomes more able to do after spending time with GrowthGains?",
    helper: "Keep this modest and human. Describe a capacity or shift in perspective, not a guaranteed result.",
  },
] as const;

type PromptId = (typeof prompts)[number]["id"];
type Answers = Record<PromptId, string>;

const emptyAnswers = Object.fromEntries(prompts.map((item) => [item.id, ""])) as Answers;

function formatAnswers(answers: Answers) {
  return prompts
    .map((item, index) => {
      const answer = answers[item.id].trim() || "[No answer yet]";
      return `0${index + 1} — ${item.prompt}\n\n${answer}`;
    })
    .join("\n\n---\n\n");
}

export default function InterviewStudio() {
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [activeId, setActiveId] = useState<PromptId>(prompts[0].id);
  const [hydrated, setHydrated] = useState(false);
  const [status, setStatus] = useState("Drafts save automatically in this browser.");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<Answers>;
        setAnswers({ ...emptyAnswers, ...parsed });
      }
    } catch {
      setStatus("Browser draft storage is unavailable. Copy or download your answers before leaving.");
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
      setStatus("Saved in this browser.");
    } catch {
      setStatus("Could not save locally. Copy or download your answers before leaving.");
    }
  }, [answers, hydrated]);

  const completed = useMemo(
    () => prompts.filter((item) => answers[item.id].trim().length > 0).length,
    [answers],
  );
  const activeIndex = prompts.findIndex((item) => item.id === activeId);
  const activePrompt = prompts[activeIndex];
  const progress = Math.round((completed / prompts.length) * 100);

  async function copyAll() {
    try {
      await navigator.clipboard.writeText(formatAnswers(answers));
      setStatus("All answers copied to your clipboard.");
    } catch {
      setStatus("Clipboard access was blocked. Use Download instead.");
    }
  }

  function downloadAll() {
    const blob = new Blob([formatAnswers(answers)], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "michael-growthgains-interview.txt";
    anchor.click();
    URL.revokeObjectURL(url);
    setStatus("Downloaded a copy of your answers.");
  }

  function resetAll() {
    if (!window.confirm("Clear every interview answer saved in this browser?")) return;
    setAnswers(emptyAnswers);
    setActiveId(prompts[0].id);
    window.localStorage.removeItem(STORAGE_KEY);
    setStatus("Draft cleared.");
  }

  return (
    <main className={styles.studio}>
      <div className="container">
        <header className={styles.top}>
          <div>
            <span className={styles.kicker}>GrowthGains · Michael&apos;s writing room</span>
            <h1>Give the site your actual voice.</h1>
          </div>
          <div>
            <p className={styles.topCopy}>
              Answer these like someone is sitting across from you, not like you are writing website copy.
              Short, specific and imperfect is better than polished and generic. We can shape the language later.
            </p>
            <p className={styles.notice}>
              This route is unlisted and set to no-index, but it is not password protected. Answers save only in
              this browser until you copy or download them.
            </p>
          </div>
        </header>

        <div className={styles.toolbar}>
          <div className={styles.progressWrap} aria-label={`${completed} of ${prompts.length} answered`}>
            <div className={styles.progressTrack} aria-hidden="true">
              <span className={styles.progressFill} style={{ width: `${progress}%` }} />
            </div>
            <span className={styles.progressText}>{completed}/{prompts.length} answered</span>
          </div>

          <div className={styles.actions}>
            <button className={styles.action} type="button" onClick={copyAll}>Copy all answers</button>
            <button className={styles.actionQuiet} type="button" onClick={downloadAll}>Download</button>
            <button className={styles.actionQuiet} type="button" onClick={resetAll}>Clear</button>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.questions}>
            {prompts.map((item, index) => (
              <section className={styles.question} key={item.id}>
                <span className={styles.number}>0{index + 1}</span>
                <div>
                  <span className={styles.questionKicker}>{item.kicker}</span>
                  <h2>{item.prompt}</h2>
                  <p className={styles.helper}>{item.helper}</p>
                  <textarea
                    className={styles.textarea}
                    value={answers[item.id]}
                    onFocus={() => setActiveId(item.id)}
                    onChange={(event) =>
                      setAnswers((current) => ({ ...current, [item.id]: event.target.value }))
                    }
                    placeholder="Write the way you would say it out loud…"
                    aria-label={item.prompt}
                  />
                </div>
              </section>
            ))}
          </div>

          <aside className={styles.previewColumn} aria-label="Live editorial preview">
            <div className={styles.preview}>
              <div className={styles.previewTop}>
                <span>Live site preview</span>
                <span className={styles.previewPulse} aria-hidden="true" />
              </div>
              <div className={styles.previewBody}>
                <span className={styles.previewNumber}>0{activeIndex + 1}</span>
                <h3>{activePrompt.prompt}</h3>
                <p className={`${styles.previewAnswer} ${answers[activeId].trim() ? "" : styles.previewEmpty}`}>
                  {answers[activeId].trim() || "Your answer will sit here in the editorial treatment used on the public About page."}
                </p>
              </div>
              <div className={styles.status} aria-live="polite">{status}</div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

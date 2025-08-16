import React, { useMemo, useState } from "react";

/**
 * CHAPEL ROOM — Relic Riddle (no installs)
 * Mechanic: Inspect 8 relics and decide which are PLAUSIBLE for a 13th–14th c. Western European chapel.
 * Win condition: Get 5 or more correct to unlock the Chapel Clue.
 * Drop this into App.js (or import as ChapelRoom) and render <ChapelRoom/>.
 */

// Fisher–Yates utility used for shuffling relic order
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ChapelRoom() {
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <Header />
        <AnachronismPanel />
        <RelicRiddle />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div style={{ color: "white" }}>
      <h1
        style={{
          margin: 0,
          fontSize: 34,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span style={styles.badge}>⛪</span> Chapel
      </h1>
      <p style={{ margin: "6px 0 0 0", opacity: 0.9 }}>
        <strong>Instructions:</strong> Inspect each item and decide if it is{" "}
        <strong>plausible</strong> for a 13th–14th century chapel in Western
        Europe. Click <strong>Info</strong> to read background notes. Select{" "}
        <strong>Yes</strong> for plausible or <strong>No</strong> for
        dubious/anachronistic. Press
        <strong> Submit</strong> when done. Get <strong>5 or more</strong>{" "}
        correct to unlock the Chapel Clue.
      </p>
    </div>
  );
}

function AnachronismPanel() {
  return (
    <div style={{ ...styles.card, marginTop: 12 }}>
      <div style={{ fontWeight: 800, color: "#0f172a" }}>
        Key terms for this room
      </div>
      <div style={{ marginTop: 6, color: "#0f172a" }}>
        <p>
          <strong>Plausible</strong> means possible or believable.
        </p>
        <p>
          A <strong>reliquary</strong> was a container in medieval churches used
          to keep <strong>relics</strong> which were parts of saints' clothing
          or bones, that people thought were holy.
        </p>
        <p>
          <strong>Anachronistic</strong> means something placed in the{" "}
          <em>wrong time period</em>. In this room, you’re checking whether an
          item could realistically exist in a <strong>13th–14th century</strong>{" "}
          Western European chapel.
        </p>
        <div style={{ marginTop: 8 }}>
          <strong>Tips:</strong>
          <ul>
            <li>
              Watch for technologies that didn’t exist yet (e.g.,{" "}
              <em>printing press</em> sheets in the 1300s).
            </li>
            <li>
              Be careful with distant events/cults that only arise later (e.g.,{" "}
              <em>Guadalupe 1531</em>).
            </li>
            <li>
              Some items are plausible but details can be off (materials,
              techniques, style).
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const RELICS = [
  // Plausible items
  {
    id: "thorn",
    name: "Thorn of the Crown",
    emoji: "🌿",
    claim:
      "A thorn said to be from Christ's Crown, kept in a silver filigree reliquary.",
    plausible: true,
    notes: [
      "Thorns from the Crown were venerated in medieval Europe (e.g., Sainte-Chapelle, Paris).",
      "Reliquaries were often ornate silver/gold with rock crystal panels.",
    ],
  },
  {
    id: "saint-bone",
    name: "Phalanx of a Local Saint",
    emoji: "🦴",
    claim:
      "A finger-bone of St. Aethelric, our diocese's martyr, paraded on feast days.",
    plausible: true,
    notes: [
      "Bone relics were common and used in processions.",
      "Local cults of saints drew pilgrims and donations.",
    ],
  },
  {
    id: "true-cross",
    name: "Splinter of the True Cross",
    emoji: "✝️",
    claim: "A wooden splinter said to be from the True Cross, sealed in wax.",
    plausible: true,
    notes: [
      "Fragments of the True Cross circulated widely in medieval Christendom.",
      "Authenticity debated, but veneration is historically plausible.",
    ],
  },
  {
    id: "gospel-book",
    name: "Gospel Book with Jewelled Cover",
    emoji: "📖",
    claim:
      "A Latin Gospel book with gilt bosses and glass cabochons kept on the altar.",
    plausible: true,
    notes: [
      "Jewelled/ornamented bindings are well-attested; glass often used to mimic gems.",
      "Liturgical books in Latin were central to worship.",
    ],
  },
  // Anachronisms (false for 13th–14th c.)
  {
    id: "guadalupe",
    name: "Tilma of Guadalupe Fragment",
    emoji: "🧵",
    claim:
      "A scrap from the tilma of Our Lady of Guadalupe, brought by traders.",
    plausible: false,
    notes: [
      "The Guadalupe apparition is dated 1531 in New Spain (post-medieval relative to 13th–14th c.).",
      "So a chapel in 1300s Europe could not hold such a relic.",
    ],
  },
  {
    id: "printed-indulgence",
    name: "Printed Indulgence Sheet",
    emoji: "📰",
    claim:
      "A printed indulgence authorised by the bishop and sold to pilgrims.",
    plausible: false,
    notes: [
      "An indulgence was something the Church sold or gave that people thought would shorten the time their soul spent being punished after death.",
      "In 13th–14th c., indulgences were written, not printed sheets.",
    ],
  },
  {
    id: "perspective-panel",
    name: "Perspective Oil Painting of the Nativity",
    emoji: "🖼️",
    claim:
      "A panel painting using linear perspective and oil glazes hung above the altar.",
    plausible: false,
    notes: [
      "Perspective means showing 3-D objects and spatial relationships on a two-dimensional surface. This is a 15th-century concept.",
      "13th–14th c. chapels used tempera on panel with medieval stylistic conventions.",
    ],
  },
  {
    id: "pocketwatch-reliquary",
    name: "Clockwork Pocketwatch Reliquary",
    emoji: "⌚",
    claim:
      "A tiny clockwork device set into a reliquary pendant for timing the Offices.",
    plausible: false,
    notes: [
      "Portable spring-driven watches appear 16th century; earlier large clocks were weight-driven and public.",
      "A 1300s chapel would not contain a pocketwatch mechanism.",
    ],
  },
];

function RelicRiddle() {
  const [choices, setChoices] = useState({}); // id -> true/false
  const [submitted, setSubmitted] = useState(false);
  const [show, setShow] = useState(null); // id for modal
  const [order] = useState(() => shuffle(RELICS)); // shuffle on first load

  const allAnswered = RELICS.every((r) => choices[r.id] !== undefined);
  const score = useMemo(
    () => RELICS.filter((r) => choices[r.id] === r.plausible).length,
    [choices]
  );

  const toggle = (id, val) => setChoices((prev) => ({ ...prev, [id]: val }));

  const reset = () => {
    setChoices({});
    setSubmitted(false);
    setShow(null);
  };

  return (
    <div style={{ marginTop: 16 }}>
      {/* Grid of relics */}
      <div style={styles.grid}>
        {order.map((r) => {
          const ans = choices[r.id];
          const correct = submitted && ans === r.plausible;
          const wrong = submitted && ans !== undefined && ans !== r.plausible;
          return (
            <div key={r.id} style={styles.cardWhite}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ fontSize: 22 }}>{r.emoji}</div>
                  <div style={{ fontWeight: 800 }}>{r.name}</div>
                </div>
                <button style={styles.infoBtn} onClick={() => setShow(r.id)}>
                  Info
                </button>
              </div>
              <p
                style={{ margin: "6px 0 0 0", color: "#334155", fontSize: 13 }}
              >
                {r.claim}
              </p>

              <div style={styles.options2}>
                <button
                  onClick={() => toggle(r.id, true)}
                  style={{
                    ...styles.choice,
                    background: ans === true ? "black" : "#f8fafc",
                    color: ans === true ? "white" : "#0f172a",
                  }}
                >
                  Yes, plausible
                </button>
                <button
                  onClick={() => toggle(r.id, false)}
                  style={{
                    ...styles.choice,
                    background: ans === false ? "black" : "#f8fafc",
                    color: ans === false ? "white" : "#0f172a",
                  }}
                >
                  No, dubious
                </button>
              </div>

              {submitted && (
                <div
                  style={{
                    marginTop: 8,
                    fontWeight: 700,
                    color: correct ? "#047857" : wrong ? "#b91c1c" : "#334155",
                  }}
                >
                  {correct
                    ? "✓ Correct"
                    : wrong
                    ? `✗ ${r.plausible ? "Plausible" : "Anachronistic"}`
                    : ""}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
        <Button onClick={() => setSubmitted(true)} disabled={!allAnswered}>
          Submit
        </Button>
        <Button kind="ghost" onClick={reset}>
          Reset
        </Button>
      </div>

      {/* Results */}
      {submitted && (
        <div style={{ ...styles.card, marginTop: 12 }}>
          <div style={{ fontWeight: 800, color: "#0f172a" }}>Results</div>
          <div style={{ marginTop: 6, color: "#0f172a" }}>
            You scored <strong>{score}</strong> / {RELICS.length}.{" "}
            {score >= 5 ? "Well reasoned." : "Review the notes and try again."}
          </div>
          {score >= 5 && (
            <div style={styles.clue}>
              🔎 <strong>Chapel Clue</strong>: Three saints watch through
              windows high, Yet under the altar, rats slip by. A rope descends
              to air that chills, Follow it down where darkness stills.
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {show && (
        <div style={styles.modalBack} onClick={() => setShow(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ fontWeight: 800, color: "#0f172a" }}>
                {RELICS.find((x) => x.id === show)?.name}
              </div>
              <button style={styles.closeBtn} onClick={() => setShow(null)}>
                ✕
              </button>
            </div>
            <div style={{ marginTop: 8, color: "#0f172a" }}>
              {RELICS.find((x) => x.id === show)?.notes.map((t, i) => (
                <div key={i} style={{ marginTop: 6 }}>
                  • {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* tiny shared bits */
function Button({ children, onClick, disabled, kind = "primary" }) {
  const base = {
    border: "1px solid transparent",
    borderRadius: 12,
    padding: "10px 14px",
    cursor: disabled ? "not-allowed" : "pointer",
    fontWeight: 700,
  };
  const theme =
    kind === "primary"
      ? { background: disabled ? "rgba(0,0,0,0.3)" : "black", color: "white" }
      : { background: "white", color: "#0f172a", border: "1px solid #e5e7eb" };
  return (
    <button onClick={onClick} disabled={disabled} style={{ ...base, ...theme }}>
      {children}
    </button>
  );
}

/* styles */
const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(1200px 600px at 10% 0%, rgba(255,255,255,0.08), transparent), #0f172a",
    color: "white",
    paddingBottom: 40,
  },
  container: { maxWidth: 1100, margin: "0 auto", padding: 24 },
  badge: {
    width: 34,
    height: 34,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#94a3b8",
    color: "black",
    borderRadius: 8,
    fontWeight: 900,
  },
  grid: {
    display: "grid",
    gap: 16,
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    marginTop: 16,
  },
  card: {
    background: "rgba(255,255,255,0.95)",
    color: "#0f172a",
    borderRadius: 16,
    padding: 16,
    boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
  },
  cardWhite: {
    background: "white",
    color: "#0f172a",
    border: "1px solid #e2e8f0",
    borderRadius: 16,
    padding: 12,
  },
  options2: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 8,
    marginTop: 8,
  },
  choice: {
    padding: "8px 10px",
    border: "1px solid #cbd5e1",
    borderRadius: 12,
    cursor: "pointer",
    fontSize: 13,
  },
  clue: {
    marginTop: 12,
    border: "1px solid #93c5fd",
    background: "linear-gradient(135deg, #eff6ff, #e0f2fe)",
    padding: 12,
    borderRadius: 12,
    color: "#0f172a",
  },
  infoBtn: {
    background: "white",
    border: "1px solid #e5e7eb",
    borderRadius: 10,
    padding: "6px 10px",
    cursor: "pointer",
    color: "#0f172a",
    fontWeight: 700,
  },
  modalBack: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.55)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  modal: {
    background: "white",
    color: "#0f172a",
    borderRadius: 16,
    padding: 16,
    width: "min(520px, 100%)",
    boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
  },
  closeBtn: {
    appearance: "none",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: 16,
    color: "#334155",
  },
};

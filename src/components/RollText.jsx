/**
 * Saint-Urbain-style hover: every letter rolls up one after another and the
 * same letter rolls in from below. The label is split into <span class="char">,
 * each with its index in a CSS variable; the CSS in styles.css does the motion.
 */
export default function RollText({ children }) {
  const label = String(children);
  const chars = Array.from(label);
  return (
    <span className="roll" aria-label={label}>
      <span className="roll__word" aria-hidden="true">
        {chars.map((c, i) => (
          <span key={i} className="roll__char" data-char={c === ' ' ? ' ' : c} style={{ '--ci': i, '--ct': chars.length }}>
            {c === ' ' ? ' ' : c}
          </span>
        ))}
      </span>
    </span>
  );
}

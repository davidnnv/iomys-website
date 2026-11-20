// Renders a string where *words in asterisks* become italic serif accents.
export default function Rich({ text, accentClass = 'serif accent' }) {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  return parts.map((part, i) =>
    part.startsWith('*') && part.endsWith('*') ? (
      <em key={i} className={accentClass}>
        {part.slice(1, -1)}
      </em>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

// Splits rich text into words, keeping the accent flag, for word-by-word animations.
export function richWords(text) {
  const words = [];
  let accent = false;
  text.split(/\s+/).forEach((raw) => {
    if (!raw) return;
    const stars = (raw.match(/\*/g) || []).length;
    const starts = raw.startsWith('*');
    const isAccent = accent || starts;
    // An accent run closes on a word with a closing star
    // ("*word*" has two stars; "*two words*" closes on the word with one star).
    const closes = starts ? stars === 2 : stars === 1;
    words.push({ word: raw.replace(/\*/g, ''), accent: isAccent });
    accent = isAccent && !closes;
  });
  return words;
}

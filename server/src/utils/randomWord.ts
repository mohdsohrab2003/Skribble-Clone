import words from "../words/words.json" with { type: "json" };

export function randomWords(count: number): string[] {
  const shuffled = [...words].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, count);
}

export function applyHighlights(text, ranges = []) {
  if (!text || !Array.isArray(ranges) || ranges.length === 0) {
    return [{ text }];
  }

  let result = [];
  let lastIndex = 0;

  ranges.forEach(({ start, end, color }) => {
    if (start > lastIndex) {
      result.push({ text: text.slice(lastIndex, start) });
    }
    result.push({
      text: text.slice(start, end),
      highlight: color,
    });
    lastIndex = end;
  });

  if (lastIndex < text.length) {
    result.push({ text: text.slice(lastIndex) });
  }

  return result;
}

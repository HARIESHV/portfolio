/** Tiny class-name joiner. Falsy values are dropped. */
export function cn(...parts) {
  return parts.flat(Infinity).filter(Boolean).join(' ');
}

export default cn;

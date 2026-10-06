import { useEffect, useState } from 'react';

/**
 * Tracks which section is currently in view so the navbar can show an
 * active-section indicator.
 *
 * Built on IntersectionObserver against a narrow band in the upper third of
 * the viewport (matching where a reader's attention sits while scrolling),
 * with an explicit bottom-of-page override so the final section can always
 * become active.
 */
export function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? null);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return undefined;

    const visible = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }

        // The first visible section in document order wins.
        const next = sections.find((section) => visible.has(section.id))?.id;
        if (next) setActiveId(next);
      },
      {
        rootMargin: '-15% 0px -65% 0px',
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));

    const handleScrollToEnd = () => {
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;

      if (atBottom) {
        setActiveId(sections[sections.length - 1].id);
      } else if (window.scrollY < 80) {
        setActiveId(sections[0].id);
      }
    };

    // The scroll listener only exists to disambiguate the two document edges,
    // where IntersectionObserver geometry is inconclusive. It is passive and
    // does no layout reads beyond a single cached document height.
    window.addEventListener('scroll', handleScrollToEnd, { passive: true });
    handleScrollToEnd();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScrollToEnd);
    };
  }, [sectionIds]);

  return activeId;
}

export default useActiveSection;

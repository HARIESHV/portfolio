import { useEffect } from 'react';

/**
 * Scroll restoration.
 *
 * A single-page site with in-page anchors has one real problem: arriving on a
 * deep link leaves the reader stranded part way down the document. This
 * component returns the viewport to the top on a fresh load, and steps aside
 * when the URL already carries a hash, since an explicit anchor is the
 * reader's own intent.
 *
 * Mounted once, near the root of the tree. No router dependency.
 */
export function ScrollToTop() {
  useEffect(() => {
    if (window.location.hash) return;

    // `history.scrollRestoration` is left on manual so a reload returns to the
    // top instead of resurrecting a half-read position.
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return null;
}

export default ScrollToTop;

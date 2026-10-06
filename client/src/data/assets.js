/**
 * Centralised asset manifest.
 *
 * `src/data/generated/assets.json` is written by `scripts/check-assets.mjs`,
 * which runs automatically on `dev` and `build` (via the pre-scripts). It
 * stats the real files in `public/` so the UI can disable anything that is
 * genuinely missing instead of linking to a dead path.
 *
 * Nothing here is fabricated: a file is either on disk or `available: false`.
 */

import generated from './generated/assets.json';

/**
 * `generated.profileImage` is the path the probe actually found, so the
 * rendered `src` always matches the file on disk. Hardcoding the extension
 * here would 404 as soon as the portrait were dropped as a .png or .webp.
 */
const profileAvailable = Boolean(generated.profileImage);

export const profileImage = {
  src: profileAvailable ? `/${generated.profileImage}` : null,
  alt: 'Professional portrait of Hariesh V',
  available: profileAvailable,
};

const resumeAvailable = Boolean(generated.resume);

export const resume = {
  fileName: generated.resume ?? 'Hariesh-V-Resume.pdf',
  src: resumeAvailable ? `/${generated.resume}` : null,
  label: 'Download Resume',
  available: resumeAvailable,
};

export { generated as assetManifest };

#!/usr/bin/env node
/**
 * Asset availability probe.
 *
 * Runs on `predev` and `prebuild`. Stats the real files in `public/` and writes
 * `src/data/generated/assets.json` so the UI can distinguish "present" from
 * "missing" without ever rendering a link to a file that is not there.
 *
 * No value is guessed: a file is available only if it exists on disk.
 */

import { existsSync, mkdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const clientRoot = resolve(here, '..');
const publicDir = join(clientRoot, 'public');
const outputPath = join(clientRoot, 'src', 'data', 'generated', 'assets.json');

/** Accepts .jpg/.jpeg/.png/.webp so the portrait can be swapped freely. */
const PROFILE_CANDIDATES = [
  'images/hariesh-profile.jpg',
  'images/hariesh-profile.jpeg',
  'images/hariesh-profile.png',
  'images/hariesh-profile.webp',
];

const RESUME_CANDIDATES = ['Hariesh-V-Resume.pdf'];

function resolveAvailable(candidates) {
  for (const relativePath of candidates) {
    const absolutePath = join(publicDir, relativePath);
    if (existsSync(absolutePath) && statSync(absolutePath).isFile()) {
      return relativePath;
    }
  }
  return null;
}

const profileImage = resolveAvailable(PROFILE_CANDIDATES);
const resume = resolveAvailable(RESUME_CANDIDATES);

const CERTIFICATES = [
  'certificates/Novitech-web.pdf',
  'certificates/Rinex-Gen AI.pdf',
  'certificates/Rinex-web.pdf',
];

const certificatesFound = CERTIFICATES.filter((c) => {
  const p = join(publicDir, c);
  return existsSync(p) && statSync(p).isFile();
});

const manifest = {
  profileImage,
  resume,
  certificates: certificatesFound,
  generatedAt: new Date().toISOString(),
};

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

const lines = [
  'Asset check',
  `  profile image : ${profileImage ? `found (${profileImage})` : 'MISSING'}`,
  `  resume        : ${resume ? `found (${resume})` : 'MISSING'}`,
  `  certificates  : ${certificatesFound.length}/${CERTIFICATES.length} found`,
];

console.log(lines.join('\n'));

if (!profileImage) {
  console.log(
    '\n  Note: no portrait found. Portrait slots fall back to a neutral monogram.\n' +
      '  Add your photo at client/public/images/hariesh-profile.jpg\n',
  );
}

if (!resume) {
  console.log(
    '\n  Note: no resume found. The download control renders as unavailable.\n' +
      '  Add your PDF at client/public/Hariesh-V-Resume.pdf\n',
  );
}

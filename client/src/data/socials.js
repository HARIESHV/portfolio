/**
 * Social profiles.
 *
 * Fill them in here and every GitHub / LinkedIn link across the site
 * (navbar, hero, about, contact, footer) updates at once.
 *
 * The `SocialLink` component renders a disabled, clearly-labelled control when
 * the URL is blank, so nothing ever points at a fabricated profile.
 */

const rawSocials = [
  {
    id: 'github',
    label: 'GitHub',
    handle: 'HARIESHV',
    url: 'https://github.com/HARIESHV',
    icon: 'Github',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'hariesh-v-145270433',
    url: 'https://www.linkedin.com/in/hariesh-v-145270433',
    icon: 'Linkedin',
  },
];

export const socials = rawSocials.map((social) => ({
  ...social,
  available: Boolean(social.url),
  href: social.url || undefined,
}));

export const socialById = Object.fromEntries(socials.map((social) => [social.id, social]));

export const github = socialById.github;
export const linkedin = socialById.linkedin;

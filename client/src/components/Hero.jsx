import { motion, useReducedMotion } from 'framer-motion';

import { ProfileImage } from './ProfileImage';
import { Icon } from './ui/Icon';
import { ActionLink } from './ui/ActionLink';
import { Button } from './ui/Button';
import { profile } from '../data/profile';
import { resume } from '../data/assets';
import { socials } from '../data/socials';
import { useSmoothScroll } from '../hooks/useSmoothScroll';
import { EASE_OUT_EXPO, lineReveal } from '../lib/motion';
import { cn } from '../lib/cn';

/** Technology labels that orbit the portrait with alternating light yellow/green badge accents. */
const techLabels = [
  { name: 'React', icon: 'Atom', position: 'left-[-0.75rem] top-[10%]', bgTone: 'green' },
  { name: 'Node.js', icon: 'Hexagon', position: 'right-[-1.5rem] top-[26%]', bgTone: 'yellow' },
  { name: 'MongoDB', icon: 'Leaf', position: 'left-[-1.75rem] top-[50%]', bgTone: 'green' },
  { name: 'Python', icon: 'Binary', position: 'right-[-1.25rem] top-[60%]', bgTone: 'yellow' },
  { name: 'JavaScript', icon: 'Braces', position: 'left-[-0.5rem] top-[74%]', bgTone: 'yellow' },
  { name: 'Generative AI', icon: 'Sparkles', position: 'right-[-0.25rem] top-[84%]', bgTone: 'green' },
];

export function Hero() {
  const reduce = useReducedMotion();
  const scrollTo = useSmoothScroll();
  const variants = lineReveal(reduce);

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-gradient-to-br from-[#FFF9D6]/85 via-[#FAFDF7] to-[#E8F5E9]/85 pt-[7.5rem] pb-20 sm:pb-24 lg:flex lg:min-h-[100dvh] lg:items-center lg:pt-[8.5rem] lg:pb-28"
    >
      {/* Subtle green/yellow abstract background gradients */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid mask-fade-b opacity-60" />
        <div className="absolute -left-32 top-[-10%] h-[32rem] w-[32rem] rounded-full bg-[#FFF4B8]/40 blur-[130px]" />
        <div className="absolute -right-28 top-[15%] h-[30rem] w-[30rem] rounded-full bg-[#C8E6C9]/40 blur-[130px]" />
        <div className="absolute left-[35%] bottom-[-15%] h-[28rem] w-[28rem] rounded-full bg-[#E8F5E9]/60 blur-[110px]" />
      </div>

      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10 xl:gap-16">
          {/* ---- Copy ---- */}
          <div className="order-2 lg:order-1 lg:col-span-6 xl:col-span-6">
            {/* Eyebrow */}
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.6, ease: EASE_OUT_EXPO }}
              className="mb-6 inline-flex items-center gap-2.5 rounded-control border border-[#C8E6C9] bg-[#E8F5E9] px-3.5 py-1.5 shadow-sm"
            >
              <span aria-hidden="true" className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2E5D3B] opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2E5D3B]" />
              </span>
              <span className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-[#2E5D3B]">
                {profile.eyebrow}
              </span>
            </motion.p>

            {/* Greeting */}
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                reduce ? { duration: 0 } : { duration: 0.7, delay: 0.08, ease: EASE_OUT_EXPO }
              }
              className="mb-3 text-lg font-semibold text-[#2E5D3B] sm:text-xl"
            >
              {profile.greeting}
            </motion.p>

            {/* Main Headline in Dark Green */}
            <h1
              id="hero-heading"
              className="text-balance-narrow text-[clamp(2.35rem,1.5rem+3.6vw,4.25rem)] font-bold leading-[1.08] tracking-[-0.04em] text-[#2E5D3B]"
            >
              <span className="sr-only">
                {profile.title.lead} {profile.title.joiner} {profile.title.trail}
              </span>
              <span aria-hidden="true" className="block">
                <span className="block overflow-hidden pb-1">
                  <motion.span
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    custom={0}
                    className="block text-[#2E5D3B]"
                  >
                    {profile.title.lead}
                  </motion.span>
                </span>
                <span className="mt-1 block overflow-hidden pb-1">
                  <motion.span
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    custom={1}
                    className="block"
                  >
                    <span className="text-[#172117]/80">
                      {profile.title.joiner}
                    </span>{' '}
                    <span className="text-[#2E5D3B]">
                      {profile.title.trail}
                    </span>
                  </motion.span>
                </span>
              </span>
            </h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                reduce ? { duration: 0 } : { duration: 0.7, delay: 0.28, ease: EASE_OUT_EXPO }
              }
              className="mt-6 max-w-[54ch] text-[0.9375rem] leading-relaxed text-[#425846] sm:text-base font-normal"
            >
              {profile.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                reduce ? { duration: 0 } : { duration: 0.7, delay: 0.36, ease: EASE_OUT_EXPO }
              }
              className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4"
            >
              {/* Primary CTA button: deep green background with white text */}
              <Button
                variant="primary"
                size="lg"
                onClick={() => scrollTo('projects')}
                className="w-full sm:w-auto"
              >
                View Projects
                <Icon name="ArrowRight" size={17} />
              </Button>

              {/* Secondary CTA: light yellow background with dark green text */}
              <Button
                as="a"
                href="#contact"
                variant="secondary"
                size="lg"
                onClick={(event) => {
                  event.preventDefault();
                  scrollTo('contact');
                }}
                className="w-full sm:w-auto"
              >
                Contact Me
              </Button>

              <ActionLink
                href={resume.available ? resume.src : ''}
                available={resume.available}
                label="Download Resume"
                icon="Download"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
                unavailableLabel="Resume PDF is not available yet"
                download={resume.available ? resume.fileName : undefined}
              />
            </motion.div>

            {/* Social row */}
            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={reduce ? { duration: 0 } : { duration: 0.7, delay: 0.46 }}
              className="mt-8 flex flex-wrap items-center gap-2.5 border-t border-[#DDE8D8] pt-6"
            >
              <span className="mr-1 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[#6c8471]">
                Connect
              </span>

              {socials.map((social) => (
                <SocialPill key={social.id} social={social} />
              ))}

              <a
                href={profile.contact.email.href}
                aria-label={`Email ${profile.contact.email.display}`}
                className="flex h-10 items-center gap-2 rounded-control border border-[#DDE8D8] bg-white px-3.5 text-[#2E5D3B] transition-colors duration-200 hover:border-[#2E5D3B] hover:bg-[#E8F5E9]"
              >
                <Icon name="Mail" size={16} />
                <span className="hidden font-mono text-[0.75rem] font-medium sm:inline">
                  {profile.contact.email.display}
                </span>
                <span className="sr-only sm:hidden">{profile.contact.email.display}</span>
              </a>
            </motion.div>
          </div>

          {/* ---- Portrait ---- */}
          <div className="order-1 lg:order-2 lg:col-span-6 xl:col-span-6">
            <div className="relative mx-auto w-full max-w-[19rem] sm:max-w-[22rem] lg:max-w-[28rem]">
              <ProfileImage
                aspect="1/1"
                shape="circle"
                floating
                priority
                objectPosition="center 22%"
                className="w-full"
              />

              {/* Floating status card */}
              <motion.div
                initial={reduce ? false : { opacity: 0, scale: 0.94, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={
                  reduce ? { duration: 0 } : { duration: 0.7, delay: 0.5, ease: EASE_OUT_EXPO }
                }
                className="absolute -bottom-5 left-1/2 z-10 w-[16rem] -translate-x-1/2 rounded-[18px] border border-[#DDE8D8] bg-white/95 px-4 py-3 shadow-soft backdrop-blur-md sm:-bottom-6 sm:left-0 sm:w-[18rem] sm:translate-x-0 lg:-bottom-7"
              >
                <p className="flex items-center gap-2.5">
                  <span aria-hidden="true" className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2E5D3B] opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2E5D3B]" />
                  </span>
                  <span className="text-[0.8125rem] font-medium leading-snug text-[#172117]">
                    {profile.tagline}
                  </span>
                </p>
              </motion.div>

              {/* Orbiting technology labels */}
              {techLabels.map((label, index) => (
                <FloatLabel
                  key={label.name}
                  {...label}
                  index={index}
                  className="hidden sm:flex"
                />
              ))}
            </div>

            {/* Mobile: clean inline row */}
            <ul className="mx-auto mt-10 flex max-w-[22rem] flex-wrap justify-center gap-2 sm:hidden">
              {techLabels.map((label) => (
                <li
                  key={label.name}
                  className="inline-flex items-center gap-1.5 rounded-control border border-[#DDE8D8] bg-white px-2.5 py-1 shadow-sm"
                >
                  <span
                    className={cn(
                      'flex h-5 w-5 items-center justify-center rounded-full',
                      label.bgTone === 'yellow' ? 'bg-[#FFF4B8]' : 'bg-[#C8E6C9]',
                    )}
                  >
                    <Icon name={label.icon} size={12} className="text-[#2E5D3B]" />
                  </span>
                  <span className="font-mono text-[0.6875rem] font-medium text-[#172117]">
                    {label.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialPill({ social }) {
  if (!social.available) {
    return (
      <span
        title={`${social.label} profile URL is not configured yet`}
        className="flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-control border border-dashed border-[#DDE8D8] text-[#6c8471]"
      >
        <Icon name={social.icon} size={16} />
        <span className="sr-only">{social.label} profile URL is not configured yet</span>
      </span>
    );
  }

  return (
    <a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${social.label} profile (opens in a new tab)`}
      className="flex h-10 w-10 items-center justify-center rounded-control border border-[#DDE8D8] bg-white text-[#2E5D3B] transition-colors duration-200 hover:border-[#2E5D3B] hover:bg-[#E8F5E9]"
    >
      <Icon name={social.icon} size={16} />
    </a>
  );
}

/** A single technology chip that drifts gently around the portrait. */
function FloatLabel({ name, icon, position, index, bgTone = 'green', className }) {
  const reduce = useReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      animate={
        reduce
          ? undefined
          : { y: [0, index % 2 === 0 ? -6 : 6, 0] }
      }
      transition={
        reduce
          ? undefined
          : {
              duration: 5.5 + (index % 3) * 1.4,
              repeat: Infinity,
              ease: EASE_OUT_EXPO,
              delay: index * 0.35,
            }
      }
      className={cn(
        'absolute z-10 items-center gap-2 rounded-control border border-[#DDE8D8] bg-white/95 px-3 py-1.5 shadow-soft backdrop-blur-md',
        position,
        className,
      )}
    >
      <span
        className={cn(
          'flex h-5 w-5 items-center justify-center rounded-full',
          bgTone === 'yellow' ? 'bg-[#FFF4B8]' : 'bg-[#C8E6C9]',
        )}
      >
        <Icon name={icon} size={12} className="text-[#2E5D3B]" />
      </span>
      <span className="font-mono text-[0.6875rem] font-semibold tracking-tight text-[#172117]">
        {name}
      </span>
    </motion.span>
  );
}

export default Hero;

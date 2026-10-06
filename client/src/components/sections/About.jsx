import { profile, github, linkedin } from '../../data/profile';
import { profileImage } from '../../data/assets';
import { Icon } from '../ui/Icon';
import { Section } from '../ui/Section';
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal';
import { cn } from '../../lib/cn';

const INTEREST_ACCENT_STYLES = {
  amber: {
    badge: 'border-amber-200/80 bg-amber-50 text-amber-600',
    hoverBorder: 'hover:border-amber-300',
  },
  orange: {
    badge: 'border-orange-200/80 bg-orange-50 text-orange-600',
    hoverBorder: 'hover:border-orange-300',
  },
  emerald: {
    badge: 'border-emerald-200/80 bg-emerald-50 text-emerald-700',
    hoverBorder: 'hover:border-emerald-300',
  },
  rose: {
    badge: 'border-rose-200/80 bg-rose-50 text-rose-600',
    hoverBorder: 'hover:border-rose-300',
  },
  yellow: {
    badge: 'border-amber-200/80 bg-amber-100/70 text-amber-700',
    hoverBorder: 'hover:border-amber-300',
  },
  teal: {
    badge: 'border-teal-200/80 bg-teal-50 text-teal-700',
    hoverBorder: 'hover:border-teal-300',
  },
};

export function About() {
  const { about } = profile;

  return (
    <Section id="about" labelledBy="about-heading" className="bg-[#FAF9F6]" reveal>
      {/* Centered section heading */}
      <Reveal>
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-200/80 bg-orange-50 px-3.5 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-orange-600 shadow-2xs">
            {about.badge}
          </span>
          <h2
            id="about-heading"
            className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl uppercase"
          >
            {about.heading}
          </h2>
          {/* Small orange underline below the heading */}
          <div
            aria-hidden="true"
            className="mx-auto mt-3 h-1 w-14 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500"
          />
        </div>
      </Reveal>

      {/* Main Two-Column Layout */}
      <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        {/* Left Column: Professional Profile Card */}
        <div className="lg:col-span-4 flex">
          <Reveal delay={0.06} className="w-full flex">
            <div className="flex flex-col justify-between w-full rounded-2xl border border-neutral-200/80 bg-white p-6 sm:p-7 shadow-sm transition-all duration-300 hover:shadow-md">
              <div>
                {/* Professional portrait */}
                <div className="relative w-full overflow-hidden rounded-xl border border-neutral-100 bg-neutral-100 shadow-2xs aspect-[4/3] sm:aspect-square lg:aspect-[4/3.2]">
                  <img
                    src={profileImage.available ? profileImage.src : '/images/hariesh-profile.jpg'}
                    alt="Hariesh V - Full Stack Developer & Generative AI Enthusiast"
                    className="h-full w-full object-cover object-[center_22%]"
                    loading="lazy"
                  />
                </div>

                {/* Name & Title */}
                <div className="mt-5">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                    {profile.wordmark}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-orange-600 sm:text-[0.9375rem]">
                    {about.role}
                  </p>
                </div>

                {/* Location & Status details */}
                <div className="mt-5 space-y-3 border-t border-neutral-100 pt-4 text-xs sm:text-sm">
                  <div className="flex items-center gap-3 text-neutral-600">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-orange-100 bg-orange-50 text-orange-600">
                      <Icon name="MapPin" size={15} />
                    </span>
                    <div>
                      <span className="font-mono text-[0.6875rem] font-semibold uppercase tracking-wider text-neutral-400 block">
                        Location
                      </span>
                      <span className="font-semibold text-neutral-800">
                        {about.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-neutral-600">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-emerald-100 bg-emerald-50 text-emerald-600">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                      </span>
                    </span>
                    <div>
                      <span className="font-mono text-[0.6875rem] font-semibold uppercase tracking-wider text-neutral-400 block">
                        Status
                      </span>
                      <span className="font-semibold text-emerald-700">
                        {about.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons: GitHub & LinkedIn */}
              <div className="mt-6 pt-5 border-t border-neutral-100 grid grid-cols-2 gap-3">
                <a
                  href={github.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 text-xs font-semibold text-neutral-800 transition-all duration-200 hover:border-neutral-300 hover:bg-neutral-100 active:scale-[0.98]"
                >
                  <Icon name="Github" size={15} />
                  <span>GitHub</span>
                  <Icon name="ArrowUpRight" size={13} className="text-neutral-400" />
                </a>
                <a
                  href={linkedin.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 text-xs font-semibold text-neutral-800 transition-all duration-200 hover:border-neutral-300 hover:bg-neutral-100 active:scale-[0.98]"
                >
                  <Icon name="Linkedin" size={15} />
                  <span>LinkedIn</span>
                  <Icon name="ArrowUpRight" size={13} className="text-neutral-400" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Description Card + 4 Statistics Cards */}
        <div className="lg:col-span-8 flex flex-col justify-between gap-5">
          {/* Clean About Me Description Card */}
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="space-y-4 text-[0.9375rem] leading-relaxed text-neutral-600 sm:text-base sm:leading-[1.75]">
                {about.paragraphs.map((p) => (
                  <p key={p.id}>
                    {p.lead}
                    <strong className="font-semibold text-neutral-900">{p.bold}</strong>
                    {p.trail}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>

          {/* 4 Compact Statistics Cards */}
          <Reveal delay={0.14}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {about.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="group rounded-2xl border border-neutral-200/80 bg-white p-4 sm:p-5 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-sm"
                >
                  <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-orange-600 transition-transform duration-300 group-hover:scale-105 origin-left">
                    {stat.value}
                  </div>
                  <div className="mt-1 font-mono text-[0.6875rem] font-bold uppercase tracking-wider text-neutral-500 leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Below the statistics: INTERESTS & PASSIONS */}
      <div className="mt-16 sm:mt-20">
        <Reveal delay={0.18}>
          <div className="flex flex-col items-center text-center">
            <h3 className="text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl uppercase">
              {about.interestsHeading}
            </h3>
            {/* Small orange underline below heading */}
            <div
              aria-hidden="true"
              className="mx-auto mt-2.5 h-1 w-12 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500"
            />
          </div>
        </Reveal>

        {/* 6 modern horizontal cards arranged in a 3 × 2 grid */}
        <RevealGroup className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {about.interests.map((interest) => {
            const styles = INTEREST_ACCENT_STYLES[interest.accent] ?? INTEREST_ACCENT_STYLES.orange;

            return (
              <RevealItem key={interest.id}>
                <div
                  className={cn(
                    'group flex items-start gap-4 rounded-2xl border border-neutral-200/80 bg-white p-5 sm:p-6 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md',
                    styles.hoverBorder,
                  )}
                >
                  <span
                    className={cn(
                      'flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-110',
                      styles.badge,
                    )}
                  >
                    <Icon name={interest.icon} size={20} />
                  </span>

                  <div className="min-w-0 flex-1">
                    <h4 className="font-mono text-xs sm:text-[0.8125rem] font-bold uppercase tracking-wider text-neutral-900 transition-colors duration-200 group-hover:text-orange-600">
                      {interest.title}
                    </h4>
                    <p className="mt-1.5 text-xs sm:text-[0.8125rem] leading-relaxed text-neutral-600">
                      {interest.description}
                    </p>
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </Section>
  );
}

export default About;

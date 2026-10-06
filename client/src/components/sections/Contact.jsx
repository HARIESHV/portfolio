import { profile } from '../../data/profile';
import { socials } from '../../data/socials';
import { ContactForm } from '../ContactForm';
import { Icon } from '../ui/Icon';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';

const ICON_BY_ID = {
  github: 'Github',
  linkedin: 'Linkedin',
};

export function Contact() {
  const { heading, description, phone, email } = profile.contact;

  const details = [
    { id: 'phone', label: phone.label, value: phone.display, href: phone.href, icon: 'Phone' },
    {
      id: 'email',
      label: email.label,
      value: email.display,
      href: email.href,
      icon: 'Mail',
    },
    ...socials.map((social) => ({
      id: social.id,
      label: social.label,
      value: social.available ? 'View profile' : 'Not configured yet',
      href: social.href,
      icon: ICON_BY_ID[social.id] ?? 'Compass',
      available: social.available,
      external: true,
    })),
  ];

  return (
    <Section
      id="contact"
      labelledBy="contact-heading"
      surface="softGreen"
      className="relative overflow-hidden"
      reveal
    >
      {/* Light yellow decorative elements */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-[#FFF4B8]/50 blur-[100px]" />
        <div className="absolute -left-20 bottom-10 h-72 w-72 rounded-full bg-[#FFF9D6]/60 blur-[100px]" />
        <div className="absolute right-[30%] bottom-[-10%] h-64 w-64 rounded-full bg-[#FFF4B8]/30 blur-[90px]" />
      </div>

      <div className="max-w-3xl">
        {/* Light yellow decorative badge */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#F2E8A5] bg-[#FFF4B8] px-3.5 py-1 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-[#2E5D3B]">
          <span className="h-2 w-2 rounded-full bg-[#2E5D3B]" />
          Available for new opportunities
        </div>

        <SectionHeading
          id="contact-heading"
          eyebrow="Get in touch"
          heading={heading}
          lede={description}
        />
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Contact info card (White card with soft border) */}
        <Reveal className="lg:col-span-5">
          <div className="rounded-[22px] border border-[#DDE8D8] bg-white p-6 shadow-soft sm:p-7">
            <h3 className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-[#2E5D3B]">
              Direct Contact & Socials
            </h3>

            <ul className="mt-5 space-y-2">
              {details.map((detail) => (
                <li key={detail.id} className="border-b border-[#DDE8D8] pb-3 last:border-b-0 last:pb-0">
                  {detail.available === false ? (
                    <span
                      title={`${detail.label} URL is not configured yet`}
                      className="flex cursor-not-allowed items-center gap-3.5 rounded-[16px] px-3 py-3"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-dashed border-[#DDE8D8] bg-[#FAFDF7] text-[#6c8471]">
                        <Icon name={detail.icon} size={17} />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-mono text-[0.625rem] font-medium uppercase tracking-[0.18em] text-[#6c8471]">
                          {detail.label}
                        </span>
                        <span className="mt-0.5 block truncate text-[0.875rem] font-medium text-[#6c8471]">
                          {detail.value}
                        </span>
                      </span>
                    </span>
                  ) : (
                    <a
                      href={detail.href}
                      {...(detail.external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className="group flex items-center gap-3.5 rounded-[16px] px-3 py-3 transition-colors duration-200 hover:bg-[#E8F5E9]"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#C8E6C9] bg-[#E8F5E9] text-[#2E5D3B] transition-colors duration-200 group-hover:bg-[#C8E6C9]">
                        <Icon name={detail.icon} size={17} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-[#6c8471]">
                          {detail.label}
                        </span>
                        <span className="mt-0.5 block truncate text-[0.875rem] font-bold text-[#172117]">
                          {detail.value}
                        </span>
                      </span>
                      <Icon
                        name="ArrowUpRight"
                        size={15}
                        className="shrink-0 text-[#6c8471] transition-colors duration-200 group-hover:text-[#2E5D3B]"
                      />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Contact Form (White card, deep green submit button) */}
        <Reveal delay={0.1} className="lg:col-span-7">
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}

export default Contact;

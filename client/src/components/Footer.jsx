import { profile } from '../data/profile';
import { navigation } from '../data/navigation';
import { socials } from '../data/socials';
import { Icon } from './ui/Icon';
import { useSmoothScroll } from '../hooks/useSmoothScroll';

export function Footer() {
  const scrollTo = useSmoothScroll();

  const handleNavigate = (event, href) => {
    event.preventDefault();
    scrollTo(href.replace('#', ''));
    window.history.replaceState(null, '', href);
  };

  return (
    <footer className="w-full max-w-full overflow-x-clip border-t border-[#244b2f] bg-[#2E5D3B] text-white">
      <div className="container-page py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Identity */}
          <div className="lg:col-span-5 min-w-0">
            <a
              href="#home"
              onClick={(event) => handleNavigate(event, '#home')}
              className="inline-flex items-center"
            >
              <span className="text-xl font-bold tracking-[-0.02em] text-white">
                Hariesh.V
              </span>
            </a>

            <p className="mt-4 max-w-[36ch] text-sm leading-relaxed text-white/85">
              Full Stack Developer and Generative AI Enthusiast
            </p>

            <p className="mt-6 font-mono text-[0.6875rem] leading-relaxed text-white/70">
              B.Tech Information Technology
              <br />
              Government College of Engineering, Erode
            </p>
          </div>

          {/* Navigation with light yellow hover accents */}
          <nav aria-label="Footer" className="lg:col-span-4 min-w-0">
            <h2 className="font-mono text-[0.625rem] font-bold uppercase tracking-[0.2em] text-[#C8E6C9]">
              Navigation
            </h2>

            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-1.5 sm:grid-cols-2 lg:grid-cols-1 lg:gap-y-1">
              {navigation.map((item) => (
                <li key={item.id} className="min-w-0">
                  <a
                    href={item.href}
                    onClick={(event) => handleNavigate(event, item.href)}
                    className="inline-block py-1 text-sm font-medium text-white/80 transition-colors duration-200 hover:text-[#FFF4B8] break-words"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social with light green/yellow hover accents */}
          <div className="lg:col-span-3 min-w-0">
            <h2 className="font-mono text-[0.625rem] font-bold uppercase tracking-[0.2em] text-[#C8E6C9]">
              Connect
            </h2>

            <ul className="mt-5 flex flex-col gap-2">
              {socials.map((social) =>
                social.available ? (
                  <li key={social.id}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2.5 rounded-full px-3 py-1.5 text-sm font-medium text-white/85 transition-all duration-200 hover:bg-[#FFF4B8]/15 hover:text-[#FFF4B8]"
                    >
                      <span className="text-[#C8E6C9] transition-colors duration-200 group-hover:text-[#FFF4B8]">
                        <Icon name={social.icon} size={16} />
                      </span>
                      {social.label}
                      <Icon
                        name="ArrowUpRight"
                        size={13}
                        className="text-white/50 transition-colors duration-200 group-hover:text-[#FFF4B8]"
                      />
                    </a>
                  </li>
                ) : (
                  <li key={social.id}>
                    <span
                      title={`${social.label} profile URL is not configured yet`}
                      className="inline-flex cursor-not-allowed items-center gap-2.5 px-3 py-1.5 text-sm text-white/40"
                    >
                      <Icon name={social.icon} size={16} />
                      {social.label}
                      <span className="sr-only">profile URL is not configured yet</span>
                    </span>
                  </li>
                ),
              )}

              <li>
                <a
                  href={profile.contact.email.href}
                  className="group inline-flex items-center gap-2.5 rounded-full px-3 py-1.5 text-sm font-medium text-white/85 transition-all duration-200 hover:bg-[#FFF4B8]/15 hover:text-[#FFF4B8]"
                >
                  <span className="text-[#C8E6C9] transition-colors duration-200 group-hover:text-[#FFF4B8]">
                    <Icon name="Mail" size={16} />
                  </span>
                  Email
                  <Icon
                    name="ArrowUpRight"
                    size={13}
                    className="text-white/50 transition-colors duration-200 group-hover:text-[#FFF4B8]"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Base line */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/15 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.6875rem] text-white/70">
            © 2026 Hariesh V. All rights reserved.
          </p>

          {/* Back to top with light yellow/green accents */}
          <button
            type="button"
            onClick={() => scrollTo('home')}
            className="inline-flex items-center gap-2 self-start rounded-control border border-white/20 bg-white/5 px-4 py-2 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-white transition-all duration-200 hover:border-[#FFF4B8] hover:bg-[#FFF4B8]/10 hover:text-[#FFF4B8] sm:self-auto cursor-pointer"
          >
            Back to top
            <Icon name="ArrowUpRight" size={13} className="-rotate-45" />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

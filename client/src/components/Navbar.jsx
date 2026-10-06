import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useId, useState } from 'react';

import { Icon } from './ui/Icon';
import { ActionLink } from './ui/ActionLink';
import { navigation } from '../data/navigation';
import { resume } from '../data/assets';
import { profile } from '../data/profile';
import { useActiveSection } from '../hooks/useActiveSection';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useScrolled } from '../hooks/useScrolled';
import { useSmoothScroll } from '../hooks/useSmoothScroll';
import { useIsDesktop } from '../hooks/useMediaQuery';
import { Z } from '../lib/constants';
import { cn } from '../lib/cn';
import { EASE_OUT_EXPO } from '../lib/motion';

const SECTION_IDS = navigation.map((item) => item.id);

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled(12);
  const activeId = useActiveSection(SECTION_IDS);
  const scrollTo = useSmoothScroll();
  const isDesktop = useIsDesktop();
  const reduce = useReducedMotion();

  const menuId = useId();
  const panelRef = useCallbackRef();
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const menuVisible = menuOpen && !isDesktop;

  useFocusTrap(panelRef, menuVisible, closeMenu);
  useBodyScrollLock(menuVisible);

  useEffect(() => {
    if (!menuVisible) return undefined;
    const handleKey = (event) => {
      if (event.key === 'Escape') closeMenu();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [menuVisible, closeMenu]);

  const handleNavigate = useCallback(
    (event, href) => {
      event.preventDefault();
      setMenuOpen(false);
      scrollTo(href.replace('#', ''));
      window.history.replaceState(null, '', href);
    },
    [scrollTo],
  );

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 transition-[background-color,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
        menuVisible && 'border-b border-[#DDE8D8] bg-white/95 backdrop-blur-xl',
        !menuVisible && scrolled && 'border-b border-[#DDE8D8] bg-[#FFF9D6]/90 shadow-[0_2px_16px_rgba(46,93,59,0.06)] backdrop-blur-xl backdrop-saturate-150',
        !menuVisible && !scrolled && 'border-b border-transparent bg-transparent',
      )}
      style={{ zIndex: Z.stickyNav }}
    >
      <nav
        aria-label="Primary"
        className="container-page flex h-[72px] items-center justify-between gap-4"
      >
        {/* Wordmark */}
        <a
          href="#home"
          onClick={(event) => handleNavigate(event, '#home')}
          className="group flex shrink-0 items-center rounded-control py-1 pr-2"
        >
          <span className="text-[1.0625rem] font-bold tracking-[-0.02em] text-[#2E5D3B]">
            {profile.wordmark}
          </span>
        </a>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-1 xl:gap-1.5 lg:flex">
          {navigation.map((item) => {
            const isActive = activeId === item.id;

            return (
              <li key={item.id}>
                <a
                  href={item.href}
                  onClick={(event) => handleNavigate(event, item.href)}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'relative rounded-full px-3 py-1.5 text-[0.8125rem] font-medium transition-all duration-200',
                    isActive
                      ? 'bg-[#C8E6C9] text-[#2E5D3B] font-semibold shadow-[0_0_12px_rgba(200,230,201,0.7)]'
                      : 'text-[#2E5D3B]/80 hover:bg-[#E8F5E9] hover:text-[#2E5D3B]',
                  )}
                >
                  {item.label}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active-glow"
                      aria-hidden="true"
                      className="absolute inset-x-3 -bottom-1 h-[2px] rounded-full bg-[#2E5D3B]"
                      transition={
                        reduce
                          ? { duration: 0 }
                          : { type: 'spring', stiffness: 380, damping: 32 }
                      }
                    />
                  ) : null}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Desktop utility cluster */}
        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <ActionLink
            href={resume.available ? resume.src : ''}
            available={resume.available}
            label="Download Resume"
            icon="Download"
            variant="primary"
            size="sm"
            unavailableLabel="Resume PDF is not available yet"
            download={resume.available ? resume.fileName : undefined}
          />
        </div>

        {/* Mobile trigger */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuVisible}
          aria-controls={menuId}
          aria-label={menuVisible ? 'Close menu' : 'Open menu'}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control border border-[#DDE8D8] bg-white text-[#2E5D3B] transition-colors duration-200 hover:border-[#2E5D3B] lg:hidden"
        >
          <Icon name={menuVisible ? 'X' : 'Menu'} size={18} />
        </button>
      </nav>

      <MobileMenu
        id={menuId}
        isOpen={menuVisible}
        panelRef={panelRef}
        activeId={activeId}
        onNavigate={handleNavigate}
        onClose={closeMenu}
      />
    </header>
  );
}

function useCallbackRef() {
  const [ref] = useState(() => ({ current: null }));
  return ref;
}

function MobileMenu({ id, isOpen, panelRef, activeId, onNavigate, onClose }) {
  const reduce = useReducedMotion();

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          id={id}
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          tabIndex={-1}
          initial={reduce ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
          transition={reduce ? { duration: 0 } : { duration: 0.28, ease: EASE_OUT_EXPO }}
          className="absolute inset-x-0 top-[72px] max-h-[calc(100dvh-72px)] overflow-y-auto border-b border-[#DDE8D8] bg-[#FFF9D6]/98 backdrop-blur-xl lg:hidden shadow-lift"
          style={{ zIndex: Z.mobileMenu }}
        >
          <div className="container-page flex flex-col gap-1 py-6">
            {navigation.map((item, index) => {
              const isActive = activeId === item.id;

              return (
                <motion.a
                  key={item.id}
                  href={item.href}
                  onClick={(event) => onNavigate(event, item.href)}
                  aria-current={isActive ? 'true' : undefined}
                  initial={reduce ? false : { opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { duration: 0.3, delay: 0.04 * index, ease: EASE_OUT_EXPO }
                  }
                  className={cn(
                    'flex items-center justify-between rounded-control px-4 py-3 text-base font-medium transition-colors duration-200',
                    isActive
                      ? 'bg-[#C8E6C9] text-[#2E5D3B] font-semibold'
                      : 'text-[#2E5D3B] hover:bg-white',
                  )}
                >
                  {item.label}
                  {isActive ? (
                    <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#2E5D3B]" />
                  ) : (
                    <Icon name="ChevronRight" size={16} className="text-[#6c8471]" />
                  )}
                </motion.a>
              );
            })}

            <div className="mt-5 flex flex-col gap-3 border-t border-[#DDE8D8] pt-5">
              <ActionLink
                href={resume.available ? resume.src : ''}
                available={resume.available}
                label="Download Resume"
                icon="Download"
                variant="primary"
                size="md"
                className="w-full"
                unavailableLabel="Resume PDF is not available yet"
                download={resume.available ? resume.fileName : undefined}
                onClick={onClose}
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default Navbar;

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';

import { EASE_OUT_EXPO } from '../../lib/motion';
import { Icon } from '../ui/Icon';

export function TimelineExplorer({ id, label, entries }) {
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState(entries[0]?.id);
  const activeEntry = entries.find((entry) => entry.id === activeId) ?? entries[0];

  if (!activeEntry) return null;

  return (
    <div className="mt-10 grid gap-5 lg:mt-14 lg:grid-cols-[minmax(17rem,0.78fr)_minmax(0,1.5fr)] lg:gap-8">
      <nav aria-label={label} className="min-w-0">
        <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
          {entries.map((entry) => {
            const isActive = entry.id === activeEntry.id;

            return (
              <li key={entry.id}>
                <button
                  type="button"
                  aria-current={isActive ? 'true' : undefined}
                  aria-controls={`${id}-details`}
                  onClick={() => setActiveId(entry.id)}
                  className={`group relative flex min-h-[92px] w-full items-center gap-3 overflow-hidden rounded-2xl border p-3.5 text-left transition-[border-color,background-color,box-shadow,transform] duration-200 active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B9562A] sm:min-h-[104px] sm:gap-4 sm:p-5 ${
                    isActive
                      ? 'border-[#E6A17E] bg-[#FFFDF8] shadow-[0_8px_24px_rgba(122,72,41,0.09)]'
                      : 'border-[#E9E1D5] bg-white/75 hover:-translate-y-0.5 hover:border-[#E3C7B4] hover:bg-white'
                  }`}
                >
                  {isActive ? (
                    <motion.span
                      layoutId={`${id}-active-marker`}
                      aria-hidden="true"
                      className="absolute inset-y-3 left-0 w-[3px] rounded-r-full bg-[#C45B2B]"
                      transition={reduce ? { duration: 0 } : { duration: 0.28, ease: EASE_OUT_EXPO }}
                    />
                  ) : null}
                  <span
                    className={`flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl border transition-colors duration-200 ${
                      isActive
                        ? 'border-[#F1C7AD] bg-[#FCEBDD] text-[#A74A24]'
                        : 'border-[#EEE7DB] bg-[#FAF7F0] text-[#777064] group-hover:text-[#A74A24]'
                    }`}
                  >
                    <Icon name={entry.icon} size={19} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-[#292820] sm:text-[0.9375rem]">
                      {entry.navTitle}
                    </span>
                    <span className="mt-1 block truncate text-xs text-[#716B60] sm:text-[0.8125rem]">
                      {entry.organization}
                    </span>
                    <span className="mt-1.5 block font-mono text-[0.625rem] leading-4 text-[#8A8276] sm:text-[0.6875rem] break-words [overflow-wrap:anywhere]">
                      {entry.navMeta}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={`h-2 w-2 shrink-0 rounded-full transition-colors duration-200 ${
                      isActive ? 'bg-[#C45B2B]' : 'bg-[#DDD4C7] group-hover:bg-[#E3A45D]'
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div
        id={`${id}-details`}
        aria-live="polite"
        aria-atomic="true"
        className="min-w-0"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            key={activeEntry.id}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -5 }}
            transition={reduce ? { duration: 0 } : { duration: 0.24, ease: EASE_OUT_EXPO }}
            className="h-full max-w-full min-w-0 rounded-2xl border border-[#E9E1D5] bg-[#FFFEFA] p-4 shadow-[0_12px_36px_rgba(88,64,39,0.06)] sm:p-7 lg:p-8"
          >
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#EEE7DB] pb-4 sm:pb-6">
              <div className="flex min-w-0 flex-1 items-start gap-3 sm:gap-3.5">
                <span className="mt-0.5 flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-[#FCEBDD] text-[#A74A24]">
                  <Icon name={activeEntry.icon} size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[0.625rem] font-medium uppercase tracking-[0.12em] text-[#897E70]">
                    {activeEntry.kind}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold leading-tight text-[#292820] sm:text-2xl break-words">
                    {activeEntry.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-[#70695D] break-words">
                    {activeEntry.organization}
                  </p>
                </div>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#F0D5A0] bg-[#FFF4D7] px-2.5 py-1 text-xs font-semibold text-[#704E19]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C45B2B]" />
                {activeEntry.status}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#756D61] sm:mt-6 sm:text-sm">
              <span className="inline-flex min-w-0 items-center gap-2 break-words">
                <Icon name="Calendar" size={15} className="shrink-0 text-[#A74A24]" />
                <span className="min-w-0 break-words">{activeEntry.duration}</span>
              </span>
              {activeEntry.location ? (
                <span className="inline-flex min-w-0 items-center gap-2 break-words">
                  <Icon name="MapPin" size={15} className="shrink-0 text-[#A74A24]" />
                  <span className="min-w-0 break-words">{activeEntry.location}</span>
                </span>
              ) : null}
            </div>

            <p className="mt-4 max-w-[66ch] text-sm leading-6 text-[#575349] sm:mt-6 sm:text-[0.9375rem] sm:leading-7 break-words [overflow-wrap:anywhere]">
              {activeEntry.description}
            </p>

            <div className="mt-6 sm:mt-7">
              <h4 className="text-xs font-semibold text-[#37342D]">{activeEntry.listTitle}</h4>
              <ul className="mt-3 grid gap-2.5 sm:gap-3">
                {activeEntry.points.map((point) => (
                  <li key={point} className="flex min-w-0 items-start gap-2.5 text-sm leading-5 text-[#575349]">
                    <span className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#D9874E]" />
                    <span className="min-w-0 flex-1 break-words [overflow-wrap:anywhere]">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {activeEntry.tags?.length ? (
              <div className="mt-6 flex flex-wrap gap-2 border-t border-[#EEE7DB] pt-5 sm:mt-7 sm:pt-6">
                {activeEntry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="max-w-full rounded-full border border-[#EADFCB] bg-[#FAF4E8] px-3 py-1.5 font-mono text-[0.625rem] font-medium text-[#62543E] sm:text-[0.6875rem] break-words [overflow-wrap:anywhere]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default TimelineExplorer;
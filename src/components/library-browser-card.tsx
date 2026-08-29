import { useState } from 'react'

export type LibraryProject = {
  id: string
  tabLabel: string
  url: string
  images: string[]
}

type LibraryNavProps = {
  activeIndex: number
  total: number
  label: string
  onPrev: () => void
  onNext: () => void
}

function LibraryNavArrows({ activeIndex, total, label, onPrev, onNext }: LibraryNavProps) {
  return (
    <div className="library-nav">
      <button type="button" className="library-arrow" onClick={onPrev} aria-label={`Show previous ${label} screenshot`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="library-arrow-icon">
          <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" d="M11 6L5 12M5 12L11 18M5 12H19" />
        </svg>
      </button>

      <span className="library-counter">
        {activeIndex + 1} / {total}
      </span>

      <button
        type="button"
        className="library-arrow library-arrow--next"
        onClick={onNext}
        aria-label={`Show next ${label} screenshot`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="library-arrow-icon">
          <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" d="M11 6L5 12M5 12L11 18M5 12H19" />
        </svg>
      </button>
    </div>
  )
}

type LibraryBrowserCardProps = {
  project: LibraryProject
}

export function LibraryBrowserCard({ project }: LibraryBrowserCardProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const total = project.images.length

  const goPrev = () => setActiveIndex((current) => (current - 1 + total) % total)
  const goNext = () => setActiveIndex((current) => (current + 1) % total)

  return (
    <div className="library-card">
      <div className="browser-stack">
        <div className="browser">
          <div className="tabs-head">
            <div className="tabs">
              <div className="tab-open">
                <div className="rounded-l">
                  <div className="mask-round" />
                </div>
                <span>{project.tabLabel}</span>
                <div className="close-tab">✕</div>
                <div className="rounded-r">
                  <div className="mask-round" />
                </div>
              </div>
            </div>

            <div className="window-opt" aria-hidden="true">
              <button type="button" tabIndex={-1}>
                -
              </button>
              <button type="button" tabIndex={-1}>
                □
              </button>
              <button type="button" className="window-close" tabIndex={-1}>
                ✕
              </button>
            </div>
          </div>

          <div className="head-browser" aria-hidden="true">
            <button type="button" tabIndex={-1}>
              ←
            </button>
            <button type="button" disabled tabIndex={-1}>
              →
            </button>

            <input type="text" readOnly value={project.url} tabIndex={-1} />

            <button type="button" tabIndex={-1}>
              ⋮
            </button>
            <button type="button" className="star" tabIndex={-1}>
              ✰
            </button>
          </div>

          <div className="browser-screen">
            <img
              src={project.images[activeIndex]}
              alt={`${project.tabLabel} screenshot ${activeIndex + 1} of ${total}`}
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <LibraryNavArrows activeIndex={activeIndex} total={total} label={project.tabLabel} onPrev={goPrev} onNext={goNext} />
    </div>
  )
}

type LibraryAccordionProps = {
  projects: LibraryProject[]
}

export function LibraryAccordion({ projects }: LibraryAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(projects[0]?.id ?? null)
  const [activeIndexes, setActiveIndexes] = useState<Record<string, number>>({})

  const getIndex = (project: LibraryProject) => activeIndexes[project.id] ?? 0

  const goPrev = (project: LibraryProject) => {
    const total = project.images.length
    setActiveIndexes((current) => ({ ...current, [project.id]: (getIndex(project) - 1 + total) % total }))
  }

  const goNext = (project: LibraryProject) => {
    const total = project.images.length
    setActiveIndexes((current) => ({ ...current, [project.id]: (getIndex(project) + 1) % total }))
  }

  return (
    <div className="library-accordion">
      {projects.map((project) => {
        const isOpen = openId === project.id
        const activeIndex = getIndex(project)
        const total = project.images.length

        return (
          <div className={`library-accordion-item${isOpen ? ' is-open' : ''}`} key={project.id}>
            <button
              type="button"
              className="library-accordion-trigger"
              aria-expanded={isOpen}
              onClick={() => setOpenId(isOpen ? null : project.id)}
            >
              <span>{project.tabLabel}</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="library-accordion-chevron">
                <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {isOpen && (
              <div className="library-accordion-panel">
                <div className="library-accordion-image">
                  <img
                    src={project.images[activeIndex]}
                    alt={`${project.tabLabel} screenshot ${activeIndex + 1} of ${total}`}
                    loading="lazy"
                  />
                </div>

                <LibraryNavArrows
                  activeIndex={activeIndex}
                  total={total}
                  label={project.tabLabel}
                  onPrev={() => goPrev(project)}
                  onNext={() => goNext(project)}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

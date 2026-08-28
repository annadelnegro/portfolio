import './App.css'
import { FloatingDock } from './components/ui/floating-dock'
import { Timeline } from './components/ui/timeline'
import { Tooltip, TooltipContent, TooltipTrigger } from './components/ui/tooltip'
import { useEffect, useRef, useState } from 'react'
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBriefcase,
  IconFolders,
  IconHome,
  IconMail,
  IconUser,
} from '@tabler/icons-react'

const dockItems = [
  { title: 'Home', icon: <IconHome className="dock-icon" />, href: '#home' },
  { title: 'About', icon: <IconUser className="dock-icon" />, href: '#about' },
  { title: 'Work', icon: <IconBriefcase className="dock-icon" />, href: '#work' },
  {
    title: 'Projects',
    icon: <IconFolders className="dock-icon" />, 
    href: '#projects',
  },
  {
    title: 'Email',
    icon: <IconMail className="dock-icon" />,
    href: 'mailto:annaluciadelnegro@gmail.com',
  },
  {
    title: 'GitHub',
    icon: <IconBrandGithub className="dock-icon" />, 
    href: 'https://github.com/annadelnegro',
    target: '_blank',
    rel: 'noreferrer',
  },
  {
    title: 'LinkedIn',
    icon: <IconBrandLinkedin className="dock-icon" />, 
    href: 'https://linkedin.com/in/annadn',
    target: '_blank',
    rel: 'noreferrer',
  },
]

const workExperience = [
  {
    title: 'Software Engineer',
    employer: 'JP Morgan',
    location: 'Tampa, FL',
    dateRange: 'Jul 2026 - Present',
  },
  {
    title: 'Application Security Intern, Cyber Threat Management Team',
    employer: 'American International Group (AIG)',
    location: 'Jersey City, NJ',
    dateRange: 'May 2025 - Aug 2025',
  },
  {
    title: 'Software Development Engineer Intern',
    employer: 'Amazon',
    location: 'Herndon, VA',
    dateRange: 'May 2024 - Aug 2024',
  },
  {
    title: 'Teaching Assistant',
    employer: 'University of Central Florida',
    location: 'Orlando, FL',
    dateRange: 'Aug 2023 - May 2025',
  },
]

const workTimelineData = workExperience.map((role) => ({
  title: role.title,
  rightLabel: role.dateRange,
  content: (
    <div className="work-item-copy">
      <p className="timeline-employer">{role.employer}</p>
      <p className="timeline-location">{role.location}</p>
    </div>
  ),
}))

const diceMessages = [
  'ff: i can speak 4 languages! 🇻🇪🇺🇸🇮🇹🇧🇷',
  'achievement unlocked: inspected the portfolio too thoroughly 🕳️',
  'oh hey, what am i doing? probably debugging something that worked yesterday 🐛🐛',
  'my favorite kind of food is korean 🇰🇷 (at the moment)',
  'my favorite singer is justin bieber 🎤',
  'favorite place to travel: Amsterdam ✈️ 🇳🇱',
  'next place on my must-visit list: brasil 🇧🇷',
  'listening to: crooked smile by j. cole 🎧',
  'i love new york city 🌃',
  'i have 2 doggies 🐶🐶 piglet jose and poe',
]

function getRandomDiceMessage() {
  return diceMessages[Math.floor(Math.random() * diceMessages.length)]
}

function App() {
  const [diceMessage, setDiceMessage] = useState(() => getRandomDiceMessage())
  const [isPhoneViewport, setIsPhoneViewport] = useState(false)
  const [isMobileDiceOpen, setIsMobileDiceOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const mobileDiceRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.08
    }
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 640px)')
    const syncViewport = () => {
      setIsPhoneViewport(mediaQuery.matches)
      if (!mediaQuery.matches) {
        setIsMobileDiceOpen(false)
      }
    }

    syncViewport()
    mediaQuery.addEventListener('change', syncViewport)

    return () => {
      mediaQuery.removeEventListener('change', syncViewport)
    }
  }, [])

  useEffect(() => {
    if (!isPhoneViewport || !isMobileDiceOpen) {
      return
    }

    const handleOutsideTap = (event: PointerEvent) => {
      const targetNode = event.target as Node | null

      if (targetNode && mobileDiceRef.current?.contains(targetNode)) {
        return
      }

      setIsMobileDiceOpen(false)
    }

    document.addEventListener('pointerdown', handleOutsideTap)

    return () => {
      document.removeEventListener('pointerdown', handleOutsideTap)
    }
  }, [isMobileDiceOpen, isPhoneViewport])

  const toggleMusic = async () => {
    const audio = audioRef.current

    if (!audio) {
      return
    }

    if (audio.paused) {
      try {
        await audio.play()
        setIsPlaying(true)
      } catch {
        setIsPlaying(false)
      }
      return
    }

    audio.pause()
    setIsPlaying(false)
  }

  const handleMobileDiceTap = () => {
    setDiceMessage(getRandomDiceMessage())
    setIsMobileDiceOpen(true)
  }

  return (
    <main className="portfolio-page">
      <div className="star-container" aria-hidden="true">
        <div id="stars" />
        <div id="stars2" />
        <div id="stars3" />
      </div>

      <div className="music-player" aria-label="Music player">
        <div className="music-player__info">
          <div className="music-player__title">click to play: late night coding</div>
          <div className="music-player__artist">3am_lofi.mp3</div>
        </div>

        <button
          className="music-player__button"
          type="button"
          onClick={toggleMusic}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>

        <audio ref={audioRef} preload="none" src="/3am_lofi_vibes.mp3" onEnded={() => setIsPlaying(false)} />
      </div>

      <div className="portfolio-shell">
        <section className="hero-card blob" id="home" aria-labelledby="intro-name">
          <div className="hero-copy">
            <p className="eyebrow">Portfolio</p>
            <h1 id="intro-name">Anna Del Negro</h1>
            <p className="subtitle">SWE @ JP Morgan</p>
          </div>
        </section>

        <section className="dock-wrap" aria-label="Primary navigation">
          <div className="dock-floating-shell">
            <FloatingDock items={dockItems} desktopClassName="portfolio-dock" />
          </div>

          <nav className="mobile-word-nav" aria-label="Mobile navigation links">
            {dockItems.map((item) => (
              <a
                key={`mobile-nav-${item.title}`}
                href={item.href}
                target={item.target}
                rel={item.rel}
                className="mobile-word-nav__link"
              >
                {item.title}
              </a>
            ))}
          </nav>
        </section>

        <section className="about-card" id="about" aria-labelledby="about-title">
          <h2 id="about-title">About me 👾</h2>
          <p>
            Hi, I’m Anna! ♥︎

            I’m a software engineer with roots in Venezuela, now based in the US. My first taste of coding was customizing Tumblr themes as a kid, which grew into a love for technology and solving problems. Outside of code, I love traveling and trying new foods.
          </p>

          <button
            className="button"
            type="button"
            onClick={() => {
              const link = document.createElement('a')
              link.href = '/Anna_DelNegro_Resume_SWEII.pdf'
              link.download = 'Anna_DelNegro_Resume_SWEII.pdf'
              link.click()
            }}
            aria-label="Download resume or CV"
          >
            <span className="button__text">Resume/CV</span>
            <span className="button__icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 35 35"
                id="bdd05811-e15d-428c-bb53-8661459f9307"
                data-name="Layer 2"
                className="svg"
                aria-hidden="true"
              >
                <path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z"></path>
                <path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z"></path>
                <path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z"></path>
              </svg>
            </span>
          </button>
        </section>

        <section className="about-education-wrap" aria-label="Education">
          <div className="notification" aria-label="Education">
            <div className="notiglow" />
            <div className="notiborderglow" />

            <div className="notification-content">
              <div className="notification-text">
                <div className="notititle">University of Central Florida</div>
                <div className="notibody">Bachelor of Science in Computer Science</div>
                <div className="notibody">December 2025</div>
              </div>

              <div className="ucf-icon-wrapper">
                <img
                  className="ucf-icon"
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Seal_of_the_University_of_Central_Florida.svg/1280px-Seal_of_the_University_of_Central_Florida.svg.png?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=thumbnail"
                  alt="UCF Logo"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="content-section section-work" id="work" aria-labelledby="work-title">
          <h2 id="work-title">Work experience 👩‍💻</h2>
          <Timeline data={workTimelineData} hideHeader endOffset={38} className="work-timeline" />
        </section>

        <section className="content-section section-projects" id="projects" aria-labelledby="projects-title">
          <h2 id="projects-title">Projects 🌠</h2>
          <div className="projects-stack">
            <div className="nhost-card">
              <div className="card-grid" />
              <div className="card-glow" />

              <div className="card-header">
                <div className="brand-wrapper">
                  <div className="logo-container">
                    <img
                      className="project-ucf-logo"
                      src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Seal_of_the_University_of_Central_Florida.svg/1280px-Seal_of_the_University_of_Central_Florida.svg.png?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=thumbnail"
                      alt="UCF logo"
                    />
                  </div>

                  <span className="brand-text">Senior Design Capstone</span>
                </div>

                <div className="action-buttons">
                  <a
                    className="btn-icon"
                    href="https://www.cecs.ucf.edu/SeniorDesignShowcase/team/army-reserve-mercury-2/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View Army Reserve Mercury project"
                  >
                    <svg
                      className="icon link-icon"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M10.59 13.41a2 2 0 0 0 2.82 0l4-4a2 2 0 1 0-2.82-2.82l-1.17 1.17"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.41 10.59a2 2 0 0 0-2.82 0l-4 4a2 2 0 1 0 2.82 2.82l1.17-1.17"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="card-body">
                <h3 className="repo-title">
                  Army Reserve Mercury
                  <span className="blinking-cursor" />
                </h3>

                <a
                  className="repo-mobile-link"
                  href="https://www.cecs.ucf.edu/SeniorDesignShowcase/team/army-reserve-mercury-2/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Final Demo Video
                </a>

                <p className="repo-description">
                  Owned the design and implementation of an automated backend data pipeline using Python, AWS, and PostgreSQL
                  to process large-scale audit logs, improve data observability, and support scalable analytics workflows.
                </p>

                <div className="tag-wrapper">
                  <div className="tech-badge" data-tech="React">
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                      alt="React Native"
                    />
                  </div>

                  <div className="tech-badge" data-tech="Python">
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
                      alt="Python"
                    />
                  </div>

                  <div className="tech-badge" data-tech="AWS">
                    <img
                      className="aws-logo"
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg"
                      alt="AWS"
                    />
                  </div>

                  <div className="tech-badge" data-tech="PostgreSQL">
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original-wordmark.svg"
                      alt="PostgreSQL"
                    />
                  </div>
                </div>
              </div>

            </div>

            <div className="projects-spacer" aria-hidden="true" />

            <div className="nhost-card">
              <div className="card-grid" />
              <div className="card-glow" />

              <div className="card-header">
                <div className="brand-wrapper">
                  <div className="logo-container">
                    <img
                      className="project-ucf-logo"
                      src="https://d112y698adiu2z.cloudfront.net/photos/production/challenge_thumbnails/002/582/766/datas/original.png"
                      alt="Knight Hacks logo"
                    />
                  </div>

                  <span className="brand-text">Knight Hacks</span>
                </div>

                <div className="action-buttons">
                  <a
                    className="btn-icon"
                    href="https://github.com/annadelnegro/KnightLint"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View project on GitHub"
                  >
                    <svg
                      className="icon github"
                      viewBox="0 0 16 16"
                      version="1.1"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="card-body">
                <h3 className="repo-title">
                  KnightLint
                  <span className="blinking-cursor" />
                </h3>

                <a
                  className="repo-mobile-link"
                  href="https://github.com/annadelnegro/KnightLint"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit GitHub Repo
                </a>

                <p className="repo-description">
                  AI-powered code review assistant that leverages Google Gemini to analyze GitHub pull requests, flagging security vulnerabilities, code quality issues, and performance bottlenecks. It provides actionable recommendations and lets developers edit, reanalyze, and commit fixes directly from the browser.
                </p>

                <div className="tag-wrapper">
                  <div className="tech-badge" data-tech="Python">
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
                      alt="Python"
                    />
                  </div>

                  <div className="tech-badge" data-tech="TypeScript">
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
                      alt="TypeScript"
                    />
                  </div>

                  <div className="tech-badge" data-tech="CSS">
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
                      alt="CSS"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="projects-spacer" aria-hidden="true" />

            <div className="nhost-card">
              <div className="card-grid" />
              <div className="card-glow" />

              <div className="card-header">
                <div className="brand-wrapper">
                  <div className="logo-container">
                    <img
                      className="project-ucf-logo"
                      src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Seal_of_the_University_of_Central_Florida.svg/1280px-Seal_of_the_University_of_Central_Florida.svg.png?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=thumbnail"
                      alt="UCF logo"
                    />
                  </div>

                  <span className="brand-text">Database Systems</span>
                </div>

                <div className="action-buttons">
                  <a
                    className="btn-icon"
                    href="https://github.com/annadelnegro/Waste-Not-Kitchen"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View Waste-Not-Kitchen project on GitHub"
                  >
                    <svg
                      className="icon github"
                      viewBox="0 0 16 16"
                      version="1.1"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="card-body">
                <h3 className="repo-title">
                  Waste-Not-Kitchen
                  <span className="blinking-cursor" />
                </h3>

                <a
                  className="repo-mobile-link"
                  href="https://github.com/annadelnegro/Waste-Not-Kitchen"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit GitHub Repo
                </a>

                <p className="repo-description">
                  A web application that helps restaurants reduce food waste by connecting surplus meals with customers, donors, and people in need. Restaurants can list available plates, users can reserve or donate meals, and admins can manage reports through a role-based platform.
                </p>

                <div className="tag-wrapper">
                  <div className="tech-badge" data-tech="PHP">
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg"
                      alt="PHP"
                    />
                  </div>

                  <div className="tech-badge" data-tech="MySQL">
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
                      alt="MySQL"
                    />
                  </div>

                  <div className="tech-badge" data-tech="JavaScript">
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
                      alt="JavaScript"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="projects-spacer" aria-hidden="true" />

            <div className="nhost-card">
              <div className="card-grid" />
              <div className="card-glow" />

              <div className="card-header">
                <div className="brand-wrapper">
                  <div className="logo-container">
                    <img
                      className="project-ucf-logo"
                      src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Seal_of_the_University_of_Central_Florida.svg/1280px-Seal_of_the_University_of_Central_Florida.svg.png?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=thumbnail"
                      alt="UCF logo"
                    />
                  </div>

                  <span className="brand-text">Processes for Object-Oriented Software Development</span>
                </div>

                <div className="action-buttons">
                  <a
                    className="btn-icon"
                    href="https://github.com/annadelnegro/Xplora"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View Xplora.fun project on GitHub"
                  >
                    <svg
                      className="icon github"
                      viewBox="0 0 16 16"
                      version="1.1"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="card-body">
                <h3 className="repo-title">
                  Xplora.fun
                  <span className="blinking-cursor" />
                </h3>

                <a
                  className="repo-mobile-link"
                  href="https://github.com/annadelnegro/Xplora"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit GitHub Repo
                </a>

                <p className="repo-description">
                  Full-stack travel planning application that lets users organize trips, flights, accommodations, and activities in one place. Users can create and customize trips, manage their profiles, upload photos, and securely recover accounts through email verification and password reset features.
                </p>

                <div className="tag-wrapper">
                  <div className="tech-badge" data-tech="JavaScript">
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
                      alt="JavaScript"
                    />
                  </div>

                  <div className="tech-badge" data-tech="TypeScript">
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
                      alt="TypeScript"
                    />
                  </div>

                  <div className="tech-badge" data-tech="Node.js">
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
                      alt="Node.js"
                    />
                  </div>

                  <div className="tech-badge" data-tech="Express.js">
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"
                      alt="Express.js"
                    />
                  </div>

                  <div className="tech-badge" data-tech="MongoDB">
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
                      alt="MongoDB"
                    />
                  </div>

                  <div className="tech-badge" data-tech="AWS">
                    <img
                      className="aws-logo"
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg"
                      alt="AWS"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="projects-spacer" aria-hidden="true" />

            <div className="nhost-card">
              <div className="card-grid" />
              <div className="card-glow" />

              <div className="card-header">
                <div className="brand-wrapper">
                  <div className="logo-container">
                    <img
                      className="project-ucf-logo"
                      src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Seal_of_the_University_of_Central_Florida.svg/1280px-Seal_of_the_University_of_Central_Florida.svg.png?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=thumbnail"
                      alt="UCF logo"
                    />
                  </div>

                  <span className="brand-text">Mobile Device Software Development</span>
                </div>

                <div className="action-buttons">
                  <a
                    className="btn-icon"
                    href="https://github.com/annadelnegro/ConnectFour"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View ConnectFour project on GitHub"
                  >
                    <svg
                      className="icon github"
                      viewBox="0 0 16 16"
                      version="1.1"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="card-body">
                <h3 className="repo-title">
                  ConnectFour
                  <span className="blinking-cursor" />
                </h3>

                <a
                  className="repo-mobile-link"
                  href="https://github.com/annadelnegro/ConnectFour"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit GitHub Repo
                </a>

                <p className="repo-description">
                  Android Connect Four game designed for local two-player gameplay. Players take turns dropping discs into a responsive game board, with automatic win detection for horizontal, vertical, and diagonal matches, visual feedback, animations, and an option to quickly restart the game.
                </p>

                <div className="tag-wrapper">
                  <div className="tech-badge" data-tech="Java">
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"
                      alt="Java"
                    />
                  </div>

                  <div className="tech-badge" data-tech="Android Studio">
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg"
                      alt="Android Studio"
                    />
                  </div>

                  <div className="tech-badge" data-tech="Android">
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg"
                      alt="Android"
                    />
                  </div>

                  <div className="tech-badge" data-tech="XML">
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xml/xml-original.svg"
                      alt="XML"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="skills-section" id="contact" aria-labelledby="skills-title">
          <div className="card">
            <span className="title" id="skills-title">Skills</span>
            <div className="card__tags">
              <ul className="tag">
                <li className="tag__name">java</li>
                <li className="tag__name">python</li>
                <li className="tag__name">typescript</li>
                <li className="tag__name">javascript</li>
                <li className="tag__name">react</li>
                <li className="tag__name">spring boot</li>
                <li className="tag__name">node.js</li>
                <li className="tag__name">express</li>
                <li className="tag__name">fastapi</li>
                <li className="tag__name">aws</li>
                <li className="tag__name">docker</li>
                <li className="tag__name">kubernetes</li>
                <li className="tag__name">postgresql</li>
                <li className="tag__name">mongodb</li>
                <li className="tag__name">rest apis</li>
                <li className="tag__name">git</li>
                <li className="tag__name">ci/cd</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <div className="dice-tooltip-wrap" aria-hidden={false}>
        <div className="dice-desktop">
          <Tooltip>
            <TooltipTrigger>
              <button
                className="dice-button"
                type="button"
                aria-label="Show a random fun fact"
                onMouseEnter={() => setDiceMessage(getRandomDiceMessage())}
                onFocus={() => setDiceMessage(getRandomDiceMessage())}
              >
                🎲
              </button>
            </TooltipTrigger>
            <TooltipContent className="dice-tooltip-content">
              {diceMessage}
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="dice-mobile" ref={mobileDiceRef}>
          <button
            className="dice-button"
            type="button"
            aria-label="Show a random fun fact"
            aria-expanded={isMobileDiceOpen}
            onClick={handleMobileDiceTap}
          >
            🎲
          </button>

          {isMobileDiceOpen && (
            <div role="tooltip" className="dice-tooltip-content dice-tooltip-content--mobile">
              {diceMessage}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default App

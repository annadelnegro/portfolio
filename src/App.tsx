import './App.css'
import { FloatingDock } from './components/ui/floating-dock'
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
  { title: 'Contact', icon: <IconMail className="dock-icon" />, href: '#contact' },
  {
    title: 'GitHub',
    icon: <IconBrandGithub className="dock-icon" />, 
    href: 'https://github.com/',
  },
  {
    title: 'LinkedIn',
    icon: <IconBrandLinkedin className="dock-icon" />, 
    href: 'https://www.linkedin.com/',
  },
]

function App() {
  return (
    <main className="portfolio-page">
      <div className="portfolio-shell">
        <section className="hero-card blob" id="home" aria-labelledby="intro-name">
          <div className="hero-copy">
            <p className="eyebrow">Portfolio</p>
            <h1 id="intro-name">Anna Del Negro</h1>
            <p className="subtitle">SWE @ JP Morgan</p>
          </div>
        </section>

        <section className="dock-wrap" aria-label="Primary navigation">
          <FloatingDock items={dockItems} desktopClassName="portfolio-dock" />
        </section>

        <section className="about-card" id="about" aria-labelledby="about-title">
          <h2 id="about-title">About me</h2>
          <p>
            I design and build calm, polished digital products with a focus on
            visual clarity, dependable engineering, and details that make the
            interface feel finished.
          </p>
        </section>

        <section className="content-section section-work" id="work" aria-labelledby="work-title">
          <p className="panel-label">Work</p>
          <h2 id="work-title">Work experience</h2>
          <p>
            Placeholder content for the work anchor. This section can later
            become a timeline, resume summary, or role highlights.
          </p>
        </section>

        <section className="content-section section-projects" id="projects" aria-labelledby="projects-title">
          <p className="panel-label">Projects</p>
          <h2 id="projects-title">Selected projects</h2>
          <p>
            Placeholder content for projects. You can swap this into
            screenshots, cards, or case studies once you add real content.
          </p>
        </section>

        <section className="content-section section-contact" id="contact" aria-labelledby="contact-title">
          <p className="panel-label">Contact</p>
          <h2 id="contact-title">Get in touch</h2>
          <p>
            Placeholder contact section for email, socials, and any other ways
            you want people to reach you from the dock.
          </p>
        </section>
      </div>
    </main>
  )
}

export default App

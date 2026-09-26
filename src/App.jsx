import { useEffect, useState } from 'react'
import './App.css'

const fallbackProjects = [
  { name: 'HAWP', description: 'A durable, human-led workflow protocol for building with AI.', version: '0.0.23', status: 'Published', url: 'https://github.com/sentzunhat/human-ai-workflow-protocol/releases/tag/0.0.23', accent: 'coral' },
  { name: 'Zacatl', description: 'A blazing-fast, minimal, straightforward library for practical services.', version: '0.0.61', status: 'Published', url: 'https://github.com/sentzunhat/zacatl/releases/tag/v0.0.61', accent: 'violet' },
]

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('sentzunhat-theme') || 'system')
  const [projects, setProjects] = useState(fallbackProjects)

  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('sentzunhat-theme', theme) }, [theme])
  useEffect(() => { fetch('/api/projects').then((response) => response.ok ? response.json() : Promise.reject()).then(setProjects).catch(() => {}) }, [])

  return <main className="shell">
    <nav className="nav" aria-label="Main navigation">
      <a className="wordmark" href="#top" aria-label="sentzunhat home"><span className="mark">s</span><span>sentzunhat</span></a>
      <div className="nav-actions"><a href="#projects">Projects</a><a href="https://github.com/sentzunhat" target="_blank" rel="noreferrer">GitHub ↗</a><label className="theme-picker"><span className="sr-only">Theme</span><select value={theme} onChange={(event) => setTheme(event.target.value)} aria-label="Theme"><option value="system">System</option><option value="light">Light</option><option value="dark">Dark</option></select></label></div>
    </nav>
    <section className="hero" id="top"><p className="eyebrow">Independent software · Winnipeg, Canada</p><h1>Small tools.<br /><em>Thoughtfully made.</em></h1><p className="intro">sentzunhat is a small home for focused software, careful systems, and useful experiments.</p><a className="text-link" href="#projects">Explore the projects <span>↓</span></a></section>
    <section className="projects" id="projects"><div className="section-heading"><div><p className="eyebrow">Selected work</p><h2>Released projects</h2></div><p className="section-note">Two small pieces of a growing toolkit.</p></div><div className="project-grid">{projects.map((project) => <a className={`project-card ${project.accent}`} href={project.url} target="_blank" rel="noreferrer" key={project.name}><div className="card-top"><span className="project-symbol">{project.name.slice(0, 1)}</span><span className="status"><span className="status-dot" />{project.status}</span></div><div><h3>{project.name}</h3><p>{project.description}</p></div><div className="card-bottom"><span>Latest · {project.version}</span><span className="arrow">↗</span></div></a>)}</div></section>
    <footer className="footer"><span>© {new Date().getFullYear()} sentzunhat</span><span>Made with care, kept simple.</span></footer>
  </main>
}

export default App

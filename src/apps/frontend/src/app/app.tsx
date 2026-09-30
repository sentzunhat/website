import './app.css'

import { Footer } from '../components/footer'
import { Header } from '../components/header'
import { Home } from '../pages/home/home'
import { ProjectPage } from '../pages/project/project'

const currentPath = () => {
  const normalized = window.location.pathname.replace(/\/+$/, '')
  return normalized === '' ? '/' : normalized
}

function App() {
  const path = currentPath()
  const projectMatch = path.match(/^\/projects\/([^/]+)$/)

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <main
        id="main-content"
        className="mx-auto w-[min(100%-2rem,70rem)] sm:w-[min(100%-3rem,70rem)]"
      >
        <Header />
        {projectMatch?.[1]
          ? <ProjectPage slug={decodeURIComponent(projectMatch[1])} />
          : <Home />}
        <Footer />
      </main>
    </>
  )
}

export default App

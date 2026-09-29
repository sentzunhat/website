import './app.css'

import { Footer } from '../components/footer'
import { Header } from '../components/header'
import { Home } from '../pages/home/home'

function App() {
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
        <Home />
        <Footer />
      </main>
    </>
  )
}

export default App

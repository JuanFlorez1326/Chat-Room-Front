import React from 'react'
import { Chat } from './Components/Chat/Chat'
import { Footer } from './Components/Footer/Footer'
import { Header } from './Components/Header/Header'

function App() {
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <main>
        <Chat />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default App
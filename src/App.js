import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Routes from './routes'
import Jogo from './views/Jogo'

function App() {

  return (
    <>
      <Jogo />
      <BrowserRouter>
        <Routes />
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  )

}

export default App;
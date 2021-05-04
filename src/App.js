import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Routes from './routes'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes />
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  )

}

export default App;
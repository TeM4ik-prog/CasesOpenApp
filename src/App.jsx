import { useState } from 'react'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import './App.scss'
import MainOpenPage from './pages/Main/mainOpenPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <Router>


        <Routes>

          <Route path='/' element={<MainOpenPage />}>



          </Route>
        </Routes>


      </Router>


    </>
  )
}

export default App

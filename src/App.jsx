import { useEffect, useState } from 'react'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import './App.scss'
import MainOpenPage from './pages/Main/mainOpenPage'
import InventoryPage from './pages/Inventory/InventoryPage'
import { updateGradient } from './utils/changeBackgroundGredient'
import MiniGamesPage from './pages/MiniGamesPage/miniGamesPage'

function App() {
  const [count, setCount] = useState(0)


  useEffect(() => {
    let changeGradientTimer = setInterval(() => {
      updateGradient()
    }, 10);

    return () => clearInterval(changeGradientTimer)
  })

  return (
    <>

      <Router>


        <Routes>

          <Route path='/' element={<MainOpenPage />} />

          <Route path='/inventory' element={<InventoryPage />} />


          <Route path='/miniGames' element={<MiniGamesPage />} />

          

        </Routes>


      </Router>


    </>
  )
}

export default App

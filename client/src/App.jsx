import { useEffect, useState } from 'react'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import './App.scss'
import MainOpenPage from './pages/Main/mainOpenPage'
import InventoryPage from './pages/Inventory/InventoryPage'
import { updateGradient } from './utils/changeBackgroundGredient'
import MiniGamesPage from './pages/MiniGamesPage/miniGamesPage'
import StatisticPage from './pages/Statistic/StatisticPage'
import LoginPage from './pages/LoginPage/loginPage'
import ErrorPage from './pages/ErrorPage/errorPage'

function App() {


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

          <Route path='/loginUser' element={<LoginPage />} />

          <Route path='/inventory' element={<InventoryPage />} />
          <Route path='/miniGames' element={<MiniGamesPage />} />
          <Route path='/statistic' element={<StatisticPage />} />



          <Route path='/*' element={<ErrorPage />} />
        </Routes>


      </Router>


    </>
  )
}

export default App

import { createContext, useEffect, useState } from 'react'

import { Route, BrowserRouter as Router, Routes, useSearchParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import './App.scss'
import MainOpenPage from './pages/Main/mainOpenPage'
import InventoryPage from './pages/Inventory/InventoryPage'
import { updateGradient } from './utils/changeBackgroundGredient'
import MiniGamesPage from './pages/MiniGamesPage/miniGamesPage'
import StatisticPage from './pages/Statistic/StatisticPage'
import LoginPage from './pages/LoginPage/loginPage'
import ErrorPage from './pages/ErrorPage/errorPage'

import axios from 'axios'
import { localSitePath } from '../../LocalSitePath'




let userDataContext = createContext(null)

let triggerUserDataContext = createContext(null)



function App() {
  const [userData, setUserData] = useState('');
  const [triggerUpdateUser, setTriggerUpdateUser] = useState(false)



  useEffect(() => {
    let changeGradientTimer = setInterval(() => {
      updateGradient()
    }, 50);

    return () => {
      clearInterval(changeGradientTimer)
    }
  }, [])


  let handleTriggerUpdateUser = () => {
    setTriggerUpdateUser(!triggerUpdateUser)
  }


  let onGetUser = (telegramId) => {
    axios.post(
      `${localSitePath}/private/getUser`,
      { telegramId },
      { withCredentials: true })
      .then((response) => {
        // return response.data.user
        setUserData(onGetUser)
      })
      .catch((error) => {
        console.log(error)
        // window.location.href = '/login'; 
      });
  }

  useEffect(() => {
    onGetUser
  }, [triggerUpdateUser])




  return (
    <>

      <userDataContext.Provider value={{ userData, setUserData }}>
        <triggerUserDataContext.Provider value={{ handleTriggerUpdateUser }}>

          <Router>
            <Routes>
              <Route index path='/' element={<MainOpenPage />} />

              <Route exact path='/login' element={<LoginPage />} />

              <Route exact path='/inventory' element={<InventoryPage />} />
              <Route exact path='/miniGames' element={<MiniGamesPage />} />
              <Route exact path='/statistic/*' element={<StatisticPage />} />


              <Route path='*' element={<ErrorPage />} />
            </Routes>

          </Router>
        </triggerUserDataContext.Provider>
      </userDataContext.Provider>

    </>
  )
}

export {
  App,
  userDataContext,
  triggerUserDataContext,
  onGetUser


}

import GlobalStatistic from "../../components/Statistic/globalStat/globalStat";
import NavMainPage from "../../components/particals/navMainPage/navMainPage";
import { Link, NavLink, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import "./StatisticPage.scss"
import { UserStatistic } from "../../components/Statistic/userStat/userStat";


export default function StatisticPage() {


    return (
        <>
            <div className="container-page">

                <p className="top-header-text-page">Статистика</p>

                <div className="toggle-butts-stat">
                    <NavLink to={'/statistic/globalStat'}>
                        <button className="global">
                            global
                        </button>
                    </NavLink>

                    <NavLink to={'/statistic/userStat'}>
                        <button className="user">
                            user
                        </button>
                    </NavLink>



                </div>


                <Routes>
                    <Route exact path="/globalStat" element={<GlobalStatistic />} />

                    <Route exact path="/userStat" element={<UserStatistic />} />
                </Routes>




                <Link style={{ marginTop: 'auto' }} to={'/education'}>
                    <h1>Обучение</h1>
                </Link>









            </div>

            <NavMainPage />

        </>
    )
}
import GlobalStatistic from "../../components/Statistic/globalStat/globalStat";
import NavMainPage from "../../components/particals/navMainPage/navMainPage";
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import "./StatisticPage.scss"


export default function StatisticPage() {


    return (
        <>
            <div className="stat-page-container">
                <p className="top-header-text-page">Статистика</p>

                <div>
                    <button>
                        <Link to={'/statistic/globalStat'}>
                            global
                        </Link>
                    </button>

                    <button>
                        <Link to={'/statistic/userStat'}>
                            user
                        </Link>
                    </button>
                </div>

                <Routes>
                    <Route exact path="/userStat" />

                    <Route exact path="/globalStat" element={<GlobalStatistic />} />
                </Routes>







            </div>

            <NavMainPage />

        </>
    )
}
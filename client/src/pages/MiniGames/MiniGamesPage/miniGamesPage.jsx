import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import NavMainPage from "../../../components/particals/navMainPage/navMainPage";
import "./miniGamesPage.scss";
import BombDefuserGame from "./miniGames/BombDefuserGame/BombDefuserGame";

export default function MiniGamesPage() {


    return (
        <>




            <Routes>
                <Route exact path="/BombDefuser" element={<BombDefuserGame />} />

                <Route exact path="/" element={<>
                        <div className="page-container">
                            <p className="top-header-text-page">Мини игры</p>

                            <div className="games-container">
                                <Link to={'/miniGames/BombDefuser'}>
                                    <div className="game-block">
                                        {/* <p>Bomb Defuser</p> */}
                                        <img src='../icons/game1_img.png' />

                                    </div>
                                </Link>

                                <div className="game-block">
                                    <p>Coming more soon...</p>

                                </div>
                            </div>
                        </div>
                        <NavMainPage />
                    </>} />
            </Routes>
        </>
    )
}
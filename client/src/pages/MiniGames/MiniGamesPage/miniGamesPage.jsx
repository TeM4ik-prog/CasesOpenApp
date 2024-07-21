import { Route, Routes } from 'react-router-dom';

import OneMiniGame from '../../../components/MiniGamesPrevue/OneMiniGame';
import NavMainPage from "../../../components/particals/navMainPage/navMainPage";
import BombDefuserGame from "./miniGames/BombDefuserGame/BombDefuserGame";
import "./miniGamesPage.scss";

export default function MiniGamesPage() {


    return (
        <>




            <Routes>
                <Route exact path="/BombDefuser" element={<BombDefuserGame />} />

                <Route exact path="/" element={<>
                    <div className="container-page">
                        <p className="top-header-text-page">Мини игры</p>

                        <div className="games-container">
                            <OneMiniGame link={'/miniGames/BombDefuser'} img={'../icons/game1_img.png'} />

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
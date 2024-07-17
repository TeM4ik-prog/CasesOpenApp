import { Link } from "react-router-dom";
import "./BombDefuserGame.scss"
import CoinsValueBlock from "../../../../../components/coinsValue/coinsValue";
import { useState } from "react";
import Bomb from "./components/bomb/bomb";


export default function BombDefuserGame() {
    const [isBoostDialogOpen, setIsBoostDialogOpen] = useState(false)
    const [dialogInfoData, setDialogInfoData] = useState('')

    const [isUserPlay, setIsUserPlay] = useState(false)

    let handleOpenDialogBoost = (e, title) => {
        setDialogInfoData({
            title: e.currentTarget.title,
            boost_price: 100,
            multiplier: 1
        })

        setIsBoostDialogOpen(true)
    }


    let handleBoost = () => {
        console.log('boost')
    }

    let onPlay = () => {
        setIsUserPlay(true)
    }




    return (
        <div className="game-container">
            <div className="header-container">
                <div className="header-game">
                    <Link to={'/miniGames'}>
                        <h2>Exit</h2>
                    </Link>
                    <p className="game-name">Bomb Defuser</p>
                </div>

                <div className="game-info-header">
                    <p>Level: {10}</p>
                    <CoinsValueBlock value={100} />
                </div>

            </div>





            {isUserPlay ? (
                <>

                    <div className="bombs-container-field">
                        <Bomb />
                    </div>

                </>
            ) :
                <div className="button-play-container">
                    <button onClick={onPlay}>Play</button>
                </div>
            }




            <div className="bonus_screen">
                <div className="boost_block" onClick={(e) => handleOpenDialogBoost(e)} title="Скорость разминирования бомбы">
                    <img src="../icons/BombDefuser/speed_logo.png" />
                </div>

                <div className="boost_block" onClick={(e) => handleOpenDialogBoost(e)} title="Добавление времени до взрыва бомбы" >
                    <img src="../icons/BombDefuser/time_logo.png" />
                </div>

                <div className="boost_block" onClick={(e) => handleOpenDialogBoost(e)} title="Монеты за разминирование бомбы">
                    <img src="../icons/BombDefuser/money_logo.png" />
                </div>

                <div className="boost_block" onClick={(e) => handleOpenDialogBoost(e)} title="Сужение поля, в котором появляются бомбы">
                    <img src="../icons/BombDefuser/focus_logo.png" />
                </div>

            </div>








            {isBoostDialogOpen ? (
                <>
                    {/* <div className="filter-block"></div> */}


                    <div className="dialog-interact-item-container" style={{ filter: "none !important" }} >
                        <div className="header-info-dialog" >
                            <p></p>
                            <p className="text-title-dialog">Подтвердите действие</p>
                            <img onClick={() => setIsBoostDialogOpen(false)}
                                className="close-image" src="../icons/close.png">
                            </img>
                        </div>

                        <p className="title-text">{dialogInfoData.title}</p>

                        <div className="boost-info">
                            <p>Цена улучшения: <CoinsValueBlock value={dialogInfoData.boost_price} /> </p>

                            <p>Множитель: {dialogInfoData.multiplier}х</p>
                        </div>


                        <button onClick={handleBoost}>
                            <div className="butt-container-info">
                                <p>Улучшить за </p>
                                <CoinsValueBlock value={dialogInfoData.boost_price} />
                            </div>
                        </button>


                    </div>




                </>
            ) : null}


        </div>

    )
}
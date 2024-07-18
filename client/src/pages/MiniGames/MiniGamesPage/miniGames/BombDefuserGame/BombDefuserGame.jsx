import { Link } from "react-router-dom";
import axios from "axios";
import "./BombDefuserGame.scss"
import CoinsValueBlock from "../../../../../components/coinsValue/coinsValue";
import { useContext, useEffect, useState } from "react";
import Bomb from "./components/bomb/bomb";
import { localSitePath } from "../../../../../../../LocalSitePath";
import Loader from "../../../../../components/particals/loader/loader";
import { triggerUserDataContext, userDataContext } from "../../../../../App";
import { RandInt } from "../../../../../utils/functions";


export default function BombDefuserGame() {
    let { userData } = useContext(userDataContext)
    let { handleTriggerUpdateUser } = useContext(triggerUserDataContext)

    const [isBoostDialogOpen, setIsBoostDialogOpen] = useState(false)
    const [dialogInfoData, setDialogInfoData] = useState('')

    const [boostsData, setBoostsData] = useState(null)
    const [isUserPlay, setIsUserPlay] = useState(false)

    const [updateBoostsTrigger, setUpdateBoostsTrigger] = useState(false)


    let timers = [];


    // game params
    const [level, setLevel] = useState(1)
    const [bombsAr, setBombsAr] = useState([])

    const value_start_bombs = 2
    const spawn_interval = 3000//ms

    const need_clicks_default = 5
    // 

    const handleOpenDialogBoost = ({ e, boostData, name }) => {
        setDialogInfoData({
            title: e.currentTarget.title,
            boost_price: boostData.boost_price,
            multiplier: boostData.multiplier,
            name: name
        })

        setIsBoostDialogOpen(true)
    }

    const handleBoost = (boost_name) => {
        axios.post(
            `${localSitePath}/game/addBoost`,
            {
                boost_name: boost_name
            })
            .then((response) => {
                setUpdateBoostsTrigger(!updateBoostsTrigger)
                setBoostsData(null)
                setIsBoostDialogOpen(false)
                handleTriggerUpdateUser()
            })
            .catch((error) => {
                console.log(error);
            });




    }

    const LoseUser = () => {
        console.log('lose')
        setIsUserPlay(false)
        clearAllTimers()
        setBombsAr([])
    }

    const removeBomb = (id) => {
        setBombsAr(prevBombs => prevBombs.filter(bomb => bomb.key !== id));
    };


    const clearAllTimers = () => {
        timers.forEach(timer => clearTimeout(timer));
        timers = []; // Очистка массива после очистки таймеров
    };

    let onSpawnBombs = (level) => {
        console.log('onSpawnBombs ' + level);

        let defuse_clicks = (need_clicks_default * (level / 2) / boostsData.speed_boost.boost_price).toFixed(0);
        if (defuse_clicks <= 0) defuse_clicks = 1;

        let boom_time = 5000 / ((level / 2) * boostsData.time_boost.boost_price);

        for (let i = 0; i < level * value_start_bombs; i++) {
            let spawn_timer = setTimeout(() => {
                let bombParams = {
                    id: Math.random().toString(36).substr(2, 9),
                    top: RandInt(0, 90),
                    left: RandInt(0, 90),
                    rotate: `${RandInt(0, 360)}deg`,
                    defuse_clicks,
                    boom_time
                };

                setBombsAr(prevBombs => [
                    ...prevBombs,
                    <Bomb key={bombParams.id} LoseUser={LoseUser} removeBomb={removeBomb} bombParams={bombParams} />
                ]);

                if (i === (level * value_start_bombs) - 1) {
                    setLevel(prevLevel => {
                        const newLevel = prevLevel + 1;
                        console.log(newLevel);
                        onSpawnBombs(newLevel);
                        return newLevel;
                    });
                }
            }, spawn_interval / level * i);

            timers.push(spawn_timer); // Добавление ссылки на таймер в массив
        }
    };




    let onPlay = () => {

        setLevel(prevLevel => {
            setIsUserPlay(true)
            setBombsAr([])
            onSpawnBombs(level)
            return 1;
        });







    }

    useEffect(() => {
        axios.post(
            `${localSitePath}/game/getDataBoosts`, {})
            .then((response) => {
                console.log(response.data.gameData)
                setTimeout(() => {
                    setBoostsData(response.data.gameData)
                }, 100);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [updateBoostsTrigger])




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
                    <p>Level: {level}</p>
                    <CoinsValueBlock value={userData.money} />
                </div>

            </div>

            {isUserPlay ? (
                <div className="bombs-container-field">
                    {bombsAr}

                    {/* <div className="user_custom_cursor"></div> */}
                </div>


            ) :
                <div className="button-play-container" >
                    {
                        boostsData ? (
                            <button onClick={onPlay}>Play</button>
                        ) : <Loader />
                    }
                </div>
            }


            {
                boostsData ? (
                    <>
                        {!isUserPlay ? (
                            <div className="bonus_screen">
                                <div className="boost_block" onClick={(e) => handleOpenDialogBoost({ e, boostData: boostsData.speed_boost, name: 'speed_boost' })} title="Скорость разминирования бомбы">
                                    <img src="../icons/BombDefuser/speed_logo.png" />
                                </div>

                                <div className="boost_block" onClick={(e) => handleOpenDialogBoost({ e, boostData: boostsData.time_boost, name: 'time_boost' })} title="Добавление времени до взрыва бомбы" >
                                    <img src="../icons/BombDefuser/time_logo.png" />
                                </div>

                                <div className="boost_block" onClick={(e) => handleOpenDialogBoost({ e, boostData: boostsData.money_boost, name: 'money_boost' })} title="Монеты за разминирование бомбы">
                                    <img src="../icons/BombDefuser/money_logo.png" />
                                </div>

                                <div className="boost_block" onClick={(e) => handleOpenDialogBoost({ e, boostData: boostsData.focus_boost, name: 'focus_boost' })} title="Сужение поля, в котором появляются бомбы">
                                    <img src="../icons/BombDefuser/focus_logo.png" />
                                </div>

                            </div>

                        ) : <div className="empty-container" />}
                    </>
                ) : <Loader />
            }

            {
                isBoostDialogOpen ? (
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


                            <button className={`${userData.money > dialogInfoData.boost_price ? 'active' : null}`} onClick={userData.money > dialogInfoData.boost_price ? () => handleBoost(dialogInfoData.name) : null}>
                                <div className="butt-container-info">
                                    <p>Улучшить</p>
                                    <CoinsValueBlock value={dialogInfoData.boost_price} />
                                </div>
                            </button>


                        </div>




                    </>
                ) : null
            }


        </div >

    )
}
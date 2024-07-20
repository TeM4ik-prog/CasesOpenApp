import { useEffect, useRef, useState } from "react"
import "./bomb.scss"

export default function Bomb({ bombParams, removeBomb, LoseUser }) {
    const [bombProgress, setBombProgress] = useState(0)
    const [timeProgress, setTimeProgress] = useState(0);

    const handleClickBomb = () => {
        setBombProgress(prevProgress => {
            const newProgress = prevProgress + 1;

            if (newProgress >= bombParams.defuse_clicks) {
                removeBomb(bombParams.id, bombParams.level)
            }
            return newProgress;
        });
    };

    console.log(bombParams.boom_time)
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeProgress(prevTime => {
                const newTimeProgress = prevTime + (100 / (bombParams.boom_time / 500));
                if (newTimeProgress >= 100) {
                    clearInterval(interval)
                    LoseUser()
                }
                return newTimeProgress;
            });
        }, 500);

        return () => clearInterval(interval);
    }, [bombParams.boom_time, LoseUser]);


    return (

        <div className="bomb-container" onClick={handleClickBomb} style={{ top: `${bombParams.top}%`, left: `${bombParams.left}%` }}>
            <img style={{ rotate: bombParams.rotate }} src="../utils/C4.png" class="img_into" />


            <div className="bars-container">
                <div className="bar-container">
                    <div className="progress-bar" style={{ width: `${bombProgress / bombParams.defuse_clicks * 100}%` }}></div>
                </div>
                <div className="bar-container">
                    <div className="lose-bar" style={{ width: `${timeProgress}%` }}></div>
                </div>

            </div>




            {/* <meter className="progress_bar" min="0" max={bombParams.defuse_clicks} value={bombProgress}></meter>
            <meter className="lose_bar" min="0" max="100" value={timeProgress}></meter> */}
        </div>


    )
}
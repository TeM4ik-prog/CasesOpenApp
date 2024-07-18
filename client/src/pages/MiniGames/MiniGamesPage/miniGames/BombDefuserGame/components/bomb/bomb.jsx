import { useEffect, useRef, useState } from "react"
import "./bomb.scss"
import { RandInt } from "../../../../../../../utils/functions"

export default function Bomb({ bombParams, removeBomb, LoseUser }) {
    const bombRef = useRef(null)

    const [bombProgress, setBombProgress] = useState(0)
    const [timeProgress, setTimeProgress] = useState(0);


    const handleClickBomb = () => {
        setBombProgress(prevProgress => {
            const newProgress = prevProgress + 1;

            if (newProgress >= bombParams.defuse_clicks) {
                removeBomb(bombParams.id)
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
                    clearInterval(interval);
                    LoseUser(); // Вызов LoseUser при истечении времени
                }
                return newTimeProgress;
            });
        }, 500);
    
        return () => clearInterval(interval);
    }, [bombParams.boom_time, LoseUser]);


    return (
        <div className="bomb-container" onClick={handleClickBomb} style={{ top: `${bombParams.top}%`, left: `${bombParams.left}%` }}>
            <img style={{ rotate: bombParams.rotate }} src="../utils/C4.png" class="img_into" />

            <meter className="progress_bar" min="0" max={bombParams.defuse_clicks} value={bombProgress}></meter>
            <meter className="lose_bar" min="0" max="100" value={timeProgress}></meter>
        </div>
    )
}
import { Link } from "react-router-dom";
import "./OneMiniGame.scss"

export default function OneMiniGame({ img, link }) {

    return (
        <Link to={link} >
            <div className="game-block">
                <img src={img} />
            </div>
        </Link>
    )

    // ../icons/game1_img.png
    // /miniGames/BombDefuser

}


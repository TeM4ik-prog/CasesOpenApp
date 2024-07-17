import "./bomb.scss"

export default function Bomb() {


    return (
        <div className="bomb-container">

            <img src="../utils/C4.png" class="img_into" />
            <meter class="progress_bar" min="0" max="100" value="0"></meter>
            <meter class="lose_bar" min="0" max="100" value="0"></meter>

        </div>
    )
}
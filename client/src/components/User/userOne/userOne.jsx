import CoinsValueBlock from "../../coinsValue/coinsValue"
import "./userOne.scss"


export default function UserOne({ info_user }) {


    return (
        <div className="user-container">
            <img className="avatar" src={info_user.avatar} />
            <p>{info_user.username}</p>

            <CoinsValueBlock value={info_user.money} />
        </div>
    )
}
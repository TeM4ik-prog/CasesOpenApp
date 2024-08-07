import { useContext } from "react";
import { userDataContext } from "../../../App";
import CoinsValueBlock from "../../coinsValue/coinsValue";

import "./header.scss"


export default function Header() {
    let { userData } = useContext(userDataContext)

    console.log(userData)

    return (
        <>
            {userData ? (
                <div className="header-container">
                    <h3>{userData.username}</h3>
                    <CoinsValueBlock value={userData?.money} />
                </div>
            ) : <h2>Данных нет</h2>}

        </>

    )
}
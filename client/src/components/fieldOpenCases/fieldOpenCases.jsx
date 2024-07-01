import { useContext, useState } from "react"
import "./fieldOpenCases.scss"
import { userDataContext } from "../../App"
import axios from "axios"
import { localSitePath } from "../../../LocalSitePath"


export default function FieldOpenCases() {
    let { userData } = useContext(userDataContext)

    const [moneyToOpen, setMoneyToOpen] = useState('')



    let onOpen = (e) => {
        e.preventDefault()
        // alert('open ' + moneyToOpen)


        axios.post(
            `${localSitePath}/private/open`,
            { moneyToOpen })
            .then((response) => {
                console.log("User data", response.data)

                // alert('Успешный вход')

                // setTimeout(() => {
                //     window.location = '/'
                // }, 3000);
                // alert(response.data.telegramId)
            })
            .catch((error) => {
                console.log(error)
            });
    }

    return (

        <div className="fieldOpen-container">
            <div className="openCase">
                <div className="line"></div>
                <div id="allLoot"></div>
            </div>

            <form onSubmit={onOpen} className="butts-container">

                <button className="OpenButt">
                    Открыть({moneyToOpen ? moneyToOpen : 'не указанно'})
                </button>

                <input required min={10} max={userData.money} className="input_money_value" type="number"
                    placeholder="Введите стоимось открытия"
                    value={moneyToOpen}
                    onChange={(e) => (setMoneyToOpen(e.target.value))}
                />
            </form>
        </div>


    )
}
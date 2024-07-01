import { useContext, useState } from "react"
import "./fieldOpenCases.scss"
import { userDataContext } from "../../App"


export default function FieldOpenCases() {
    let { userData } = useContext(userDataContext)

    const [moneyToOpen, setMoneyToOpen] = useState('')



    let onOpen = (e) => {
        e.preventDefault()


        alert('open ' + moneyToOpen)
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
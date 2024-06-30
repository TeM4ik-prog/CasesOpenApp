import { useState } from "react"
import "./fieldOpenCases.scss"


export default function FieldOpenCases() {
    const [moneyToOpen, setMoneyToOpen] = useState('')


    return (

        <div className="fieldOpen-container">
            <div className="openCase">
                <div className="line"></div>
                <div id="allLoot"></div>
            </div>

            <div className="butts-container">

                <button className="OpenButt"
                    // onClick={}
                >Открыть,,,,({moneyToOpen ? moneyToOpen : 'не указанно'})</button>

                <input className="input_money_value" type="number"
                    placeholder="Введите стоимось открытия"
                    value={moneyToOpen}
                    onChange={(e) => (setMoneyToOpen(e.target.value))}
                />
            </div>
        </div>


    )
}
import { useContext, useState } from "react"
import "./fieldOpenCases.scss"
import { userDataContext } from "../../App"
import axios from "axios"
import { localSitePath } from "../../../LocalSitePath"
import OneItem from "../BoxItem/OneItem/oneItem"
import ItemsList from "../BoxItem/ItemsList/ItemsList"


export default function FieldOpenCases() {
    let { userData } = useContext(userDataContext)

    const [moneyToOpen, setMoneyToOpen] = useState(10)
    const [boxLoot, setBoxLoot] = useState([])



    let onOpen = (e) => {
        e.preventDefault()
        // alert('open ' + moneyToOpen)


        axios.post(
            `${localSitePath}/private/open`,
            { moneyToOpen })
            .then((response) => {
                console.log("User data", response.data)


                setBoxLoot(response.data.Result_Loot_box)

                setTimeout(() => {
                    onScrollIntoView()
                }, 2000);

            })
            .catch((error) => {
                console.log(error)
            });
    }


    let onScrollIntoView = () => {
        let elem = document.getElementById('loot_20')
        console.log(elem)

        elem.scrollIntoView({ block: "center", behavior: "smooth" });
    }

    return (

        <div className="fieldOpen-container">
            <div className="openCase">
                <div className="line"></div>

                {/* <ItemsList array_items={boxLoot} /> */}
                <div className="loot-box-container">



                    {boxLoot.map((loot, index) => (

                        <OneItem key={index} id={index} item_info={loot} />

                    ))}


                </div>
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
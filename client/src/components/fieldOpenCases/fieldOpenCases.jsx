import { useContext, useState } from "react"
import "./fieldOpenCases.scss"
import { triggerUserDataContext, userDataContext } from "../../App"
import axios from "axios"

import OneItem from "../BoxItem/OneItem/oneItem"
import ItemsList from "../BoxItem/ItemsList/ItemsList"
import { localSitePath } from "../../../../LocalSitePath"


export default function FieldOpenCases() {
    let { userData } = useContext(userDataContext)
    let { handleTriggerUpdateUser } = useContext(triggerUserDataContext)

    const [moneyToOpen, setMoneyToOpen] = useState('')
    const [boxLoot, setBoxLoot] = useState([])
    const [isBoxOpening, setIsBoxOpening] = useState(false)



    let onOpen = (e) => {
        e.preventDefault()

       
        setIsBoxOpening(true)
        // alert('open ' + moneyToOpen)


        axios.post(
            `${localSitePath}/private/open`,
            { moneyToOpen })
            .then((response) => {
                console.log("User data", response.data)

                handleTriggerUpdateUser()
                setBoxLoot(response.data.Result_Loot_box)

                setTimeout(() => {
                    onScrollIntoView()
                }, 100);

            })
            .catch((error) => {
                console.log(error)
            });
    }

    function scrollToElementX(container, element, duration) {
        const elementPos = element.getBoundingClientRect();
        const containerPos = container.getBoundingClientRect();

        const containerCenter = containerPos.width / 2;
        const elementCenter = elementPos.left + (elementPos.width / 2);

        const scrollPos = containerCenter - elementCenter;

        const lootBoxContainer = document.querySelector('.loot-box-container');
        lootBoxContainer.style.transition = `left ${duration}ms cubic-bezier(0.075, 0.82, 0.165, 1)`;
        lootBoxContainer.style.left = `${scrollPos}px`;


        setTimeout(() => {
            lootBoxContainer.style.left = `0px`;
            lootBoxContainer.style.transition = `0s`;
            setBoxLoot([])
            setIsBoxOpening(false)
        }, duration);


    }


    let onScrollIntoView = () => {
        const elem = document.getElementById('loot_19');
        const container = document.querySelector('.openCase');
        console.log(elem.getBoundingClientRect())

        scrollToElementX(container, elem, 8000);
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

            <form onSubmit={!isBoxOpening ? onOpen : null} className="butts-container">

                <button className={`OpenButt ${!isBoxOpening ? 'active' : null}`}>
                    Открыть({moneyToOpen ? moneyToOpen : 'не указанно'})
                </button>

                <input required min={10} max={userData?.money} className="input_money_value" type="number"
                    placeholder="Введите стоимось открытия"
                    value={moneyToOpen}
                    onChange={(e) => (setMoneyToOpen(e.target.value))}
                />
            </form>
        </div>


    )
}
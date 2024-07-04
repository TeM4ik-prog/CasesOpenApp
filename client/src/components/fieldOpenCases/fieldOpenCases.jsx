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

    const [isAllImagesLoaded, setIsAllImagesLoaded] = useState(false);

    const loadImage = async (url) => {
        console.log('img Loaded')
        console.log(url)
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(url);
            img.src = url;


        });
    };



    let onOpen = (e) => {

        e.preventDefault()
        setIsBoxOpening(true)

        axios.post(
            `${localSitePath}/private/open`,
            { moneyToOpen })
            .then(async (response) => {
                console.log("User data", response.data)

                handleTriggerUpdateUser()
                setBoxLoot(response.data.Result_Loot_box)

                await Promise.all(response.data.Result_Loot_box.map(image => loadImage(image.img)));
                setIsAllImagesLoaded(true)

                setTimeout(() => {
                    onScrollIntoView()
                }, 300);

            })
            .catch((error) => {
                console.log(error)
            });
    }

    function scrollToElementX(container, element, duration) {
        const elementPos = element.getBoundingClientRect();
        const containerPos = container.getBoundingClientRect();

        const lootBoxContainer = document.querySelector('.loot-box-container');

        const containerCenter = containerPos.width / 2;
        const elementCenter = elementPos.left + (elementPos.width / 2);

        console.log(lootBoxContainer.getBoundingClientRect())
        const scrollPos = containerCenter - elementCenter + containerPos.width


        lootBoxContainer.style.transition = `left ${duration}ms cubic-bezier(0.075, 0.82, 0.165, 1)`;
        lootBoxContainer.style.left = `${scrollPos}px`;


        setTimeout(() => {
            lootBoxContainer.style.transition = `0s`;
            lootBoxContainer.style.left = `100%`;
            
            setBoxLoot([])
            setIsBoxOpening(false)
            setIsAllImagesLoaded(false)
        }, duration);


    }


    let onScrollIntoView = () => {
        const elem = document.getElementById('loot_19');
        const container = document.querySelector('.openCase');

        scrollToElementX(container, elem, 8000);
    }

    return (

        <div className="fieldOpen-container">

            <div className="openCase">
                <div className="line" />

                {isBoxOpening && (
                    <>
                        {!isAllImagesLoaded && <p className="text-loading-items"
                        >Загрузка предметов...</p>}
                    </>
                )}

                <div className="loot-box-container">
                    {boxLoot.map((loot, index) => (
                        <OneItem key={index} id={index} item_info={loot} />
                    ))}
                </div>
            </div>


            <form onSubmit={!isBoxOpening ? onOpen : (e) => e.preventDefault()} className="butts-container">

                <button className={`OpenButt ${!isBoxOpening ? 'active' : null}`}>
                    Открыть({moneyToOpen ? moneyToOpen : 'не указанно'})
                </button>

                <input required min={10} max={userData?.money} className="input_money_value" type="number"
                    placeholder="Введите стоимось открытия"
                    value={moneyToOpen}
                    onChange={(e) => (setMoneyToOpen(e.target.value))}
                />
            </form>


        </div >


    )
}
import { useState } from "react"
import { ChangeColorByRare } from "../../../utils/ChangeColorByRare"
import "./oneItem.scss"

export default function OneItem({ item_info, id }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false)


    let onShowItemDialog = (itemIdInDb) => {
        setIsDialogOpen(!isDialogOpen)

        console.log(itemIdInDb)




        var popup = document.querySelector(".dialog-interact-item-container");

        // Показываем всплывающее окно
        popup.style.display = "block";

        // Получаем координаты элемента, на который нажали
        var rect = event.target.getBoundingClientRect();

        // Устанавливаем координаты всплывающего окна
        popup.style.left = rect.left + "px";
        popup.style.top = (rect.top + window.scrollY + rect.height) + "px";

    }



    return (

        <div id={!id ? null : `loot_${id}`} onClick={item_info.UserLootInInventory ? () => onShowItemDialog(item_info.id) : null} className="item-container" style={{ backgroundColor: ChangeColorByRare(item_info?.CategoryRare?.rareName) }}>
            <img src={item_info.img} />

            {item_info.UserLootInInventory ? (
                <div className="quantity-container">
                    <p>{item_info.UserLootInInventory.quantity}</p>
                </div>

            ) : null}

            {isDialogOpen ? (
                <div className="dialog-interact-item-container">
                    <button>Продать одну за </button>

                    <button>Продать Все за </button>

                </div>
            ) : null}

        </div>
    )
}
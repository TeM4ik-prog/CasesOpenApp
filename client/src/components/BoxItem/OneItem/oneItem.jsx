import { ChangeColorByRare } from "../../../utils/ChangeColorByRare"
import "./oneItem.scss"

export default function OneItem({ item_info, id }) {

    return (

        <div id={!id ? null : `loot_${id}`} className="item-container" style={{ backgroundColor: ChangeColorByRare(item_info.rare) }}>
            <img src={item_info.img} />


        </div>
    )
}
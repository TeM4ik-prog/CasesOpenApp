import { ChangeColorByRare } from "../../../utils/ChangeColorByRare"
import "./oneItem.scss"

export default function OneItem({ item_info }) {

    

    return (

        <div className="item-container" style={{backgroundColor: ChangeColorByRare(item_info.rare)}}>
            <img src={item_info.img} />


        </div>
    )
}
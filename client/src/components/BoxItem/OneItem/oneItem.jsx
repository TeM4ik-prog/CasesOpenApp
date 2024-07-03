import { useContext, useState } from "react"
import { ChangeColorByRare } from "../../../utils/ChangeColorByRare"
import "./oneItem.scss"
import axios from "axios"
import { localSitePath } from "../../../../LocalSitePath"
import CoinsValueBlock from "../../coinsValue/coinsValue"
import { triggerUserDataContext } from "../../../App"

export default function OneItem({ item_info, id, handleTrigger }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    let { handleTriggerUpdateUser } = useContext(triggerUserDataContext)

    
    let onSellItem = ({ itemIdInDb, isSellAll }) => {

        axios.post(
            `${localSitePath}/private/sellItem`,
            { itemIdInDb, isSellAll })
            .then((response) => {
                console.log("User data", response.data)

                setIsDialogOpen(false)
                handleTrigger()
                handleTriggerUpdateUser()
            })
            .catch((error) => {
                console.log(error)
            });

    }

    return (

        <div id={!id ? null : `loot_${id}`} className="item-container" style={{ backgroundColor: ChangeColorByRare(item_info?.CategoryRare?.rareName) }}>

            <img src={item_info.img} onClick={item_info.openPrice ? () => (setIsDialogOpen(true)) : null} />

            <div className="prevue-container-info">
                {item_info.quantity ? (
                    <div className="mini-block-container">
                        <p>{item_info.quantity}</p>
                    </div>

                ) : null}

                {/* {item_info.openPrice ? (
                    <div className="mini-block-container openPrice">
                        <p>{item_info.openPrice}</p>
                    </div>

                ) : null} */}

            </div>






            {isDialogOpen ? (
                <>
                    <div className="filter-block"></div>
                    <div className="dialog-interact-item-container" style={{ filter: "none !important" }} >
                        <div className="header-info-dialog" >
                            <p></p>
                            <p className="text-title-dialog">Выберете действие</p>
                            <img onClick={() => setIsDialogOpen(false)}
                                className="close-image" src="../icons/close.png">
                            </img>
                        </div>

                        <div className="openPrice-info">
                            <p>Выша цена открытия: </p>
                            <CoinsValueBlock value={item_info.openPrice} />
                        </div>

                        <img className="item_dialog-img" src={item_info.img} />

                        <div className="sell-butts-container">
                            <button onClick={() => onSellItem({ itemIdInDb: item_info.id, isSellAll: false })}>
                                <div className="butt-container-info">
                                    <p>Продать одно за: </p>
                                    <CoinsValueBlock value={item_info.sellPriceInfo.sellOne} />
                                </div>
                            </button>

                            <button onClick={() => onSellItem({ itemIdInDb: item_info.id, isSellAll: true })}>
                                <div className="butt-container-info">
                                    <p> Продать всё за: </p>
                                    <CoinsValueBlock value={item_info.sellPriceInfo.sellAll} />
                                </div>
                            </button>
                        </div>


                    </div>

                </>
            ) : null}

        </div >





    )
}
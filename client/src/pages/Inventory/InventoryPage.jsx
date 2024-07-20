import { useEffect, useState } from "react";
import ItemsList from "../../components/BoxItem/ItemsList/ItemsList";
import CoinsValueBlock from "../../components/coinsValue/coinsValue";
import Header from "../../components/particals/header/header";
import NavMainPage from "../../components/particals/navMainPage/navMainPage";
import axios from "axios";
import { localSitePath } from "../../../../LocalSitePath";
import Loader from "../../components/particals/loader/loader";





export default function InventoryPage() {
    const [userInventory, setUserInventory] = useState([])

    const [triggerUpdate, setTriggerUpdate] = useState(false)

    const [isInventoryLoading, setIsInventoryLoading] = useState(true)

    let handleTrigger = () => {
        setTriggerUpdate(!triggerUpdate)
    }


    useEffect(() => {
        axios.post(
            `${localSitePath}/private/getUserInventory`,
            {})
            .then((response) => {
                console.log("User data", response.data)
                setTimeout(() => {
                    setUserInventory(response.data.userInventory)
                    setIsInventoryLoading(false)
                }, 100);

            })
            .catch((error) => {
                console.log(error)
            });
    }, [triggerUpdate])

    userInventory
    return (
        <>
            <Header />
            <div className="container-page">

                    <p className="top-header-text-page">Инвентарь</p>

                    {!isInventoryLoading ? (
                        <ItemsList array_items={userInventory} handleTrigger={handleTrigger} />
                    ) : <Loader />}

            </div>

            <NavMainPage />


        </>
    )
}
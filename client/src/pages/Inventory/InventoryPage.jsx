import { useEffect, useState } from "react";
import ItemsList from "../../components/BoxItem/ItemsList/ItemsList";
import CoinsValueBlock from "../../components/coinsValue/coinsValue";
import Header from "../../components/particals/header/header";
import NavMainPage from "../../components/particals/navMainPage/navMainPage";
import axios from "axios";
import { localSitePath } from "../../../../LocalSitePath";





export default function InventoryPage() {
    const [userInventory, setUserInventory] = useState([])

    const [triggerUpdate, setTriggerUpdate] = useState(false)

    let handleTrigger = () => {
        setTriggerUpdate(!triggerUpdate)
    }


    useEffect(() => {
        axios.post(
            `${localSitePath}/private/getUserInventory`,
            {})
            .then((response) => {
                console.log("User data", response.data)

                setUserInventory(response.data.userInventory)
            })
            .catch((error) => {
                console.log(error)
            });
    }, [triggerUpdate])

    userInventory
    return (
        <>
            <div style={{ width: '100%' }}>
                <Header />
                <div>
                    <h1>Inventory page</h1>


                    <ItemsList array_items={userInventory} handleTrigger={handleTrigger} />
                </div>
            </div>

            <NavMainPage />


        </>
    )
}
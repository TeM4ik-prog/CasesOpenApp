import ItemsList from "../../components/BoxItem/ItemsList/ItemsList";
import CoinsValueBlock from "../../components/coinsValue/coinsValue";
import NavMainPage from "../../components/particals/navMainPage/navMainPage";

export default function InventoryPage() {


    let ar = [
        {
            img: '/itemsImgs/e1.png',
            rare: 'common'
        },
        {
            img: '/itemsImgs/e2.png',
            rare: 'epic'
        }
    ]


    return (
        <>
            <div>
                <h1>Inventory page</h1>


                <ItemsList array_items={ar} />
            </div>


            <NavMainPage />

            <CoinsValueBlock />
        </>
    )
}
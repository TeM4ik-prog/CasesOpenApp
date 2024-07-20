import ItemsList from "../../../components/BoxItem/ItemsList/ItemsList";
import OneItem from "../../../components/BoxItem/OneItem/oneItem";
import FieldOpenCases from "../../../components/fieldOpenCases/fieldOpenCases";


export default function Slide2() {


    return (
        <>
            <div className="info-slide">
                <p className="title-text">Редкость предметов</p>

                <p className="info-text">У каждого предмета есть своя редкость. Чем выше редкость, тем дороше стоит предмет</p>

            </div>

            <div className="container-more-info">
                <ItemsList array_items={
                    [
                        {
                            img: "./itemsImgs/uncommon/1.png",
                            quantity: 3,
                            CategoryRare: {
                                rareName: "uncommon"
                            }
                        },
                        {
                            img: "./itemsImgs/epic/1.png",
                            quantity: 1,
                            CategoryRare: {
                                rareName: "epic"
                            }
                        },
                        {

                            img: "./itemsImgs/common/3.png",
                            quantity: 2,

                            CategoryRare: {
                                rareName: "common"
                            }
                        },
                        {

                            img: "./itemsImgs/common/2.png",
                            quantity: 1,

                            CategoryRare: {
                                rareName: "common"
                            }
                        }]} />

                <p className="info-text">Одинаковые предметы с одной и той же ценой будут складываться</p>
            </div>
        </>
    )
}
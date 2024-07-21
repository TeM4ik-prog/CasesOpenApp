import CoinsValueBlock from "../../../components/coinsValue/coinsValue";


import "../../../components/BoxItem/OneItem/oneItem.scss"


export default function Slide3() {


    return (
        <>
            <div className="info-slide">
                <p className="title-text">Продажа предмета</p>

                <p className="info-text">При нажатии на предмет откроется окно</p>

            </div>


            <div className="container-more-info">
                <div className="dialog-interact-item-container" style={{ filter: "none !important", margin: '0 auto 0 auto', width: '100%', boxSizing: 'border-box', position: 'relative', top: '0', left: '0', transform: 'none' }} >
                    <div className="header-info-dialog" >
                        <p></p>
                        <p className="text-title-dialog">Выберете действие</p>
                        <img className="close-image" src="../icons/close.png" />

                    </div>

                    <div className="openPrice-info">
                        <header>Ваша цена открытия: </header>
                        <CoinsValueBlock value={100} />
                    </div>

                    <img className="item_dialog-img" src="./itemsImgs/epic/1.png" />

                    <div className="sell-butts-container">
                        <button>
                            <div className="butt-container-info">
                                <p>Продать одно за </p>
                                <CoinsValueBlock value={300} />
                            </div>
                        </button>

                        <button>
                            <div className="butt-container-info">
                                <p> Продать всё за </p>
                                <CoinsValueBlock value={600} />
                            </div>
                        </button>
                    </div>


                </div>

                <p className="info-text">Тут можно продать как один предмет, так и все сразу</p>

            </div>
        </>
    )
}
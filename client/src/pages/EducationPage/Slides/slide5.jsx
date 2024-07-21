import OneMiniGame from "../../../components/MiniGamesPrevue/OneMiniGame";

export default function Slide5() {


    return (
        <>
            <div className="info-slide">
                <p className="title-text">Мини игры</p>

                <p className="info-text">Тут также есть мини игры</p>

            </div>

            <div className="container-more-info">
                <OneMiniGame link={''} img={'../icons/game1_img.png'} />


                <p className="info-text">Здесь ты может поднять свой баланс</p>

            </div>
        </>
    )
}
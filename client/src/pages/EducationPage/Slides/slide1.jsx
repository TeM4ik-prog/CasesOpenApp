import FieldOpenCases from "../../../components/fieldOpenCases/fieldOpenCases";

export default function Slide1() {


    return (
        <>
            <div className="info-slide">
                <p className="title-text">Открывай кейсы</p>

                <p className="info-text">Чем больше ты ставишь стоимось открытия,
                    тем больше ты получишь, если выйграешь</p>

            </div>


            <FieldOpenCases isActive={false} />
        </>
    )
}
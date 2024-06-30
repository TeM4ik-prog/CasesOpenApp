import { useEffect } from "react"
import { updateGradient } from "../../utils/changeBackgroundGredient"
import FieldOpenCases from "../../components/fieldOpenCases/fieldOpenCases";
import CoinsValueBlock from "../../components/coinsValue/coinsValue";

export default function MainOpenPage() {


    useEffect(() => {
        let changeGradientTimer = setInterval(() => {
            updateGradient()
        }, 10);

        return () => clearInterval(changeGradientTimer)
    })

    return (
        <>

            <FieldOpenCases />


            <CoinsValueBlock value={100} />
        </>
    )
}
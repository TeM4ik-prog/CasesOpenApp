import { useEffect } from "react"
import "./mainOpenPage.scss"
import { updateGradient } from "../../utils/changeBackgroundGredient"
import FieldOpenCases from "../../components/fieldOpenCases/fieldOpenCases";
import CoinsValueBlock from "../../components/coinsValue/coinsValue";
import NavMainPage from "../../components/particals/navMainPage/navMainPage";

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
            <NavMainPage />


            <CoinsValueBlock value={100} />
        </>
    )
}
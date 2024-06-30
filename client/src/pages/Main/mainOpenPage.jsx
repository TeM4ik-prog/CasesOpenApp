import { useEffect } from "react"
import "./mainOpenPage.scss"
import { updateGradient } from "../../utils/changeBackgroundGredient"
import FieldOpenCases from "../../components/fieldOpenCases/fieldOpenCases";
import CoinsValueBlock from "../../components/coinsValue/coinsValue";
import NavMainPage from "../../components/particals/navMainPage/navMainPage";

export default function MainOpenPage() {


   

    return (
        <>
            <FieldOpenCases />
            <NavMainPage />


            <CoinsValueBlock value={100} />
        </>
    )
}
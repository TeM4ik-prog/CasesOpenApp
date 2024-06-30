import { useEffect } from "react"
import { updateGradient } from "../../utils/changeBackgroundGredient"
import FieldOpenCases from "../../components/fieldOpenCases/fieldOpenCases";

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
        </>
    )
}
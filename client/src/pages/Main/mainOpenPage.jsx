import { useEffect, useState } from "react"
import "./mainOpenPage.scss"
import { updateGradient } from "../../utils/changeBackgroundGredient"
import FieldOpenCases from "../../components/fieldOpenCases/fieldOpenCases";
import CoinsValueBlock from "../../components/coinsValue/coinsValue";
import NavMainPage from "../../components/particals/navMainPage/navMainPage";


import axios from "axios"
import { useParams, useSearchParams } from "react-router-dom";


export default function MainOpenPage() {

    const [username, setUsername] = useState('')

    const [searchParams] = useSearchParams();
    alert(searchParams.get("token"))

    // useEffect(() => {
    //     axios.post(
    //         'http://localhost:5000/getUser',
    //         {},
    //         {
    //             withCredentials: true // Включаем передачу куки
    //         })
    //         .then((response) => {
    //             console.log("User data", response.data)

    //             setUsername(response.data.telegramId)
    //             // alert(response.data.telegramId)
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         });

    // }, [])





    return (
        <>
            <h3 style={{ color: 'white' }}>{username ? username : 'undefined'}</h3>
            <FieldOpenCases />
            <NavMainPage />


            <CoinsValueBlock value={100} />
        </>
    )
}

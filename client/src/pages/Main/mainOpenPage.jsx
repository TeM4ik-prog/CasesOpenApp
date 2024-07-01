import { useEffect, useState } from "react"
import "./mainOpenPage.scss"
import { updateGradient } from "../../utils/changeBackgroundGredient"
import FieldOpenCases from "../../components/fieldOpenCases/fieldOpenCases";
import CoinsValueBlock from "../../components/coinsValue/coinsValue";
import NavMainPage from "../../components/particals/navMainPage/navMainPage";


import axios from "axios"
import { useParams, useSearchParams } from "react-router-dom";
import { localSitePath } from "../../../LocalSitePath";


export default function MainOpenPage() {

    const [username, setUsername] = useState('')


    useEffect(() => {
        axios.post(
            `${localSitePath}/api/getUser`,            {},
            {
                withCredentials: true // Включаем передачу куки
            })
            .then((response) => {
                console.log("User data", response.data)


                setUsername(response.data.user.username)
                console.log(response.data)
                // alert(response.data.telegramId)
            })
            .catch((error) => {
                console.log(error)
            });
    }, [])





    return (
        <>
            <h3 style={{ color: 'white' }}>{username ? username : 'undefined'}</h3>
            <FieldOpenCases />
            <NavMainPage />


            <CoinsValueBlock value={100} />
        </>
    )
}

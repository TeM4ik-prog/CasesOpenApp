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


    useEffect(() => {
        axios.post(
            'https://2c9e6a87-f33c-4f5c-8a80-1e8a865399e2-00-3mrn4svuqot5h.spock.replit.dev/api/getUser',
            {},
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

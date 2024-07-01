import { useEffect, useState } from "react"
import "./mainOpenPage.scss"
import { updateGradient } from "../../utils/changeBackgroundGredient"
import FieldOpenCases from "../../components/fieldOpenCases/fieldOpenCases";
import CoinsValueBlock from "../../components/coinsValue/coinsValue";
import NavMainPage from "../../components/particals/navMainPage/navMainPage";


import axios from "axios"


export default function MainOpenPage() {

    const [username, setUsername] = useState('')



    axios.post(
        'http://localhost:5000/getUser',
        {},
        {
            withCredentials: true // Включаем передачу куки
        }
    )
        .then((response) => {
            console.log("User data", response.data)

            alert(response.data.telegramId)
        })
        .catch((error) => {
            console.log(error)
        });

    // let tt = async () => {

    //     const response = await fetch('http://localhost:5000/getUser', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //        credentials: 'include'
    //     });


    // console.log(response.json())



    // axios.post(
    //     `http://localhost:5000/getUser`,
    //     {},
    //     {
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     })
    //     .then((response) => {
    //         console.log("Resp data", response.data)
    //         setUsername(response.data)
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //     });





    return (
        <>
            <h1>{username}</h1>
            <FieldOpenCases />
            <NavMainPage />


            <CoinsValueBlock value={100} />
        </>
    )
}

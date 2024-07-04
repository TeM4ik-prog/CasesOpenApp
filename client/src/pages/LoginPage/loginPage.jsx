import axios from "axios"

import { useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom";
import { localSitePath } from "../../../../LocalSitePath";





export default function LoginPage() {

    const [searchParams] = useSearchParams();
    const telegramId = searchParams.get("token")

    // alert(searchParams.get("token"))


    useEffect(() => {

        console.log(telegramId)
        axios.post(
            `${localSitePath}/auth/login`,
            { telegramId },
            {
                withCredentials: true // Включаем передачу куки
            })
            .then((response) => {
                console.log("User data", response.data)

                // alert('Успешный вход')

                // setTimeout(() => {
                //     window.location = '/'
                // }, 3000);
                // alert(response.data.telegramId)
            })
            .catch((error) => {
                console.log(error)
            });
    }, [])


    return (
        <>
            <h1>LogInPage 2</h1>


            <Link to={'/'}>
                <h3 style={{ color: 'blueviolet' }}>На главную</h3>
            </Link>


        </>
    )
}
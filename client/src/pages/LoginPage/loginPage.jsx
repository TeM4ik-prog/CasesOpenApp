import axios from "axios"
import { localSitePath } from "../../../LocalSitePath"
import { useEffect } from "react"
import { useSearchParams } from "react-router-dom";




export default function LoginPage() {

    const [searchParams] = useSearchParams();
    const telegramId = searchParams.get("token")

    // alert(searchParams.get("token"))


    useEffect(() => {
        axios.post(
            'http://localhost:5000/api/login',
            { telegramId },
            {
                withCredentials: true // Включаем передачу куки
            })
            .then((response) => {
                console.log("User data", response.data)

                alert('Успешный вход')

                setTimeout(() => {
                    window.location = '/'
                }, 3000);
                // alert(response.data.telegramId)
            })
            .catch((error) => {
                console.log(error)
            });
    }, [telegramId])


    return (
        <h1>LogInPage</h1>



    )
}
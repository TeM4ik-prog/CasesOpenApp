import axios from "axios"

import { useEffect } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { localSitePath } from "../../../../LocalSitePath";

import "./loginPage.scss"



export default function LoginPage() {
    const navigate = useNavigate();

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

                navigate('/');
            })
            .catch((error) => {
                console.log(error)
            });
    }, [])


    return (
        <>
            <div className="login-container-page">
                <p className="top-header-text-page">LogInPage</p>


                <Link to={'/'}>
                    <h3 style={{ color: 'blueviolet' }}>На главную</h3>
                </Link>

            </div>
        </>
    )
}
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { localSitePath } from "../../../../LocalSitePath";
import "./loginPage.scss";
import { triggerUserDataContext, userDataContext } from "../../App";
import Loader from "../../components/particals/loader/loader";

export default function LoginPage() {
    const { handleTriggerUpdateUser } = useContext(triggerUserDataContext);
    const { userData, setUserData } = useContext(userDataContext);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const telegramId = searchParams.get("token");

    const [isRequestComplete, setIsRequestComplete] = useState(false);

    useEffect(() => {
        if (telegramId && !isRequestComplete) {
            let isUserEducated = localStorage.getItem('educated') || false;
            axios.post(
                `${localSitePath}/auth/login`,
                { telegramId },
                { withCredentials: true }
            )
                .then((response) => {
                    handleTriggerUpdateUser();
                    
                    console.log(isUserEducated);

                    setTimeout(() => {
                        if (!Boolean(isUserEducated)) {
                            localStorage.setItem('educated', true);
                            navigate('/education');
                        } else {
                            navigate('/');
                        }

                        window.location.reload(); // Перезагрузка страницы


                    }, 3000);

                    setIsRequestComplete(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [telegramId, isRequestComplete, handleTriggerUpdateUser, navigate]);

    return (
        <div className="container-page">
            <p className="top-header-text-page">LogInPage</p>
            <Loader />
        </div>
    );
}

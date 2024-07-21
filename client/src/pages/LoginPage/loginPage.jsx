import axios from "axios";
import { useContext, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { localSitePath } from "../../../../LocalSitePath";
import "./loginPage.scss";
import { onGetUser, triggerUserDataContext, userDataContext } from "../../App";
import Loader from "../../components/particals/loader/loader";

export default function LoginPage() {
    let { handleTriggerUpdateUser } = useContext(triggerUserDataContext)

    const navigate = useNavigate();
    const { userData, setUserData } = useContext(userDataContext);
    const [searchParams] = useSearchParams();
    const telegramId = searchParams.get("token");

    useEffect(() => {
        let isUserEducated = localStorage.getItem('educated') || false
        axios.post(
            `${localSitePath}/auth/login`,
            { telegramId },
            { withCredentials: true }
        )
            .then((response) => {
                handleTriggerUpdateUser()

                console.log(isUserEducated)

                setTimeout(() => {
                    if (!Boolean(isUserEducated)) {
                        localStorage.setItem('educated', true)
                        window.location = '/education'
                        return
                    }
                    window.location = '/'
                }, 3000);

            })
            .catch((error) => {
                console.log(error);
            });
    }, [telegramId, navigate]);

    return (
        <div className="container-page">
            <p className="top-header-text-page">LogInPage</p>


            <Loader />
            {/* <Link to={'/'}>
                <h3 style={{ color: 'blueviolet' }}>На главную</h3>
            </Link> */}
        </div>
    );
}
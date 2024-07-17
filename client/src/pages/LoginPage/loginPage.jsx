import axios from "axios";
import { useContext, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { localSitePath } from "../../../../LocalSitePath";
import "./loginPage.scss";
import { triggerUserDataContext, userDataContext } from "../../App";
import Loader from "../../components/particals/loader/loader";

export default function LoginPage() {
    const navigate = useNavigate();
    const { userData, setUserData } = useContext(userDataContext);
    const [searchParams] = useSearchParams();
    const telegramId = searchParams.get("token");

    useEffect(() => {
        axios.post(
            `${localSitePath}/auth/login`,
            { telegramId },
            { withCredentials: true }
        )
            .then((response) => {
                setUserData(response.data.user)
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [telegramId, navigate]);

    return (
        <div className="login-container-page">
            <p className="top-header-text-page">LogInPage</p>


            <Loader />
            {/* <Link to={'/'}>
                <h3 style={{ color: 'blueviolet' }}>На главную</h3>
            </Link> */}
        </div>
    );
}
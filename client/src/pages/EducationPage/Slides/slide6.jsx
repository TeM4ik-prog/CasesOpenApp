import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Slide6() {

    return (
        <>
            <div className="container-more-info" style={{ justifyContent: 'center' }}>
                <p className="title-text" style={{ fontSize: '300%' }}>Погнали!</p>

                <Link to={'/'}>
                    <p className="text-link">🢢 На главную</p>

                </Link>
            </div>


        </>
    )
}
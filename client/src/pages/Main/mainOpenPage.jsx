import { useEffect, useState } from "react"
import "./mainOpenPage.scss"
import { updateGradient } from "../../utils/changeBackgroundGredient"
import FieldOpenCases from "../../components/fieldOpenCases/fieldOpenCases";
import CoinsValueBlock from "../../components/coinsValue/coinsValue";
import NavMainPage from "../../components/particals/navMainPage/navMainPage";


import axios from "axios"
import { useParams, useSearchParams } from "react-router-dom";
import Header from "../../components/particals/header/header";


export default function MainOpenPage() {

    // const [username, setUsername] = useState('')








    return (
        <>
            {/* <h3 style={{ color: 'white' }}>{username ? username : 'undefined'}</h3> */}

            <div style={{ display: "inline-flex", flexDirection: 'column' }}>
                <Header />
                <div className="container-page">

                    <FieldOpenCases />
                </div>
            </div>


            <NavMainPage />


            {/* <CoinsValueBlock value={100} /> */}
        </>
    )
}

import { Link } from "react-router-dom";

export default function ErrorPage() {



    return (
        <div className="container-page">
            <h1>Error Page</h1>

            <Link to={'/'}>
                <h3 style={{color: 'blueviolet'}}>На главную</h3>
            </Link>

        </div>
    )
}
import { Link, NavLink } from "react-router-dom"
import "./navMainPage.scss"

export default function NavMainPage() {



    return (


        <div className="nav-container">
            <NavLink to={"/"}>
                <div className="icon">
                    <img src="../icons/box.png" className="icon_img" />
                </div>
            </NavLink>

            <NavLink to={'/inventory'}>
                <div className="icon">
                    <img src="../icons/logo_gun.png" className="icon_img" />
                    {/* <img src="icons/!_icon.png" className="new_item" id="new_item_id" /> */}
                </div>
            </NavLink>

            <NavLink to={'/miniGames'}>
                <div className="icon">
                    <img src="../icons/minigame_icon.png" className="icon_img" />
                </div>
            </NavLink>


            <NavLink className="end-item" to={"/statistic/globalStat"}>
                <div className="icon">
                    <img src="../icons/info.png" className="icon_img" />
                </div>
            </NavLink>

        </div >



    )
}
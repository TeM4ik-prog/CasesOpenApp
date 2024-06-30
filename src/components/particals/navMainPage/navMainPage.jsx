import "./navMainPage.scss"

export default function NavInMainPage() {



    return (


        <div className="nav-container">
            <div className="icon">
                <img src="icons/box.png" className="icon_img" />
            </div>

            <div className="icon">
                <img src="icons/logo_gun.png" className="icon_img" />
                {/* <img src="icons/!_icon.png" className="new_item" id="new_item_id" /> */}
            </div>

            <div className="icon">
                <img src="icons/minigame_icon.png" className="icon_img" />
            </div>

            <div className="icon end-item">
                <img src="icons/info.png" className="icon_img" />
            </div>

        </div>



    )
}
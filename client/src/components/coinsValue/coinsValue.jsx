import "./coinsValue.scss"

export default function CoinsValueBlock({ value }) {

    return (
        <div className="coins-container">
            <img src="../icons/coin.png" className="coin_img" />
            <p className="text_coin">{value ? value.toFixed(2) : 0}</p>
        </div>
    )
}
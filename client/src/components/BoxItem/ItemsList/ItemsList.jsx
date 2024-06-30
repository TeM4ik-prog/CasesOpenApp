import OneItem from "../OneItem/oneItem";

import "./ItemsList.scss"

export default function ItemsList({ array_items }) {


    return (

        <div className="itemslist-container">
            {array_items.map((item_data, index) => (
                <OneItem key={index} item_info={item_data} />
            ))}
        </div>
    )
}
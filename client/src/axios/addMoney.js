import axios from "axios";
import { useContext } from "react";
import { triggerUserDataContext } from "../App";
import { localSitePath } from "../../../LocalSitePath";

export function AddUserMoney(moneyValue) {
    let { handleTriggerUpdateUser } = useContext(triggerUserDataContext)

    console.log("User won " + moneyValue)

    axios.post(
        `${localSitePath}/private/addMoney`,
        { moneyValue })
        .then((response) => {
            handleTriggerUpdateUser()
        })
        .catch((error) => {
            console.log(error);
        });
}




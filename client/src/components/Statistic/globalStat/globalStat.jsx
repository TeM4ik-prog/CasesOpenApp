import { useEffect, useState } from "react"
import UserList from "../../User/usersList/usersList"
import { localSitePath } from "../../../../../LocalSitePath";
import axios from "axios";



export default function GlobalStatistic() {
    const [userList, setUserList] = useState([])

    useEffect(() => {

        axios.post(
            `${localSitePath}/stat/getGlobalStat`, {})
            .then((response) => {
                console.log(response.data)

                setUserList(response.data.SortedGlobalUsers)
            })
            .catch((error) => {
                console.log(error)
            });


    }, [])


    return (
        <UserList users_list={userList} />

    )
}
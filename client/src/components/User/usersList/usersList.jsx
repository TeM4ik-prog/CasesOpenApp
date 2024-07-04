import UserOne from "../userOne/userOne";
import "./usersList.scss"

export default function UserList({ users_list }) {

    return (
        <div className="users-container">

            {users_list.map((user_data, index) => (
                <UserOne key={index} info_user={user_data} />
            ))}

        </div>
    )
}
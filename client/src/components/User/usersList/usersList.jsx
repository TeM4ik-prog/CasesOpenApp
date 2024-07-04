import UserOne from "../userOne/userOne";

export default function UserList({ users_list }) {

    return (
        <div>

            {users_list.map((user_data, index) => (
                <UserOne key={index} info_user={user_data} />
            ))}

        </div>
    )
}
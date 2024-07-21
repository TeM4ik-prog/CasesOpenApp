import { UserStatistic } from "../../../components/Statistic/userStat/userStat";
import UserList from "../../../components/User/usersList/usersList";

export default function Slide4() {


    return (
        <>
            <div className="info-slide">
                <p className="title-text">Статистика</p>

                <p className="info-text">Ты можешь посмотреть топ людей по балансу  </p>

            </div>

            <div className="container-more-info">
                <UserList users_list={[{ username: 'user1', money: 10000 }, { username: 'user2', money: 5999 }]} />

                <p className="info-text">Или свою статистику </p>

                <UserStatistic />
            </div>





        </>
    )
}
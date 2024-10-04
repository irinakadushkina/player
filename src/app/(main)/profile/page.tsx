import { MdModeEditOutline } from "react-icons/md";
import styles from './page.module.scss';
import { getMe } from "@/app/services/user";

const Profile = async () => {
    const { first_name, last_name, email, phone_number, avatar } = await getMe();

    // todo: добавить модалки для редактирования

    return (
        <div className={styles.root}>
            <div className={styles.topLine}>
                <img alt={email} src={avatar} />
            </div>
            <div className={styles.info}>
                <div className={styles.infoItem}>
                    {first_name} {last_name} <MdModeEditOutline />
                </div>
                <div className={styles.infoItem}>
                    {phone_number} • {email}
                </div>
            </div>
        </div>
    )
}

export default Profile;

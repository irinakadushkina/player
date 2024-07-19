import { getBaseUrl } from "@/app/helpers/get-base-url";
import styles from './page.module.css';

const getMe = async () => {
    const res = await fetch(getBaseUrl() + '/api/user', { method: 'GET' });
    const { data } = await res.json();
    return data;
};

const Profile = async () => {
    const { first_name, last_name, email, phone_number, avatar } = await getMe();

    return (
        <div className={styles.root}>
            <div className={styles.topLine}>
                <img alt={email} src={avatar} />
            </div>
            <div className={styles.info}>
                <div className={styles.infoItem}>
                    <span>Name: </span> <span className={styles.value}> {first_name} {last_name} </span>
                </div>
                <div className={styles.infoItem}>
                    <span>Phone: </span> <span className={styles.value}> {phone_number} </span>
                </div>
                <div className={styles.infoItem}>
                    <span>E-Mail: </span> <span className={styles.value}> {email} </span>
                </div>
            </div>
        </div>
    )
}

export default Profile;

import { CircleLoading } from '../common-components/circle-loading';
import styles from './layout-styles.module.scss';

const MainLoading = ( ) => (
    <div className={styles.loading}>
        <CircleLoading />
    </div>
);

export default MainLoading;

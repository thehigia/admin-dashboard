import styles from './BotaoDelete.module.css';
import Delete from '../../../assets/trash-fill.svg';

const BotaoDelete = ({ onClick }) => {
    return (
        <a onClick={onClick}
            className={styles.deleteBtn}>
            <img src={Delete} />
        </a>
    )
}

export { BotaoDelete }
import styles from './BotaoEdit.module.css';
import Edit from '../../../assets/pencil-square.svg';

const BotaoEdit = ({ onClick }) => {
    return (
        <a onClick={onClick}
            className={styles.editBtn}>
            <img src={Edit} />
        </a>
    )
}

export { BotaoEdit }
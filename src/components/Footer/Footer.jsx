import style from './Footer.module.css'

const Footer = (props) => {
    const { nomeCriador } = props;
    const anoAtual = (new Date()).getFullYear();

    return (
        <div className={style.sidebar}>
            <ul className={style.list}>
                <li className={style.item}>1</li>
                <li className={style.item}>2</li>
                <li className={style.item}>3</li>
            </ul>
        </div>
    )
}

export { Footer };
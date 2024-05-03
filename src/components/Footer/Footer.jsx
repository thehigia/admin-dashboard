import style from './Footer.module.css'
import Categoria from '../../assets/Add-Layer-2--Streamline-Core.svg (1).svg'
import Post from '../../assets/Open-Book--Streamline-Core.svg.svg'
import Quiz from '../../assets/Task-List--Streamline-Core.svg.svg'
import Questoes from '../../assets/Bullet-List--Streamline-Core.svg.svg'

const Footer = () => {
    return (
        <div className={style.sidebar}>
            <ul className={style.list}>
                <li className={style.item}>
                    <a><img className={style.logo} src={Categoria} /></a>
                </li>
                <li className={style.item}>
                    <a><img className={style.logo} src={Post} /></a>
                </li>
                <li className={style.item}>
                    <a><img className={style.logo} src={Quiz} /></a>
                </li>
                <li className={style.item}>
                    <a><img className={style.logo} src={Questoes} /></a>
                </li>
            </ul>
        </div>
    )
}

export { Footer };
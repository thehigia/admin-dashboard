import style from './Sidebar.module.css'
import Categoria from '../../assets/Add-Layer-2--Streamline-Core.svg (1).svg'
import Post from '../../assets/Open-Book--Streamline-Core.svg.svg'
import Quiz from '../../assets/Task-List--Streamline-Core.svg.svg'
import Questoes from '../../assets/Bullet-List--Streamline-Core.svg.svg'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className={style.sidebar}>
            <ul className={style.list}>
                <li className={style.item}>
                    <Link to="/Categoria" title="Categorias">
                        <img className={style.logo} src={Categoria} />
                    </Link>
                </li>
                <li className={style.item}>
                    <Link to="/Posts" title="Posts">
                        <img className={style.logo} src={Post} />
                    </Link>
                </li>
                <li className={style.item}>
                    <Link to="/Quiz" title="Quiz">
                        <img className={style.logo} src={Quiz} />
                    </Link>
                </li>
                <li className={style.item}>
                    <Link to="/Questao" title="Questões">
                        <img className={style.logo} src={Questoes} />
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export { Sidebar };
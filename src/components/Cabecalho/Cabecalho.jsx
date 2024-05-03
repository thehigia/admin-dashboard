import { Link } from 'react-router-dom';
import style from './Cabecalho.module.css'
import Logo from '../../assets/logo.svg'

const Cabecalho = () => {

    return (
        <div className={style.Cabecalho}>
            <Link to='/'>
                <img className={style.logo} src={Logo} alt='Logotipo do App' />
            </Link>
        </div>
    )
}

export { Cabecalho };
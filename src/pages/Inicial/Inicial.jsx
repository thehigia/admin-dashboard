import style from './Inicial.module.css'

const Inicial = () => {

    return (
        <div className={style.Inicial}>
            <h1>Seja Bem-Vindo </h1>
            <h1> ao </h1>
            <h1>Painel Administrativo do <span className={style.Higia}>Higia Way!</span></h1>
        </div>
    )
}

export { Inicial }
import { Outlet } from "react-router-dom"
import { Cabecalho, Conteudo, Sidebar } from "../../components"
import styles from './LayoutsPadrao.module.css'

const LayoutsPadrao = () => {
    return (
        <div className={styles.layout}>
            <Cabecalho />
            <div className={styles.main}>
                <Sidebar />
                <div className={styles.content}>
                    <Conteudo>
                        <Outlet />
                    </Conteudo>
                </div>
            </div>
        </div>
    )
}

export { LayoutsPadrao } 
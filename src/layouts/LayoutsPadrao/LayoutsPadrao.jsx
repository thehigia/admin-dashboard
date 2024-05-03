import { Outlet } from "react-router-dom"
import { Cabecalho, Conteudo, Sidebar } from "../../components"

const LayoutsPadrao = () => {
    return (
        <>
            <Cabecalho />
            <Conteudo>
                <Outlet />
            </Conteudo>
            <Sidebar />
        </>
    )
}

export { LayoutsPadrao } 
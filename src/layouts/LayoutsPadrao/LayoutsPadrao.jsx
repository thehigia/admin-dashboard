import { Outlet } from "react-router-dom"
import { Cabecalho, Conteudo, Footer } from "../../components"

const LayoutsPadrao = () => {
    return (
        <>
            <Cabecalho />
            <Conteudo>
                <Outlet />
            </Conteudo>
            <Footer />
        </>
    )
}

export { LayoutsPadrao } 
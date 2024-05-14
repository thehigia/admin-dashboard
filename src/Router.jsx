import { Route, Routes } from "react-router-dom"
import { Erro404, Inicial } from "./pages"
import { LayoutsPadrao } from "./layouts"
import { Categoria, Posts, Questao, Quiz } from "./components"


const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<LayoutsPadrao />}>
                <Route path="/Categoria" element={<Categoria />} />
                <Route path="/Posts" element={<Posts />} />
                <Route path="/Quiz" element={< Quiz />} />
                <Route path="/Questao" element={<Questao />} />
                <Route path='/' element={<Inicial />} />
                <Route path='*' element={<Erro404 />} />
            </Route>
        </Routes>
    )
}

export { Router }
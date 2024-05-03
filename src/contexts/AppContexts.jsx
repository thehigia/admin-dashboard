import { createContext, useEffect, useState } from "react";
import { api } from "../services";

export const AppContext = createContext({});

export const AppContextProvider = (props) => {
    const { children } = props;
    const [category, setCategory] = useState([]);
    // const [loadingCriar, setLoadingCriar] = useState(false);
    // const [loadingEditar, setLoadingEditar] = useState(null);
    // const [loadingRemover, setLoadingRemover] = useState(null);
    // const [loadingCarregar, setLoadingCarregar] = useState(false);

    const getCateg = async () => {
        const { data = [] } = await api.get('/content/category/all');
        setCategory([
            ...data,
        ])
    }

    // const adicionarTatefa = async (nomeTarefa) => {
    //     const { data: tarefa } = await api.post('/tarefas', {
    //         nome: nomeTarefa,
    //     })
    //     setCategory(estadoAtual => {
    //         return [
    //             ...estadoAtual,
    //             tarefa,
    //         ]
    //     });
    // }

    // const removerTarefa = async (idTarefa) => {
    //     await api.delete(`tarefas/${idTarefa}`);
    //     setCategory(estadoAtual => {
    //         const tarefasAtualizadas = estadoAtual.filter(tarefa => tarefa.id !== idTarefa);

    //         return [
    //             ...tarefasAtualizadas,
    //         ];
    //     });
    // };

    // const editarTarefa = async (idTarefa, nomeTarefa) => {
    //     const { data: tarefaAtualizada } = await api.put(`tarefas/${idTarefa}`, {
    //         nome: nomeTarefa,
    //     })
    //     setCategory(estadoAtual => {
    //         const tarefasAtualizadas = estadoAtual.map(tarefa => {
    //             return tarefa.id === idTarefa ? {
    //                 ...tarefa,
    //                 nome: tarefaAtualizada.nome,
    //             } : tarefa;
    //         });

    //         return [
    //             ...tarefasAtualizadas,
    //         ]
    //     })
    // }

    useEffect(() => {
        // getCateg();
    }, [])

    return (
        <AppContext.Provider value={{
            category,
            getCateg,
            // removerTarefa,
            // editarTarefa,
        }}>
            {children}
        </AppContext.Provider>
    )
}
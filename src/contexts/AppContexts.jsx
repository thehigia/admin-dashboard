import { createContext, useEffect, useState } from "react";
import { api } from "../services";

export const AppContext = createContext({});

export const AppContextProvider = (props) => {
    const { children } = props;
    const [criador, setCriador] = useState('Felipe Gabriel')
    const [tarefas, setTarefas] = useState([]);
    const [loadingCriar, setLoadingCriar] = useState(false);
    const [loadingEditar, setLoadingEditar] = useState(null);
    const [loadingRemover, setLoadingRemover] = useState(null);
    const [loadingCarregar, setLoadingCarregar] = useState(false);

    const carregarTarefas = async () => {
        setLoadingCarregar(true);

        const { data = [] } = await api.get('/tarefas');
        setTarefas([
            ...data,
        ])
        setTimeout(() => {
            // Após o atraso, você pode realizar sua lógica de criação aqui

            // Por exemplo, redefinir o estado do loading
            setLoadingCarregar(false);
        }, 1000);

    }

    const adicionarTatefa = async (nomeTarefa) => {
        setLoadingCriar(true);

        const { data: tarefa } = await api.post('/tarefas', {
            nome: nomeTarefa,
        })
        setTarefas(estadoAtual => {
            return [
                ...estadoAtual,
                tarefa,
            ]
        });

        setTimeout(() => {
            // Após o atraso, você pode realizar sua lógica de criação aqui

            // Por exemplo, redefinir o estado do loading
            setLoadingCriar(false);
        }, 1000);
    }

    const removerTarefa = async (idTarefa) => {
        setLoadingRemover(idTarefa);

        await api.delete(`tarefas/${idTarefa}`);
        setTarefas(estadoAtual => {
            const tarefasAtualizadas = estadoAtual.filter(tarefa => tarefa.id !== idTarefa);

            return [
                ...tarefasAtualizadas,
            ];
        });
        setTimeout(() => {
            // Após o atraso, você pode realizar sua lógica de criação aqui

            // Por exemplo, redefinir o estado do loading
            setLoadingRemover(null);
        }, 1000);

    };

    const editarTarefa = async (idTarefa, nomeTarefa) => {
        setLoadingEditar(idTarefa);

        const { data: tarefaAtualizada } = await api.put(`tarefas/${idTarefa}`, {
            nome: nomeTarefa,
        })
        setTarefas(estadoAtual => {
            const tarefasAtualizadas = estadoAtual.map(tarefa => {
                return tarefa.id === idTarefa ? {
                    ...tarefa,
                    nome: tarefaAtualizada.nome,
                } : tarefa;
            });

            return [
                ...tarefasAtualizadas,
            ]
        })
        setTimeout(() => {
            // Após o atraso, você pode realizar sua lógica de criação aqui

            // Por exemplo, redefinir o estado do loading
            setLoadingEditar(null);
        }, 1000);

    }

    useEffect(() => {
        carregarTarefas();
    }, [])

    return (
        <AppContext.Provider value={{
            criador,
            tarefas,
            adicionarTatefa,
            removerTarefa,
            editarTarefa,
            loadingCarregar,
            loadingCriar,
            loadingEditar,
            loadingRemover
        }}>
            {children}
        </AppContext.Provider>
    )
}
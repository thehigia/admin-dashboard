import { createContext, useEffect, useState } from "react";
import { api } from "../services";

export const AppContext = createContext({});

export const AppContextProvider = (props) => {
    const { children } = props;
    const [category, setCategory] = useState([]);
    const [loadingDelete, setLoadingDelete] = useState(false);
    // const [loadingEditar, setLoadingEditar] = useState(null);
    // const [loadingRemover, setLoadingRemover] = useState(null);
    // const [loadingCarregar, setLoadingCarregar] = useState(false);

    const getCateg = async () => {
        try {
            const { data = [] } = await api.get('/content/category/all');

            const getTotal = data.length;

            setCategory([...data])

        } catch (error) {
            console.error('Erro ao carregar registros:', error);
        }
    };

    const addCateg = async (titleCategory) => {
        const { data: catego } = await api.post('/content/category/create', {
            title: titleCategory,
        })
        setCategory(estadoAtual => {
            return [
                ...estadoAtual,
                catego,
            ]
        });

        getCateg();
    }

    const removerCateg = async (idCateg) => {
        setLoadingDelete(true);
        try {
            await api.delete(`/content/category/delete/${idCateg}`);
            setCategory(estadoAtual => {
                const categoriasAtualizadas = estadoAtual.filter(categ => categ.id !== idCateg);

                return [
                    ...categoriasAtualizadas,
                ];
            });

        } catch (error) {
            setTimeout(() => {
                setLoadingDelete(false);
            }, 3000);
            console.log('Essa categoria não pode ser removida!', error);
            // Trate o erro como necessário
        }
    };

    const editCateg = async (idCateg, titleCategory) => {
        const { data: catego } = await api.put(`/content/category/update/${idCateg}`, {
            title: titleCategory,
        })
        setCategory(estadoAtual => {
            const categoriasAtualizadas = estadoAtual.map(categ => {
                return categ.id === idCateg ? {
                    ...categ,
                    title: catego.nome,
                } : categ;
            });

            return [
                ...categoriasAtualizadas,
            ]
        })
    }

    useEffect(() => {
        getCateg();
    }, [])

    return (
        <AppContext.Provider value={{
            category,
            getCateg,
            addCateg,
            removerCateg,
            editCateg,
            loadingDelete
        }}>
            {children}
        </AppContext.Provider>
    )
}
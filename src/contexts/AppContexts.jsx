import { createContext, useEffect, useState } from "react";
import { api } from "../services";

export const AppContext = createContext({});

export const AppContextProvider = (props) => {
    const { children } = props;
    const [category, setCategory] = useState([]);
    const [posts, setPosts] = useState([]);
    const [quiz, setQuiz] = useState([]);
    const [loadingDelete, setLoadingDelete] = useState(false);
    // const [loadingEditar, setLoadingEditar] = useState(null);
    // const [loadingRemover, setLoadingRemover] = useState(null);
    // const [loadingCarregar, setLoadingCarregar] = useState(false);

    const getCateg = async () => {
        try {
            const { data = [] } = await api.get('/content/category/all');

            setCategory([...data])

        } catch (error) {
            console.error('Erro ao carregar registros:', error);
        }
    };

    const getPost = async () => {
        try {
            const { data = [] } = await api.get('/post/all');

            setPosts([...data])

        } catch (error) {
            console.error('Erro ao carregar registros:', error);
        }
    };

    const getQuiz = async () => {
        try {
            const { data = [] } = await api.get('/quiz/all');

            setQuiz([...data])

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

    const addPost = async (title, subtitle, category, tags, urlImage, description) => {
        const { data: pos } = await api.post('/post/create', {
            title,
            subtitle,
            category,
            urlImage,
            tags,
            description,

        })
        setPosts(estadoAtual => {
            return [
                ...estadoAtual,
                pos,
            ]
        });

        getPost();
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
            }, 2000);
            console.log('Essa categoria não pode ser removida!', error);
            // Trate o erro como necessário
        }
    };

    const editCateg = async (idCateg, titleCategory) => {
        console.log("idCateg:", idCateg, "titleCategory:", titleCategory);
        try {
            const { data: catego } = await api.put(`/content/category/update/${idCateg}`, {
                title: titleCategory,
            });
            setCategory(estadoAtual => {
                const categoriasAtualizadas = estadoAtual.map(categ => {
                    return categ.id === idCateg ? {
                        ...categ,
                        title: catego.title, // Certifique-se que 'nome' é a propriedade correta
                    } : categ;
                });

                return [
                    ...categoriasAtualizadas,
                ];
            });

            getCateg();

        } catch (error) {
            console.error('Erro ao atualizar categoria:', error);
            // Trate o erro conforme necessário
        }
    }


    useEffect(() => {
        getCateg();
        getPost();
        getQuiz();
    }, [])

    return (
        <AppContext.Provider value={{
            category,
            posts,
            quiz,
            getPost,
            getCateg,
            getQuiz,
            addCateg,
            addPost,
            removerCateg,
            editCateg,
            loadingDelete
        }}>
            {children}
        </AppContext.Provider>
    )
}
import { createContext, useEffect, useState } from "react";
import { api } from "../services";

export const AppContext = createContext({});

export const AppContextProvider = (props) => {
    const { children } = props;
    const [category, setCategory] = useState([]);
    const [posts, setPosts] = useState([]);
    const [quiz, setQuiz] = useState([]);
    const [questao, setQuestao] = useState([]);
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

    const getQuestao = async () => {
        try {
            const { data = [] } = await api.get('/quiz/question/all');

            setQuestao([...data])

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

    const addPost = async (title, subtitle, category, tags, urlImage, description, urlWeb = '', copyright = '') => {
        const { data: pos } = await api.post('/post/create', {
            title,
            subtitle,
            category,
            urlImage,
            tags,
            description,
            urlWeb,
            copyright,

        })
        setPosts(estadoAtual => {
            return [
                ...estadoAtual,
                pos,
            ]
        });

        getPost();
    }

    const addQuiz = async ({ title, description, isHighlighted, sequence, backgroundImageUrl, category }) => {
        const { data: qui } = await api.post('/quiz/create', {
            title,
            description,
            sequence: parseInt(sequence),
            isHighlighted: Boolean(isHighlighted),
            backgroundImageUrl,
            category,
        });
        setQuiz(estadoAtual => [
            ...estadoAtual,
            qui,
        ]);

        getQuiz();
    };

    const addQuestao = async ({ title, explanation, sequence, correctIndex, alternatives, quiz }) => {
        const { data: ques } = await api.post('/quiz/question/create', {
            title,
            explanation,
            sequence: parseInt(sequence),
            correctIndex: parseInt(correctIndex),
            alternatives,
            quiz,
        });
        setQuestao(estadoAtual => [
            ...estadoAtual,
            ques,
        ]);

        getQuestao();
    };

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

    const removerPost = async (idPost) => {
        setLoadingDelete(true);
        try {
            await api.delete(`/post/${idPost}`);
            setPosts(estadoAtual => {
                const postAtualizadas = estadoAtual.filter(post => post.id !== idPost);

                return [
                    ...postAtualizadas,
                ];
            });

            getPost();

        } catch (error) {
            setTimeout(() => {
                setLoadingDelete(false);
            }, 2000);
            console.log('Essa categoria não pode ser removida!', error);
            // Trate o erro como necessário
        }
    };

    const removerQuiz = async (idQuiz) => {
        setLoadingDelete(true);
        try {
            await api.delete(`/quiz/delete/${idQuiz}`);
            setQuiz(estadoAtual => {
                const quizAtualizadas = estadoAtual.filter(quiz => quiz.id !== idQuiz);

                return [
                    ...quizAtualizadas,
                ];
            });

            getQuiz();

        } catch (error) {
            setTimeout(() => {
                setLoadingDelete(false);
            }, 2000);
            console.log('Essa categoria não pode ser removida!', error);
            // Trate o erro como necessário
        }
    };

    const removerQuestao = async (idQuestao) => {
        // setLoadingDelete(true);
        try {
            await api.delete(`/quiz/question/delete/${idQuestao}`);
            setQuestao(estadoAtual => {
                const questaoAtualizadas = estadoAtual.filter(quest => quest.id !== idQuestao);

                return [
                    ...questaoAtualizadas,
                ];
            });

            getQuestao();

        } catch (error) {
            setTimeout(() => {
                // setLoadingDelete(false);
            }, 2000);
            console.log('Essa categoria não pode ser removida!', error);
            // Trate o erro como necessário
        }
    };

    const editCateg = async (idCateg, titleCategory) => {
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

    const editPost = async (idPost, title, subtitle, category, tags, urlImage, description, urlWeb = '', copyright = '') => {
        try {
            const { data: updatedPost } = await api.put(`/post/${idPost}`, {
                title,
                subtitle,
                category,
                urlImage,
                tags,
                description,
                urlWeb,
                copyright,
            });

            setPosts(estadoAtual => {
                return estadoAtual.map(post =>
                    post.id === idPost ? { ...post, ...updatedPost } : post
                );
            });

            // Atualiza a lista de posts após a edição
            getPost();

        } catch (error) {
            console.error('Erro ao atualizar o post:', error);
            // Trate o erro conforme necessário
        }
    }

    const editQuiz = async (idQuiz, title, sequence, questions, isHighlighted, createdAt, backgroundImageUrl) => {
        try {
            const { data: updatedQuiz } = await api.put(`/quiz/updateName/${idQuiz}`, {
                title,
                sequence,
                category,
                questions,
                isHighlighted,
                createdAt,
                backgroundImageUrl,
            });

            setQuiz(estadoAtual => {
                return estadoAtual.map(quiz =>
                    quiz.id === idQuiz ? { ...quiz, ...updatedQuiz } : quiz
                );
            });

            // Atualiza a lista de posts após a edição
            getQuiz();

        } catch (error) {
            console.error('Erro ao atualizar o post:', error);
            // Trate o erro conforme necessário
        }
    }

    const editQuestao = async (idQuestao, title, explanation, sequence, correctIndex, alternatives, quiz) => {
        try {
            const { data: updatedQuestao } = await api.post(`/quiz/question/update/${idQuestao}`, {
                title,
                explanation,
                sequence: parseInt(sequence),
                correctIndex: parseInt(correctIndex),
                alternatives,
                quiz,
            });

            setQuestao(estadoAtual => {
                return estadoAtual.map(ques =>
                    ques.id === idQuestao ? { ...ques, ...updatedQuestao } : ques
                );
            });

            getQuestao();
        } catch (error) {
            console.error('Erro ao atualizar o post:', error);
            // Trate o erro conforme necessário
        }
    };



    useEffect(() => {
        getCateg();
        getPost();
        getQuiz();
        getQuestao();
    }, [])

    return (
        <AppContext.Provider value={{
            category,
            posts,
            quiz,
            questao,
            addCateg,
            addPost,
            addQuiz,
            addQuestao,
            removerCateg,
            removerPost,
            removerQuiz,
            removerQuestao,
            editCateg,
            editPost,
            editQuiz,
            editQuestao,
            // loadingDelete
        }}>
            {children}
        </AppContext.Provider>
    )
}
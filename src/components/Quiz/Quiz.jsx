import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../hooks';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import { BotaoEdit } from '../Botao/BoataoEdit';
import { BotaoDelete } from '../Botao/BotaoDelete';
import { ModalQuiz } from '../Modal';
import { Feedback } from '../Feedback';

import styles from './Quiz.module.css';
import TaskList from '../../assets/Task.svg';
import Search from '../../assets/ion_search.svg';

const Quiz = () => {
    const { quiz, removerQuiz, editQuiz, loadingDelete } = useAppContext();
    const [qui, setQui] = useState(quiz || []);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [pageNumber, setPageNumber] = useState(0);
    const pagesVisited = pageNumber * itemsPerPage;
    const [editingQuiz, setEditingQuiz] = useState(null);

    const handleEditClick = (quiz) => {
        setEditingQuiz(quiz);
        setShowModal(true);
    };

    const saveEditedQuiz = (quizData) => {
        editQuiz(
            editingQuiz.id,
            quizData.title,
            quizData.description,
            quizData.isHighlighted,
            quizData.sequence,
            quizData.backgroundImageUrl,
            quizData.category
        );

        setEditingQuiz(null);
        setShowModal(false);
    };

    const handleAddClick = () => {
        setEditingQuiz(null);
        setShowModal(true);
    };

    useEffect(() => {
        if (quiz) {
            const validCategories = quiz.filter(qui => qui.title && typeof qui.title === 'string');
            setQui(validCategories);
        }
    }, [quiz]);

    const displayCategories = qui
        .filter((cat) => cat.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(pagesVisited, pagesVisited + itemsPerPage);

    const pageCount = Math.ceil(qui.length / itemsPerPage);

    const handlePageClick = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div className={styles.card}>
            <header>
                <div className={styles.title_btn}>
                    <div className={styles.title}>
                        <img src={TaskList} alt='Logotipo do App' />
                        <h1>Quiz</h1>
                    </div>
                    <div>
                        <Link
                            className={styles.addButton}
                            onClick={handleAddClick}
                        >
                            Adicionar +
                        </Link>
                    </div>
                </div>
                <div className={styles.controls}>
                    <div className={styles.searchArea}>
                        <input
                            className={styles.search}
                            type="text"
                            placeholder="Pesquisar"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <img className={styles.searchIcon} src={Search} alt="Search Icon" />
                    </div>
                    <div className={styles.paginationControls}>
                        <span className={styles.span}>Apresentar</span>
                        <select
                            value={itemsPerPage}
                            onChange={e => setItemsPerPage(parseInt(e.target.value))}
                            className={styles.itemsPerPageSelect}>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={20}>20</option>
                        </select>
                        <span className={styles.span}>itens por página</span>
                    </div>
                </div>
            </header>

            <table className={styles.dataTable}>
                <thead>
                    <tr className={styles.tr_title}>
                        <th className={styles.titletab}>Título</th>
                        <th className={styles.titletab}>Categoria</th>
                        <th className={styles.titletab}>Sequência</th>
                        <th className={styles.actionsColumn}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {displayCategories.map((quiz, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? styles.evenRow : styles.oddRow}>
                            <td>{quiz.title}</td>
                            <td>{quiz.category}</td>
                            <td>{quiz.sequence}</td>
                            <td className={styles.actions}>
                                <BotaoEdit onClick={() => handleEditClick(quiz)} />
                                <BotaoDelete onClick={() => removerQuiz(quiz.id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <ReactPaginate
                previousLabel="Anterior"
                nextLabel="Próximo"
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={styles.pagination}
                activeClassName={styles.activePage}
            />

            {showModal && (
                <ModalQuiz
                    onClose={() => setShowModal(false)}
                    onSave={saveEditedQuiz}
                    isEditing={!!editingQuiz}
                    initialTitle={editingQuiz?.title || ''}
                    initialSequence={editingQuiz?.sequence || ''}
                    initialCategory={editingQuiz?.category || ''}
                    initialDescription={editingQuiz?.description || ''}
                    initialIsHighlighted={editingQuiz?.isHighlighted || false}
                    initialBackgroundImageUrl={editingQuiz?.backgroundImageUrl || ''}
                />
            )}
        </div>
    );
}

export { Quiz };

import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../hooks';
import { BotaoEdit } from '../Botao/BoataoEdit';
import { BotaoDelete } from '../Botao/BotaoDelete';
import { ModalQuestao } from '../Modal';
import { Feedback } from '../Feedback';

import ReactPaginate from 'react-paginate';
import Search from '../../assets/ion_search.svg';
import Bullet from '../../assets/Bullet.svg';
import styles from './Questao.module.css'

const Questao = () => {
    const { questao, loadingDelete } = useAppContext();
    const [questaos, setQuestaos] = useState(questao || []);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [pageNumber, setPageNumber] = useState(0);
    const pagesVisited = pageNumber * itemsPerPage;
    const [editingQuest, setEditingQuest] = useState(null);

    const handleEditClick = (questao) => {
        setEditingQuest(questao); // Verifique se 'questao' é um objeto válido com 'id'
        setShowModal(true);
    };

    const saveEditedQuests = (newTitle) => {
        // editCateg(editingCategory.id, newTitle);
        setEditingQuest(null);
        setShowModal(false);
    };

    const handleAddClick = () => {
        setShowModal(true);
    };

    useEffect(() => {
        if (questao) {
            const validQuests = questao.filter(ques => ques.title && typeof ques.title === 'string');
            setQuestaos(validQuests);
        }
    }, [questao]);

    const displayQuestoes = questaos
        .filter((ques) => ques.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(pagesVisited, pagesVisited + itemsPerPage);

    const pageCount = Math.ceil(questaos.length / itemsPerPage);

    const handlePageClick = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div className={styles.card}>
            <header>
                <div className={styles.title_btn}>
                    <div className={styles.title}>
                        <img src={Bullet} alt='Logotipo do App' />
                        <h1>Questão</h1>
                    </div>
                    <div>
                        <a className={styles.addButton} onClick={handleAddClick}>Adicionar +</a >
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
                        <img className={styles.searchIcon} src={Search} />
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
                        <th className={styles.titletab}>Quiz</th>
                        <th className={styles.actionsColumn}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {displayQuestoes.map((ques, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? styles.evenRow : styles.oddRow}>
                            <td title={ques.title}>{ques.title.substring(0, 50)}{ques.title.length > 50 ? '...' : ''}</td>
                            <td>{ques.quizTitle}</td>
                            <td className={styles.actions}>
                                <BotaoEdit
                                    // loading={loadingDelete}
                                    onClick={() => handleEditClick(ques)}
                                />
                                <BotaoDelete
                                // loading={loadingDelete}
                                // onClick={() => removerCateg(ques.id)}
                                />
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
            {loadingDelete && (
                <Feedback />
            )}
            {showModal && (
                <ModalQuestao
                    onClose={() => {
                        setEditingQuest(null);
                        setShowModal(false);
                    }}
                    initialTitle={editingQuest ? editingQuest.title : ''}
                    onSave={saveEditedQuests}
                    isEditing={Boolean(editingQuest)}
                />
            )
            }

        </div>
    );
}

export { Questao }
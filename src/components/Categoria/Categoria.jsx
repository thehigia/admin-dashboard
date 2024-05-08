import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../hooks';
import styles from './Categories.module.css';
import ReactPaginate from 'react-paginate';
import AddLayer from '../../assets/Add-Layer.svg';

import Search from '../../assets/ion_search.svg';
import { ModalCategory } from '../Modals/ModalCategory/ModalCategory';
import { Feedback } from '../Feedback';
import { BotaoDelete } from '../Botao/BotaoDelete';
import { BotaoEdit } from '../Botao/BoataoEdit';


const Categoria = () => {
    const { category, removerCateg, editCateg, loadingDelete } = useAppContext();
    const [categories, setCategories] = useState(category || []);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [pageNumber, setPageNumber] = useState(0);
    const pagesVisited = pageNumber * itemsPerPage;
    const [editingCategory, setEditingCategory] = useState(null);

    const handleEditClick = (category) => {
        setEditingCategory(category); // Verifique se 'category' é um objeto válido com 'id'
        setShowModal(true);
    };

    const saveEditedCategory = (newTitle) => {
        editCateg(editingCategory.id, newTitle);
        setEditingCategory(null);
        setShowModal(false);
    };

    const handleAddClick = () => {
        setShowModal(true);
    };

    useEffect(() => {
        if (category) {
            const validCategories = category.filter(cat => cat.title && typeof cat.title === 'string');
            setCategories(validCategories);
        }
    }, [category]);

    const displayCategories = categories
        .filter((cat) => cat.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(pagesVisited, pagesVisited + itemsPerPage);

    const pageCount = Math.ceil(categories.length / itemsPerPage);

    const handlePageClick = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div className={styles.card}>
            <header>
                <div className={styles.title_btn}>
                    <div className={styles.title}>
                        <img src={AddLayer} alt='Logotipo do App' />
                        <h1>Categoria</h1>
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
                        <th className={styles.actionsColumn}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {displayCategories.map((cat, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? styles.evenRow : styles.oddRow}>
                            <td>{cat.title}</td>
                            <td className={styles.actions}>
                                <BotaoEdit
                                    // loading={loadingDelete}
                                    onClick={() => handleEditClick(cat)}
                                />
                                <BotaoDelete
                                    // loading={loadingDelete}
                                    onClick={() => removerCateg(cat.id)}
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
                <ModalCategory
                    onClose={() => {
                        setEditingCategory(null);
                        setShowModal(false);
                    }}
                    initialTitle={editingCategory ? editingCategory.title : ''}
                    onSave={saveEditedCategory}
                    isEditing={Boolean(editingCategory)}
                />
            )
            }

        </div>
    );
};

export { Categoria };
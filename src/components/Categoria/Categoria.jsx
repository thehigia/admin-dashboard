import React, { useState } from 'react';
import { useAppContext } from '../../hooks';
import styles from './Categories.module.css';
import ReactPaginate from 'react-paginate';
import AddLayer from '../../assets/Add-Layer.svg';
import Edit from '../../assets/pencil-square.svg';
import Delete from '../../assets/trash-fill.svg';
import Search from '../../assets/ion_search.svg';

const Categoria = () => {
    const { category } = useAppContext();
    console.log("Teste", category)
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleAddClick = () => {
        setShowModal(true);
    };

    const handleSave = () => {
        // Aqui você pode fazer uma requisição para salvar a categoria
        console.log('Categoria adicionada:', title, description);
        setShowModal(false);
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    const initialCategories = [
        { id: 1, title: 'Lorem Ipsum Dolor' },
        { id: 2, title: 'Lorem Ipsum Dolor' },
        { id: 3, title: 'Lorem Ipsum Lorem Ipsum Dolor' },
        { id: 4, title: 'Lorem Ipsum Dolor' },
        { id: 5, title: 'Lorem Ipsum' },
        { id: 6, title: 'Extra Entry 1' },
        { id: 7, title: 'Extra Entry 2' },
    ];

    const [categories, setCategories] = useState(initialCategories);
    const [searchTerm, setSearchTerm] = useState('');
    const [pageNumber, setPageNumber] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const pagesVisited = pageNumber * itemsPerPage;

    const displayCategories = categories
        .filter((cat) => cat.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(pagesVisited, pagesVisited + itemsPerPage);

    const pageCount = Math.ceil(categories.length / itemsPerPage);

    const handlePageClick = ({ selected }) => {
        setPageNumber(selected);
    };

    const handleDelete = (index) => {
        const newCategories = categories.filter((_, i) => i !== index);
        setCategories(newCategories);
    };

    const currentData = initialCategories.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const changePage = (page) => {
        setCurrentPage(page);
    };


    return (
        <div className={styles.card}>
            <header>
                <div className={styles.title_btn}>
                    <div className={styles.title}>
                        <img src={AddLayer} alt='Logotipo do App' />
                        <h1>Categoria</h1>
                    </div>
                    <a className={styles.addButton} onClick={handleAddClick}>Adicionar +</a>
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
                                <a className={styles.editBtn}><img src={Edit} /></a>
                                <a className={styles.deleteBtn} onClick={() => handleDelete(idx)}><img src={Delete} /></a>
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
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h3 className={styles.titleModal}>Nova Categoria</h3>
                        <p className={styles.subtitleModal}>Preencha os campos abaixo para criar uma nova categoria</p>
                        <form className={styles.form}>
                            <div className={styles.labMod}>
                                <label className={styles.labelModal}>
                                    Título
                                </label>
                                <input
                                    className={styles.input}
                                    type="text"
                                    placeholder='Escreva o título da categoria aqui...'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className={styles.labMod}>
                                <label className={styles.labelModal}>
                                    Descrição
                                </label>
                                <textarea
                                    className={styles.textArea}
                                    value={description}
                                    placeholder='Breve descrição sobre a categoria criada...'
                                    onChange={(e) => setDescription(e.target.value)}
                                />

                            </div>
                            <div className={styles.modalButtons}>
                                <a className={styles.btnCancel} onClick={handleCancel}>Cancelar</a>
                                <a className={styles.btnSave} onClick={handleSave}>Salvar</a>
                            </div>
                        </form>
                    </div>
                </div>
            )
            }
        </div>
    );
};

export { Categoria };

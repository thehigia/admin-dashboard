import React, { useState } from 'react';
import { useAppContext } from '../../hooks';
import styles from './Categories.module.css';
import ReactPaginate from 'react-paginate';
import AddLayer from '../../assets/Add-Layer.svg';
import Edit from '../../assets/pencil-square.svg';
import Delete from '../../assets/trash-fill.svg';

const Categoria = () => {
    const { category } = useAppContext();
    console.log("Teste", category)

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
                    <a className={styles.addButton}>Adicionar +</a>
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
        </div>
    );
};

export { Categoria };

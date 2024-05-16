import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../hooks';
import { BotaoEdit } from '../Botao/BoataoEdit';
import { BotaoDelete } from '../Botao/BotaoDelete';
import ReactPaginate from 'react-paginate';
import { Feedback } from '../Feedback';
import styles from './Posts.module.css'
import Search from '../../assets/ion_search.svg';
import OpenBook from '../../assets/Open-Book.svg';
import { ModalPost } from '../Modal/ModalPost';

const Posts = () => {
    const { posts, removerCateg, editCateg, loadingDelete } = useAppContext();
    const [pos, setPos] = useState(posts || []);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [pageNumber, setPageNumber] = useState(0);
    const pagesVisited = pageNumber * itemsPerPage;
    const [editingPosts, setEditingPosts] = useState(null);

    const handleEditClick = (posts) => {
        setEditingPosts(posts); // Verifique se 'category' é um objeto válido com 'id'
        setShowModal(true);
    };

    const saveEditedPosts = (newTitle, newSubtitle, newCategory, newTags, newUrlImage, newDescription) => {
        // Edite a categoria com os novos valores
        editCateg(editingPosts.id, newTitle, newSubtitle, newCategory, newTags, newUrlImage, newDescription);
        // Limpe os campos e feche o modal
        setEditingPosts(null);
        setShowModal(false);
    };

    const handleAddClick = () => {
        setShowModal(true);
    };

    useEffect(() => {
        console.log({ posts })
        if (posts) {
            const validPos = posts.filter(pos => pos.title && typeof pos.title === 'string');
            setPos(validPos);
        }
    }, [posts]);

    const displayPos = pos
        .filter((poss) => poss.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(pagesVisited, pagesVisited + itemsPerPage);

    const pageCount = Math.ceil(pos.length / itemsPerPage);

    const handlePageClick = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div className={styles.card}>
            <header>
                <div className={styles.title_btn}>
                    <div className={styles.title}>
                        <img src={OpenBook} alt='Logotipo do App' />
                        <h1>Post</h1>
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
                        <th className={styles.titletab}>Subtitulo</th>
                        <th className={styles.titletab}>Categoria</th>
                        <th className={styles.actionsColumn}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {displayPos.map((post, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? styles.evenRow : styles.oddRow}>
                            <td>{post.title}</td>
                            <td>{post.subtitle}</td>
                            <td>{post.category}</td>
                            <td className={styles.actions}>
                                <BotaoEdit
                                    // loading={loadingDelete}
                                    onClick={() => handleEditClick(post)}
                                />
                                <BotaoDelete
                                    // loading={loadingDelete}
                                    onClick={() => removerCateg(post.id)}
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
                <ModalPost
                    onClose={() => {
                        setEditingPosts(null);
                        setShowModal(false);
                    }}
                    initialTitle={editingPosts ? editingPosts.title : ''}
                    initialSubtitle={editingPosts ? editingPosts.subtitle : ''}
                    initialCategory={editingPosts ? editingPosts.category : ''}
                    initialTags={editingPosts ? editingPosts.tags : ''}
                    initialUrlImage={editingPosts ? editingPosts.urlImage : ''}
                    initialDescription={editingPosts ? editingPosts.description : ''}
                    onSave={saveEditedPosts}
                    isEditing={Boolean(editingPosts)}
                />
            )}
        </div>
    );
}

export { Posts }
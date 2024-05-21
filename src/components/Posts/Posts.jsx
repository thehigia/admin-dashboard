import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../hooks';
import { BotaoEdit } from '../Botao/BoataoEdit';
import { BotaoDelete } from '../Botao/BotaoDelete';
import ReactPaginate from 'react-paginate';
import { Feedback } from '../Feedback';
import styles from './Posts.module.css';
import Search from '../../assets/ion_search.svg';
import OpenBook from '../../assets/Open-Book.svg';
import { ModalPost } from '../Modal/ModalPost';
import { Link } from 'react-router-dom';

const Posts = () => {
    const { posts, removerPost, editPost, loadingDelete } = useAppContext();
    const [pos, setPos] = useState(posts || []);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [pageNumber, setPageNumber] = useState(0);
    const pagesVisited = pageNumber * itemsPerPage;
    const [editingPost, setEditingPost] = useState(null);

    const handleEditClick = (post) => {
        setEditingPost(post); // Verifique se 'post' é um objeto válido com 'id'
        setShowModal(true);
    };

    const saveEditedPosts = (newTitle, newSubtitle, newCategory, newTags, newUrlImage, newDescription, newUrlWeb, newCopyright) => {

        // Edite o post com os novos valores
        editPost(editingPost.id, newTitle,
            newSubtitle,
            newCategory,
            newTags,
            newUrlImage,
            newDescription,
            newUrlWeb || '',
            newCopyright || '',
        );

        // Limpe os campos e feche o modal
        setEditingPost(null);
        setShowModal(false);
    };

    const handleAddClick = () => {
        setShowModal(true);
    };

    useEffect(() => {
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
                                    onClick={() => handleEditClick(post)}
                                />
                                <BotaoDelete
                                    onClick={() => removerPost(post.id)}
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

            {showModal && (
                <ModalPost
                    onClose={() => {
                        setEditingPost(null);
                        setShowModal(false);
                    }}
                    initialTitle={editingPost ? editingPost.title : ''}
                    initialSubtitle={editingPost ? editingPost.subtitle : ''}
                    initialCategory={editingPost ? editingPost.category : ''}
                    initialTags={editingPost ? editingPost.tags : ''}
                    initialUrlImage={editingPost ? editingPost.urlImage : ''}
                    initialDescription={editingPost ? editingPost.description : ''}
                    initialUrlWeb={editingPost ? editingPost.urlWeb : ''}
                    initialCopyright={editingPost ? editingPost.copyright : ''}
                    onSave={(newTitle, newSubtitle, newCategory, newTags, newUrlImage, newDescription, newUrlWeb, newCopyright) => saveEditedPosts(
                        newTitle, newSubtitle, newCategory, newTags, newUrlImage, newDescription, newUrlWeb, newCopyright
                    )}
                    isEditing={Boolean(editingPost)}
                />
            )}
        </div>
    );
}

export { Posts }

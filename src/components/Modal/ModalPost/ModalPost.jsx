import { useState } from "react";
import styles from './ModalPost.module.css';
import { useAppContext } from "../../../hooks";

const ModalPost = ({ onClose, initialTitle = '', initialSubtitle = '', initialCategory = '', initialTags = '', initialUrlImage = '', initialDescription = '', initialUrlWeb = '', initialCopyright = '', onSave, isEditing = false }) => {
    const { addPost, category: categories } = useAppContext();
    const [description, setDescription] = useState(initialDescription);
    const [title, setTitle] = useState(initialTitle);
    const [subtitle, setSubtitle] = useState(initialSubtitle);
    const [category, setCategory] = useState(initialCategory);
    const [tags, setTags] = useState(initialTags);
    const [urlImage, setUrlImage] = useState(initialUrlImage);
    const [urlWeb, setUrlWeb] = useState(initialUrlWeb);
    const [copyright, setCopyright] = useState(initialCopyright);

    const handleSave = () => {
        if (!title.trim()) {
            return;  // Garante que não salvamos títulos vazios ou apenas com espaços.
        }

        if (isEditing) {
            // Se está editando, chama função de editar
            onSave(title, subtitle, category, tags, urlImage, description, urlWeb || '', copyright || '');
        } else {
            // Se está adicionando, chama função de adicionar
            addPost(title, subtitle, category, tags, urlImage, description, urlWeb || '', copyright || '');
        }

        // Limpa os campos após salvar
        setTitle('');
        setDescription('');
        setSubtitle('');
        setCategory('');
        setTags('');
        setUrlImage('');
        setUrlWeb('');
        setCopyright('');
        onClose();  // Fecha o modal
    };

    const submeterForm = (event) => {
        event.preventDefault();

        if (!title.trim()) {
            return;
        }
        onSave(title, subtitle, category, tags, urlImage, description, urlWeb || '', copyright || '');

        // Limpa os campos após salvar
        setTitle('');
        setDescription('');
        setSubtitle('');
        setCategory('');
        setTags('');
        setUrlImage('');
        setUrlWeb('');
        setCopyright('');
    };

    const onChangeNomeTarefa = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'title':
                setTitle(value);
                break;
            case 'subtitle':
                setSubtitle(value);
                break;
            case 'category':
                setCategory(value);
                break;
            case 'tags':
                setTags(value);
                break;
            case 'urlImage':
                setUrlImage(value);
                break;
            case 'description':
                setDescription(value);
                break;
            default:
                break;
        }
    }

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h3 className={styles.titleModal}>{isEditing ? 'Editar Post' : 'Novo Post'}</h3>
                <p className={styles.subtitleModal}>Preencha os campos abaixo para {isEditing ? 'editar' : 'criar'} um novo post</p>
                <form className={styles.form} onSubmit={submeterForm}>
                    <div className={styles.labMod}>
                        <div className={styles.row}>
                            <div className={styles.column}>
                                <label className={styles.labelModal}>Título</label>
                                <input
                                    className={styles.input}
                                    type="text"
                                    placeholder='Escreva o título aqui...'
                                    value={title}
                                    name="title"
                                    onChange={onChangeNomeTarefa}
                                />
                            </div>
                            <div className={styles.column}>
                                <label className={styles.labelModal}>Subtítulo</label>
                                <input
                                    className={styles.input}
                                    type="text"
                                    placeholder='Escreva o subtítulo aqui...'
                                    value={subtitle}
                                    name="subtitle"
                                    onChange={onChangeNomeTarefa}
                                />
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.column}>
                                <label className={`${styles.labelModal} ${isEditing ? styles.labelDisabled : ""}`}>Categoria</label>
                                <select className={styles.input} value={category} disabled={isEditing} onChange={(e) => setCategory(e.target.value)}>
                                    <option value="">Selecione uma categoria...</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.title}>
                                            {cat.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.column}>
                                <label className={`${styles.labelModal} ${isEditing ? styles.labelDisabled : ""}`}>URL da imagem de capa</label>
                                <input
                                    className={styles.input}
                                    type="text"
                                    placeholder='Cole a URL aqui...'
                                    value={urlImage}
                                    name="urlImage"
                                    disabled={isEditing}
                                    onChange={onChangeNomeTarefa}
                                />
                            </div>
                        </div>

                        <div className={styles.labMod}>
                            <div className={styles.row}>
                                <label className={`${styles.labelModal} ${isEditing ? styles.labelDisabled : ""}`}>Tag</label>
                                <input
                                    className={styles.input}
                                    type="text"
                                    placeholder='Escreva as tags separados por vírgula aqui...'
                                    value={tags}
                                    name="tags"
                                    disabled={isEditing}
                                    onChange={onChangeNomeTarefa}
                                />
                            </div>
                            <label className={styles.labelModal}>Texto</label>
                            <textarea
                                className={styles.textArea}
                                placeholder='Escreva o corpo da postagem aqui...'
                                value={description}
                                name="description"
                                onChange={onChangeNomeTarefa}
                            />
                        </div>

                    </div>

                    <div className={styles.modalButtons}>
                        <a className={styles.btnCancel} onClick={onClose}>Cancelar</a>
                        <a className={styles.btnSave} onClick={handleSave}>Salvar</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export { ModalPost }

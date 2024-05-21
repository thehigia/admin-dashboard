import { useState } from "react";
import { useAppContext } from "../../../hooks";
import { Link } from "react-router-dom";

import styles from './ModalQuiz.module.css';

const ModalQuiz = ({ onClose, initialTitle = '', initialSequence = '', initialCategory = '', initialDescription = '', initialIsHighlighted = false, initialBackgroundImageUrl = '', onSave, isEditing = false }) => {
    const { addQuiz, category: categories } = useAppContext();
    const [title, setTitle] = useState(initialTitle);
    const [sequence, setSequence] = useState(initialSequence);
    const [description, setDescription] = useState(initialDescription);
    const [isHighlighted, setIsHighlighted] = useState(initialIsHighlighted);
    const [category, setCategory] = useState(initialCategory);
    const [backgroundImageUrl, setBackgroundImageUrl] = useState(initialBackgroundImageUrl);

    const handleSave = () => {
        if (isEditing) {
            onSave({ title, description, sequence, isHighlighted, backgroundImageUrl, category });
        } else {
            addQuiz({ title, description, sequence, isHighlighted, backgroundImageUrl, category });
        }

        setTitle('');
        setSequence('');
        setDescription('');
        setCategory('');
        setIsHighlighted(false);
        setBackgroundImageUrl('');
        onClose();
    };

    const submeterForm = (event) => {
        event.preventDefault();
        handleSave();
    }

    const onChangeQuiz = (event) => {
        const { name, value, type, checked } = event.target;
        switch (name) {
            case 'title':
                setTitle(value);
                break;
            case 'sequence':
                setSequence(value);
                break;
            case 'category':
                setCategory(value);
                break;
            case 'backgroundImageUrl':
                setBackgroundImageUrl(value);
                break;
            case 'description':
                setDescription(value);
                break;
            case 'isHighlighted':
                setIsHighlighted(type === 'checkbox' ? checked : value);
                break;
            default:
                break;
        }
    }

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h3 className={styles.titleModal}>{isEditing ? 'Editar Quiz' : 'Novo Quiz'}</h3>
                <p className={styles.subtitleModal}>Preencha os campos abaixo para criar uma novo quiz</p>
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
                                    onChange={onChangeQuiz}
                                />
                            </div>
                            <div className={styles.column02}>
                                <label className={
                                    `${styles.labelModal} 
                                    ${isEditing ? styles.labelDisabled : ""}`
                                }>
                                    Categoria
                                </label>
                                <select
                                    className={styles.input}
                                    value={category}
                                    disabled={isEditing}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="">Selecione uma categoria...</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.title}>
                                            {cat.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.column01}>
                                <label className={
                                    `${styles.labelModal} 
                                    ${isEditing ? styles.labelDisabled : ""}`
                                }>
                                    Sequência
                                </label>
                                <input
                                    className={styles.input}
                                    type="number"
                                    placeholder='Escreva o subtítulo aqui...'
                                    value={sequence}
                                    name="sequence"
                                    disabled={isEditing}
                                    onChange={onChangeQuiz}
                                />
                            </div>
                            <div className={styles.column}>
                                <label className={
                                    `${styles.labelModal}
                                     ${isEditing ? styles.labelDisabled : ""}`
                                }>
                                    URL da imagem de capa
                                </label>
                                <input
                                    className={styles.input}
                                    type="text"
                                    placeholder='Cole a URL aqui...'
                                    value={backgroundImageUrl}
                                    name="backgroundImageUrl"
                                    disabled={isEditing}
                                    onChange={onChangeQuiz}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.modalButtons}>
                        <Link
                            className={styles.btnCancel}
                            onClick={onClose}>
                            Cancelar
                        </Link>
                        <Link
                            className={styles.btnSave}
                            onClick={handleSave}>
                            Salvar
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export { ModalQuiz }
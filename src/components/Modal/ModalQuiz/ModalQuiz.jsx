import { useState } from "react";
import styles from './ModalQuiz.module.css';
import { useAppContext } from "../../../hooks";

const ModalQuiz = ({ onClose, initialTitle = '', initialSequence = 0, initialCategory = '', initialDescription = '', initialIsHighlighted = false, initialBackgroundImageUrl = '', onSave, isEditing = false }) => {
    const { addQuiz, category: categories } = useAppContext();
    const [title, setTitle] = useState(initialTitle);
    const [sequence, setSequence] = useState(initialSequence);
    const [description, setDescription] = useState(initialDescription);
    const [isHighlighted, setIsHighlighted] = useState(initialIsHighlighted);
    const [category, setCategory] = useState(initialCategory);
    const [backgroundImageUrl, setBackgroundImageUrl] = useState(initialBackgroundImageUrl);

    const handleSave = () => {
        const parsedSequence = parseInt(sequence, 10);
        if (!title.trim()) {
            return;  // Garante que não salvamos títulos vazios ou apenas com espaços.
        }

        if (isEditing) {
            onSave({ title, description, sequence: isNaN(parsedSequence) ? 255 : parsedSequence, isHighlighted, backgroundImageUrl, category });
        } else {
            addQuiz(title, description, parseInt(sequence), Boolean(isHighlighted), backgroundImageUrl, category);
        }

        // Limpa os campos após salvar
        setTitle('');
        setSequence('');
        setDescription('');
        setCategory('');
        setIsHighlighted(false);
        setBackgroundImageUrl('');
        onClose();  // Fecha o modal
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
                <p className={styles.subtitleModal}>Preencha os campos abaixo para criar um novo quiz</p>
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
                        </div>
                        <div className={styles.row}>
                            <div className={styles.column01}>
                                <label className={`${styles.labelModal} ${isEditing ? styles.labelDisabled : ""}`}>Sequência</label>
                                <input
                                    className={styles.input}
                                    type="number"
                                    placeholder='Escreva a sequência aqui...'
                                    value={sequence}
                                    disabled={isEditing}
                                    name="sequence"
                                    onChange={onChangeQuiz}
                                />
                            </div>
                            <div className={styles.column}>
                                <label className={`${styles.labelModal} ${isEditing ? styles.labelDisabled : ""}`}>URL da imagem de capa</label>
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
                        <div className={styles.row}>
                            <div className={styles.column}>
                                <label className={styles.labelModal}>Descrição</label>
                                <textarea
                                    className={styles.input}
                                    placeholder='Escreva a descrição aqui...'
                                    value={description}
                                    name="description"
                                    onChange={onChangeQuiz}
                                />
                            </div>
                            <div className={styles.column}>
                                <label className={styles.labelModal}>Destacar</label>
                                <input
                                    type="checkbox"
                                    checked={isHighlighted}
                                    name="isHighlighted"
                                    onChange={onChangeQuiz}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.modalButtons}>
                        <a className={styles.btnCancel} onClick={onClose}>Cancelar</a>
                        <button className={styles.btnSave} type="submit">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export { ModalQuiz }

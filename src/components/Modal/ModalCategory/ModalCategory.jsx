import { useState } from "react";
import styles from './ModalCategory.module.css';
import { useAppContext } from "../../../hooks";
import { Link } from "react-router-dom";

const ModalCategory = ({ onClose, initialTitle = '', onSave, isEditing = false }) => {
    const { addCateg } = useAppContext();
    const [title, setTitle] = useState(initialTitle);

    const handleSave = () => {
        if (!title.trim()) {
            return;  // Garante que não salvamos títulos vazios ou apenas com espaços.
        }

        if (isEditing) {
            // Se está editando, chama função de editar
            onSave(title);
        } else {
            // Se está adicionando, chama função de adicionar
            addCateg(title);
        }

        setTitle('');  // Limpa o título após salvar
        onClose();  // Fecha o modal
    };

    const onChangeNomeTarefa = (event) => {
        setTitle(event.currentTarget.value)
    }

    const submeterForm = (event) => {
        event.preventDefault();

        if (!title) {
            return;
        }
        onSave(title)

        setTitle('')
    }

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h3 className={styles.titleModal}>{isEditing ? 'Editar Categoria' : 'Nova Categoria'}</h3>
                <p className={styles.subtitleModal}>Preencha o campo abaixo para criar uma nova categoria</p>
                <form className={styles.form} onSubmit={submeterForm}>
                    <div className={styles.labMod}>
                        <label className={styles.labelModal}>Título</label>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder='Escreva o título da categoria aqui...'
                            value={title}
                            onChange={onChangeNomeTarefa}
                        />
                    </div>
                    <div className={styles.modalButtons}>
                        <Link className={styles.btnCancel} onClick={onClose}>Cancelar</Link>
                        <Link className={styles.btnSave} onClick={handleSave}>Salvar</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export { ModalCategory }
import { useState } from "react";
import styles from './ModalCategory.module.css';
import { useAppContext } from "../../../hooks";

const ModalCategory = ({ onClose }) => {
    const { addCateg } = useAppContext();
    // const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSave = () => {
        addCateg(title);
        setTitle(''); // Reset the title state
        onClose(false); // Close the modal after saving
    };

    const onChangeNomeTarefa = (event) => {
        setTitle(event.currentTarget.value)
    }

    const submeterForm = () => {
        // eslint-disable-next-line no-restricted-globals
        event.preventDefault();

        if (!title) {
            return;
        }
        addCateg(title)

        setTitle('')
    }
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h3 className={styles.titleModal}>Nova Categoria</h3>
                <p className={styles.subtitleModal}>Preencha os campos abaixo para criar uma nova categoria</p>
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
                    {/* <div className={styles.labMod}>
                        <label className={styles.labelModal}>Descrição</label>
                        <textarea
                            className={styles.textArea}
                            placeholder='Breve descrição sobre a categoria criada...'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div> */}
                    <div className={styles.modalButtons}>
                        <a className={styles.btnCancel} onClick={onClose}>Cancelar</a>
                        <a className={styles.btnSave} onClick={handleSave}>Salvar</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export { ModalCategory }
import { useState } from "react";
import styles from './ModalPost.module.css';
import { useAppContext } from "../../../hooks";

const ModalPost = ({ onClose, initialTitle = '', onSave, isEditing = false }) => {
    const { addCateg } = useAppContext();
    const [description, setDescription] = useState();
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
                <h3 className={styles.titleModal}>{isEditing ? 'Editar Post' : 'Novo Post'}</h3>
                <p className={styles.subtitleModal}>Preencha os campos abaixo para criar uma novo post</p>
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
                                    onChange={onChangeNomeTarefa}
                                />
                            </div>
                            <div className={styles.column}>
                                <label className={styles.labelModal}>Subtítulo</label>
                                <input
                                    className={styles.input}
                                    type="text"
                                    placeholder='Escreva o subtítulo aqui...'
                                // value={subtitle}
                                // onChange={onChangeNomeTarefa}
                                />
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.column}>
                                <label className={styles.labelModal}>Categoria</label>
                                <select className={styles.input} >
                                    <option value="">Selecione uma categoria...</option>
                                    {/* {onSave.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))} */}
                                </select>
                            </div>
                            <div className={styles.column}>
                                <label className={styles.labelModal}>URL da imagem de capa</label>
                                <input
                                    className={styles.input}
                                    type="text"
                                    placeholder='Cole a URL aqui...'
                                // value={subtitle}
                                // onChange={onChangeNomeTarefa}
                                />
                            </div>
                        </div>

                        <div className={styles.labMod}>
                            <div className={styles.row}>
                                <label className={styles.labelModal}>Tag</label>
                                <input
                                    className={styles.input}
                                    type="text"
                                    placeholder='Cole a URL aqui...'
                                // value={subtitle}
                                // onChange={onChangeNomeTarefa}
                                />
                            </div>
                            <label className={styles.labelModal}>Texto</label>
                            <textarea
                                className={styles.textArea}
                                placeholder='Escreva o corpo da postagem aqui...'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
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
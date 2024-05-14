import { useState } from "react";
import styles from './ModalQuestao.module.css';
import { useAppContext } from "../../../hooks";

const ModalQuestao = ({ onClose, initialTitle = '', onSave, isEditing = false }) => {
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
                <h3 className={styles.titleModal}>{isEditing ? 'Editar Questão' : 'Novo Questão'}</h3>
                <p className={styles.subtitleModal}>Preencha os campos abaixo para criar uma novo questão</p>
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
                            <div className={styles.column02}>
                                <label className={styles.labelModal}>Quiz</label>
                                <select className={styles.input} >
                                    <option value="">Selecione um quiz...</option>
                                    {/* {onSave.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))} */}
                                </select>
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.column}>
                                <label className={styles.labelModal}>Alternativas</label>
                                <input
                                    className={styles.input}
                                    type="text"
                                    placeholder='Separar por vírgulas (Exemplo: A - Lorem lipsum dolor, B - Sit amet dolor, C - Dolor sit amet, D - Lorem lipsum'
                                // value={subtitle}
                                // onChange={onChangeNomeTarefa}
                                />
                            </div>
                            <div className={styles.column02}>
                                <label className={styles.labelModal}>Índice da alternativa</label>
                                <input
                                    className={styles.input}
                                    type="text"
                                    placeholder='Escreva o título aqui...'
                                // value={subtitle}
                                // onChange={onChangeNomeTarefa}
                                />
                            </div>
                        </div>
                        <div className={styles.labMod}>
                            <label className={styles.labelModal}>Justificativa</label>
                            <textarea
                                className={styles.textArea}
                                placeholder='Escreva a justificativa aqui...'
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

export { ModalQuestao }
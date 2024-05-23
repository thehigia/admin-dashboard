import { useEffect, useState } from "react";
import styles from './ModalQuestao.module.css';
import { useAppContext } from "../../../hooks";
import { Link } from "react-router-dom";

const ModalQuestao = ({ onClose, initialTitle = '', initialAlternatives = [], initialCorrectIndex = '', initialExplanation = '', initialSequence = '', initialQuiz = '', onSave, isEditing = false }) => {
    const { addQuestao, quiz: quizes } = useAppContext();
    const [quiz, setQuiz] = useState(initialQuiz);
    const [title, setTitle] = useState(initialTitle);
    const [alternatives, setAlternatives] = useState(initialAlternatives);
    const [correctIndex, setCorrectIndex] = useState(initialCorrectIndex);
    const [explanation, setExplanation] = useState(initialExplanation);
    const [sequence, setSequence] = useState(initialSequence);

    const handleSave = () => {
        const payload = { title, quiz, alternatives, sequence, correctIndex, explanation };
        if (isEditing) {
            onSave(payload);
        } else {
            addQuestao(payload);
        }

        setTitle('');
        setAlternatives([]);
        setCorrectIndex(false);
        setExplanation('');
        setQuiz('');
        setSequence('');
        onClose();
    };

    const submeterForm = (event) => {
        event.preventDefault();
        handleSave();
    }

    const onChangeNomeTarefa = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'title':
                setTitle(value);
                break;
            case 'alternatives':
                setAlternatives(value.split(',').map(alt => alt.trim()));
                break;
            case 'correctIndex':
                setCorrectIndex(value);
                break;
            case 'quiz':
                setQuiz(value);
                break;
            case 'explanation':
                setExplanation(value);
                break;
            case 'sequence':
                setSequence(value);
                break;
            default:
                break;
        }
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
                                    name="title"
                                    onChange={onChangeNomeTarefa}
                                />
                            </div>
                            <div className={styles.column01}>
                                <label className={
                                    `${styles.labelModal} 
                                    ${isEditing ? styles.labelDisabled : ""}`
                                }>Sequência</label>
                                <input
                                    className={styles.input}
                                    type="number"
                                    placeholder='Digite a sequência aqui...'
                                    value={sequence}
                                    name="sequence"
                                    disabled={isEditing}
                                    onChange={onChangeNomeTarefa}
                                />
                            </div>
                            <div className={styles.column02}>
                                <label className={
                                    `${styles.labelModal} 
                                    ${isEditing ? styles.labelDisabled : ""}`
                                }>Quiz</label>
                                <select
                                    className={styles.input}
                                    value={quiz}
                                    disabled={isEditing}
                                    onChange={(e) => setQuiz(e.target.value)}
                                >
                                    <option value="">Selecione uma categoria...</option>
                                    {quizes.map((qui) => (
                                        <option key={qui.id} value={qui.title}>
                                            {qui.title}
                                        </option>
                                    ))}
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
                                    value={alternatives}
                                    name="alternatives"
                                    onChange={onChangeNomeTarefa}
                                />
                            </div>
                            <div className={styles.column02}>
                                <label className={styles.labelModal}>Índice da alternativa</label>
                                <input
                                    className={styles.input}
                                    type="number"
                                    placeholder='Escreva o título aqui...'
                                    value={correctIndex}
                                    name="correctIndex"
                                    onChange={onChangeNomeTarefa}
                                />
                            </div>
                        </div>
                        <div className={styles.labMod}>
                            <label className={
                                `${styles.labelModal} 
                                    ${isEditing ? styles.labelDisabled : ""}`
                            }>Justificativa</label>
                            <textarea
                                className={styles.textArea}
                                placeholder='Escreva a justificativa aqui...'
                                value={explanation}
                                name="explanation"
                                disabled={isEditing}
                                onChange={onChangeNomeTarefa}
                            />
                        </div>
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

export { ModalQuestao }
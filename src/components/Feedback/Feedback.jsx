import styles from './Feedback.module.css';

const Feedback = () => {
    return (
        <div className={styles.feedbackContainer}>
            <p className={styles.feedbackText}>
                Essa categoria não pode ser deletada, pois está vinculado a um POST ou QUIZ!
            </p>
        </div>
    )
}

export { Feedback }
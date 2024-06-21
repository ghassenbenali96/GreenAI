import React from "react";
import styles from "../../styles/UsineModal.module.css";

const UsineModal = ({ returnToMainModal, closeAllModals }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.returnButton} onClick={returnToMainModal}>
          &larr;
        </button>
        <button className={styles.closeButton} onClick={closeAllModals}>
          &times;
        </button>
        <h2>Hello Business Man</h2>
        <p>You can check for GreenCoins by clicking the button below.</p>
        <div className={styles.buttonContainer}>
          <button className={styles.checkButton}>Check for GreenCoins</button>
        </div>
      </div>
    </div>
  );
};

export default UsineModal;

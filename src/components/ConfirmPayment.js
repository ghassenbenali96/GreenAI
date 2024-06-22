import React from "react";
import styles from "../../styles/ConfirmPayment.module.css"; // Adjust the CSS module as per your design

const ConfirmPayment = ({
  selectedAmount,
  greenCoinsBalance,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className={styles.confirmationModal}>
      <h2 className={styles.confirmationTitle}>Confirm Payment</h2>
      <p>
        You have selected to purchase{" "}
        <strong>{selectedAmount} GreenCoins</strong>.
      </p>
      <p className={styles.balanceText}>
        Your current GreenCoins balance: {greenCoinsBalance} GreenCoins
      </p>
      <div className={styles.buttonContainer}>
        <button className={styles.confirmButton} onClick={onConfirm}>
          Confirm Payment
        </button>
        <button className={styles.cancelButton} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmPayment;

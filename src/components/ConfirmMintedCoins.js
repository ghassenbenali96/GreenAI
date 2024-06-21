import React from "react";
import styles from "../../styles/ConfirmMintedCoins.module.css";

const ConfirmMintedCoins = ({ greenCoins, closeConfirmation }) => {
  const co2Absorbed = greenCoins * 100000;

  return (
    <div className={styles.confirmationModal}>
      <h2 className={styles.congratsMessage}>Congratulations! 🎉</h2>
      <p className={styles.greenText}>
        You've earned{" "}
        <strong className={styles.darGoldText}>{greenCoins} </strong>
        <span className={styles.goldText}>GreenCoins</span>{" "}
        <img
          src="/images/greencoin.png"
          alt="GreenCoin"
          className={styles.coinImage}
        />
        <br />
        Contributing to the absorption of {co2Absorbed} kg of CO2 from the
        environment.
      </p>
    </div>
  );
};

export default ConfirmMintedCoins;

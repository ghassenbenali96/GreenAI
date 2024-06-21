import React, { useState } from "react";
import styles from "../../styles/Modal.module.css";
import FarmerModal from "./FarmerModal";
import UsineModal from "./UsineModal";

const Modal = ({ closeModal }) => {
  const [showFarmerModal, setShowFarmerModal] = useState(false);
  const [showUsineModal, setShowUsineModal] = useState(false);

  const openFarmerModal = () => {
    setShowFarmerModal(true);
    setShowUsineModal(false);
  };

  const openUsineModal = () => {
    setShowFarmerModal(false);
    setShowUsineModal(true);
  };

  const returnToMainModal = () => {
    setShowFarmerModal(false);
    setShowUsineModal(false);
  };

  const closeAllModals = () => {
    closeModal();
    setShowFarmerModal(false);
    setShowUsineModal(false);
  };

  return (
    <>
      {!showFarmerModal && !showUsineModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={closeAllModals}>
              &times;
            </button>
            <div className={styles.iconContainer}>
              <div className={styles.topbarIcon}></div>
            </div>
            <h2 className={styles.modalTitle}>Choose Your Profile</h2>
            <div className={styles.cardsContainer}>
              <div className={styles.card} onClick={openFarmerModal}>
                <h3 className={styles.subTitle}>Farmer</h3>
                <p>
                  Earn <span className={styles.goldText}>GreenCoins</span> by
                  planting trees and reducing carbon emissions.
                </p>
              </div>
              <div className={styles.card} onClick={openUsineModal}>
                <h3 className={styles.subTitle}>Usine</h3>
                <p>
                  Purchase <span className={styles.goldText}>GreenCoins</span>{" "}
                  to offset your carbon footprint.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {showFarmerModal && (
        <FarmerModal
          returnToMainModal={returnToMainModal}
          closeAllModals={closeAllModals}
        />
      )}
      {showUsineModal && (
        <UsineModal
          returnToMainModal={returnToMainModal}
          closeAllModals={closeAllModals}
        />
      )}
    </>
  );
};

export default Modal;

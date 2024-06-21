import React, { useState } from "react";
import styles from "../../styles/FarmerModal.module.css";

const FarmerModal = ({ returnToMainModal, closeAllModals }) => {
  const [formData, setFormData] = useState({
    numberOfTrees: "",
    averageDiameter: "",
    averageHeight: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(formData);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.returnButton} onClick={returnToMainModal}>
          &larr;
        </button>
        <button className={styles.closeButton} onClick={closeAllModals}>
          &times;
        </button>
        <h2 className={styles.title}>Hello Friend of Nature 🌱</h2>
        <p>Please enter your tree information below.</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            Number of Trees:
            <input
              type="number"
              name="numberOfTrees"
              value={formData.numberOfTrees}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </label>
          <label className={styles.label}>
            Average Diameter (cm):
            <input
              type="number"
              name="averageDiameter"
              value={formData.averageDiameter}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </label>
          <label className={styles.label}>
            Average Height (m):
            <input
              type="number"
              name="averageHeight"
              value={formData.averageHeight}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </label>
          {/* <div className={styles.buttonContainer}>
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </div> */}
        </form>
        <div className={styles.buttonContainer}>
          <button className={styles.connectButton} type="submit">
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
};

export default FarmerModal;

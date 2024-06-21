"use client";
import React, { useState } from "react";
import { ethers } from "ethers";
import styles from "../../styles/FarmerModal.module.css";

const FarmerModal = ({ returnToMainModal, closeAllModals }) => {
  const [formData, setFormData] = useState({
    numberOfTrees: "",
    averageDiameter: "",
    averageHeight: "",
  });
  // Define States to Connect the wallet
  const [walletConnected, setWalletConnected] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [metaMaskInstalled, setMetaMaskInstalled] = useState(!!window.ethereum);
  // Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // Handle submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!walletConnected) {
      setErrorMessage("Please connect your wallet first.");
      return;
    }
    // Handle form submission logic
    console.log(formData);
    setErrorMessage("");
    // Further submission logic, e.g., send data to backend or blockchain
  };

  // Connect the wallet
  const connectWallet = async () => {
    const { numberOfTrees, averageDiameter, averageHeight } = formData;

    if (!numberOfTrees || !averageDiameter || !averageHeight) {
      setErrorMessage("Please fill in all the tree information.");
      return;
    }

    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        setWalletConnected(true);
        setErrorMessage("");
        console.log("Wallet connected:", await signer.getAddress());
      } catch (error) {
        setErrorMessage("Failed to connect wallet. Please try again.");
      }
    } else {
      setMetaMaskInstalled(false);
    }
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
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
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
        </form>

        <div className={styles.buttonContainer}>
          {metaMaskInstalled ? (
            <button className={styles.connectButton} onClick={connectWallet}>
              {walletConnected ? "Wallet Connected" : "Connect Wallet"}
            </button>
          ) : (
            <a
              className={styles.installMetaMaskButton}
              href="https://metamask.io/download.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Install MetaMask
            </a>
          )}
          {/* <button
            className={styles.submitButton}
            onClick={handleSubmit}
            disabled={!walletConnected}
          >
            Submit
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default FarmerModal;

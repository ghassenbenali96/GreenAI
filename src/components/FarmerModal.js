import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import styles from "../../styles/FarmerModal.module.css";
import GreenCoin from "../../build/contracts/GreenCoin.json";
import { calculateGreenCoins } from "../../utils/calculateGreenCoins";
import ConfirmMintedCoins from "./ConfirmMintedCoins";

const FarmerModal = ({ returnToMainModal, closeAllModals }) => {
  const [formData, setFormData] = useState({
    numberOfTrees: "",
    averageDiameter: "",
    averageHeight: "",
  });

  const [walletConnected, setWalletConnected] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [metaMaskInstalled, setMetaMaskInstalled] = useState(false);
  const [contractAddress, setContractAddress] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    // Check if MetaMask is installed
    setMetaMaskInstalled(!!window.ethereum);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleConnectWallet = async () => {
    if (!metaMaskInstalled) {
      setErrorMessage("MetaMask is not installed.");
      return;
    }

    if (!window.ethereum) {
      setErrorMessage("MetaMask is not detected.");
      return;
    }

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setWalletConnected(true);
      setErrorMessage("");
      const userAddress = await signer.getAddress();
      setContractAddress(userAddress); // Set contract address to user's address
      console.log("Wallet connected:", userAddress);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      setErrorMessage("Failed to connect wallet. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!walletConnected) {
      setErrorMessage("Please connect your wallet first.");
      return;
    }

    const { numberOfTrees, averageDiameter, averageHeight } = formData;

    if (!numberOfTrees || !averageDiameter || !averageHeight) {
      setErrorMessage("Please fill in all the tree information.");
      return;
    }

    // Perform calculations
    const greenCoins = calculateGreenCoins(
      numberOfTrees,
      averageDiameter,
      averageHeight
    );

    // Interact with the smart contract
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      GreenCoin.abi,
      signer
    );

    try {
      const userAddress = await signer.getAddress();
      const greenCoinsBN = ethers.utils.parseUnits(greenCoins.toString(), 18);
      const tx = await contract.mint(userAddress, greenCoinsBN);
      await tx.wait();
      setShowConfirmation(true);
      setErrorMessage("");
    } catch (error) {
      console.error("Error minting GreenCoins:", error);
      setErrorMessage("Failed to mint GreenCoins. Please try again.");
    }
  };

  useEffect(() => {
    let timeout;
    if (errorMessage) {
      timeout = setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [errorMessage]);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {!showConfirmation && (
          <>
            <button
              title="Return"
              className={styles.returnButton}
              onClick={returnToMainModal}
            >
              &larr;
            </button>
          </>
        )}
        <button
          title="Close"
          className={styles.closeButton}
          onClick={closeAllModals}
        >
          &times;
        </button>
        {!showConfirmation && (
          <>
            <h2 className={styles.title}>Hello Friend of Nature 🌱</h2>
            <p className={styles.description}>
              Please enter your tree information below.
            </p>
          </>
        )}
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        {showConfirmation && (
          <div>
            <ConfirmMintedCoins
              greenCoins={calculateGreenCoins(
                formData.numberOfTrees,
                formData.averageDiameter,
                formData.averageHeight
              )}
              closeConfirmation={() => setShowConfirmation(false)}
            />
          </div>
        )}
        {!showConfirmation && (
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
            {/* Upload Photo Tip */}
            {!showConfirmation && (
              <div className={styles.tipContainer}>
                <p className={styles.tip}>
                  📌 Tip: For further verification, upload an aerial photo of
                  your farm below.
                </p>
                <label htmlFor="uploadPhoto" className={styles.uploadButton}>
                  <input
                    type="file"
                    id="uploadPhoto"
                    className={styles.fileInput}
                    disabled
                  />
                  <span className={styles.fileInputLabel}>📷</span>
                </label>
              </div>
            )}
            <div className={styles.buttonContainer}>
              {!walletConnected && !metaMaskInstalled && (
                <a
                  className={styles.installMetaMaskButton}
                  href="https://metamask.io/download.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Install MetaMask
                </a>
              )}

              {!walletConnected && metaMaskInstalled && (
                <button
                  className={`${styles.connectButton} ${styles.color1}`}
                  type="button"
                  onClick={handleConnectWallet}
                  disabled={!metaMaskInstalled}
                >
                  Connect Wallet
                </button>
              )}

              {walletConnected && (
                <button
                  className={`${styles.connectButton} ${styles.color2}`}
                  type="button"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default FarmerModal;

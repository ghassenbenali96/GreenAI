import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import styles from "../../styles/UsineModal.module.css";
import GreenCoin from "../../build/contracts/GreenCoin.json"; // Import the GreenCoin ABI

const UsineModal = ({ returnToMainModal, closeAllModals }) => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [metaMaskInstalled, setMetaMaskInstalled] = useState(false);
  const [contractAddress, setContractAddress] = useState("");

  const [balances, setBalances] = useState([]);

  useEffect(() => {
    // Check if MetaMask is installed
    setMetaMaskInstalled(!!window.ethereum);
  }, []);

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

  const handleCheckGreenCoins = async () => {
    if (!walletConnected) {
      setErrorMessage("Please connect your wallet first.");
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const networkId = 5777; // Ganache's default network ID
      const contractAddress = GreenCoin.networks[networkId].address;
      const contract = new ethers.Contract(
        contractAddress,
        GreenCoin.abi,
        provider
      );

      const accounts = await provider.listAccounts();
      console.log("Fetched accounts:", accounts); // Debugging output

      const balancesPromises = accounts.map(async (account) => {
        const balance = await contract.balanceOf(account);
        const formattedBalance = ethers.utils.formatUnits(balance, 18);
        return { account, balance: formattedBalance };
      });

      const balances = await Promise.all(balancesPromises);
      setBalances(balances);
      console.log("All GreenCoin balances:", balances);
    } catch (error) {
      console.error("Failed to fetch GreenCoin balances:", error);
      setErrorMessage("Failed to fetch GreenCoin balances. Please try again.");
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
        <button className={styles.returnButton} onClick={returnToMainModal}>
          &larr;
        </button>
        <button className={styles.closeButton} onClick={closeAllModals}>
          &times;
        </button>
        <h2 className={styles.title}>Hello Businessman 🏭</h2>
        <p>You can search for GreenCoins by clicking the button below.</p>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        <div className={styles.buttonContainer}>
          <button
            className={`${styles.connectButton} ${
              !walletConnected ? styles.color1 : styles.checkButton
            }`}
            onClick={
              !walletConnected ? handleConnectWallet : handleCheckGreenCoins
            }
          >
            {!walletConnected ? "Connect Wallet" : "Check for GreenCoins"}
          </button>
        </div>
        {balances.length > 0 && (
          <div>
            <h3>GreenCoin Balances:</h3>
            <ul>
              {balances.map(({ account, balance }) => (
                <li key={account}>
                  {account}: {balance} GC
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsineModal;

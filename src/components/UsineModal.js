import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import styles from "../../styles/UsineModal.module.css";
import GreenCoin from "../../build/contracts/GreenCoin.json";

const UsineModal = ({ returnToMainModal, closeAllModals }) => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [metaMaskInstalled, setMetaMaskInstalled] = useState(false);
  const [contractAddress, setContractAddress] = useState("");
  const [balances, setBalances] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");

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
      setContractAddress(userAddress);
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
      // console.log("Fetched accounts:", accounts);

      const balancesPromises = accounts.map(async (account) => {
        const balance = await contract.balanceOf(account);
        const formattedBalance = ethers.utils.formatUnits(balance, 18);
        return { account, balance: formattedBalance };
      });

      const balances = await Promise.all(balancesPromises);
      setBalances(balances);
      // console.log("All GreenCoin balances:", balances);
    } catch (error) {
      console.error("Failed to fetch GreenCoin balances:", error);
      setErrorMessage("Failed to fetch GreenCoin balances. Please try again.");
    }
  };

  const handleTransferGreenCoins = async (sender, receiver) => {
    if (!walletConnected) {
      setErrorMessage("Please connect your wallet first.");
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const networkId = 5777; // Ganache's default network ID
      const contractAddress = GreenCoin.networks[networkId].address;
      const contract = new ethers.Contract(
        contractAddress,
        GreenCoin.abi,
        signer
      );

      // Get sender's balance
      const balance = await contract.balanceOf(sender);
      const amount = balance; // Transfer the entire balance

      // Make the transfer
      const tx = await contract.transfer(receiver, amount);
      await tx.wait();

      console.log(
        `Transferred ${amount.toString()} GreenCoins from ${sender} to ${receiver}`
      );
      setSuccessMessage(
        `Successfully transferred ${amount.toString()} GreenCoins.`
      );
    } catch (error) {
      console.error("Failed to transfer GreenCoins:", error);
      setErrorMessage("Failed to transfer GreenCoins. Please try again.");
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
        {(errorMessage || successMessage) && (
          <p
            className={`${styles.message} ${
              successMessage ? styles.success : styles.error
            }`}
          >
            {errorMessage || successMessage}
          </p>
        )}
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
            <table className={styles.balanceTable}>
              <thead>
                <tr>
                  <th>Account Address</th>
                  <th>GreenCoin Balance</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {balances.map(
                  ({ account, balance }) =>
                    account !== contractAddress && ( // Only render if it's not the connected wallet's address
                      <tr key={account}>
                        <td>{account}</td>
                        <td>{balance} GC</td>
                        <td>
                          {account !== contractAddress && ( // Display action only if not current account
                            <button
                              onClick={() =>
                                handleTransferGreenCoins(
                                  account,
                                  contractAddress
                                )
                              }
                            >
                              Transfer to My Wallet
                            </button>
                          )}
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsineModal;

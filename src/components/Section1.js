"use client";
import React, { useState } from "react";
import styles from "../../styles/Section1.module.css";
import Modal from "./Modal";

const Section1 = React.forwardRef((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section ref={ref} id="section1" className={styles.section}>
      {/* Top bar with green color */}
      <div className={styles.topbar}>
        {/* Content for the top bar  */}
        <div title="GreenAI" className={styles.topbarIcon}></div>
        <div className={styles.topbarTabs}>
          <a href="/" className={styles.topbarTab}>
            Home
          </a>
          <a href="/trading" className={styles.topbarTab}>
            Trading
          </a>
          <a href="#" className={styles.topbarTab} onClick={openModal}>
            Connect
          </a>
          <a href="/contact-us" className={styles.topbarTab}>
            Contact Us
          </a>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.greenAi}>
          <h1>GreenAI</h1>
          <p className={styles.description}>
            A blockchain-based app rewarding users with{" "}
            <span className={styles.goldText}>GreenCoins</span> for planting
            trees and reducing carbon emissions, turning eco-friendly actions
            into valuable carbon credits.
          </p>
          <div className={styles.buttonContainer}>
            <button className={styles.button1} onClick={props.onLearnMoreClick}>
              Learn More
            </button>
            <button className={styles.button2} onClick={openModal}>
              Get Started
            </button>
          </div>
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && <Modal closeModal={closeModal} />}
    </section>
  );
});

Section1.displayName = "Section1";

export default Section1;

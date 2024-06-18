import React from "react";
import styles from "../../styles/Section1.module.css";

const Section1 = React.forwardRef((props, ref) => {
  return (
    <section ref={ref} id="section1" className={styles.section}>
      {/* Top bar with green color */}
      <div className={styles.topbar}>
        {/* Content for the top bar  */}
        <div title="GreenAi" className={styles.topbarIcon}></div>
        <div className={styles.topbarTabs}>
          <a href="/" className={styles.topbarTab}>
            Home
          </a>
          <a href="/trading" className={styles.topbarTab}>
            Trading
          </a>
          <a href="/wallet" className={styles.topbarTab}>
            Wallet
          </a>
          <a href="/contact-us" className={styles.topbarTab}>
            Contact Us
          </a>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.greenAi}>
          <h1>GreenAi</h1>
          <p className={styles.description}>
            A blockchain-based app rewarding users with GreenCoins for planting
            trees and reducing carbon emissions, turning eco-friendly actions
            into valuable carbon credits.
          </p>
          <div className={styles.buttonContainer}>
            <button className={styles.button1}>Learn More</button>
            <button className={styles.button2}>Get Started</button>
          </div>
        </div>
      </div>
    </section>
  );
});

Section1.displayName = "Section1";

export default Section1;

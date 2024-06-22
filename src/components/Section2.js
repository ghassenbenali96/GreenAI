import React from "react";
import styles from "../../styles/Section2.module.css";
import Image from "next/image";

const Section2 = React.forwardRef((props, ref) => {
  return (
    <section ref={ref} id="section2" className={styles.section}>
      <div className={styles.title}>
        <h1>About Us</h1>
      </div>
      {/* Description */}
      <div className={styles.description}>
        <p>
          GreenAi is a web app leveraging blockchain technology to promote
          environmental sustainability. Farmers can earn GreenCoins by planting
          trees and reducing carbon emissions. These{" "}
          <span className={styles.goldText}> GreenCoins</span> can then be sold
          as carbon credits to businesses (usines) seeking to offset their
          carbon footprint and meet environmental regulations.
        </p>
      </div>
      {/* Centered Illustration */}
      <div className={styles.illustration}>
        <div className={styles.imageWrapper}>
          <Image
            src="/images/22.jpg"
            alt="Illustration"
            width={750}
            height={400}
          />
        </div>
      </div>
    </section>
  );
});

Section2.displayName = "Section2";

export default Section2;

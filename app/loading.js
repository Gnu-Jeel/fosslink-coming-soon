'use client';
import { useEffect, useState } from 'react';
import styles from './loading.module.css';

export default function Loading() {
  const [loadingText, setLoadingText] = useState('Loading');

  useEffect(() => {
    const dots = ['', '.', '..', '...'];
    let currentDot = 0;

    const interval = setInterval(() => {
      setLoadingText(`Loading${dots[currentDot]}`);
      currentDot = (currentDot + 1) % dots.length;
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.background}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
      </div>
      
      <div className={styles.loadingContent}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <img 
            src="/fosslink.svg" 
            alt="Logo" 
            className={styles.logo}
            width={80}
            height={80}
          />
        </div>

        {/* Spinner */}
        <div className={styles.loadingSpinner}>
          <div className={styles.spinnerRing}></div>
          <div className={styles.spinnerRing}></div>
          <div className={styles.spinnerRing}></div>
        </div>

        {/* Loading Text */}
        <div className={styles.loadingTextContainer}>
          <p className={styles.loadingText}>{loadingText}</p>
          <p className={styles.loadingSubtext}>Preparing your experience</p>
        </div>

        {/* Progress Bar */}
        <div className={styles.progressBar}>
          <div className={styles.progressFill}></div>
        </div>
      </div>
    </div>
  );
}
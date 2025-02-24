"use client";
import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [formData, setFormData] = useState({
    email: '',
    mobile: ''
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    if (formData.mobile && !/^[6-9]\d{9}$/.test(formData.mobile)) {
      setStatus('Please enter a valid 10-digit mobile number');
      setLoading(false);
      return;
    }

    try {
      // Replace with your Google Sheet Web App URL
      const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbywSxUG4CaAWi_DC7xZopsVGFgwJ6kCH-zkwnCV9kcccUUEbvhR5rM-ujtQMCO7578/exec';
      
      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      setStatus('Thanks! We\'ll notify you when we launch our smart home solutions.');
      setIsSubmitted(true);
    } catch (error) {
      setStatus('Error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.background}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
      </div>
      
      <div className={`${styles.container} ${styles.mounted}`}>
        <div className={styles.logoContainer}>
          <img 
            src="/fosslink.svg" 
            alt="Logo" 
            className={styles.logo}
            width={120}
            height={120}
          />
        </div>

        <h1>Smart Living Awaits</h1>
        <p className={styles.subtitle}>
          Transform your home into an intelligent living space by <span className={styles.aiHeading}>AI</span>. 
        </p>
        <h2 className={styles.subtitle}>
        We're currently building our website, but we're open for work
        </h2>

        <div className={styles.features}>
          <div className={styles.feature}>
            <span className={styles.icon}>🏠</span>
            <span>Local Servers</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.icon}>💡</span>
            <span>AI-Automation</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.icon}>🔐</span>
            <span>Privacy & Security</span>
          </div>
        </div>

        <div className={`${styles.formContainer} ${isSubmitted ? styles.submitted : ''}`}>
  {/* Social Links - Now outside the conditional rendering */}
  {!isSubmitted ? (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <input
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
            disabled={loading}
          />
          <div className={styles.inputIcon}>✉️</div>
        </div>

        <div className={styles.inputGroup}>
          <input
            type="tel"
            placeholder="Enter mobile number (optional)"
            value={formData.mobile}
            onChange={(e) => setFormData({...formData, mobile: e.target.value})}
            pattern="[6-9][0-9]{9}"
            title="Please enter a valid 10-digit mobile number"
            disabled={loading}
          />
          <div className={styles.inputIcon}>📱</div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className={styles.submitButton}
        >
          {loading ? (
            <span className={styles.loader}></span>
          ) : (
            'Request Contact'
          )}
        </button>
      </form>
    </>
  ) : (
    <div className={styles.successMessage}>
      <div className={styles.checkmark}>
        <div className={styles.checkmarkCircle}></div>
        <div className={styles.checkmarkStem}></div>
        <div className={styles.checkmarkKick}></div>
      </div>
      <h2>Thank You!</h2>
      <p>We'll try to connect to you as soon as possible.</p>
    </div>
  )}
</div>

<div className={styles.socialLinks}>
    <a 
      href="https://instagram.com/fosslink" 
      target="_blank" 
      rel="noopener noreferrer"
      className={styles.socialLink}
    >
      <span className={styles.socialIcon}>📱</span>
    </a>
    <a 
      href="mailto:contact@fosslink.in" 
      className={styles.socialLink}
    >
      <span className={styles.socialIcon}>📧</span>
    </a>
    <a 
      href="https://wa.me/+917383896029" 
      target="_blank" 
      rel="noopener noreferrer"
      className={styles.socialLink}
    >
      <span className={styles.socialIcon}>💬</span>
    </a>
  </div>

        {status && !isSubmitted && (
          <p className={`${styles.status} ${status.includes('Error') ? styles.error : styles.success}`}>
            {status}
          </p>
        )}
      </div>
    </main>
  );
}

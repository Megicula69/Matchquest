'use client';

import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, Loader2, AlertCircle, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const success = await login(username, password);
      if (!success) {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Cyberpunk Background Effects */}
      <div className={styles.bgGlow} />
      <div className={styles.particles} />
      
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <div className={styles.logoIcon}><ShieldCheck size={32} /></div>
          <h1 className={styles.title}>Lungsod Arena</h1>
          <p className={styles.subtitle}>Enter the futuristic gateway to gaming life</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {error && (
            <div className={styles.errorAlert}>
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className={styles.inputGroup}>
            <label className={styles.label}>Username</label>
            <div className={styles.inputWrapper}>
              <User className={styles.icon} size={18} />
              <input 
                type="text" 
                className={styles.input} 
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
            <div className={styles.inputWrapper}>
              <Lock className={styles.icon} size={18} />
              <input 
                type={showPassword ? 'text' : 'password'} 
                className={styles.input} 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className={styles.formFooter}>
            <label className={styles.rememberMe}>
              <input type="checkbox" />
              <span>Remember Me</span>
            </label>
            <a href="#" className={styles.forgotPass}>Forgot Password?</a>
          </div>

          <button 
            type="submit" 
            className={styles.loginBtn}
            disabled={loading}
          >
            {loading ? <Loader2 className={styles.spinner} size={20} /> : 'Login to Arena'}
          </button>
        </form>

        <div className={styles.footer}>
          <span>New student?</span>
          <a href="#" className={styles.registerLink}>Create an account</a>
        </div>
      </div>
    </div>
  );
}

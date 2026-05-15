'use client';

import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, Loader2, AlertCircle, ShieldCheck, Users, Trophy } from 'lucide-react';
import { useAuth } from '@/src/context/AuthContext';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const { login, registerAccount, registerTeam } = useAuth();
  const [mode, setMode] = useState<'login' | 'register' | 'team'>('login');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [teamName, setTeamName] = useState('');
  const [captainUsername, setCaptainUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setNotice(null);
    setLoading(true);

    try {
      if (mode === 'login') {
        const success = await login(username, password);
        if (!success) {
          setError('Invalid username or password');
        }
      } else if (mode === 'register') {
        const result = await registerAccount({
          fullName,
          username,
          password,
        });

        if (!result.success) {
          setError(result.message || 'Unable to create your account.');
        } else {
          // Auto-login after successful registration
          const loggedIn = await login(username, password);
          if (!loggedIn) {
            // If auto-login fails, fall back to prompting the user to sign in
            setNotice('Account created. Please sign in.');
            setMode('login');
          } else {
            // login() will redirect via AuthProvider; clear local form state
            setFullName('');
            setUsername('');
            setPassword('');
          }
        }
      } else {
        const result = await registerTeam({
          teamName,
          captainUsername,
        });

        if (!result.success) {
          setError(result.message || 'Unable to register your team.');
        } else {
          setNotice('Team registered successfully.');
          setMode('login');
          setTeamName('');
          setCaptainUsername('');
        }
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.bgGlow} />
      <div className={styles.particles} />

      <div className={styles.loginCard}>
        <div className={styles.header}>
          <div className={styles.logoIcon}>
            <ShieldCheck size={32} />
          </div>
          <h1 className={styles.title}>Matchquest Arena</h1>
          <p className={styles.subtitle}>Enter the competitive gateway to your next match</p>
          <div className={styles.modeSwitch}>
            <button
              type="button"
              className={mode === 'login' ? styles.modeButtonActive : styles.modeButton}
              onClick={() => {
                setMode('login');
                setError(null);
                setNotice(null);
              }}
            >
              Sign in
            </button>
            <button
              type="button"
              className={mode === 'register' ? styles.modeButtonActive : styles.modeButton}
              onClick={() => {
                setMode('register');
                setError(null);
                setNotice(null);
              }}
            >
              Create account
            </button>
            <button
              type="button"
              className={mode === 'team' ? styles.modeButtonActive : styles.modeButton}
              onClick={() => {
                setMode('team');
                setError(null);
                setNotice(null);
              }}
            >
              Register team
            </button>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {error && (
            <div className={styles.errorAlert}>
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {notice && (
            <div className={styles.registerNotice}>
              <Users size={16} />
              <span>{notice}</span>
            </div>
          )}

          {mode === 'register' && (
            <>
              <div className={styles.registerNotice}>
                <Users size={16} />
                <span>Create your account first, then use Register team to set up the roster.</span>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Full Name</label>
                <div className={styles.inputWrapper}>
                  <User className={styles.icon} size={18} />
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
              </div>
            </>
          )}

          {mode === 'team' && (
            <>
              <div className={styles.registerNotice}>
                <Trophy size={16} />
                <span>Team registration is separate from account creation and uses the captain&apos;s existing username.</span>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Team Name</label>
                <div className={styles.inputWrapper}>
                  <Trophy className={styles.icon} size={18} />
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Enter your team name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Captain Username</label>
                <div className={styles.inputWrapper}>
                  <User className={styles.icon} size={18} />
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Enter the captain's account username"
                    value={captainUsername}
                    onChange={(e) => setCaptainUsername(e.target.value)}
                    required
                  />
                </div>
              </div>
            </>
          )}

          {mode !== 'team' && (
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
          )}

          {mode !== 'team' && (
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
          )}

          <div className={styles.formFooter}>
            {mode === 'login' ? (
              <>
                <label className={styles.rememberMe}>
                  <input type="checkbox" />
                  <span>Remember Me</span>
                </label>
                <a href="#" className={styles.forgotPass}>Forgot Password?</a>
              </>
            ) : mode === 'register' ? (
              <span className={styles.inputHint}>Create your account details now. Team registration happens in its own step.</span>
            ) : (
              <span className={styles.inputHint}>Register the team separately after the captain account exists.</span>
            )}
          </div>

          <button type="submit" className={styles.loginBtn} disabled={loading}>
            {loading ? <Loader2 className={styles.spinner} size={20} /> : mode === 'login' ? 'Login to Arena' : mode === 'register' ? 'Create Account' : 'Register Team'}
          </button>
        </form>

        <div className={styles.footer}>
          {mode === 'login' ? (
            <>
              <span>New student?</span>
              <button type="button" className={styles.registerLink} onClick={() => setMode('register')}>
                Create an account
              </button>
              <button type="button" className={styles.registerLink} onClick={() => setMode('team')}>
                Register a team
              </button>
            </>
          ) : mode === 'register' ? (
            <>
              <span>Already have an account?</span>
              <button type="button" className={styles.registerLink} onClick={() => setMode('login')}>
                Sign in
              </button>
              <button type="button" className={styles.registerLink} onClick={() => setMode('team')}>
                Register team separately
              </button>
            </>
          ) : (
            <>
              <span>Need a new account first?</span>
              <button type="button" className={styles.registerLink} onClick={() => setMode('register')}>
                Create account
              </button>
              <button type="button" className={styles.registerLink} onClick={() => setMode('login')}>
                Sign in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
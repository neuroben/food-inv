// pages/login.tsx
import { useState } from 'react';
import styles from './login-style.css';

export default function Home() {
  const [data, setData] = useState({ username: '', password: '' });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch('https://1337-neuroben-foodinv-q043sovadwr.ws-eu107.gitpod.io/api/auth/local', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  }

  return (
    <div className={styles.main}>
      <div className="body-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">nickname
            <input type="text" name="username" id="username" required />
          </label>
          <label htmlFor="password">pass
            <input type="password" name="password" id="password" required />
          </label>
          <input type="submit" value="ok" />
        </form>
      </div>
    </div>
  );
}
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import styles from "./Auth.module.scss";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);
    setLoading(true);

    const { error } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      setIsError(true);
    } else {
      setMessage(isSignUp ? "Check your email to confirm your account." : "Logged in!");
      setIsError(false);
    }
  };

  return (
    <div className={styles.Auth}>
      <div className={styles.Card}>
        <h1 className={styles.Title}>
          <span>Mine</span> Panel
        </h1>
        <p className={styles.Subtitle}>
          {isSignUp
            ? "Create an account to sync your worlds across devices."
            : "Log in to access your worlds and coordinates."}
        </p>

        <form className={styles.Form} onSubmit={handleSubmit}>
          <div className={styles.Field}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.Field}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.SubmitBtn} disabled={loading}>
            {loading ? "Please wait…" : isSignUp ? "Create account" : "Log in"}
          </button>
        </form>

        {message && (
          <p className={`${styles.Message} ${isError ? styles.Error : styles.Success}`}>
            {message}
          </p>
        )}

        <button
          type="button"
          className={styles.ToggleBtn}
          onClick={() => {
            setIsSignUp(!isSignUp);
            setMessage("");
            setIsError(false);
          }}
        >
          {isSignUp
            ? "Already have an account? Log in"
            : "No account? Sign up"}
        </button>
      </div>
    </div>
  );
}
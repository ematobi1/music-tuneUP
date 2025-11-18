import React, { useEffect, useState } from "react";
import { login, logout, onUser } from "../firebase/auth";

const LoginPanel: React.FC<{ onUserChange: (user: any) => void }> = ({ onUserChange }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onUser((u) => {
      setUser(u);
      onUserChange(u);
    });
    return () => unsub();
  }, []);

  return (
    <div style={{ padding: "0.5rem", color: "white" }}>
      {user ? (
        <>
          <span>Welcome, {user.displayName}!</span>
          <button onClick={logout} style={{ marginLeft: "1rem" }}>Logout</button>
        </>
      ) : (
        <button onClick={login}>Sign in with Google</button>
      )}
    </div>
  );
};

export default LoginPanel;

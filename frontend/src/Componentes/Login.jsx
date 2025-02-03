import React, { useState } from "react";
import { loginWithGoogle, logout } from "../firebaseConfig";

const Login = () => {
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    const loggedUser = await loginWithGoogle;
    if (loggedUser) {
      setUser(loggedUser);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Bienvenido, {user.displayName}</p>
          <img src={user.photoURL} alt="Avatar" style={{ width: "50px", borderRadius: "50%" }} />
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Iniciar sesión con Google</button>
      )}
    </div>
  );
};

export default Login;

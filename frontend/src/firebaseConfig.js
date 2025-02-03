import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// Configuración de Firebase (usa tus credenciales de Firebase aquí)
const firebaseConfig = {
    apiKey: "AIzaSyABcA6ob2NbiESJxoiBpEFkrAO03TFO18M",
    authDomain: "upelis-7951f.firebaseapp.com",
    projectId: "upelis-7951f",
    storageBucket: "upelis-7951f.firebasestorage.app",
    messagingSenderId: "272373723679",
    appId: "1:272373723679:web:56bb12537cd83dbaeddb2a",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      // Enviar datos al backend
      const response = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Error al guardar los datos en la base de datos');
      }
  
      return user;
    } catch (error) {
      console.error("Error en la autenticación con Google:", error);
    }
  };

const logout = async () => {
  try {
    await signOut(auth);
    console.log("Cerrar sesion con exito")
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};

export { auth, loginWithGoogle, logout };

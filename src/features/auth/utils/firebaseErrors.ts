import { FirebaseError } from "firebase/app";

export const getAuthErrorMessage = (error: unknown): string => {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/email-already-in-use":
        return "El correo ya está en uso";

      case "auth/invalid-email":
        return "El correo no es válido";

      case "auth/weak-password":
        return "La contraseña debe tener al menos 6 caracteres";

      case "auth/invalid-credential":
        return "Correo o contraseña incorrectos. Si te registraste con Google, usa Google para iniciar sesión.";

      case "auth/popup-closed-by-user":
        return "Se cerró la ventana de autenticación.";

      case "auth/network-request-failed":
        return "Error de conexión. Verifica tu internet.";

      case "auth/too-many-requests":
        return "Demasiados intentos. Intenta más tarde.";

      default:
        return "Error de autenticación";
    }
  }

  return "Error inesperado";
};

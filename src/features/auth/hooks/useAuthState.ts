//* React
import { useEffect, useState } from "react";
import { useCollection } from "@/firebase/hooks/useCollection";

//* Firebase
import { auth, provider } from "@/firebase/config";
import {
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// * Types & utils
import type { UserDoc, UserLogin, UserSignUp } from "../types/user.types";
import { getAuthErrorMessage } from "../utils/firebaseErrors";
import { toast } from "react-toastify";

export default function useAuthState() {
  //* States
  const [user, setUser] = useState<UserDoc | null>(null);
  const [loading, setLoading] = useState(true);

  //* Custom hooks
  const { getById, setById } = useCollection<UserDoc>("users");

  //* Effects
  useEffect(() => {
    // ? onAuthStateChanged, es un listener que se ejecuta cuando el usuario inicia sesión, cierra sesión
    // ? se recarga la página o firebase detecta que hay una sesión activa y la restaura.
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      // Si hay una sesión activa
      if (firebaseUser) {
        // Obtener ID
        const uid: string = firebaseUser.uid;

        // Se busca ese usuario en la COLECCIÓN usuarios
        const userDoc = await getById(uid);
        if (userDoc) {
          setUser({
            email: firebaseUser.email!,
            username: userDoc.username,
            photoURL: userDoc.photoURL || "",
          });
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  //* Functions
  const registerWithEmailAndPassword = async ({
    email,
    password,
    username,
  }: UserSignUp): Promise<string | null> => {
    try {
      // ? Se crea un usuario en la parte de authentication con Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      // Ahora se guarda en la colección "users", el usuario con esa misma id (para referencias) con los datos propios
      await setById(userCredential.user.uid, {
        username,
        email,
        photoURL: "",
      });

      return null;
    } catch (err) {
      return getAuthErrorMessage(err);
    }
  };

  const loginWithEmailAndPassword = async (
    credentials: UserLogin,
  ): Promise<string | null> => {
    try {
      // ? Se inicia sesión con Firebase
      // Si el login funciona correctamente, se ejecuta el listener y se setea el usuario.
      await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password,
      );

      return null;
    } catch (err) {
      return getAuthErrorMessage(err);
    }
  };

  const authWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      // Para registrar al usuario en Firestore, se obtiene su información del resultado de la autenticación
      const user = result.user;
      const additionalUserInfo = getAdditionalUserInfo(result);
      const isNewUser = additionalUserInfo?.isNewUser;

      if (isNewUser) {
        await setById(user.uid, {
          username: user.displayName || "Invitado",
          email: user.email!,
          photoURL: user.photoURL || "",
        });
      }

      return null;
    } catch (error) {
      return getAuthErrorMessage(error);
    }
  };

  const logout = async (): Promise<string | null> => {
    try {
      // ? Se usa el método signOut
      await signOut(auth);
      toast.success("Sesión cerrada exitosamente.");
      return null;
    } catch {
      return "No se pudo cerrar sesión. Intenta nuevamente.";
    }
  };

  const getUserId = (): string | undefined => {
    return auth.currentUser?.uid;
  };

  return {
    user,
    loading,
    registerWithEmailAndPassword,
    loginWithEmailAndPassword,
    authWithGoogle,
    logout,
    getUserId,
  };
}

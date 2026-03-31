import { useState, type SubmitEvent } from "react";
import { useAuth } from "./useAuth";
import { toast } from "react-toastify";
import type { UserLogin, UserSignUp } from "../types/user.types";
import { useNavigate } from "react-router";

export const useAuthForm = (isSignup: boolean) => {
  //* Context
  const { registerWithEmailAndPassword, loginWithEmailAndPassword } = useAuth();

  //* States
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //* Navigate
  const navigate = useNavigate();

  //* Handlers
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  //* Functions
  const handleRegister = async () => {
    if (
      email.trim() === "" ||
      username.trim() === "" ||
      password.trim() === ""
    ) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    // Crear objeto IUserLogin con las credenciales
    const credentials: UserSignUp = {
      email,
      username,
      password,
    };

    // Llamar a la función register del context
    const errorMessage = await registerWithEmailAndPassword(credentials);

    if (!errorMessage) {
      toast.success("¡Te has registrado correctamente!");
      navigate("/login");
      return;
    }

    // Mostrar alerta
    toast.error(errorMessage);
  };

  const handleLogin = async () => {
    if (email.trim() === "" || password.trim() === "") {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    // Crear objeto UserLogin con las credenciales
    const credentials: UserLogin = {
      email,
      password,
    };

    // Llamar a la función login del context
    const errorMessage = await loginWithEmailAndPassword(credentials);

    if (!errorMessage) {
      toast.success("¡Sesión iniciada correctamente!");
      return;
    }

    // Mostrar alerta
    toast.error(errorMessage);
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSignup) {
      handleRegister();
    } else {
      handleLogin();
    }
  };

  return {
    email,
    username,
    password,
    handleEmailChange,
    handleUsernameChange,
    handlePasswordChange,
    handleSubmit,
  };
};

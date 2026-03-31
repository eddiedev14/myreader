import Icon from "@/assets/logos/icon.png";
import { Button } from "@/shared/components/shadcn/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/shadcn/field";
import { Input } from "@/shared/components/shadcn/input";
import { Link } from "react-router-dom";
import { useAuthForm } from "../hooks/useAuthForm";

interface Props {
  isSignup?: boolean;
}

export const AuthForm = ({ isSignup = false }: Props) => {
  const {
    email,
    username,
    password,
    handleEmailChange,
    handleUsernameChange,
    handlePasswordChange,
    handleSubmit,
    handleGoogleAuth,
  } = useAuthForm(isSignup);

  return (
    <main className="flex items-center justify-center w-full min-h-screen px-4">
      <form
        className="flex w-full flex-col max-w-lg border border-gray-200 rounded px-10 py-8"
        onSubmit={handleSubmit}
      >
        <img src={Icon} alt="MyReader Icon" className="size-12 mb-4" />

        <h2 className="text-3xl font-medium text-foreground">Registrarse</h2>

        <p className="mt-2 text-base text-foreground/70">
          Crea una cuenta para disfrutar de MyReader
        </p>

        <div className="flex flex-col gap-4 my-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                type="email"
                id="email"
                placeholder="example@myreader.com"
                required
                value={email}
                onChange={handleEmailChange}
              />
            </Field>
            {isSignup && (
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  placeholder="example"
                  required
                  value={username}
                  onChange={handleUsernameChange}
                />
              </Field>
            )}
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                type="password"
                id="password"
                placeholder="********"
                required
                value={password}
                onChange={handlePasswordChange}
              />
            </Field>
          </FieldGroup>
        </div>

        <div className="flex flex-col gap-4">
          <Button size="lg">Registrarse</Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full flex items-center justify-center gap-2"
            onClick={handleGoogleAuth}
          >
            <svg className="h-5 w-5" viewBox="0 0 48 48">
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.7 1.22 9.2 3.6l6.9-6.9C35.9 2.1 30.4 0 24 0 14.6 0 6.4 5.4 2.6 13.2l8 6.2C12.5 13.4 17.8 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.1 24.5c0-1.7-.2-3.4-.5-5H24v9.5h12.4c-.5 2.7-2 5-4.3 6.6l7 5.4c4.1-3.8 7-9.5 7-16.5z"
              />
              <path
                fill="#FBBC05"
                d="M10.6 28.4c-1-2.7-1-5.6 0-8.3l-8-6.2C.9 17.4 0 20.6 0 24s.9 6.6 2.6 9.6l8-6.2z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.5 0 12-2.1 16-5.7l-7-5.4c-2 1.4-4.6 2.3-9 2.3-6.2 0-11.5-3.9-13.4-9.2l-8 6.2C6.4 42.6 14.6 48 24 48z"
              />
            </svg>
            Continuar con Google
          </Button>
        </div>

        <p className="text-center text-sm pt-4">
          ¿Ya tienes una cuenta?{" "}
          <Button variant="link" asChild>
            <Link to="/login">Iniciar sesión</Link>
          </Button>
        </p>
      </form>
    </main>
  );
};

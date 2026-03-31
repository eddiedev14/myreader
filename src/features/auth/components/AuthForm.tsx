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

        <Button size="lg">Registrarse</Button>
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

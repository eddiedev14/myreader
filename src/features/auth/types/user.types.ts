// Se usa Utility Types (particularmente Omit) para crear variantes de interfaces
export type User = {
  email: string;
  username: string;
  password: string;
  photoURL: string;
};

export type UserDoc = Omit<User, "password">;
export type UserSignUp = Omit<User, "photoURL">;
export type UserLogin = Omit<User, "username" | "photoURL">;

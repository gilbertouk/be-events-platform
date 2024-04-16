enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface CreateUserInput {
  firstName: string;
  surname: string;
  email: string;
  role: Role;
}

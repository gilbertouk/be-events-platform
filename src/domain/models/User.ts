enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface IUser {
  id: string;
  firstName: string;
  surname: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

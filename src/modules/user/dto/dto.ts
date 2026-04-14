import { UserRole } from "../model";

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserDTO {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  role: UserRole;
}

export const userSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    email: { type: "string" },
    createdAt: { type: "string" },
    updatedAt: { type: "string" },
    role: { type: "string", enum: Object.values(UserRole) },
  },
};

export const userListSchema = {
  type: "array",
  items: userSchema,
};

export const createUserSchema = {
  type: "object",
  required: ["name", "email", "password"],
  properties: {
    name: { type: "string" },
    email: { type: "string", format: "email" },
    password: { type: "string" },
  },
};

export const updateUserSchema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 3, maxLength: 50 },
    email: { type: "string", format: "email", minLength: 6, maxLength: 50 },
    password: { type: "string", minLength: 3, maxLength: 50 },
  },
};

export const idParamSchema = {
  type: "object",
  required: ["id"],
  properties: {
    id: { type: "string" },
  },
};

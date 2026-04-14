export interface LoginDto {
  email: string;
  password: string;
}

export const loginSchema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 3, maxLength: 100 },
  },
  required: ["email", "password"],
};

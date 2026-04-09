import { DataSource } from "typeorm";
import { env } from "./env.js";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  synchronize: false,
  logging: env.NODE_ENV === "development",
  entities: ["src/**/*.entity.ts", "dist/**/*.entity.js"],
  migrations: ["src/database/migrations/**/*.ts", "dist/database/migrations/**/*.js"],
  subscribers: ["src/database/subscribers/**/*.ts", "dist/database/subscribers/**/*.js"],
});

export default AppDataSource;

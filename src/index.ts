import fastify from "fastify";
import "reflect-metadata";
import { AppDataSource } from "./config/database";
import { routes } from "./modules";

const server = fastify();

server.get("/ping", async (request, reply) => {
  return "pong\n";
});

async function bootstrap() {
  try {
    // Initialize database connection
    await AppDataSource.initialize();
    console.log("Database connection established");

    // Register all module routes
    await routes(server);

    server.listen({ port: 8080 }, (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`Server listening at ${address}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

bootstrap();

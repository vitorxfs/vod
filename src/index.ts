import fastify from "fastify";
import database from "./config/database";
import { env } from "./config/env";
import { routes } from "./modules";
import { docs } from './config/docs';

const server = fastify();

server.get("/ping", async () => {
  return "pong\n";
});

async function bootstrap() {
  try {
    await server.register(docs);
    await database.initialize();
    await routes(server);

    server.listen({ host: "0.0.0.0", port: env.PORT }, (err, address) => {
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

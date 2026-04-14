import swagger from "@fastify/swagger";
import scalar from "@scalar/fastify-api-reference";
import fp from "fastify-plugin";

export const docs = fp(async (app) => {
  await app.register(swagger, {
    openapi: { info: { title: "Video On Demand", version: "1.0.0" } },
  });

  await app.register(scalar, {
    routePrefix: "/docs",
    configuration: {
      theme: "laserwave",
    },
  });
});

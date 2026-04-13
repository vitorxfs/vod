## Modules

root_folder: /src/modules,
index.ts: a file that centralizes all the routes to be used within fastify instance

Folder structure

```
src/
  modules/
    <domain>/
      service.ts
      routes.ts
      model.ts
      repository.ts
      database/
        schema.ts
        mapper.ts
        index.ts
      dto/
        dto.ts
        mapper.ts
        index.ts
```

### Routes

The same as controllers: defines routes, validations, docs details and maps DTO to model.

Example:

```ts
import { toDTO, toModel, CreateUserDTO } from "./dto";

app.route({
  method: "POST",
  url: "/users",
  schema: {
    body: createUserSchema,
    response: {
      201: userSchema,
      400: errorSchema,
      409: errorSchema,
    },
  },
  handler: async (request, reply) => {
    const data = request.body as CreateUserDTO;

    const existingUser = await userService.findByEmail(email);
    if (existingUser) {
      return reply.status(409).send({ error: "Email already in use" });
    }

    const user = await userService.create(toModel(data));
    const userDTO = toDTO(user);

    return reply.status(201).send(userDTO);
  },
});
```

### Models, mappers and schemas

Every model has two mappers: dtoMapper and dbMapper
DTO -> model -> database schema

Schema defines database modeling using typeORM

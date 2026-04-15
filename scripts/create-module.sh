#!/bin/bash

# This is a script to automate the creation of a new module following the
# project convention.

# Usage: ./create-module.sh <moduleName>

set -e

MODULE_NAME="${1:?Usage: ./create-module.sh <moduleName>}"
MODULE_PATH="src/modules/$MODULE_NAME"

# Convert module name to PascalCase for class names
CLASS_NAME=$(echo "$MODULE_NAME" | sed 's/\b\(.\)/\U\1/g' | sed 's/-//g')

# Check if module already exists
if [ -d "$MODULE_PATH" ]; then
  echo "❌ Module '$MODULE_NAME' already exists at $MODULE_PATH"
  exit 1
fi

echo "📦 Creating module structure for: $MODULE_NAME"

# Create directories
mkdir -p "$MODULE_PATH/database"
mkdir -p "$MODULE_PATH/dto"

echo "✅ Directories created"

# Create model.ts
cat > "$MODULE_PATH/model.ts" << 'EOF'
export class __CLASS_NAME__ {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<__CLASS_NAME__>) {
    Object.assign(this, data);
  }
}
EOF
sed -i "s/__CLASS_NAME__/$CLASS_NAME/g" "$MODULE_PATH/model.ts"

# Create database/schema.ts
cat > "$MODULE_PATH/database/schema.ts" << 'EOF'
import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("__MODULE_NAME__s")
export class __CLASS_NAME__Entity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
EOF
sed -i "s/__MODULE_NAME__/$MODULE_NAME/g" "$MODULE_PATH/database/schema.ts"
sed -i "s/__CLASS_NAME__/$CLASS_NAME/g" "$MODULE_PATH/database/schema.ts"

# Create database/mapper.ts
cat > "$MODULE_PATH/database/mapper.ts" << 'EOF'
import { DbMapper } from "../../../utils/mapper";
import { __CLASS_NAME__ } from "../model";
import { __CLASS_NAME__Entity } from "./schema";

export class __CLASS_NAME__DatabaseMapper implements DbMapper<__CLASS_NAME__, __CLASS_NAME__Entity> {
  toDomain(raw: __CLASS_NAME__Entity): __CLASS_NAME__ {
    return new __CLASS_NAME__({
      id: raw.id,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  toPersistence(
    instance: __CLASS_NAME__ | Partial<__CLASS_NAME__>
  ): Partial<__CLASS_NAME__Entity> {
    return {
      id: instance.id,
      createdAt: instance.createdAt,
      updatedAt: instance.updatedAt,
    } as Partial<__CLASS_NAME__Entity>;
  }
}
EOF
sed -i "s/__CLASS_NAME__/$CLASS_NAME/g" "$MODULE_PATH/database/mapper.ts"

# Create repository.ts
cat > "$MODULE_PATH/repository.ts" << 'EOF'
import database from "../../config/database";
import { BaseRepository } from "../../utils/baseRepository";
import { __CLASS_NAME__DatabaseMapper } from "./database/mapper";
import { __CLASS_NAME__Entity } from "./database/schema";
import { __CLASS_NAME__ } from "./model";

export class __CLASS_NAME__Repository extends BaseRepository<__CLASS_NAME__, __CLASS_NAME__Entity> {
  constructor() {
    super(database.getRepository(__CLASS_NAME__Entity), new __CLASS_NAME__DatabaseMapper());
  }
}
EOF
sed -i "s/__CLASS_NAME__/$CLASS_NAME/g" "$MODULE_PATH/repository.ts"

# Create service.ts
cat > "$MODULE_PATH/service.ts" << 'EOF'
import { __CLASS_NAME__ } from "./model";
import { __CLASS_NAME__Repository } from "./repository";

export interface I__CLASS_NAME__Service {
  create(instance: __CLASS_NAME__): Promise<__CLASS_NAME__>;
  findAll(): Promise<__CLASS_NAME__[]>;
  findById(id: string): Promise<__CLASS_NAME__ | null>;
  update(id: string, data: Partial<__CLASS_NAME__>): Promise<__CLASS_NAME__ | null>;
  delete(id: string): Promise<boolean>;
}

export interface __CLASS_NAME__ServiceDependencies {
  repository: __CLASS_NAME__Repository;
}

export class __CLASS_NAME__Service implements I__CLASS_NAME__Service {
  private repository: __CLASS_NAME__Repository;

  constructor(deps: __CLASS_NAME__ServiceDependencies) {
    this.repository = deps.repository;
  }

  async create(instance: __CLASS_NAME__): Promise<__CLASS_NAME__> {
    return this.repository.create(instance);
  }

  async findAll(): Promise<__CLASS_NAME__[]> {
    return this.repository.findAll();
  }

  async findById(id: string): Promise<__CLASS_NAME__ | null> {
    return this.repository.findById(id);
  }

  async update(
    id: string,
    data: Partial<__CLASS_NAME__>
  ): Promise<__CLASS_NAME__ | null> {
    return this.repository.update(id, data);
  }

  async delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }
}
EOF
sed -i "s/I__CLASS_NAME__/I$CLASS_NAME/g" "$MODULE_PATH/service.ts"
sed -i "s/__CLASS_NAME__/$CLASS_NAME/g" "$MODULE_PATH/service.ts"

# Create factories.ts
cat > "$MODULE_PATH/factories.ts" << 'EOF'
import { I__CLASS_NAME__Service, __CLASS_NAME__Service } from "./service";
import { __CLASS_NAME__Repository } from "./repository";

let __MODULE_NAME__Service: I__CLASS_NAME__Service;
export const __MODULE_NAME__ServiceFactory = (): I__CLASS_NAME__Service => {
  if (__MODULE_NAME__Service) {
    return __MODULE_NAME__Service;
  }

  __MODULE_NAME__Service = new __CLASS_NAME__Service({
    repository: new __CLASS_NAME__Repository(),
  });
  return __MODULE_NAME__Service;
};
EOF
sed -i "s/I__CLASS_NAME__/I$CLASS_NAME/g" "$MODULE_PATH/factories.ts"
sed -i "s/__CLASS_NAME__/$CLASS_NAME/g" "$MODULE_PATH/factories.ts"
sed -i "s/__MODULE_NAME__/$MODULE_NAME/g" "$MODULE_PATH/factories.ts"

# Create dto/dto.ts
cat > "$MODULE_PATH/dto/dto.ts" << 'EOF'
export interface Create__CLASS_NAME__Dto {
}

export interface __CLASS_NAME__Dto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export const __CLASS_NAME__Schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
  },
  required: ["id", "createdAt", "updatedAt"],
};

export const create__CLASS_NAME__Schema = {
  type: "object",
  properties: {},
  required: [],
};

export const __CLASS_NAME__ListSchema = {
  type: "array",
  items: __CLASS_NAME__Schema,
};

export const idParamSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
};

export const update__CLASS_NAME__Schema = {
  type: "object",
  properties: {},
  required: [],
};
EOF
sed -i "s/__CLASS_NAME__/$CLASS_NAME/g" "$MODULE_PATH/dto/dto.ts"

# Create dto/mapper.ts
cat > "$MODULE_PATH/dto/mapper.ts" << 'EOF'
import { __CLASS_NAME__ } from "../model";
import { __CLASS_NAME__Dto, Create__CLASS_NAME__Dto } from "./dto";

export class __CLASS_NAME__DtoMapper {
  static toDto(instance: __CLASS_NAME__): __CLASS_NAME__Dto {
    return {
      id: instance.id,
      createdAt: instance.createdAt,
      updatedAt: instance.updatedAt,
    };
  }

  static toModel(dto: __CLASS_NAME__Dto): __CLASS_NAME__ {
    return new __CLASS_NAME__({
      id: dto.id,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
    });
  }

  static toCreateModel(dto: Create__CLASS_NAME__Dto): __CLASS_NAME__ {
    return new __CLASS_NAME__({});
  }
}
EOF
sed -i "s/__CLASS_NAME__/$CLASS_NAME/g" "$MODULE_PATH/dto/mapper.ts"

# Create routes.ts
cat > "$MODULE_PATH/routes.ts" << 'EOF'
import { FastifyInstance } from "fastify";
import { errorSchema } from "../../utils/error-handling/errorSchema";
import { authFactory } from "../../utils/security/auth";
import { authServiceFactory } from "../auth/factories";
import {
  Create__CLASS_NAME__Dto,
  __CLASS_NAME__Schema,
  idParamSchema,
  update__CLASS_NAME__Schema,
  __CLASS_NAME__ListSchema,
  create__CLASS_NAME__Schema,
} from "./dto/dto";
import { __CLASS_NAME__DtoMapper } from "./dto/mapper";
import { __MODULE_NAME__ServiceFactory } from "./factories";

const __MODULE_NAME__Service = __MODULE_NAME__ServiceFactory();
const auth = authFactory(authServiceFactory());

export async function __MODULE_NAME__Routes(app: FastifyInstance) {
  app.route({
    method: "POST",
    url: "/__MODULE_NAME__s",
    schema: {
      body: create__CLASS_NAME__Schema,
      response: {
        201: __CLASS_NAME__Schema,
        400: errorSchema,
      },
    },
    handler: async (request, reply) => {
      const data = request.body as Create__CLASS_NAME__Dto;
      const __MODULE_NAME__ = await __MODULE_NAME__Service.create(
        __CLASS_NAME__DtoMapper.toCreateModel(data)
      );
      const __MODULE_NAME__Dto = __CLASS_NAME__DtoMapper.toDto(__MODULE_NAME__);

      return reply.status(201).send(__MODULE_NAME__Dto);
    },
  });

  app.route({
    method: "GET",
    url: "/__MODULE_NAME__s",
    schema: {
      response: {
        200: __CLASS_NAME__ListSchema,
      },
    },
    handler: async (request, reply) => {
      const __MODULE_NAME__s = await __MODULE_NAME__Service.findAll();
      const __MODULE_NAME__Dtos = __MODULE_NAME__s.map((__MODULE_NAME__) =>
        __CLASS_NAME__DtoMapper.toDto(__MODULE_NAME__)
      );

      return reply.send(__MODULE_NAME__Dtos);
    },
  });

  app.route({
    method: "GET",
    url: "/__MODULE_NAME__s/:id",
    schema: {
      params: idParamSchema,
      response: {
        200: __CLASS_NAME__Schema,
        404: errorSchema,
      },
    },
    handler: async (request, reply) => {
      const { id } = request.params as { id: string };
      const __MODULE_NAME__ = await __MODULE_NAME__Service.findById(id);

      if (!__MODULE_NAME__) {
        return reply.status(404).send({ error: "Not found" });
      }

      const __MODULE_NAME__Dto = __CLASS_NAME__DtoMapper.toDto(__MODULE_NAME__);
      return reply.send(__MODULE_NAME__Dto);
    },
  });

  app.route({
    method: "PATCH",
    url: "/__MODULE_NAME__s/:id",
    schema: {
      params: idParamSchema,
      body: update__CLASS_NAME__Schema,
      response: {
        200: __CLASS_NAME__Schema,
        404: errorSchema,
      },
    },
    handler: async (request, reply) => {
      const { id } = request.params as { id: string };
      const data = request.body as Partial<Create__CLASS_NAME__Dto>;

      const __MODULE_NAME__ = await __MODULE_NAME__Service.update(id, {});

      if (!__MODULE_NAME__) {
        return reply.status(404).send({ error: "Not found" });
      }

      const __MODULE_NAME__Dto = __CLASS_NAME__DtoMapper.toDto(__MODULE_NAME__);
      return reply.send(__MODULE_NAME__Dto);
    },
  });

  app.route({
    method: "DELETE",
    url: "/__MODULE_NAME__s/:id",
    schema: {
      params: idParamSchema,
      response: {
        204: { type: "null" },
        404: errorSchema,
      },
    },
    handler: async (request, reply) => {
      const { id } = request.params as { id: string };
      const deleted = await __MODULE_NAME__Service.delete(id);

      if (!deleted) {
        return reply.status(404).send({ error: "Not found" });
      }

      return reply.status(204).send(null);
    },
  });
}
EOF
sed -i "s/__CLASS_NAME__/$CLASS_NAME/g" "$MODULE_PATH/routes.ts"
sed -i "s/__MODULE_NAME__/$MODULE_NAME/g" "$MODULE_PATH/routes.ts"

echo "✅ model.ts created"
echo "✅ database/schema.ts created"
echo "✅ database/mapper.ts created"
echo "✅ repository.ts created"
echo "✅ service.ts created"
echo "✅ factories.ts created"
echo "✅ dto/dto.ts created"
echo "✅ dto/mapper.ts created"
echo "✅ routes.ts created"

# Register routes in index.ts
INDEX_FILE="src/modules/index.ts"

# Add import statement
IMPORT_LINE="import { __MODULE_NAME__Routes } from \"./__MODULE_NAME__/routes\";"
IMPORT_LINE_REPLACED=$(echo "$IMPORT_LINE" | sed "s/__MODULE_NAME__/$MODULE_NAME/g")

# Check if import already exists
if ! grep -q "$IMPORT_LINE_REPLACED" "$INDEX_FILE"; then
  # Add import after the last import (find line number of last import, then insert after it)
  LAST_IMPORT_LINE=$(grep -n "^import.*from" "$INDEX_FILE" | tail -1 | cut -d: -f1)
  sed -i "${LAST_IMPORT_LINE}a\\$IMPORT_LINE_REPLACED" "$INDEX_FILE"
  echo "✅ Import added to index.ts"
fi

# Add route registration in the routes function
ROUTE_CALL="  app.register(__MODULE_NAME__Routes);"
ROUTE_CALL_REPLACED=$(echo "$ROUTE_CALL" | sed "s/__MODULE_NAME__/$MODULE_NAME/g")

# Check if route call already exists
if ! grep -q "app.register(${MODULE_NAME}Routes);" "$INDEX_FILE"; then
  # Add the route call before the closing brace
  sed -i "/^}/i\\$ROUTE_CALL_REPLACED" "$INDEX_FILE"
  echo "✅ Route registration added to index.ts"
fi

echo ""
echo "🎉 Module '$MODULE_NAME' created successfully!"
echo "📁 Location: $MODULE_PATH"
echo ""
echo "📝 Next steps:"
echo "  1. Update database/schema.ts to add domain-specific columns"
echo "  2. Update model.ts to add domain-specific properties"
echo "  3. Update dto/dto.ts to add domain-specific DTO properties"
echo "  4. Update routes.ts with your business logic"

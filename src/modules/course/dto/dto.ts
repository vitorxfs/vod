export interface CreateCourseDto {
  name: string;
}

export interface CourseDto {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export const CourseSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
    name: { type: "string" },
  },
  required: ["id", "name", "createdAt", "updatedAt"],
};

export const createCourseSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
  required: ["name"],
};

export const CourseListSchema = {
  type: "array",
  items: CourseSchema,
};

export const idParamSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
};

export const updateCourseSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
  required: [],
};

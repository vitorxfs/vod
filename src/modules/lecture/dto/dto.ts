export interface CreateLectureDto {
  title: string;
  courseId: string;
  position: number;
  url: string;
}

export interface LectureDto {
  id: string;
  title: string;
  courseId: string;
  position: number;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

export const LectureSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
  },
  required: ["id", "createdAt", "updatedAt"],
};

export const createLectureSchema = {
  type: "object",
  properties: {
    title: { type: "string" },
    courseId: { type: "string" },
    position: { type: "number" },
    url: { type: "string" },
  },
  required: ["title", "courseId", "position"],
};

export const LectureListSchema = {
  type: "array",
  items: LectureSchema,
};

export const idParamSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
};

export const updateLectureSchema = {
  type: "object",
  properties: {},
  required: [],
};

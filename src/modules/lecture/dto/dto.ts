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
  progress: LectureProgressDto | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateProgressDto {
  completed: boolean;
  elapsedTime: number;
}

export interface LectureProgressDto {
  id: string;
  lectureId: string;
  completed: boolean;
  elapsedTime: number;
  createdAt: Date;
  updatedAt: Date;
}

export const updateProgressSchema = {
  type: "object",
  properties: {
    completed: { type: "boolean" },
    elapsedTime: { type: "number" },
  },
};

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

export const lectureProgressSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    lectureId: { type: "string" },
    completed: { type: "boolean" },
    elapsedTime: { type: "number" },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
  },
  required: ["id", "lectureId", "completed", "elapsedTime", "createdAt", "updatedAt"],
};

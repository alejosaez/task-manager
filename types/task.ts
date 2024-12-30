export interface Task {
    _id: string;
    title: string;
    description?: string;
    completed: boolean;
    createdAt: string;
  }

  export type FormData = {
    title: string;
    description?: string;
  };

  export type UpdateTaskFormData = {
    title: string;
    description?: string;
    completed: boolean;
  };
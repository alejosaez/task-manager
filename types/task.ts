export interface Task {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    createdAt: string;
  }

  export type FormData = {
    title: string;
    description?: string;
  };
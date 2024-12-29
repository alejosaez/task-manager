import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Task } from '@/types/task';

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => '/tasks',
    }),
    getTaskById: builder.query<Task, string>({
      query: (id) => `/tasks/${id}`,
    }),
  }),
});

export const { useGetTasksQuery, useGetTaskByIdQuery } = taskApi;
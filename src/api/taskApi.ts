import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Task {
    id: any;
    title: string;
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    datetime: string;
    estimate: number;
    status: 'TODO' | 'DOING' | 'DONE' | 'WARNING' | 'PENDING' | 'FAILED';
    hash: any
}

export const tasksApi = createApi({
    reducerPath: 'tasksApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
    tagTypes: ['Tasks'],
    endpoints: (builder) => ({
        getTasks: builder.query<Task[], void>({
            query: () => '/tasks',
            providesTags: ['Tasks'],
        }),
        addTask: builder.mutation<Task, Partial<Task>>({
            query: (newTask) => ({
                url: '/tasks',
                method: 'POST',
                body: newTask,
            }),
            invalidatesTags: ['Tasks']
        }),
        updateTaskStatus: builder.mutation<void, { id: any; status: 'TODO' | 'DOING' | 'DONE' | 'WARNING' | 'PENDING' | 'FAILED' }>({
            query: ({ id, status }) => ({
                url: `/tasks/${id}`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: ['Tasks'],
        }),       
        editTask: builder.mutation<Task, Partial<Task> & { id: any }>({
            query: (updatedTask) => ({
                url: `/tasks/${updatedTask.id}`,
                method: 'PUT',
                body: updatedTask,
            }),
            invalidatesTags: ['Tasks'],
        }),
        deleteTask: builder.mutation({
            query: (taskId) => ({
                url: `/tasks/${taskId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Tasks'],
        }),
    }),
});


export const {
    useDeleteTaskMutation,
    useGetTasksQuery,
    useAddTaskMutation,
    useUpdateTaskStatusMutation,
    useEditTaskMutation
} = tasksApi;

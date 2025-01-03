'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useCreateTaskMutation } from '@/store/slices/taskApi';
import { FormData } from '@/types/task';
import { toast } from 'react-toastify'; // Importa toast
import 'react-toastify/dist/ReactToastify.css'; // Asegúrate de incluir los estilos

const TaskForm = ({
  setShowModal,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();
  const [createTask, { isLoading }] = useCreateTaskMutation();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await createTask(data).unwrap();
      toast.success('Task created successfully!');
      setShowModal(false);
      router.push(`/tasks`);
    } catch (err) {
      console.error('Failed to create task:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 relative">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-2 right-4 text-xl text-gray-400 hover:text-gray-600"
        >
          x
        </button>

        <h2 className="text-xl text-gray-400 font-bold mb-4">Add Task</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-black"
              htmlFor="title"
            >
              Title
            </label>
            <input
              id="title"
              {...register('title', { required: 'Title is required' })}
              className={`w-full rounded-lg text-gray-600 border-[1.5px] px-5 py-3 mb-2 outline-none ${
                errors.title ? 'border-red-500' : 'border-[#c2c2ff]'
              }`}
              placeholder="Add a title..."
            />
            {errors.title && (
              <p className="text-red-500 text-xs">{errors.title.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-black"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              {...register('description')}
              className="w-full rounded-lg text-gray-600 border-[1.5px] border-[#c2c2ff] px-5 py-3 mb-2 outline-none focus:border-[#c2c2ff]"
              rows={4}
              placeholder="Add a description..."
            />
          </div>

          <div className="flex justify-between sm:justify-end items-center mt-6 space-x-4">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="w-full sm:w-auto px-4 py-2 text-sm font-bold text-white bg-gray-500 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 text-sm font-bold text-white bg-[#c2c2ff] rounded hover:bg-[#a6a6ff]"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
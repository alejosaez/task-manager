'use client'

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from "next/navigation";

const TaskForm = ({ setShowModal }: { setShowModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>(); // Especificamos FormData aquí
  const router = useRouter();

  // Definir el tipo para los datos del formulario
  type FormData = {
    title: string;
    description?: string; // Descripción es opcional
  };

  // Cambiar el tipo de onSubmit para que sea un SubmitHandler de react-hook-form
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data); // Aquí procesarías la tarea, como hacer una llamada a una API
    setShowModal(false); // Cerrar el modal
    router.push(`/tasks`); // Redirigir al listado de tareas
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Add Task</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Titulo */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-black" htmlFor="title">Title</label>
            <input
              id="title"
              {...register('title', { required: "Title is required" })}
              className="w-full rounded-lg border-[1.5px] border-[#c2c2ff] px-5 py-3 mb-2 outline-none focus:border-[#c2c2ff]"
            />
            {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
          </div>

          {/* Descripción */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-black" htmlFor="description">Description</label>
            <textarea
              id="description"
              {...register('description')}
              className="w-full rounded-lg border-[1.5px] border-[#c2c2ff] px-5 py-3 mb-2 outline-none focus:border-[#c2c2ff]"
              rows={4}
              placeholder="Optional"
            />
          </div>

          <div className="flex justify-end mt-6 space-x-4">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 text-sm font-bold text-white bg-gray-500 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-bold text-white bg-[#c2c2ff] rounded hover:bg-[#a6a6ff]"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;

"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  useGetTaskByIdQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from "@/store/slices/taskApi";
import { useEffect, useState } from "react";

type UpdateTaskFormData = {
  title: string;
  description?: string;
  completed: boolean;
};

const TaskDetail = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const [taskId, setTaskId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateTaskFormData>();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();

  const {
    data: task,
    isLoading,
    error,
  } = useGetTaskByIdQuery(taskId!, { skip: !taskId });

  useEffect(() => {
    params.then((resolvedParams) => {
      setTaskId(resolvedParams.id);
    });
  }, [params]);

  useEffect(() => {
    if (task) {
      setValue("title", task.title);
      setValue("description", task.description || "");
      setValue("completed", task.completed);
    }
  }, [task, setValue]);

  const onSubmit: SubmitHandler<UpdateTaskFormData> = async (data) => {
    if (!taskId) return;

    if (!data.title.trim()) {
      alert("The title is required.");
      return;
    }

    try {
      await updateTask({ id: taskId, ...data }).unwrap();
      router.push("/tasks");
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  const handleDelete = async () => {
    if (!taskId) return;

    if (confirm(`Are you sure you want to delete the task "${task?.title}"?`)) {
      try {
        await deleteTask(taskId).unwrap();
        alert("Task deleted successfully");
        router.push("/tasks");
      } catch (err) {
        console.error("Failed to delete task:", err);
        alert("Error deleting the task. Please try again.");
      }
    }
  };

  if (isLoading || !taskId) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        Error loading task details. Please try again later.
      </div>
    );
  }

  return (
    <div className="w-full p-6 bg-[#fdfdfd]">
      <button
        onClick={() => router.push(`/tasks`)}
        className="flex items-center text-[#8892b3] mb-6"
      >
        {"< Volver al listado de tareas"}
      </button>

      <div className="relative w-full bg-white rounded-lg p-6">
        {/* Botón de eliminar */}
        <button
          onClick={handleDelete}
          className="absolute top-4 right-4 px-4 py-2 text-sm font-bold text-white bg-red-500 rounded hover:bg-red-600"
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
        <div className="pt-16">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-between">
              <h3 className="mb-3 block font-medium text-black">Title</h3>

              <div className="flex justify-end mb-4">
                <label className="flex items-center text-sm font-medium text-black">
                  <input
                    type="checkbox"
                    {...register("completed")}
                    className="mr-2 h-5 w-5 rounded-full border-2 border-[#c2c2ff] checked:bg-[#c2c2ff] focus:outline-none transition-colors"
                  />
                  <span>Mark as Completed</span>
                </label>
              </div>
            </div>

            <input
              {...register("title", { required: "Title is required" })}
              className={`w-full rounded-lg text-gray-500 border-[1.5px] px-5 py-3 mb-4 ${
                errors.title ? "border-red-500" : "border-[#c2c2ff]"
              } focus:outline-none`}
              placeholder="Task title"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mb-2">
                {errors.title.message}
              </p>
            )}

            <h3 className="mb-3 block font-medium text-black">Description</h3>
            <textarea
              {...register("description")}
              className="w-full rounded-lg text-gray-500 border-[1.5px] border-[#c2c2ff] px-5 py-3 mb-4 focus:outline-none"
              rows={6}
              placeholder="Task description"
            />

            <div className="flex justify-end space-x-4 mt-4">
              <button
                type="button"
                onClick={() => router.push(`/tasks`)}
                className="px-4 py-2 text-sm font-bold text-white bg-gray-500 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-bold text-white bg-[#c2c2ff] rounded hover:bg-[#a6a6ff]"
              >
                {isUpdating ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;

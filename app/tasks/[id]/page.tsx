'use client';

import { Task } from "@/types/task";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const TaskDetail = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);
  const [task, setTask] = useState<Task | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id);
      // Mock task data, replace with an API call to fetch the task by ID
      const fetchedTask: Task = {
        id: resolvedParams.id,
        title: "Task 1",
        description: "This is the description for task 1",
        completed: false,
        createdAt: new Date().toISOString(),
      };
      setTask(fetchedTask);
      setTitle(fetchedTask.title || "");
      setIsCompleted(fetchedTask.completed);
    });
  }, [params]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCompleted(e.target.checked);
  };

  if (!task) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
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

      <div className="w-full bg-white rounded-lg">
        <div className="flex justify-between">
          <h3 className="mb-3 block font-medium text-black">Title</h3>

          <div className="flex justify-end mb-4">
            <label className="flex items-center text-sm font-medium text-black">
              <input
                type="checkbox"
                id="completed"
                checked={isCompleted}
                onChange={handleCheckboxChange}
                className="mr-2 h-5 w-5 rounded-full border-2 border-[#c2c2ff] checked:bg-[#c2c2ff] focus:outline-none transition-colors"
              />
              <span>Mark as Completed</span>
            </label>
          </div>
        </div>

        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          className="w-full rounded-lg border-[1.5px] border-primary bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-[#c2c2ff] active:border-[#c2c2ff] mb-6"
        />

        <div className="rounded-sm bg-white shadow-default">
          <div className="flex flex-col">
            <div>
              <h3 className="mb-3 block font-medium text-black">Description</h3>
              <textarea
                rows={6}
                placeholder="Task Description"
                defaultValue={task.description || "Sin descripción"}
                className="w-full rounded-lg border-[1.5px] border-primary bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-[#c2c2ff] active:border-[#c2c2ff]"
              />
            </div>

            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={() => router.push(`/tasks`)}
                className="px-4 py-2 w-full sm:w-auto min-w-28 text-sm font-bold text-white bg-gray-500 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={() => router.push(`/tasks/${id}/edit`)}
                className="px-4 py-2 w-full sm:w-auto min-w-28 text-sm font-bold text-white bg-[#c2c2ff] rounded hover:bg-[#a6a6ff]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;

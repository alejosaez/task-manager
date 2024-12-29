'use client';

import { Task } from '@/types/task';
import { useRouter } from 'next/navigation';
import { useGetTaskByIdQuery } from '@/store/slices/taskApi';
import { useEffect, useState } from 'react';

const TaskDetail = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const [taskId, setTaskId] = useState<string | null>(null);
  const [title, setTitle] = useState<Task['title']>('');
  const [isCompleted, setIsCompleted] = useState<Task['completed']>(false);

  useEffect(() => {
    params.then((resolvedParams) => {
      setTaskId(resolvedParams.id);
    });
  }, [params]);

  const { data: task, isLoading, error } = useGetTaskByIdQuery(taskId!, {
    skip: !taskId,
  });

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setIsCompleted(task.completed);
    }
  }, [task]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCompleted(e.target.checked);
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

  if (!task) {
    return (
      <div className="flex items-center justify-center h-screen">
        Task not found.
      </div>
    );
  }

  return (
    <div className="w-full p-6 bg-[#fdfdfd]">
      <button
        onClick={() => router.push(`/tasks`)}
        className="flex items-center text-[#8892b3] mb-6"
      >
        {'< Volver al listado de tareas'}
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
                defaultValue={task.description || 'Sin descripción'}
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
                onClick={() => router.push(`/tasks/${taskId}/edit`)}
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
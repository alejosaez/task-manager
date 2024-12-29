'use client'

import React, { useState } from 'react';
import Card from '../components/task/Task';
import { Task } from "@/types/task";
import { useRouter } from "next/navigation";
import TaskForm from '../components/task/TaskForm';

const tasks: Task[] = [
  {
    id: "1",
    title: "Task 1",
    description: "This is the description for task 1",
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Task 2",
    description: "This is the description for task 2",
    completed: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Task 3",
    description: "This is the description for task 3",
    completed: true,
    createdAt: new Date().toISOString(),
  },
];

export default function TasksPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = (id: string) => {
    router.push(`/tasks/${id}`);
  };

  const handleAddTaskClick = () => {
    setShowModal(true);
  };

  return (
    <div className="flex h-screen bg-[#fdfdfd]">
      <div className="flex-1 sm:p-6 p-2">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bol text-gray-400">Task Board </h1>
          <button
            onClick={handleAddTaskClick}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-blue-500 bg-blue-100 rounded-full shadow-sm transition hover:bg-blue-200"
          >
            + Add Task
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="bg-[#f0f4ff] p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold text-[#8892b3] mb-4">To Do</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {tasks.filter(task => !task.completed).map((task) => (
                <div
                  key={task.id}
                  className="cursor-pointer"
                  onClick={() => handleCardClick(task.id)}
                >
                  <Card
                    id={task.id}
                    title={task.title}
                    description={task.description || ""}
                    completed={task.completed}
                    createdAt={task.createdAt}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#f7f3ff] p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold text-[#988dae] mb-4">Done</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {tasks.filter(task => task.completed).map((task) => (
                <div
                  key={task.id}
                  className="cursor-pointer"
                  onClick={() => handleCardClick(task.id)}
                >
                  <Card
                    id={task.id}
                    title={task.title}
                    description={task.description || ""}
                    completed={task.completed}
                    createdAt={task.createdAt}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showModal && <TaskForm setShowModal={setShowModal} />}
    </div>
  );
}

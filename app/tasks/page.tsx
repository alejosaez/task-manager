"use client";

import React, { useState } from "react";
import { useGetTasksQuery } from "@/store/slices/taskApi";
import Card from "../components/task/Task";
import { useRouter } from "next/navigation";
import TaskForm from "../components/task/TaskForm";

export default function TasksPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("all");

  const { data: tasks, isLoading, error } = useGetTasksQuery();

  const handleCardClick = (id: string) => {
    router.push(`/tasks/${id}`);
  };

  const handleAddTaskClick = () => {
    setShowModal(true);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  if (isLoading) return <div className="p-6">Loading tasks...</div>;
  if (error) return <div className="p-6">Error loading tasks.</div>;

  const totalTasks = tasks?.length || 0;
  const pendingTasks = tasks?.filter((task) => !task.completed).length || 0;
  const completedTasks = tasks?.filter((task) => task.completed).length || 0;

  return (
    <div className="flex h-screen bg-[#fdfdfd]">
      <div className="flex-1 sm:p-6 p-2">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-400">Task Board</h1>
          <button
            onClick={handleAddTaskClick}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-blue-500 bg-blue-100 rounded-full shadow-sm transition hover:bg-blue-200"
          >
            + Add Task
          </button>
        </div>

          <div className="flex items-center space-x-4 mb-8">
            <button
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                filter === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => handleFilterChange("all")}
            >
              All ({totalTasks})
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                filter === "pending"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => handleFilterChange("pending")}
            >
              To Do ({pendingTasks})
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                filter === "completed"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => handleFilterChange("completed")}
            >
              Done ({completedTasks})
            </button>
          </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {(filter === "all" || filter === "pending") && (
            <div className="bg-[#f0f4ff] p-4 rounded-lg shadow">
              <h2 className="text-lg font-bold text-[#8892b3] mb-4">
                To Do
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {tasks
                  ?.filter((task) => !task.completed)
                  .map((task) => (
                    <div
                      key={task._id}
                      className="cursor-pointer"
                      onClick={() => handleCardClick(task._id)}
                    >
                      <Card
                        _id={task._id}
                        title={task.title}
                        description={task.description || ""}
                        completed={task.completed}
                        createdAt={task.createdAt}
                      />
                    </div>
                  ))}
              </div>
            </div>
          )}

          {(filter === "all" || filter === "completed") && (
            <div className="bg-[#f7f3ff] p-4 rounded-lg shadow">
              <h2 className="text-lg font-bold text-[#988dae] mb-4">
                Done
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {tasks
                  ?.filter((task) => task.completed)
                  .map((task) => (
                    <div
                      key={task._id}
                      className="cursor-pointer"
                      onClick={() => handleCardClick(task._id)}
                    >
                      <Card
                        _id={task._id}
                        title={task.title}
                        description={task.description || ""}
                        completed={task.completed}
                        createdAt={task.createdAt}
                      />
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {showModal && <TaskForm setShowModal={setShowModal} />}
    </div>
  );
}
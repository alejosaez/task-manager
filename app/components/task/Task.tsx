"use client";

import { Task } from "@/types/task";
import { useDeleteTaskMutation } from "@/store/slices/taskApi";
import React from "react";
import { FaTrash } from "react-icons/fa";

const Card: React.FC<Task> = ({
  _id,
  title,
  description,
  completed,
  createdAt,
}) => {
  const [deleteTask, { isLoading }] = useDeleteTaskMutation();

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (confirm(`Are you sure you want to delete the task "${title}"?`)) {
      try {
        await deleteTask(_id).unwrap();
        alert("Task deleted successfully");
      } catch (err) {
        console.error("Failed to delete task:", err);
        alert("Error deleting the task. Please try again.");
      }
    }
  };

  return (
    <div className="relative rounded-xl border-2 border-gray-100 bg-white overflow-hidden">
      <div className="absolute top-2 right-2">
        <button
          onClick={handleDelete}
          disabled={isLoading}
          className="flex items-center gap-2 p-2 rounded-md transition"
        >
          <FaTrash className="w-3 h-3 text-gray-400 hover:text-red-600 transition" />
        </button>
      </div>

      <div className="flex flex-col p-6 pt-10">
        <h3 className="font-medium text-gray-500 sm:text-lg truncate">
          {title}
        </h3>

        <p className="text-sm text-gray-700 truncate">{description}</p>

        <p className="text-xs text-gray-500 mt-2">
          Created at: {new Date(createdAt).toLocaleDateString("es-AR")}
        </p>
      </div>

      {completed && (
        <div className="absolute bottom-0 right-0 bg-green-600 text-white text-[10px] font-medium px-3 py-1.5 rounded-l-xl">
          Completed!
        </div>
      )}
    </div>
  );
};

export default Card;
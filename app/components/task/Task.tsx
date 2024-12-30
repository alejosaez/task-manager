"use client";

import { Task } from "@/types/task";
import { useDeleteTaskMutation } from "@/store/slices/taskApi";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaTrash, FaSpinner } from "react-icons/fa";
import ConfirmationPopup from "../ConfirmationPopup";

const Card: React.FC<Task> = ({
  _id,
  title,
  description,
  completed,
  createdAt,
}) => {
  const [deleteTask, { isLoading }] = useDeleteTaskMutation();
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const handleCardClick = () => {
    if (!isLoading) {
      router.push(`/tasks/${_id}`);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowPopup(true);
  };

  const handleConfirmDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowPopup(false);
    try {
      await deleteTask(_id).unwrap();
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowPopup(false);
  };

  return (
    <div
      className={`relative rounded-xl border-2 border-gray-100 bg-white overflow-hidden ${
        isLoading ? "opacity-50 pointer-events-none" : ""
      }`}
      onClick={handleCardClick}
    >
      <div className="absolute top-2 right-2">
        <button
          onClick={handleDeleteClick}
          disabled={isLoading}
          className="flex items-center gap-2 p-2 rounded-md transition"
        >
          {isLoading ? (
            <FaSpinner className="w-4 h-4 text-red-600 animate-spin" />
          ) : (
            <FaTrash className="w-3 h-3 text-gray-400 hover:text-red-600 transition" />
          )}
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

      {showPopup && (
        <ConfirmationPopup
          title="Confirm Deletion"
          message={`Are you sure you want to delete the task "${title}"?`}
          isOpen={showPopup}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancel}
          isLoading={isLoading}
          onClick={(e) => e.stopPropagation()}
        />
      )}
    </div>
  );
};

export default Card;
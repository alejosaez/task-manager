"use client";

import React, { useState } from "react";

const Filter = ({
  onFilterChange,
  completedCount,
  pendingCount,
}: {
  onFilterChange: (filter: string) => void;
  completedCount: number;
  pendingCount: number;
}) => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    onFilterChange(filter);
  };

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center space-x-4">
        <button
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            selectedFilter === "all"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => handleFilterChange("all")}
        >
          All ({completedCount + pendingCount})
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            selectedFilter === "completed"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => handleFilterChange("completed")}
        >
          Completed ({completedCount})
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            selectedFilter === "pending"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => handleFilterChange("pending")}
        >
          Pending ({pendingCount})
        </button>
      </div>
    </div>
  );
};

export default Filter;
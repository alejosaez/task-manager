import React from "react";

interface ConfirmationPopupProps {
  title: string;
  message: string;
  isOpen: boolean;
  onConfirm: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onCancel: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isLoading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({
  title,
  message,
  isOpen,
  onConfirm,
  onCancel,
  isLoading,
  onClick,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClick}
    >
      <div
        className="bg-white rounded-lg p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-gray-600 mb-4">{title}</h2>
        <p className="text-sm mb-6 text-gray-600">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-bold text-gray-500 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-bold text-white bg-red-500 rounded hover:bg-red-600"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
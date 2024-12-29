import { Task } from "@/types/task";

const Card: React.FC<Task> = ({
  title,
  description,
  completed,
  createdAt,
}) => {
  return (
    <div className="relative rounded-xl border-2 border-gray-100 bg-white overflow-hidden">
      <div className="flex flex-col p-4 sm:p-6 lg:p-8">
        {/* Título truncado en una línea */}
        <h3 className="font-medium text-gray-500 sm:text-lg truncate">
          {title}
        </h3>

        {/* Descripción truncada en una línea */}
        <p className="text-sm text-gray-700 truncate">
          {description}
        </p>

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

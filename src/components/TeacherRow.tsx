import React from "react";
import { Teacher } from "../types";
import SkillTag from "./ui/SkillTag";
import Button from "./ui/Button";
import { PencilIcon, TrashIcon, User, ChevronRight } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface TeacherRowProps {
  teacher: Teacher;
  onEdit?: (teacher: Teacher) => void;
  onDelete?: (teacherId: string) => void;
  onClick?: (teacher: Teacher) => void;
}

const TeacherRow: React.FC<TeacherRowProps> = ({
  teacher,
  onEdit,
  onDelete,
  onClick,
}) => {
  const { isAuthenticated } = useAuth();

  // Get top skills for display
  const displaySkills = teacher.skills.slice(0, 2);

  // Function to convert Windows path to web path
  const getImagePath = (imagePath: string): string => {
    if (!imagePath) return "";
    // Convert backslashes to forward slashes and ensure path starts with /
    const normalizedPath = imagePath.replace(/\\/g, "/");
    return normalizedPath.startsWith("/")
      ? normalizedPath
      : "/" + normalizedPath;
  };

  return (
    <tr
      className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
      onClick={onClick ? () => onClick(teacher) : undefined}
    >
      <td className="py-4 px-6">
        <div className="flex items-center">
          <div className="h-12 w-12 flex-shrink-0 mr-4 bg-purple-100 rounded-full overflow-hidden">
            {teacher.image ? (
              <img
                src={getImagePath(teacher.image)}
                alt={teacher.name}
                className="h-12 w-12 object-cover"
                onError={(e) => {
                  console.error("Image failed to load:", teacher.image);
                  (e.target as HTMLImageElement).src = ""; // Clear the src on error
                  (e.target as HTMLImageElement).onerror = null; // Prevent infinite loop
                }}
              />
            ) : (
              <div className="h-12 w-12 flex items-center justify-center">
                <User size={24} className="text-purple-600" />
              </div>
            )}
          </div>
          <div>
            <div className="font-medium text-gray-900">{teacher.name}</div>
          </div>
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="flex space-x-1">
          <span
            className={`inline-block w-5 h-2 rounded-full ${
              teacher.languages.english >= 4
                ? "bg-green-500"
                : teacher.languages.english >= 2
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
          ></span>
          <span
            className={`inline-block w-5 h-2 rounded-full ${
              teacher.languages.arabic >= 4
                ? "bg-green-500"
                : teacher.languages.arabic >= 2
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
          ></span>
          <span
            className={`inline-block w-5 h-2 rounded-full ${
              teacher.languages.urdu >= 4
                ? "bg-green-500"
                : teacher.languages.urdu >= 2
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
          ></span>
          <span
            className={`inline-block w-5 h-2 rounded-full ${
              teacher.languages.malayalam >= 4
                ? "bg-green-500"
                : teacher.languages.malayalam >= 2
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
          ></span>
          <span
            className={`inline-block w-5 h-2 rounded-full ${
              teacher.languages.hindi >= 4
                ? "bg-green-500"
                : teacher.languages.hindi >= 2
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
          ></span>
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="flex flex-wrap">
          {displaySkills.map((skill, index) => (
            <SkillTag
              key={`${teacher.id}-skill-${index}`}
              skill={skill}
              small
            />
          ))}
          {teacher.skills.length > 2 && (
            <span className="text-xs text-purple-600 ml-1 flex items-center">
              +{teacher.skills.length - 2} more
            </span>
          )}
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="text-sm text-gray-700">
          {teacher.interests.slice(0, 1).join(", ")}
          {teacher.interests.length > 1 && "..."}
        </div>
      </td>
      <td className="py-4 px-6">
        {isAuthenticated ? (
          <div className="flex space-x-2">
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(teacher);
                }}
                icon={<PencilIcon size={16} />}
              >
                Edit
              </Button>
            )}
            {onDelete && (
              <Button
                variant="danger"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(teacher.id);
                }}
                icon={<TrashIcon size={16} />}
              >
                Delete
              </Button>
            )}
          </div>
        ) : (
          <Button
            variant="secondary"
            size="sm"
            icon={<ChevronRight size={16} />}
          >
            View
          </Button>
        )}
      </td>
    </tr>
  );
};

export default TeacherRow;

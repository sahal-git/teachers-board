import React from "react";
import { Teacher } from "../types";
import SkillTag from "./ui/SkillTag";
import Button from "./ui/Button";
import {
  PencilIcon,
  TrashIcon,
  User,
  Globe,
  GraduationCap,
  Heart,
  Calendar,
  Star,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useTeachers } from "../contexts/TeacherContext";

interface TeacherCardProps {
  teacher: Teacher;
  onEdit?: (teacher: Teacher) => void;
  onDelete?: (teacherId: string) => void;
  onClick?: (teacher: Teacher) => void;
}

const TeacherCard: React.FC<TeacherCardProps> = ({
  teacher,
  onEdit,
  onDelete,
  onClick,
}) => {
  const { isAuthenticated } = useAuth();
  const { setSelectedSkill } = useTeachers();

  const getLanguageProficiencyText = (level: number): string => {
    if (level >= 5) return "Native";
    if (level >= 4) return "Fluent";
    if (level >= 3) return "Advanced";
    if (level >= 2) return "Intermediate";
    return "Basic";
  };

  const getLevelColor = (level: number): string => {
    if (level >= 5) return "#059669";
    if (level >= 4) return "#10B981";
    if (level >= 3) return "#6366F1";
    if (level >= 2) return "#F59E0B";
    return "#EF4444";
  };

  const getProgressWidth = (level: number): string => {
    return `${(level / 5) * 100}%`;
  };

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
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300">
      <div className="relative">
        {/* Header with gradient background */}
        <div className="h-28 bg-gradient-to-r from-purple-500 to-indigo-600 relative">
          {/* Profile Image */}
          <div className="absolute -bottom-10 left-6">
            <div className="h-20 w-20 rounded-full border-4 border-white bg-purple-100 flex items-center justify-center overflow-hidden">
              {teacher.image ? (
                <img
                  src={getImagePath(teacher.image)}
                  alt={teacher.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error("Image failed to load:", teacher.image);
                    (e.target as HTMLImageElement).src = ""; // Clear the src on error
                    (e.target as HTMLImageElement).onerror = null; // Prevent infinite loop
                  }}
                />
              ) : (
                <User size={32} className="text-purple-600" />
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {isAuthenticated && (
            <div className="absolute top-3 right-3 flex space-x-2">
              {onEdit && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(teacher);
                  }}
                  icon={<PencilIcon size={14} />}
                  className="!p-1.5 bg-white/90 hover:bg-white"
                />
              )}
              {onDelete && (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(teacher.id);
                  }}
                  icon={<TrashIcon size={14} />}
                  className="!p-1.5 bg-white/90 hover:bg-white"
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 pt-12">
        {/* Teacher Name and Join Date */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-1">
            {teacher.name}
          </h3>
        </div>

        {/* Language Proficiency Section */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <Globe size={16} className="mr-2" />
            Language Proficiency
          </h4>
          <div className="space-y-3">
            {Object.entries(teacher.languages)
              .filter(([_, level]) => level > 0)
              .sort(([_, a], [__, b]) => b - a) // Sort by proficiency level
              .map(([lang, level]) => (
                <div key={lang} className="relative">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium capitalize text-gray-700">
                      {lang}
                    </span>
                    <span className="text-xs font-medium text-gray-500">
                      {getLanguageProficiencyText(level)}
                    </span>
                  </div>
                  <div className="h-2 relative w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full rounded-full transition-all duration-300"
                      style={{
                        width: getProgressWidth(level),
                        backgroundColor: getLevelColor(level),
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-1 h-1 rounded-full mx-0.5 ${
                            i < level
                              ? "bg-current opacity-100"
                              : "bg-gray-300 opacity-50"
                          }`}
                          style={{ color: getLevelColor(level) }}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-400">
                      Level {level}/5
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <GraduationCap size={16} className="mr-2" />
            Professional Skills
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {teacher.skills?.length > 0 ? (
              teacher.skills.map((skill, index) => (
                <SkillTag
                  key={`${teacher.id}-skill-${index}`}
                  skill={skill}
                  small
                  onClick={() => setSelectedSkill(skill)}
                  className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 py-1 px-2 text-sm"
                />
              ))
            ) : (
              <p className="text-sm text-gray-500 italic">No skills listed</p>
            )}
          </div>
        </div>

        {/* Hobbies and Interests Section */}
        <div className="mb-2">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <Heart size={16} className="mr-2" />
            Hobbies & Interests
          </h4>
          <div className="space-y-2">
            {/* Hobbies */}
            {teacher.hobbies?.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {teacher.hobbies.map((hobby, index) => (
                  <SkillTag
                    key={`${teacher.id}-hobby-${index}`}
                    skill={hobby}
                    small
                    className="bg-pink-50 text-pink-700 hover:bg-pink-100 py-1 px-2 text-sm"
                  />
                ))}
              </div>
            )}
            {/* Interests */}
            {teacher.interests?.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {teacher.interests.map((interest, index) => (
                  <SkillTag
                    key={`${teacher.id}-interest-${index}`}
                    skill={interest}
                    small
                    className="bg-orange-50 text-orange-700 hover:bg-orange-100 py-1 px-2 text-sm"
                  />
                ))}
              </div>
            )}
            {!teacher.hobbies?.length && !teacher.interests?.length && (
              <p className="text-sm text-gray-500 italic">
                No hobbies or interests listed
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;

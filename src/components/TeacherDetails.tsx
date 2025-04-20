import React from "react";
import { Teacher } from "../types";
import LanguageSkillBar from "./ui/LanguageSkillBar";
import SkillTag from "./ui/SkillTag";
import Button from "./ui/Button";
import {
  X,
  User,
  Calendar,
  BookOpen,
  Heart,
  Target,
  Briefcase,
} from "lucide-react";

interface TeacherDetailsProps {
  teacher: Teacher;
  onClose: () => void;
}

const TeacherDetails: React.FC<TeacherDetailsProps> = ({
  teacher,
  onClose,
}) => {
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
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Close details"
          >
            <X size={20} />
          </button>

          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-full md:w-1/3">
                <div className="aspect-square rounded-lg overflow-hidden bg-purple-100">
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
                    <div className="w-full h-full flex items-center justify-center">
                      <User size={64} className="text-purple-600" />
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full md:w-2/3">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {teacher.name}
                </h2>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                    <BookOpen size={18} className="mr-2" />
                    Language Proficiency
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <LanguageSkillBar
                      level={teacher.languages.english}
                      language="English"
                    />
                    <LanguageSkillBar
                      level={teacher.languages.arabic}
                      language="Arabic"
                    />
                    <LanguageSkillBar
                      level={teacher.languages.urdu}
                      language="Urdu"
                    />
                    <LanguageSkillBar
                      level={teacher.languages.malayalam}
                      language="Malayalam"
                    />
                    <LanguageSkillBar
                      level={teacher.languages.hindi}
                      language="Hindi"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t pt-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                  <Target size={18} className="mr-2" />
                  Professional Skills
                </h3>
                <div className="flex flex-wrap -mx-1 -my-1">
                  {teacher.skills.map((skill, index) => (
                    <SkillTag
                      key={`${teacher.id}-skill-${index}`}
                      skill={skill}
                      className="bg-purple-50 text-purple-700 hover:bg-purple-100"
                    />
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                  <Heart size={18} className="mr-2" />
                  Hobbies & Personal Interests
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-600 mb-2 flex items-center">
                      <Heart size={14} className="mr-1" /> Hobbies
                    </h4>
                    <div className="flex flex-wrap -mx-1 -my-1">
                      {teacher.hobbies.map((hobby, index) => (
                        <SkillTag
                          key={`${teacher.id}-hobby-${index}`}
                          skill={hobby}
                          className="bg-pink-50 text-pink-700 hover:bg-pink-100"
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-600 mb-2 flex items-center">
                      <Briefcase size={14} className="mr-1" /> Areas of Interest
                    </h4>
                    <div className="flex flex-wrap -mx-1 -my-1">
                      {teacher.interests.map((interest, index) => (
                        <SkillTag
                          key={`${teacher.id}-interest-${index}`}
                          skill={interest}
                          className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6 pt-6 border-t">
              <Button variant="secondary" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetails;

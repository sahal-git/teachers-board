import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTeachers } from "../contexts/TeacherContext";
import TeacherForm from "../components/TeacherForm";
import Button from "../components/ui/Button";
import { Teacher } from "../types";
import { UserPlus, Edit2, Trash2, Search } from "lucide-react";

const AdminPage: React.FC = () => {
  const { teachers, addTeacher, updateTeacher, deleteTeacher } = useTeachers();
  const { isAuthenticated } = useAuth();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [teacherToEdit, setTeacherToEdit] = useState<Teacher | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleAddTeacher = () => {
    setTeacherToEdit(null);
    setIsFormOpen(true);
  };

  const handleEditTeacher = (teacher: Teacher) => {
    setTeacherToEdit(teacher);
    setIsFormOpen(true);
  };

  const handleDeleteTeacher = (teacherId: string) => {
    if (confirm("Are you sure you want to delete this teacher?")) {
      deleteTeacher(teacherId);
    }
  };

  const handleSubmitTeacher = (formData: Omit<Teacher, "id">) => {
    if (teacherToEdit) {
      updateTeacher(teacherToEdit.id, formData);
    } else {
      addTeacher(formData);
    }
    setIsFormOpen(false);
  };

  // Filter teachers based on search query
  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
              Admin Dashboard
            </h1>
            <Button
              variant="primary"
              onClick={handleAddTeacher}
              icon={<UserPlus size={18} />}
            >
              Add Teacher
            </Button>
          </div>
        </div>

        <div className="px-6 py-4 border-b border-gray-200">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              placeholder="Search teachers by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Skills
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Languages
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTeachers.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 mr-3">
                        {teacher.image ? (
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={getImagePath(teacher.image)}
                            alt={teacher.name}
                            onError={(e) => {
                              console.error(
                                "Image failed to load:",
                                teacher.image
                              );
                              (e.target as HTMLImageElement).src = ""; // Clear the src on error
                              (e.target as HTMLImageElement).onerror = null; // Prevent infinite loop
                            }}
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                            <span className="text-purple-600 font-medium">
                              {teacher.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {teacher.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {teacher.skills.slice(0, 3).join(", ")}
                      {teacher.skills.length > 3 && "..."}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      EN: {teacher.languages.english} | AR:{" "}
                      {teacher.languages.arabic} | UR: {teacher.languages.urdu}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditTeacher(teacher)}
                        icon={<Edit2 size={16} />}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteTeacher(teacher.id)}
                        icon={<Trash2 size={16} />}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTeachers.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">
              No teachers found matching your criteria.
            </p>
          </div>
        )}
      </div>

      {isFormOpen && (
        <TeacherForm
          teacher={teacherToEdit}
          onSubmit={handleSubmitTeacher}
          onClose={() => setIsFormOpen(false)}
          onDelete={teacherToEdit ? handleDeleteTeacher : undefined}
        />
      )}
    </div>
  );
};

export default AdminPage;

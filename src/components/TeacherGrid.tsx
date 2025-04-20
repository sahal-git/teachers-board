import React from 'react';
import TeacherCard from './TeacherCard';
import { Teacher } from '../types';
import { useTeachers } from '../contexts/TeacherContext';
import { useAuth } from '../contexts/AuthContext';

interface TeacherGridProps {
  onEdit?: (teacher: Teacher) => void;
  onDelete?: (teacherId: string) => void;
  onSelect?: (teacher: Teacher) => void;
}

const TeacherGrid: React.FC<TeacherGridProps> = ({
  onEdit,
  onDelete,
  onSelect,
}) => {
  const { filteredTeachers, loading, error } = useTeachers();
  const { isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (filteredTeachers.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No teachers found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredTeachers.map((teacher) => (
        <TeacherCard
          key={teacher.id}
          teacher={teacher}
          onEdit={isAuthenticated ? onEdit : undefined}
          onDelete={isAuthenticated ? onDelete : undefined}
          onClick={onSelect}
        />
      ))}
    </div>
  );
};

export default TeacherGrid;
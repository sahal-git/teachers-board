import React from 'react';
import TeacherRow from './TeacherRow';
import { Teacher, SortConfig } from '../types';
import { useTeachers } from '../contexts/TeacherContext';
import { useAuth } from '../contexts/AuthContext';
import { SortAscIcon, SortDescIcon, Users } from 'lucide-react';

interface TeacherTableProps {
  onEdit?: (teacher: Teacher) => void;
  onDelete?: (teacherId: string) => void;
  onSelect?: (teacher: Teacher) => void;
}

const TeacherTable: React.FC<TeacherTableProps> = ({
  onEdit,
  onDelete,
  onSelect,
}) => {
  const { filteredTeachers, loading, error, sortConfig, setSortConfig } = useTeachers();
  const { isAuthenticated } = useAuth();

  const handleSort = (key: string) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  const renderSortIcon = (key: string) => {
    if (sortConfig.key !== key) {
      return null;
    }
    return sortConfig.direction === 'asc' ? (
      <SortAscIcon size={16} className="ml-1" />
    ) : (
      <SortDescIcon size={16} className="ml-1" />
    );
  };

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
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('name')}
            >
              <div className="flex items-center">
                <span>Name</span>
                {renderSortIcon('name')}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('languages.english')}
            >
              <div className="flex items-center">
                <span>Languages</span>
                {renderSortIcon('languages.english')}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('skills')}
            >
              <div className="flex items-center">
                <span>Skills</span>
                {renderSortIcon('skills')}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('interests')}
            >
              <div className="flex items-center">
                <span>Interests</span>
                {renderSortIcon('interests')}
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredTeachers.map((teacher) => (
            <TeacherRow
              key={teacher.id}
              teacher={teacher}
              onEdit={isAuthenticated ? onEdit : undefined}
              onDelete={isAuthenticated ? onDelete : undefined}
              onClick={onSelect}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherTable;
import React, { useState } from 'react';
import TeacherFilters from '../components/TeacherFilters';
import TeacherGrid from '../components/TeacherGrid';
import TeacherTable from '../components/TeacherTable';
import TeacherDetails from '../components/TeacherDetails';
import TeacherForm from '../components/TeacherForm';
import Button from '../components/ui/Button';
import { Teacher } from '../types';
import { useTeachers } from '../contexts/TeacherContext';
import { useAuth } from '../contexts/AuthContext';
import { UserPlus } from 'lucide-react';

const TeachersPage: React.FC = () => {
  const {
    viewMode,
    addTeacher,
    updateTeacher,
    deleteTeacher,
    selectedTeacher,
    setSelectedTeacher,
  } = useTeachers();
  
  const { isAuthenticated } = useAuth();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [teacherToEdit, setTeacherToEdit] = useState<Teacher | null>(null);
  
  const handleAddTeacher = () => {
    setTeacherToEdit(null);
    setIsFormOpen(true);
  };
  
  const handleEditTeacher = (teacher: Teacher) => {
    setTeacherToEdit(teacher);
    setIsFormOpen(true);
  };
  
  const handleSubmitTeacher = (formData: Omit<Teacher, 'id'>) => {
    if (teacherToEdit) {
      updateTeacher(teacherToEdit.id, formData);
    } else {
      addTeacher(formData);
    }
    setIsFormOpen(false);
  };
  
  const handleDeleteTeacher = (teacherId: string) => {
    if (confirm('Are you sure you want to delete this teacher?')) {
      deleteTeacher(teacherId);
      setIsFormOpen(false);
    }
  };
  
  const handleCloseForm = () => {
    setIsFormOpen(false);
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Teacher Profiles</h1>
        
        {isAuthenticated && (
          <Button 
            variant="primary" 
            onClick={handleAddTeacher}
            icon={<UserPlus size={18} />}
          >
            Add Teacher
          </Button>
        )}
      </div>
      
      <TeacherFilters />
      
      {viewMode === 'grid' ? (
        <TeacherGrid
          onEdit={handleEditTeacher}
          onDelete={handleDeleteTeacher}
          onSelect={setSelectedTeacher}
        />
      ) : (
        <TeacherTable
          onEdit={handleEditTeacher}
          onDelete={handleDeleteTeacher}
          onSelect={setSelectedTeacher}
        />
      )}
      
      {selectedTeacher && (
        <TeacherDetails
          teacher={selectedTeacher}
          onClose={() => setSelectedTeacher(null)}
        />
      )}
      
      {isFormOpen && (
        <TeacherForm
          teacher={teacherToEdit}
          onSubmit={handleSubmitTeacher}
          onClose={handleCloseForm}
          onDelete={teacherToEdit ? handleDeleteTeacher : undefined}
        />
      )}
    </div>
  );
};

export default TeachersPage;
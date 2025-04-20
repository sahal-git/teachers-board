import React, { createContext, useContext, useState, useEffect } from 'react';
import { Teacher, SortConfig, ViewMode } from '../types';
import { parseTeachersCsv } from '../utils/csvParser';
import { searchTeachers, filterByLanguage, filterBySkill, sortTeachers } from '../utils/searchUtils';

interface TeacherContextType {
  teachers: Teacher[];
  filteredTeachers: Teacher[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedLanguage: keyof Teacher['languages'] | null;
  setSelectedLanguage: (language: keyof Teacher['languages'] | null) => void;
  languageLevel: number;
  setLanguageLevel: (level: number) => void;
  selectedSkill: string;
  setSelectedSkill: (skill: string) => void;
  sortConfig: SortConfig;
  setSortConfig: (config: SortConfig) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  addTeacher: (teacher: Omit<Teacher, 'id'>) => void;
  updateTeacher: (id: string, updates: Partial<Teacher>) => void;
  deleteTeacher: (id: string) => void;
  selectedTeacher: Teacher | null;
  setSelectedTeacher: (teacher: Teacher | null) => void;
}

const TeacherContext = createContext<TeacherContextType | undefined>(undefined);

export const TeacherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<keyof Teacher['languages'] | null>(null);
  const [languageLevel, setLanguageLevel] = useState(1);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'name', direction: 'asc' });
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  // Load teacher data from CSV
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch('/src/data/teachers.csv');
        const csvData = await response.text();
        const parsedTeachers = parseTeachersCsv(csvData);
        setTeachers(parsedTeachers);
        setFilteredTeachers(parsedTeachers);
      } catch (err) {
        console.error('Error loading teacher data:', err);
        setError('Failed to load teacher data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  // Apply filters when dependencies change
  useEffect(() => {
    let result = [...teachers];
    
    // Apply search
    if (searchQuery) {
      result = searchTeachers(result, searchQuery);
    }
    
    // Apply language filter
    if (selectedLanguage) {
      result = filterByLanguage(result, selectedLanguage, languageLevel);
    }
    
    // Apply skill filter
    if (selectedSkill) {
      result = filterBySkill(result, selectedSkill);
    }
    
    // Apply sorting
    result = sortTeachers(result, sortConfig);
    
    setFilteredTeachers(result);
  }, [teachers, searchQuery, selectedLanguage, languageLevel, selectedSkill, sortConfig]);

  // CRUD operations
  const addTeacher = (teacher: Omit<Teacher, 'id'>) => {
    const newTeacher: Teacher = {
      ...teacher,
      id: `teacher-${Date.now()}`,
    };
    
    setTeachers((prev) => [...prev, newTeacher]);
  };

  const updateTeacher = (id: string, updates: Partial<Teacher>) => {
    setTeachers((prev) =>
      prev.map((teacher) =>
        teacher.id === id ? { ...teacher, ...updates } : teacher
      )
    );

    // If the selected teacher is being updated, update it too
    if (selectedTeacher && selectedTeacher.id === id) {
      setSelectedTeacher({ ...selectedTeacher, ...updates });
    }
  };

  const deleteTeacher = (id: string) => {
    setTeachers((prev) => prev.filter((teacher) => teacher.id !== id));
    
    // If the deleted teacher is selected, clear the selection
    if (selectedTeacher && selectedTeacher.id === id) {
      setSelectedTeacher(null);
    }
  };

  const value = {
    teachers,
    filteredTeachers,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    selectedLanguage,
    setSelectedLanguage,
    languageLevel,
    setLanguageLevel,
    selectedSkill,
    setSelectedSkill,
    sortConfig,
    setSortConfig,
    viewMode,
    setViewMode,
    addTeacher,
    updateTeacher,
    deleteTeacher,
    selectedTeacher,
    setSelectedTeacher,
  };

  return (
    <TeacherContext.Provider value={value}>{children}</TeacherContext.Provider>
  );
};

export const useTeachers = (): TeacherContextType => {
  const context = useContext(TeacherContext);
  if (context === undefined) {
    throw new Error('useTeachers must be used within a TeacherProvider');
  }
  return context;
};
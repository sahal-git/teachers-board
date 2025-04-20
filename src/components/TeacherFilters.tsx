import React from 'react';
import Input from './ui/Input';
import Select from './ui/Select';
import Button from './ui/Button';
import { Search, Grid, List, SlidersHorizontal, X } from 'lucide-react';
import { Teacher, ViewMode } from '../types';
import { useTeachers } from '../contexts/TeacherContext';

const TeacherFilters: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedLanguage,
    setSelectedLanguage,
    languageLevel,
    setLanguageLevel,
    selectedSkill,
    setSelectedSkill,
    viewMode,
    setViewMode,
    teachers,
  } = useTeachers();

  // Get unique skills for the dropdown
  const uniqueSkills = Array.from(
    new Set(
      teachers.flatMap((teacher) => teacher.skills).filter(Boolean)
    )
  ).sort();

  // Reset all filters
  const handleReset = () => {
    setSearchQuery('');
    setSelectedLanguage(null);
    setLanguageLevel(1);
    setSelectedSkill('');
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <div className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center">
        <h2 className="text-xl font-bold text-gray-800 mb-4 md:mb-0">Teacher Filters</h2>
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            icon={<SlidersHorizontal size={16} />}
            onClick={handleReset}
          >
            Reset Filters
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'primary' : 'secondary'}
            size="sm"
            icon={<Grid size={16} />}
            onClick={() => setViewMode('grid')}
            aria-label="Grid view"
          />
          <Button
            variant={viewMode === 'list' ? 'primary' : 'secondary'}
            size="sm"
            icon={<List size={16} />}
            onClick={() => setViewMode('list')}
            aria-label="List view"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <Input
            label="Search Teachers"
            placeholder="Name, skills, interests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search size={18} />}
            fullWidth
          />
        </div>

        <div>
          <Select
            label="Language"
            options={[
              { value: '', label: 'Select Language' },
              { value: 'english', label: 'English' },
              { value: 'arabic', label: 'Arabic' },
              { value: 'urdu', label: 'Urdu' },
              { value: 'malayalam', label: 'Malayalam' },
              { value: 'hindi', label: 'Hindi' },
            ]}
            value={selectedLanguage || ''}
            onChange={(e) => {
              const value = e.target.value as keyof Teacher['languages'] | '';
              setSelectedLanguage(value ? value : null);
            }}
            fullWidth
          />
        </div>

        <div>
          <Select
            label="Min. Proficiency Level"
            options={[
              { value: '1', label: 'Level 1' },
              { value: '2', label: 'Level 2' },
              { value: '3', label: 'Level 3' },
              { value: '4', label: 'Level 4' },
              { value: '5', label: 'Level 5' },
            ]}
            value={languageLevel.toString()}
            onChange={(e) => setLanguageLevel(parseInt(e.target.value))}
            fullWidth
            disabled={!selectedLanguage}
          />
        </div>

        <div>
          <Select
            label="Skill"
            options={[
              { value: '', label: 'Select Skill' },
              ...uniqueSkills.map((skill) => ({
                value: skill,
                label: skill,
              })),
            ]}
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            fullWidth
          />
        </div>
      </div>

      {(searchQuery || selectedLanguage || selectedSkill) && (
        <div className="mt-4 p-2 bg-gray-50 rounded-md flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-500 mr-2">Active Filters:</span>
          
          {searchQuery && (
            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full flex items-center">
              Search: {searchQuery}
              <X 
                size={14} 
                className="ml-1 cursor-pointer" 
                onClick={() => setSearchQuery('')}
              />
            </span>
          )}
          
          {selectedLanguage && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
              {selectedLanguage} ≥ {languageLevel}
              <X 
                size={14} 
                className="ml-1 cursor-pointer" 
                onClick={() => setSelectedLanguage(null)}
              />
            </span>
          )}
          
          {selectedSkill && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
              Skill: {selectedSkill}
              <X 
                size={14} 
                className="ml-1 cursor-pointer" 
                onClick={() => setSelectedSkill('')}
              />
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default TeacherFilters;
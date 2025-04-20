import React, { useState, useEffect } from 'react';
import Input from './ui/Input';
import Select from './ui/Select';
import Button from './ui/Button';
import { Teacher } from '../types';
import { X, Save, Trash, Plus } from 'lucide-react';

interface TeacherFormProps {
  teacher?: Teacher | null;
  onSubmit: (formData: Omit<Teacher, 'id'>) => void;
  onClose: () => void;
  onDelete?: (teacherId: string) => void;
}

const TeacherForm: React.FC<TeacherFormProps> = ({
  teacher,
  onSubmit,
  onClose,
  onDelete,
}) => {
  const [formData, setFormData] = useState<Omit<Teacher, 'id'>>({
    name: '',
    image: '',
    languages: {
      english: 1,
      arabic: 1,
      urdu: 1,
      malayalam: 1,
      hindi: 1,
    },
    skills: [],
    hobbies: [],
    interests: [],
    timestamp: new Date().toLocaleString(),
  });
  
  const [skillInput, setSkillInput] = useState('');
  const [hobbyInput, setHobbyInput] = useState('');
  const [interestInput, setInterestInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Populate form with teacher data if provided
  useEffect(() => {
    if (teacher) {
      setFormData({
        name: teacher.name,
        image: teacher.image,
        languages: { ...teacher.languages },
        skills: [...teacher.skills],
        hobbies: [...teacher.hobbies],
        interests: [...teacher.interests],
        timestamp: teacher.timestamp,
      });
    }
  }, [teacher]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLanguageChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    language: keyof Teacher['languages']
  ) => {
    const value = parseInt(e.target.value);
    setFormData((prev) => ({
      ...prev,
      languages: {
        ...prev.languages,
        [language]: value,
      },
    }));
  };

  const addItem = (
    type: 'skills' | 'hobbies' | 'interests',
    value: string,
    inputSetter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (value.trim()) {
      setFormData((prev) => ({
        ...prev,
        [type]: [...prev[type], value.trim()],
      }));
      inputSetter('');
    }
  };

  const removeItem = (
    type: 'skills' | 'hobbies' | 'interests',
    index: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {teacher ? 'Edit Teacher' : 'Add New Teacher'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Close form"
            >
              <X size={20} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Input
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                fullWidth
              />
              
              <Input
                label="Profile Image URL"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                fullWidth
              />
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Language Proficiency</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(formData.languages).map(([lang, level]) => (
                  <div key={lang}>
                    <Select
                      label={lang.charAt(0).toUpperCase() + lang.slice(1)}
                      options={[
                        { value: '1', label: 'Level 1' },
                        { value: '2', label: 'Level 2' },
                        { value: '3', label: 'Level 3' },
                        { value: '4', label: 'Level 4' },
                        { value: '5', label: 'Level 5' },
                      ]}
                      value={level.toString()}
                      onChange={(e) => handleLanguageChange(e, lang as keyof Teacher['languages'])}
                      fullWidth
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Skills</h3>
              <div className="flex mb-2">
                <Input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder="Add a skill"
                  className="mr-2"
                  fullWidth
                />
                <Button
                  type="button"
                  onClick={() => addItem('skills', skillInput, setSkillInput)}
                  icon={<Plus size={16} />}
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.skills.map((skill, index) => (
                  <div key={index} className="bg-gray-100 rounded-full px-3 py-1 flex items-center">
                    <span className="mr-2">{skill}</span>
                    <button
                      type="button"
                      onClick={() => removeItem('skills', index)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Hobbies</h3>
              <div className="flex mb-2">
                <Input
                  value={hobbyInput}
                  onChange={(e) => setHobbyInput(e.target.value)}
                  placeholder="Add a hobby"
                  className="mr-2"
                  fullWidth
                />
                <Button
                  type="button"
                  onClick={() => addItem('hobbies', hobbyInput, setHobbyInput)}
                  icon={<Plus size={16} />}
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.hobbies.map((hobby, index) => (
                  <div key={index} className="bg-gray-100 rounded-full px-3 py-1 flex items-center">
                    <span className="mr-2">{hobby}</span>
                    <button
                      type="button"
                      onClick={() => removeItem('hobbies', index)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Interests</h3>
              <div className="flex mb-2">
                <Input
                  value={interestInput}
                  onChange={(e) => setInterestInput(e.target.value)}
                  placeholder="Add an interest"
                  className="mr-2"
                  fullWidth
                />
                <Button
                  type="button"
                  onClick={() => addItem('interests', interestInput, setInterestInput)}
                  icon={<Plus size={16} />}
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.interests.map((interest, index) => (
                  <div key={index} className="bg-gray-100 rounded-full px-3 py-1 flex items-center">
                    <span className="mr-2">{interest}</span>
                    <button
                      type="button"
                      onClick={() => removeItem('interests', index)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between pt-6 border-t">
              {teacher && onDelete && (
                <Button
                  type="button"
                  variant="danger"
                  onClick={() => onDelete(teacher.id)}
                  icon={<Trash size={16} />}
                >
                  Delete Teacher
                </Button>
              )}
              
              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  icon={<Save size={16} />}
                >
                  {teacher ? 'Update' : 'Create'} Teacher
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeacherForm;
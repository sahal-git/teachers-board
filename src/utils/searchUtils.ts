import Fuse from 'fuse.js';
import { Teacher, SortConfig } from '../types';

// Configure Fuse.js for fuzzy searching
const fuseOptions = {
  keys: [
    'name',
    'skills',
    'hobbies',
    'interests'
  ],
  threshold: 0.3, // A lower threshold means a more strict match
  includeScore: true,
};

/**
 * Searches teachers based on a query string
 * @param teachers Array of Teacher objects
 * @param query Search query
 * @returns Filtered array of Teacher objects
 */
export const searchTeachers = (teachers: Teacher[], query: string): Teacher[] => {
  if (!query.trim()) {
    return teachers;
  }

  const fuse = new Fuse(teachers, fuseOptions);
  const result = fuse.search(query);
  return result.map(item => item.item);
};

/**
 * Filters teachers based on language proficiency
 * @param teachers Array of Teacher objects
 * @param language Language to filter by
 * @param minLevel Minimum proficiency level (1-5)
 * @returns Filtered array of Teacher objects
 */
export const filterByLanguage = (
  teachers: Teacher[],
  language: keyof Teacher['languages'],
  minLevel: number
): Teacher[] => {
  return teachers.filter(teacher => teacher.languages[language] >= minLevel);
};

/**
 * Filters teachers based on skills
 * @param teachers Array of Teacher objects
 * @param skill Skill to filter by
 * @returns Filtered array of Teacher objects
 */
export const filterBySkill = (teachers: Teacher[], skill: string): Teacher[] => {
  if (!skill.trim()) {
    return teachers;
  }
  
  return teachers.filter(teacher => 
    teacher.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
  );
};

/**
 * Sorts teachers based on a sort configuration
 * @param teachers Array of Teacher objects
 * @param sortConfig Sort configuration
 * @returns Sorted array of Teacher objects
 */
export const sortTeachers = (teachers: Teacher[], sortConfig: SortConfig): Teacher[] => {
  const { key, direction } = sortConfig;
  
  return [...teachers].sort((a, b) => {
    let aValue: any;
    let bValue: any;
    
    // Handle nested properties like languages.english
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      aValue = a[parent as keyof Teacher][child as keyof Teacher['languages']];
      bValue = b[parent as keyof Teacher][child as keyof Teacher['languages']];
    } else if (key === 'skills' || key === 'hobbies' || key === 'interests') {
      // Sort by the length of these arrays
      aValue = a[key].length;
      bValue = b[key].length;
    } else {
      aValue = a[key as keyof Teacher];
      bValue = b[key as keyof Teacher];
    }
    
    // Handle strings for case-insensitive sorting
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (aValue < bValue) {
      return direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
};
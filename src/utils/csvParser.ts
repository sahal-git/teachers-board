import Papa from 'papaparse';
import { Teacher } from '../types';

const cleanText = (text: string): string[] => {
  if (!text) return [];
  
  // First, handle the case where the entire string is quoted
  const unquoted = text.replace(/^"(.*)"$/, '$1');
  
  return unquoted
    .split(/,\s*/) // Split on commas followed by optional whitespace
    .map(item => item.trim())
    .filter(item => item && item !== '.' && item !== 'Nothing special')
    .map(item => item
      .replace(/^["'\s]+|["'\s]+$/g, '') // Remove quotes and extra spaces from start/end
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim()
    )
    .filter(Boolean); // Remove any empty strings
};

/**
 * Parses a CSV file containing teacher data
 * @param csvData The raw CSV data as a string
 * @returns An array of Teacher objects
 */
export const parseTeachersCsv = (csvData: string): Teacher[] => {
  const { data } = Papa.parse(csvData, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim(), // Trim whitespace from headers
  });

  return data.map((row: any, index: number) => {
    // Parse and clean skills, hobbies, and interests
    const skills = cleanText(row['MY SKILLS']);
    const hobbies = cleanText(row['MY HOBBIES']);
    const interests = cleanText(row['INTRESTED AREA']);
    
    // Debug log
    console.log('Parsing row:', {
      name: row.NAME,
      rawSkills: row['MY SKILLS'],
      parsedSkills: skills
    });
    
    return {
      id: `teacher-${index}`,
      name: row.NAME ? row.NAME.trim() : 'Unknown',
      image: row.Image || '',
      languages: {
        english: parseInt(row.ENGLISH) || 0,
        arabic: parseInt(row.ARABIC) || 0,
        urdu: parseInt(row.URDU) || 0,
        malayalam: parseInt(row.MALAYALAM) || 0,
        hindi: parseInt(row.HINDI) || 0,
      },
      skills,
      hobbies,
      interests,
    };
  });
};

/**
 * Converts Teacher objects back to CSV format
 * @param teachers Array of Teacher objects
 * @returns CSV string
 */
export const teachersToCsv = (teachers: Teacher[]): string => {
  const headers = [
    'Image',
    'NAME',
    'ENGLISH',
    'ARABIC',
    'URDU',
    'MALAYALAM',
    'HINDI',
    'MY SKILLS',
    'MY HOBBIES',
    'INTRESTED AREA'
  ];

  const rows = teachers.map((teacher) => {
    return [
      teacher.image,
      teacher.name,
      teacher.languages.english,
      teacher.languages.arabic,
      teacher.languages.urdu,
      teacher.languages.malayalam,
      teacher.languages.hindi,
      teacher.skills.join(', '),
      teacher.hobbies.join(', '),
      teacher.interests.join(', ')
    ];
  });

  return Papa.unparse([headers, ...rows]);
};
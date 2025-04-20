export interface Teacher {
  id: string;
  name: string;
  image: string;
  languages: {
    english: number;
    arabic: number;
    urdu: number;
    malayalam: number;
    hindi: number;
  };
  skills: string[];
  hobbies: string[];
  interests: string[];
}

export interface User {
  id: string;
  username: string;
  password: string;
  isAdmin: boolean;
}

export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  key: string;
  direction: SortDirection;
}

export type ViewMode = 'grid' | 'list';
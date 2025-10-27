export type User = {
  name: string;
  avatarUrl: string;
  email: string;
  level: string;
};

export type Teacher = {
  id: number;
  name:string;
  avatarUrl: string;
  subjects: string[];
  rating: number;
  type: 'local' | 'online';
  distance?: string;
  bio: string;
  experience: string;
  qualifications: string[];
  address?: string;
  location?: {
    lat: number;
    lng: number;
  };
};

export type Skill = {
  id: number;
  title: string;
  description: string;
  type: 'offering' | 'requesting';
  author: string;
  authorAvatar: string;
  price?: string;
  exchange?: string;
};

export type Project = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
};

export type LibraryResource = {
  id: number;
  title: string;
  author: string;
  coverUrl: string;
  category: string;
};

export type LearningStep = {
    step: number;
    title: string;
    resource: string;
};

export type Page = 'dashboard' | 'tutors' | 'library' | 'marketplace' | 'profile' | 'rewards';
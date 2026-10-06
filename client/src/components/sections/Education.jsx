import { profile } from '../../data/profile';

const { education } = profile;

export const educationItems = [
  {
    id: 'edu-btech-it',
    navTitle: 'B.Tech Information Technology',
    organization: education.institution,
    navMeta: '2024 – 2028 · Currently pursuing',
    kind: 'Education',
    title: 'B.Tech – Information Technology',
    duration: education.duration,
    location: education.location,
    status: education.status,
    icon: 'GraduationCap',
    description: `Currently pursuing a B.Tech in Information Technology at ${education.institution}.`,
    listTitle: 'Academic focus',
    points: [
      'Full Stack Web Development',
      'Generative AI',
      'Artificial Intelligence',
      'Software Development',
      'Database Technologies',
      'Cloud & Modern Web Technologies',
    ],
    tags: [
      'Generative AI',
      'Artificial Intelligence',
      'Full Stack Development',
      'Databases',
      'Cloud Technologies',
    ],
  },
];

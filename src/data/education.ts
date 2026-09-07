export const education = {
  degree: 'B.Tech in Computer Science Engineering',
  institution: 'Arya College of Engineering, Jaipur',
  period: '2021 — 2025',
  cgpa: 7.79,
  cgpaScale: 10,
  coursework: [
    'Data Structures',
    'DBMS',
    'OOPs',
    'Operating Systems',
    'Computer Networks',
    'Machine Learning',
    'Software Engineering',
  ],
}

export type Certification = {
  name: string
  issuer: string
}

export const certifications: Certification[] = [
  { name: 'Python Programming', issuer: 'IIT Bombay' },
  { name: 'C Programming', issuer: 'NPTEL' },
  { name: 'Advanced SQL', issuer: 'Great Learning' },
  { name: 'Flutter', issuer: 'LinkedIn Learning' },
  { name: 'ML Foundations', issuer: 'Coursera' },
]

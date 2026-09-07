export type Experience = {
  id: string
  role: string
  company: string
  location: string
  period: string
  current: boolean
  summary: string
  points: string[]
  tech: string[]
}

export const experiences: Experience[] = [
  {
    id: 'iskylar',
    role: 'Software Developer',
    company: 'iSkylar Technologies',
    location: 'Jaipur, India',
    period: 'Jan 2026 — Present',
    current: true,
    summary:
      'Working within a 5+ engineer team on production RAG systems and full-stack MERN applications — architecting retrieval pipelines with OpenAI, Pinecone, Claude, and LangChain, with progressively reducing supervision.',
    points: [
      'Collaborate within an engineering team of 5+ developers.',
      'Work with senior engineers on task scoping, architecture decisions, code reviews, and release planning.',
      'Independently own end-to-end implementation and debugging with progressively reducing supervision.',
      'Architected and deployed a production-grade RAG pipeline using OpenAI Embeddings, Pinecone, Claude, and LangChain retrieval chains.',
      'Developed a comprehensive test suite with 28+ test cases.',
      'Designed and developed full-stack MERN applications.',
      'Implemented JWT-based authentication.',
      'Built secure REST APIs.',
      'Used Context API for state management.',
      'Followed Git branching strategies and software engineering workflows.',
    ],
    tech: ['OpenAI Embeddings', 'Pinecone', 'Claude', 'LangChain', 'MERN', 'JWT', 'REST APIs', 'Context API', 'Git'],
  },
  {
    id: 'techno-particles',
    role: 'Software Developer Intern',
    company: 'Techno Particles',
    location: 'Jaipur, India',
    period: 'Jul 2024 — Sep 2024',
    current: false,
    summary:
      'Built and integrated REST APIs in Java and Dart under senior mentorship, applying OOP and MVC patterns across multiple client projects, from API testing to production debugging.',
    points: [
      'Designed, developed, and integrated 5+ RESTful APIs using Java and Dart.',
      'Applied OOP and MVC architecture.',
      'Worked under senior developer mentorship.',
      'Used Git/GitHub feature branching, pull requests, and code reviews.',
      'Performed API testing using Postman.',
      'Collaborated with QA engineers and product stakeholders.',
      'Troubleshot issues and production bugs.',
      'Worked across multiple client projects.',
    ],
    tech: ['Java', 'Dart', 'OOP', 'MVC', 'Git/GitHub', 'Postman'],
  },
]

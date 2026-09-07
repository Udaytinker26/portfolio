export type Skill = {
  name: string
  category: string
  description: string
}

export const skillCategories = [
  'PROGRAMMING',
  'SOFTWARE ENGINEERING',
  'WEB & MOBILE',
  'AI / MACHINE LEARNING',
  'BACKEND',
  'TOOLS',
] as const

export const skillsMatrix: Skill[] = [
  { name: 'Python', category: 'PROGRAMMING', description: 'Core language for ML & backend tooling' },
  { name: 'JavaScript', category: 'PROGRAMMING', description: 'Language underlying web application logic' },
  { name: 'TypeScript', category: 'PROGRAMMING', description: 'Typed JavaScript for reliable frontends' },
  { name: 'Java', category: 'PROGRAMMING', description: 'Used to build REST APIs during internship' },
  { name: 'C++', category: 'PROGRAMMING', description: 'Foundational systems & DSA language' },
  { name: 'SQL', category: 'PROGRAMMING', description: 'Relational querying & schema design' },

  { name: 'OOP', category: 'SOFTWARE ENGINEERING', description: 'Object-oriented design principles' },
  { name: 'MVC Architecture', category: 'SOFTWARE ENGINEERING', description: 'Structured application architecture' },
  { name: 'Git/GitHub', category: 'SOFTWARE ENGINEERING', description: 'Version control & collaboration' },
  { name: 'Unit Testing', category: 'SOFTWARE ENGINEERING', description: 'Automated test coverage' },
  { name: 'Agile/Scrum', category: 'SOFTWARE ENGINEERING', description: 'Iterative software delivery' },

  { name: 'React.js', category: 'WEB & MOBILE', description: 'Component-driven UI development' },
  { name: 'Node.js', category: 'WEB & MOBILE', description: 'JavaScript runtime for backend services' },
  { name: 'Express.js', category: 'WEB & MOBILE', description: 'Minimal REST API framework' },
  { name: 'Flutter', category: 'WEB & MOBILE', description: 'Cross-platform mobile app framework' },
  { name: 'Dart', category: 'WEB & MOBILE', description: 'Language powering Flutter apps' },

  { name: 'FastAPI', category: 'BACKEND', description: 'High-performance async Python APIs' },
  { name: 'Flask', category: 'BACKEND', description: 'Lightweight Python web framework' },
  { name: 'MongoDB', category: 'BACKEND', description: 'Document database for MERN apps' },
  { name: 'Firebase', category: 'BACKEND', description: 'Managed backend & realtime services' },
  { name: 'PostgreSQL', category: 'BACKEND', description: 'Relational database design & queries' },

  { name: 'scikit-learn', category: 'AI / MACHINE LEARNING', description: 'Classical ML model training' },
  { name: 'Random Forest', category: 'AI / MACHINE LEARNING', description: 'Ensemble classification modeling' },
  { name: 'LangChain', category: 'AI / MACHINE LEARNING', description: 'LLM / RAG applications' },
  { name: 'LangGraph', category: 'AI / MACHINE LEARNING', description: 'Agentic, stateful LLM workflows' },
  { name: 'RAG', category: 'AI / MACHINE LEARNING', description: 'Retrieval-augmented generation pipelines' },
  { name: 'AI Agents', category: 'AI / MACHINE LEARNING', description: 'Autonomous task-executing LLM systems' },
  { name: 'Vector Databases', category: 'AI / MACHINE LEARNING', description: 'Semantic search & embedding storage' },

  { name: 'Git', category: 'TOOLS', description: 'Distributed version control' },
  { name: 'GitHub', category: 'TOOLS', description: 'Code hosting, PRs & reviews' },
  { name: 'Postman', category: 'TOOLS', description: 'API testing & documentation' },
  { name: 'Claude Code', category: 'TOOLS', description: 'AI-assisted development workflow' },
  { name: 'Cursor IDE', category: 'TOOLS', description: 'AI-native code editor' },
  { name: 'GitHub Copilot', category: 'TOOLS', description: 'In-editor AI pair programming' },
  { name: 'JIRA', category: 'TOOLS', description: 'Agile task & sprint tracking' },
  { name: 'VS Code', category: 'TOOLS', description: 'Primary development environment' },
  { name: 'Docker', category: 'TOOLS', description: 'Containerized build & deployment' },
]

export const toolboxTools = ['Git', 'GitHub', 'Postman', 'JIRA', 'VS Code', 'Cursor', 'Claude Code', 'GitHub Copilot', 'Docker']

export const toolboxStages = ['CODE', 'BUILD', 'TEST', 'DEBUG', 'DEPLOY']

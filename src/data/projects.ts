export type Project = {
  id: string
  number: string
  title: string
  subtitle: string
  category: string
  description: string
  overview: string
  features: string[]
  tech: string[]
  architecture: string[]
  architectureBranches?: { label: string; steps: string[] }[]
}

export const projects: Project[] = [
  {
    id: 'rag-enterprise-agent',
    number: '01',
    title: 'RAG-Based Enterprise Chat Agent',
    subtitle: '',
    category: 'AI / Retrieval-Augmented Generation',
    description:
      'An end-to-end Retrieval-Augmented Generation system designed for enterprise knowledge retrieval.',
    overview:
      'An end-to-end Retrieval-Augmented Generation system designed for enterprise knowledge retrieval, combining semantic search with LLM-based response generation for accurate, context-aware answers.',
    features: [
      'Built a RAG pipeline',
      'Implemented vector indexing',
      'Implemented semantic search',
      'Implemented LLM-based response generation',
      'Used LangChain for retrieval orchestration',
      'Used LangGraph for agentic workflows',
      'Implemented document chunking',
      'Implemented embedding generation',
      'Implemented context-aware retrieval',
      'Designed for accurate enterprise knowledge management',
    ],
    tech: ['Python', 'LangChain', 'LangGraph', 'Pinecone', 'OpenAI', 'FastAPI'],
    architecture: [
      'DOCUMENTS',
      'CHUNKING',
      'EMBEDDINGS',
      'PINECONE',
      'SEMANTIC RETRIEVAL',
      'LANGCHAIN / LANGGRAPH',
      'CLAUDE / LLM',
      'CONTEXTUAL RESPONSE',
    ],
  },
  {
    id: 'fasal-mitra',
    number: '02',
    title: 'Fasal Mitra',
    subtitle: 'AI-Powered Crop Advisory App',
    category: 'AI / Mobile',
    description:
      'A mobile crop advisory app that recommends crops from soil and weather data and answers farmer queries through a Hindi voice-enabled chatbot.',
    overview:
      'Fasal Mitra is an AI-powered crop advisory application built with Flutter. It combines a classical ML crop-recommendation model with an LLM-driven multilingual chatbot to make agricultural guidance accessible in Hindi, by voice.',
    features: [
      'Trained a Random Forest classification model',
      'Used soil nutrient and weather datasets',
      'Provides crop recommendations across 22 crop types',
      'Integrated Groq LLM using Llama 3.3',
      'Added Hindi speech-to-text',
      'Added Hindi text-to-speech',
      'Created an interactive multilingual chatbot experience',
      'Built FastAPI backend',
      'Implemented real-time inference',
    ],
    tech: ['Flutter', 'Python', 'scikit-learn', 'Groq API', 'FastAPI'],
    architecture: [],
    architectureBranches: [
      { label: 'Crop Recommendation', steps: ['SOIL + WEATHER DATA', 'RANDOM FOREST', 'CROP RECOMMENDATION'] },
      { label: 'Voice Chat Assistant', steps: ['USER', 'HINDI SPEECH', 'GROQ / LLAMA 3.3', 'CHAT RESPONSE'] },
    ],
  },
]

export interface Skill {
  id: string
  name: string
  category: 'AI & Machine Learning' | 'Frontend' | 'Backend' | 'DevOps & Tools'
  level?: number
  icon?: string
}

export const skills: Skill[] = [
  // AI & Machine Learning (Highlighted - Agentic AI focus)
  {
    id: 'agentic-ai',
    name: 'Agentic AI',
    category: 'AI & Machine Learning',
    level: 95,
    icon: 'brain',
  },
  {
    id: 'langchain',
    name: 'LangChain',
    category: 'AI & Machine Learning',
    level: 90,
    icon: 'link',
  },
  {
    id: 'llm-integration',
    name: 'LLM Integration',
    category: 'AI & Machine Learning',
    level: 92,
    icon: 'cpu',
  },
  {
    id: 'rag-systems',
    name: 'RAG Systems',
    category: 'AI & Machine Learning',
    level: 88,
    icon: 'database',
  },
  {
    id: 'python-ml',
    name: 'Python for ML',
    category: 'AI & Machine Learning',
    level: 90,
    icon: 'code',
  },
  {
    id: 'tensorflow',
    name: 'TensorFlow',
    category: 'AI & Machine Learning',
    level: 82,
    icon: 'cpu',
  },
  
  // Frontend
  {
    id: 'react',
    name: 'React',
    category: 'Frontend',
    level: 92,
    icon: 'atom',
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'Frontend',
    level: 90,
    icon: 'triangle',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Frontend',
    level: 88,
    icon: 'code',
  },
  {
    id: 'tailwindcss',
    name: 'Tailwind CSS',
    category: 'Frontend',
    level: 90,
    icon: 'wind',
  },
  {
    id: 'framer-motion',
    name: 'Framer Motion',
    category: 'Frontend',
    level: 85,
    icon: 'move',
  },
  
  // Backend
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Backend',
    level: 90,
    icon: 'server',
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Backend',
    level: 92,
    icon: 'code',
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'Backend',
    level: 88,
    icon: 'zap',
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'Backend',
    level: 85,
    icon: 'database',
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'Backend',
    level: 82,
    icon: 'database',
  },
  {
    id: 'redis',
    name: 'Redis',
    category: 'Backend',
    level: 80,
    icon: 'server',
  },
  
  // DevOps & Tools
  {
    id: 'docker',
    name: 'Docker',
    category: 'DevOps & Tools',
    level: 85,
    icon: 'box',
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    category: 'DevOps & Tools',
    level: 78,
    icon: 'anchor',
  },
  {
    id: 'aws',
    name: 'AWS',
    category: 'DevOps & Tools',
    level: 82,
    icon: 'cloud',
  },
  {
    id: 'git',
    name: 'Git',
    category: 'DevOps & Tools',
    level: 90,
    icon: 'git-branch',
  },
  {
    id: 'ci-cd',
    name: 'CI/CD',
    category: 'DevOps & Tools',
    level: 80,
    icon: 'refresh-cw',
  },
]

export const skillCategories = [
  'AI & Machine Learning',
  'Frontend',
  'Backend',
  'DevOps & Tools',
] as const

export const getSkillsByCategory = (category: string) => {
  return skills.filter((skill) => skill.category === category)
}

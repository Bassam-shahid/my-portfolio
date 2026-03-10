export interface Experience {
  id: string
  company: string
  role: string
  startDate: string
  endDate?: string
  description: string
  achievements: string[]
  technologies: string[]
  current?: boolean
}

export const experiences: Experience[] = [
  {
    id: 'senior-ai-engineer',
    company: 'Tech Innovations Inc.',
    role: 'Senior AI Engineer',
    startDate: '2023-01',
    description: 'Leading development of autonomous AI agents and RAG systems for enterprise clients.',
    achievements: [
      'Architected multi-agent AI system reducing manual tasks by 60%',
      'Implemented RAG pipeline processing 100K+ documents with 95% accuracy',
      'Led team of 5 engineers delivering AI solutions for Fortune 500 clients',
      'Reduced inference latency by 40% through optimization techniques',
    ],
    technologies: ['Python', 'LangChain', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker'],
    current: true,
  },
  {
    id: 'fullstack-developer',
    company: 'Digital Solutions Corp',
    role: 'Full Stack Developer',
    startDate: '2021-03',
    endDate: '2022-12',
    description: 'Developed scalable web applications and microservices for diverse client portfolio.',
    achievements: [
      'Built real-time collaboration platform serving 10K+ daily active users',
      'Migrated monolithic architecture to microservices improving scalability',
      'Implemented CI/CD pipelines reducing deployment time by 70%',
      'Mentored junior developers and conducted code reviews',
    ],
    technologies: ['Node.js', 'React', 'MongoDB', 'AWS', 'Kubernetes', 'GraphQL'],
    current: false,
  },
  {
    id: 'software-engineer',
    company: 'StartUp Labs',
    role: 'Software Engineer',
    startDate: '2019-06',
    endDate: '2021-02',
    description: 'Full-stack development for early-stage startups and MVP launches.',
    achievements: [
      'Launched 5+ MVPs from concept to production in agile environment',
      'Integrated payment systems processing $500K+ monthly transactions',
      'Developed RESTful APIs serving 1M+ requests daily',
      'Implemented automated testing achieving 85% code coverage',
    ],
    technologies: ['JavaScript', 'TypeScript', 'Express', 'PostgreSQL', 'React', 'Vue.js'],
    current: false,
  },
  {
    id: 'junior-developer',
    company: 'WebDev Agency',
    role: 'Junior Developer',
    startDate: '2018-01',
    endDate: '2019-05',
    description: 'Frontend and backend development for client websites and web applications.',
    achievements: [
      'Developed responsive websites for 20+ clients across various industries',
      'Implemented e-commerce solutions with Stripe integration',
      'Optimized website performance achieving 90+ Lighthouse scores',
      'Collaborated with design team implementing pixel-perfect UIs',
    ],
    technologies: ['JavaScript', 'HTML', 'CSS', 'PHP', 'MySQL', 'WordPress'],
    current: false,
  },
]

export const totalYearsExperience = 6

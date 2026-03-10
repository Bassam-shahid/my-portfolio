export interface Project {
  id: string
  title: string
  description: string
  imageUrl: string
  techStack: string[]
  githubUrl?: string
  liveUrl?: string
  featured: boolean
}

export const projects: Project[] = [
  {
    id: 'ai-agent-platform',
    title: 'AI Agent Platform',
    description: 'Autonomous AI agents for task automation and decision-making with multi-agent collaboration capabilities.',
    imageUrl: '/images/projects/ai-agent-platform.jpg',
    techStack: ['Python', 'LangChain', 'FastAPI', 'React', 'PostgreSQL'],
    githubUrl: 'https://github.com/bassam/ai-agent-platform',
    liveUrl: 'https://ai-agent-platform.demo.com',
    featured: true,
  },
  {
    id: 'rag-knowledge-base',
    title: 'RAG Knowledge Base',
    description: 'Retrieval-Augmented Generation system for intelligent document Q&A with semantic search capabilities.',
    imageUrl: '/images/projects/rag-knowledge-base.jpg',
    techStack: ['Next.js', 'TypeScript', 'Pinecone', 'OpenAI', 'TailwindCSS'],
    githubUrl: 'https://github.com/bassam/rag-knowledge-base',
    liveUrl: 'https://rag-kb.demo.com',
    featured: true,
  },
  {
    id: 'smart-automation-hub',
    title: 'Smart Automation Hub',
    description: 'Centralized automation platform integrating multiple services with intelligent workflow orchestration.',
    imageUrl: '/images/projects/automation-hub.jpg',
    techStack: ['Node.js', 'Express', 'MongoDB', 'Redis', 'Docker'],
    githubUrl: 'https://github.com/bassam/automation-hub',
    featured: true,
  },
  {
    id: 'fullstack-ecommerce',
    title: 'Full-Stack E-Commerce',
    description: 'Modern e-commerce platform with real-time inventory, payment processing, and analytics dashboard.',
    imageUrl: '/images/projects/ecommerce.jpg',
    techStack: ['Next.js', 'Stripe', 'Prisma', 'PostgreSQL', 'TailwindCSS'],
    githubUrl: 'https://github.com/bassam/ecommerce-platform',
    liveUrl: 'https://ecommerce.demo.com',
    featured: true,
  },
  {
    id: 'ml-pipeline-orchestrator',
    title: 'ML Pipeline Orchestrator',
    description: 'Automated machine learning pipeline for model training, evaluation, and deployment with monitoring.',
    imageUrl: '/images/projects/ml-pipeline.jpg',
    techStack: ['Python', 'TensorFlow', 'Kubernetes', 'MLflow', 'AWS'],
    githubUrl: 'https://github.com/bassam/ml-orchestrator',
    featured: false,
  },
  {
    id: 'realtime-collaboration',
    title: 'Real-time Collaboration Tool',
    description: 'WebSocket-based collaborative workspace with live editing, video calls, and project management.',
    imageUrl: '/images/projects/collab-tool.jpg',
    techStack: ['React', 'Socket.io', 'WebRTC', 'Node.js', 'Redis'],
    githubUrl: 'https://github.com/bassam/collab-tool',
    liveUrl: 'https://collab.demo.com',
    featured: false,
  },
]

export const featuredProjects = projects.filter((p) => p.featured)

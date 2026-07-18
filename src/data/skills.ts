export interface ISkillCategory {
  label: string;
  items: string[];
}

export const skills: ISkillCategory[] = [
  { label: 'Languages', items: ['Java', 'Python', 'C++', 'C', 'JavaScript', 'TypeScript'] },
  {
    label: 'Backend',
    items: [
      'FastAPI',
      'Spring Boot',
      'Node.js',
      'Microservices',
      'Clean Architecture',
      'Hexagonal Architecture',
      'SOLID',
    ],
  },
  { label: 'Frontend', items: ['Next.js', 'React', 'React Native', 'Tailwind CSS', 'Bootstrap'] },
  { label: 'Mobile', items: ['Flutter'] },
  { label: 'Databases', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'] },
  {
    label: 'Cloud / DevOps',
    items: [
      'AWS (EC2, S3, CloudFront, Lambda, IAM, Secrets Manager)',
      'Docker',
      'Linux VPS',
      'CI/CD',
      'Nginx',
      'Bitbucket Pipelines',
    ],
  },
  {
    label: 'Integrations',
    items: ['Stripe', 'Twilio', 'SendGrid', 'Persona (KYC)', 'Clerk', 'Socket.IO'],
  },
  { label: 'Tools & AI', items: ['Git', 'GitHub', 'Postman', 'Claude (agentic)', 'ChatGPT'] },
  {
    label: 'CS Foundations',
    items: ['Data Structures & Algorithms', 'OOP', 'Distributed Systems', 'Competitive Programming'],
  },
];

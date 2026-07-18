export interface IExperience {
  company: string;
  title: string;
  type: string;
  start: string;
  end: string;
  location: string;
  mode: string;
  bullets: string[];
  tech: string[];
}

export const experience: IExperience[] = [
  {
    company: 'Hedaya Global Solutions',
    title: 'Software Engineer',
    type: 'Full-time',
    start: 'Sep 2025',
    end: 'Present',
    location: 'Dhaka, Bangladesh',
    mode: 'Remote',
    bullets: [
      'Designed and built a full-stack international vehicle marketplace platform from scratch (FastAPI backend, Next.js frontend) delivering scalable services and a modern UI.',
      'Implemented secure authentication with Clerk; deployed on AWS (EC2, S3, Secrets Manager, IAM) with automated CI/CD pipelines.',
      'Leveraged AI-assisted development (Claude Agentic Mode) to accelerate delivery and raise code quality.',
      'Architected scalable, maintainable APIs following Clean Architecture and SOLID principles.',
      'Cut AWS cost ~47% ($175.96 → $92.65/mo) by moving builds off production EC2 into CI, right-sizing instances, and Lambda + EventBridge auto-stop scheduling.',
    ],
    tech: [
      'Python',
      'FastAPI',
      'Next.js',
      'PostgreSQL',
      'Stripe',
      'Twilio',
      'SendGrid',
      'Persona',
      'Clerk',
      'AWS EC2',
      'S3',
      'CloudFront',
      'Lambda',
      'IAM',
      'Secrets Manager',
      'CI/CD',
      'Clean Architecture',
    ],
  },
  {
    company: 'BRAC EPL Stock Brokerage Ltd.',
    title: 'Junior Software Engineer',
    type: 'Full-time',
    start: 'Dec 2024',
    end: 'Aug 2025',
    location: 'Dhaka, Bangladesh',
    mode: 'On-site',
    bullets: [
      'Developed backend systems for a digital brokerage platform using Spring Boot (Hexagonal Architecture).',
      'Built PDF portfolio generation and automated email delivery pipelines.',
      'Implemented Python-based NID extraction for e-KYC verification.',
    ],
    tech: ['Java', 'Spring Boot', 'Hexagonal Architecture', 'Python', 'MySQL'],
  },
  {
    company: 'Triple Commas Inc.',
    title: 'Software Engineer Trainee',
    type: 'Full-time',
    start: 'Aug 2024',
    end: 'Nov 2024',
    location: 'Dhaka, Bangladesh',
    mode: 'On-site',
    bullets: [
      'Contributed to a Doctor & Hospital Management System: patient accounts, doctor/hospital profiles, diagnostics integration, and scheduling modules.',
    ],
    tech: ['Java', 'Spring Boot', 'MySQL', 'React', 'AWS EC2', 'S3', 'CloudFront'],
  },
];

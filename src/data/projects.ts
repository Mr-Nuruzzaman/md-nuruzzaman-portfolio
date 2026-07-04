export interface IProject {
  slug: string;
  title: string;
  blurb: string;
  description: string;
  tech: string[];
  links: { live?: string; repo?: string };
  /** Screenshot gallery; the first image is the primary/poster. Paths served from /public. */
  images?: string[];
  featured: boolean;
  badge?: string;
  /** Short status pill for the detail modal, e.g. 'Live', 'Launching Dec 2026', 'Internal'. */
  status?: string;
  /** Role / context line shown in the detail modal. */
  role?: string;
  /** Key feature bullets — surfaced in the detail modal. */
  highlights?: string[];
  /** Third-party integrations — surfaced as chips in the detail modal. */
  integrations?: string[];
}

export const projects: IProject[] = [
  {
    slug: 'vehicle-marketplace',
    title: 'SP Used Vehicles — Japan Car Export Marketplace',
    blurb:
      'Japan used-vehicle & heavy-equipment export marketplace with a real-time online auction — proxy bidding, bidder wallets, Stripe payments & Persona KYC.',
    description:
      'Flagship platform at Hedaya Global Solutions (SP Company Ltd) — a large modular-monolith marketplace (FastAPI, Clean Architecture / DDD; ~49 modules, 260+ migrations) for exporting Japanese used cars, heavy equipment and auto parts worldwide. Real-time online auction with proxy/auto-bidding, live Socket.IO bid updates, sniper-time outbid alerts and bidder wallets (top-ups & withdrawals). Deep faceted search, order lifecycle with PDF invoicing, RORO/container shipping calculators, buyer KYC, and multi-currency (live FX) with EN/JA localization. Next.js 16 / React 19 frontend on PostgreSQL + Redis.',
    tech: ['FastAPI', 'Next.js', 'PostgreSQL', 'Redis', 'Socket.IO', 'Stripe', 'Clerk', 'AWS'],
    links: { live: 'https://staging.spusedvehicles.com' },
    images: [
      '/images/vehicle-marketplace.jpg',
      '/images/vehicle-marketplace-2.jpg',
      '/images/preview-1.svg',
      '/images/preview-2.svg',
    ],
    featured: true,
    badge: 'Flagship',
    status: 'Launching Dec 2026',
    role: 'Full-stack engineer — built from scratch · Hedaya Global Solutions',
    highlights: [
      'Real-time online auction: proxy/auto-bidding, live Socket.IO bid updates, sniper-time outbid alerts',
      'Bidder wallets — top-ups & full withdrawal-request workflow (create → verify → approve → sent)',
      'Deep faceted search: make, model, registration, price, mileage, engine, transmission, steering',
      'Cars, heavy equipment & auto parts; order lifecycle with PDF invoicing',
      'RORO / container shipping calculators; multi-currency with live FX; EN/JA localization',
      'Modular monolith — FastAPI, Clean Architecture / DDD, ~49 modules, 260+ migrations',
    ],
    integrations: [
      'Stripe (Visa/MC/Amex)',
      'Clerk auth',
      'Persona KYC',
      'SendGrid',
      'AWS S3 + Secrets Manager',
      'Socket.IO real-time',
    ],
  },
  {
    slug: 'al-shifa',
    title: 'Al-Shifa — Hospital & Appointment Platform',
    blurb:
      'Multi-tenant hospital & doctor-appointment platform — one Spring Boot API behind 4 role-based React portals + native Android apps, with OTP auth, scheduling, prescriptions & hospital accounting.',
    description:
      'A multi-tenant hospital and doctor-appointment platform for the Bangladesh market. A single Spring Boot 3 / Java 17 API (83 JPA entities, ~57 controllers; domain-partitioned modular monolith with 16 RBAC role types) powers four role-based React portals (patient, doctor, hospital, admin) plus native Kotlin / Jetpack Compose Android apps. End-to-end appointment lifecycle — doctor discovery, schedule & working-time management, slot booking with serials, consultation queue, and prescription authoring — alongside hospital-ERP depth: double-entry accounting (chart of accounts, journal, general ledger, reports), billing & collections, pharmacy, HRM and inventory. OTP auth, Bangladesh SMS gateways, and independent CI/CD per app.',
    tech: ['Java 17', 'Spring Boot 3', 'React 18', 'MySQL', 'JWT + OTP', 'Kotlin / Compose', 'AWS S3', 'JasperReports'],
    links: { live: 'https://shifahealthtech.com' },
    images: ['/images/al-shifa.jpg', '/images/preview-2.svg', '/images/preview-3.svg', '/images/preview-1.svg'],
    featured: true,
    badge: 'Healthcare',
    status: 'Live',
    role: 'Full-stack engineer',
    highlights: [
      'One Spring Boot 3 API (83 entities, ~57 controllers) serving 4 React portals + native Android apps',
      '16 RBAC role types — patient, doctor, doctor assistant/attendant, hospital, diagnostic, pharmacy, admin',
      'End-to-end appointments: discovery, schedules, slot booking with serials, consultation queue, prescriptions',
      'Hospital ERP: double-entry accounting (chart of accounts, journal, ledger, reports), billing, HRM, inventory',
      'Bangladesh-localized: SSL Wireless + BulkSMSBD SMS/OTP, MFS billing (bKash/Nagad), i18n',
      '7 GitHub Actions workflows deploying each app independently; JaCoCo test coverage',
    ],
    integrations: [
      'JWT + OTP auth',
      'SSL Wireless + BulkSMSBD (SMS/OTP)',
      'AWS S3',
      'Google Maps',
      'JasperReports / OpenPDF',
      'ZXing QR & barcode',
    ],
  },
  {
    slug: 'digital-brokerage',
    title: 'Digital Brokerage Platform',
    blurb: 'Spring Boot hexagonal backend for a stock brokerage — PDF portfolios, automated email, e-KYC NID extraction.',
    description:
      'Backend systems for a digital stock-brokerage platform at BRAC EPL Stock Brokerage Ltd. Spring Boot with Hexagonal Architecture, automated PDF portfolio generation, scheduled email delivery pipelines, and Python-based NID (National ID) extraction for e-KYC verification. Internal enterprise service — no public link.',
    tech: ['Java', 'Spring Boot', 'Python', 'MySQL'],
    links: {},
    images: ['/images/preview-3.svg', '/images/preview-1.svg', '/images/preview-2.svg'],
    featured: true,
    status: 'Internal · BRAC EPL',
    role: 'Backend engineer',
    highlights: [
      'Spring Boot backend, Hexagonal (ports & adapters) architecture',
      'Automated PDF portfolio generation',
      'Scheduled automated email delivery pipelines',
      'Python-based NID extraction for e-KYC verification',
    ],
  },
  {
    slug: 'restozen',
    title: 'RestoZen — Restaurant Management SaaS',
    blurb:
      'Multi-company restaurant SaaS — QR table ordering, order & branch-level inventory, accounting, and role-based operations.',
    description:
      'Multi-company restaurant management SaaS (Spring Boot 3 / React 18) where each company runs multiple branches. QR-code table ordering, order management with invoice & barcode printing, branch-level inventory (purchases, suppliers, stock, returns), integrated accounting (transactions, daily balance sheet, PDF vouchers), discounts/promotions, and role-based users (Admin / Owner / Employee / Customer) with JasperReports + Chart.js reporting.',
    tech: ['Java 17', 'Spring Boot 3', 'React 18', 'MySQL', 'JWT / OAuth2', 'AWS S3', 'JasperReports'],
    links: { live: 'https://restaurant.boniksheba.com' },
    images: ['/images/restozen.jpg', '/images/preview-1.svg', '/images/preview-3.svg', '/images/preview-2.svg'],
    featured: true,
    status: 'Live',
    role: 'Full-stack engineer',
    highlights: [
      'Multi-company / multi-branch operations with role-based access (Admin / Owner / Employee / Customer)',
      'QR-code table ordering for customers',
      'Order management with invoice & barcode printing',
      'Branch-level inventory: purchases, suppliers, stock, returns',
      'Integrated accounting: transactions, daily balance sheet, PDF vouchers',
      'JasperReports + Chart.js reporting & analytics',
    ],
    integrations: ['AWS S3', 'Gmail SMTP', 'Google Maps', 'JWT / OAuth2 (self-issued)', 'JasperReports + react-pdf', 'QR & Barcode'],
  },
  {
    slug: 'grocery',
    title: 'Grocery — Multi-Branch POS & Inventory ERP',
    blurb:
      'Multi-company POS, inventory & light-manufacturing ERP powering a live grocery chain — branch stock transfers, production/BOM, accounting & QR ordering.',
    description:
      'A multi-company / multi-branch Point-of-Sale, inventory and light-manufacturing ERP (internally ZentoPOS) deployed live for a grocery retail operation. Full POS + inventory lifecycle (purchases → approvals → branch stock → sales → returns), a mini-MRP manufacturing module (Bill of Materials, production batches, quality control), integrated accounting, and a customer-facing QR ordering flow alongside the admin ERP. Spring Boot 3 / Java 17 backend (layered, company-scoped multi-tenancy, UUID keys) with a React admin dashboard.',
    tech: ['Java 17', 'Spring Boot 3', 'React', 'MySQL', 'Spring Security (JWT)', 'JPA / Hibernate', 'AWS S3'],
    links: { live: 'https://grocery.boniksheba.com' },
    images: ['/images/grocery.jpg', '/images/preview-2.svg', '/images/preview-1.svg', '/images/preview-3.svg'],
    featured: true,
    status: 'Live',
    role: 'Full-stack engineer',
    highlights: [
      'Multi-tenant, multi-branch — every record company-scoped; role-based access (Admin / Employee / Customer / Owner)',
      'Full POS + inventory lifecycle: purchases → approvals → branch stock → sales → returns/exchanges',
      'Barcode & QR generation with printable invoices; customer-facing QR ordering',
      'Mini-MRP manufacturing: Bill of Materials, production batches & automated quality-control pipeline',
      'Integrated accounting: transactions, daily balance sheets, auto-printed vouchers',
      'RSA-signed JWT auth, AWS S3 media, JasperReports documents, scheduled alert jobs',
    ],
    integrations: [
      'JWT (RSA / Nimbus)',
      'AWS S3 storage',
      'SMTP email',
      'JasperReports + react-pdf',
      'Barcode & QR generation',
      'Google Maps API',
      'GitHub Actions CI/CD',
    ],
  },
];

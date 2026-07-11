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
      'A Japan used-vehicle, heavy-equipment and parts export marketplace I built from scratch at Hedaya Global Solutions — live in staging ahead of launch, with a server-authoritative real-time auction (eBay-style proxy bidding, bidder wallets, Stripe payments, Persona KYC) running end to end. Under the hood it is a FastAPI modular monolith on Clean Architecture / DDD: 49 domain modules and 276 PostgreSQL migrations, one ASGI process serving REST and Socket.IO with Redis fan-out across workers. Deep faceted search, WeasyPrint PDF invoicing, RORO/container shipping calculators, and multi-currency (live FX) behind a Next.js 16 / React 19 frontend — where I also cut monthly AWS cost by ~47% via CI-based builds and auto-stop scheduling.',
    tech: ['FastAPI', 'Next.js', 'PostgreSQL', 'Redis', 'Socket.IO', 'Stripe', 'Clerk', 'AWS'],
    links: { live: 'https://staging.spusedvehicles.com' },
    images: ['/images/sp-landing.jpg', '/images/sp-listings.jpg', '/images/sp-auction.jpg', '/images/sp-dashboard.jpg'],
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
      'Modular monolith — FastAPI, Clean Architecture / DDD, 49 modules, 276 migrations',
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
      'A live, multi-tenant hospital platform for the Bangladesh market (shifahealthtech.com) where one Spring Boot 3 / Java 17 API — 82 JPA entities, 59 controllers, 16 RBAC roles — is the single source of truth behind four role-based React portals (patient, doctor, hospital, admin) and a native Kotlin / Jetpack Compose Android app. It carries the full appointment lifecycle (doctor discovery, schedules, server-assigned slot serials, consultation queue, structured prescriptions) and genuine hospital-ERP depth: double-entry accounting that refuses to post unbalanced entries, with a general ledger and financial reports, plus billing, collections and a pharmacy module. Bangladesh-localized OTP over real SSL Wireless / BulkSMSBD SMS integrations, RS256-signed JWTs, and per-app CI/CD.',
    tech: ['Java 17', 'Spring Boot 3', 'React 18', 'MySQL', 'JWT + OTP', 'Kotlin / Compose', 'AWS S3', 'JasperReports'],
    links: { live: 'https://shifahealthtech.com' },
    images: [
      '/images/al-shifa.jpg',
      '/images/shifa-patient-portal.jpg',
      '/images/shifa-billing.jpg',
      '/images/shifa-doctor-queue.jpg',
    ],
    featured: true,
    badge: 'Healthcare',
    status: 'Live',
    role: 'Full-stack engineer',
    highlights: [
      'One Spring Boot 3 API (82 entities, 59 controllers) serving 4 React portals + a native Android app',
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
    slug: 'nid-extraction',
    title: 'NID Extraction & Verification Service',
    blurb:
      'Python service powering e-KYC at a stock brokerage — extracts data from NID card images and verifies it against Election Commission registration data, returning a verification status to onboarding.',
    description:
      'The standalone identity-verification service behind client onboarding at BRAC EPL Stock Brokerage. The brokerage platform sends front and back images of a client’s National ID card; the Python service (FastAPI, EasyOCR) extracts the data fields from the images, calls the Election Commission’s NID verification provider to match them against the EC’s real registration data, stores the data and result, and returns a response with the proper verification status to the onboarding flow — turning the most compliance-critical step of opening a brokerage account into a single automated call. Internal enterprise service — no public link.',
    tech: ['Python', 'FastAPI', 'EasyOCR', 'MySQL'],
    links: {},
    images: ['/images/nid-flow.svg', '/images/nid-service.svg'],
    featured: true,
    status: 'Internal · BRAC EPL',
    role: 'Backend engineer',
    highlights: [
      'Accepts NID front + back images from the brokerage onboarding service over a single API call',
      'EasyOCR-based extraction pulls the identity fields off both sides of the card (incl. Bangla script)',
      'Verifies extracted data against Election Commission registration records via the EC NID verification provider',
      'Stores extracted data + verification result and returns a proper verification status to onboarding',
    ],
  },
  {
    slug: 'restozen',
    title: 'RestoZen — Restaurant Management SaaS',
    blurb:
      'Multi-company restaurant SaaS — QR table ordering, order & branch-level inventory, accounting, and role-based operations.',
    description:
      'A live multi-company restaurant SaaS (restaurant.boniksheba.com) that runs QR table ordering and full branch-level operations for many companies from one company-scoped Spring Boot 3 / React 18 service — 61 entities, tenants isolated by company foreign keys and composite constraints rather than a database per tenant. Guests scan a table QR to order; staff boards pick up new orders on a short poll (a deliberate choice — no realtime layer to keep the system stateless and simple). Branch-level inventory (purchases, suppliers, stock, returns), daily-balance accounting with printable vouchers, discount and reward-point campaigns, and role-based access, with JasperReports PDFs and Chart.js dashboards.',
    tech: ['Java 17', 'Spring Boot 3', 'React 18', 'MySQL', 'JWT / OAuth2', 'AWS S3', 'JasperReports'],
    links: { live: 'https://restaurant.boniksheba.com' },
    images: [
      '/images/restozen.jpg',
      '/images/restozen-dashboard.jpg',
      '/images/restozen-orders.jpg',
      '/images/restozen-companies.jpg',
    ],
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
    integrations: [
      'AWS S3',
      'Gmail SMTP',
      'Google Maps',
      'JWT / OAuth2 (self-issued)',
      'JasperReports + react-pdf',
      'QR & Barcode',
    ],
  },
  {
    slug: 'grocery',
    title: 'Grocery — Multi-Branch POS & Inventory ERP',
    blurb:
      'Multi-company POS, inventory & light-manufacturing ERP powering a live grocery chain — branch stock transfers, production/BOM, accounting & QR ordering.',
    description:
      'A live POS, inventory and light-manufacturing ERP (internally ZentoPOS) deployed for a grocery chain that also makes its own goods — its defining property is that a Bill-of-Materials production run and a POS sale draw down the same stock inside one transaction boundary, so inventory can never disagree with itself. One Spring Boot 3 / Java 17 application (company-scoped multi-tenancy, UUID keys) carries the full retail lifecycle (purchases → approvals → warehouse-to-branch allocation → sales → returns/exchanges), a mini-MRP pipeline (BOM, production batches, quality control), daily-balance accounting with auto-printed vouchers, and customer-facing QR ordering — behind a React admin dashboard with RSA-signed JWT auth and scheduled alert/report jobs.',
    tech: ['Java 17', 'Spring Boot 3', 'React', 'MySQL', 'Spring Security (JWT)', 'JPA / Hibernate', 'AWS S3'],
    links: { live: 'https://grocery.boniksheba.com' },
    images: [
      '/images/grocery.jpg',
      '/images/grocery-production.jpg',
      '/images/grocery-allocation.jpg',
      '/images/grocery-balance.jpg',
    ],
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

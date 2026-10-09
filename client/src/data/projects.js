/**
 * Project data.
 *
 * Repository links are maintained per project. Live demo controls are only
 * rendered when a verified live URL is configured.
 */

export const projects = [
  {
    id: 'airwatch',
    name: 'AirWatch — Air Quality Monitoring System',
    category: 'Full Stack Development • Environmental Technology • Data Visualization',
    duration: '2026',
    featured: true,
    image: '/images/projects/airwatch-dashboard.png',
    imageAlt:
      'AirWatch full-stack air quality monitoring dashboard showcasing real-time AQI gauge, interactive pollution map, pollutant analysis cards, and 7-day trend charts',
    description:
      'AirWatch is a full-stack Air Quality Monitoring System designed to monitor and visualize real-time air quality data across multiple geographic levels. The system provides AQI monitoring, pollutant analysis, interactive maps, historical trends, health alerts, and air-quality forecasting through a modern and responsive dashboard.',
    detailedOverview: [
      'AirWatch is a full-stack web application that provides a centralized platform for monitoring and analyzing air quality data. It combines hierarchical location selection, AQI visualization, interactive maps, pollutant measurements, historical analytics, health alerts, and forecasting into a single dashboard.',
      'The application uses React and TypeScript for the frontend, Node.js and Express.js for the backend, and MongoDB with Mongoose for data persistence. It integrates air-quality data through the OpenWeatherMap Air Pollution API and provides interactive visualization using Leaflet and Recharts.',
      'The project demonstrates my ability to develop scalable full-stack applications, work with external APIs, design data-driven dashboards, implement geographic data visualization, and build responsive user interfaces.',
    ],
    problem:
      'Air pollution represents a major environmental and public health hazard, yet real-world air quality data is frequently fragmented across disparate sources, delayed, or limited to broad municipal averages without granular local drill-downs. Citizens and decision-makers lack an intuitive, unified platform that translates complex multi-pollutant measurements into localized health alerts and predictive trends.',
    solution:
      'AirWatch provides a centralized, full-stack environmental intelligence platform that unifies real-time AQI tracking and 6 critical pollutant metrics across a 5-tier location hierarchy (Country → State → District → Taluk → Village). With interactive Leaflet geospatial mapping, 3-day forecasting, 7-day historical Recharts trend analysis, dynamic health warnings, and automated CSV/PDF report generation, it provides actionable environmental awareness through a responsive dark glassmorphism dashboard.',
    architecture:
      'Client-Server Architecture: React 19 + TypeScript frontend with Vite for fast client rendering and Leaflet/Recharts visualization; Node.js & Express.js REST API layer handling request routing, caching, and OpenWeatherMap Air Pollution API integration; MongoDB with Mongoose for location metadata, alert configurations, and historical telemetry persistence.',
    technologies: [
      'React 19',
      'TypeScript',
      'Vite',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Mongoose',
      'Leaflet',
      'React Leaflet',
      'Recharts',
      'OpenWeatherMap API',
    ],
    highlightFeatures: [
      'Real-time AQI monitoring & 6-pollutant analysis (PM2.5, PM10, CO, NO₂, SO₂, O₃)',
      '5-tier geographic location hierarchy (Country → State → District → Taluk → Village)',
      'Interactive Leaflet pollution map with color-coded AQI status markers',
      '7-day air-quality trend analysis & 3-day predictive forecasting',
      'Automated health advisories with CSV & PDF report export',
    ],
    features: [
      'Real-time AQI monitoring',
      'Country → State → District → Taluk → Village location hierarchy',
      'Interactive pollution map with AQI markers',
      'PM2.5, PM10, CO, NO₂, SO₂ and O₃ monitoring',
      'AQI gauge and pollution indicators',
      '7-day air-quality trend analysis',
      '3-day air-quality forecast',
      'Health alerts based on AQI levels',
      'City/location comparison',
      'CSV and PDF report export',
      'MongoDB data persistence',
      'OpenWeatherMap Air Pollution API integration',
      'Responsive dashboard with modern dark glassmorphism UI',
    ],
    links: {
      github: 'https://github.com/HARIESHV/air-quality-dashboard',
      live: null,
    },
  },
  {
    id: 'elearning-platform',
    name: 'E-Learning Platform',
    category: 'Full Stack · TypeScript',
    duration: 'July 2026 – August 2026',
    featured: false,
    image: '/images/projects/elearning-platform.png',
    imageAlt:
      'Abstract layered panel composition representing a full-stack learning management system',
    description:
      'A centralised system for managing courses, learning materials, users, and progress, built with React.js, Node.js, TypeScript, MongoDB, and Cloudflare.',
    detailedOverview: [
      'A centralized system for managing courses, learning materials, users, and progress, built with React.js, Node.js, TypeScript, MongoDB, and Cloudflare.',
      'Designed to streamline curriculum distribution for instructors while providing students with intuitive progress tracking and resource access.',
    ],
    problem:
      'Students often face difficulties accessing organized learning materials and tracking their learning progress, while administrators face challenges in managing courses and student activities.',
    solution:
      'The E-Learning Platform provides a centralized system for managing courses, learning materials, users, and progress using React.js, Node.js, TypeScript, MongoDB, and Cloudflare.',
    architecture:
      'React.js client, Node.js and TypeScript API layer, MongoDB for document persistence, Cloudflare for edge hosting and delivery.',
    technologies: [
      'HTML',
      'CSS',
      'JavaScript',
      'React.js',
      'Node.js',
      'TypeScript',
      'MongoDB',
      'Cloudflare',
    ],
    highlightFeatures: [
      'Centralized course and learning material management',
      'Student enrollment and progress tracking',
      'Role-based administrative control',
      'Cloudflare edge hosting & distribution',
    ],
    features: [
      'Course management',
      'Learning materials',
      'Student management',
      'Progress tracking',
      'Admin management',
      'MongoDB persistence',
      'Cloudflare edge delivery',
    ],
    links: {
      github: 'https://github.com/HARIESHV/e-learning-platform',
      live: null,
    },
  },
  {
    id: 'aptitude-learning-platform',
    name: 'Aptitude Learning Platform',
    category: 'Full Stack · Python',
    duration: 'May 2025 – February 2026',
    featured: false,
    image: '/images/projects/aptitude-learning-platform.svg',
    imageAlt: 'Abstract concentric arc composition representing an aptitude assessment interface',
    description:
      'Developed an Aptitude Learning Platform using Python, HTML, CSS, JavaScript, Render, and Neon Database to provide interactive aptitude tests, performance tracking, and personalized learning experiences.',
    detailedOverview: [
      'Developed an Aptitude Learning Platform using Python, HTML, CSS, JavaScript, Render, and Neon Database to provide interactive aptitude tests, performance tracking, and personalized learning experiences.',
      'Provides candidates with timed evaluations, comprehensive scoring analytics, and personalized recommendations to master core quantitative and logical concepts.',
    ],
    problem:
      'Candidates preparing for technical placement exams often struggle with generic test sets that lack real-time performance analytics, granular topic breakdowns, and targeted recommendations.',
    solution:
      'Developed an interactive aptitude learning platform with categorized question banks, timed quiz evaluations, instant analytical feedback, and personalized improvement tracking.',
    architecture:
      'Python and Flask application layer, HTML, CSS, and JavaScript interface, Neon PostgreSQL for relational storage, Render for cloud deployment.',
    technologies: ['Python', 'Flask', 'HTML', 'CSS', 'JavaScript', 'Render', 'Neon Database'],
    highlightFeatures: [
      'Interactive timed assessment engine',
      'Automated scoring & performance metrics',
      'Personalized learning pathways & recommendations',
      'Serverless PostgreSQL storage with Neon Database',
    ],
    features: [
      'Interactive tests',
      'Question management',
      'Performance tracking',
      'Personalized learning',
      'Database integration',
      'Cloud deployment',
    ],
    links: {
      github: 'https://github.com/HARIESHV/Aptitude_students_easy',
      live: null,
    },
  },
  {
    id: 'rapid-crisis-response',
    name: 'Rapid Crisis Response',
    category: 'Full Stack · Python',
    duration: 'March 2026 – April 2026',
    featured: false,
    image: '/images/projects/rapid-crisis-response.svg',
    imageAlt: 'Abstract radar ring composition representing geolocation-based crisis reporting',
    description:
      'Developed a full-stack Rapid Crisis Response web application using HTML, CSS, JavaScript, and Python (Flask/Django) with geolocation-based emergency reporting and deployed it on Render for real-time accessibility.',
    detailedOverview: [
      'Developed a full-stack Rapid Crisis Response web application using HTML, CSS, JavaScript, and Python (Flask/Django) with geolocation-based emergency reporting and deployed it on Render for real-time accessibility.',
      'Enables individuals in distress to broadcast instant emergency notifications with exact geographic coordinates to first responders and community aid teams.',
    ],
    problem:
      'In emergency situations, delayed reporting and inaccurate location details can significantly slow down first responders and critical aid distribution.',
    solution:
      'Built a full-stack crisis coordination system leveraging browser Geolocation APIs to capture precise coordinates, route emergency tickets to responder teams, and visualize incidents in real time.',
    architecture:
      'Python backend with Flask or Django, HTML, CSS, and JavaScript front end, browser Geolocation API for position capture, Render for cloud deployment.',
    technologies: [
      'Python',
      'Flask/Django',
      'HTML',
      'CSS',
      'JavaScript',
      'Geolocation',
      'Render',
    ],
    highlightFeatures: [
      'Geolocation-based emergency incident reporting',
      'Real-time incident dispatch & status tracker',
      'Interactive map visualization of crisis zones',
      'High-availability deployment on Render cloud',
    ],
    features: [
      'Emergency reporting',
      'Geolocation',
      'Crisis response',
      'Real-time accessibility',
      'Full-stack architecture',
    ],
    links: {
      github: 'https://github.com/HARIESHV/rapid-response-crisis',
      live: null,
    },
  },
  {
    id: 'enterprise-intelligence-platform',
    name: 'Enterprise Intelligence Platform',
    category: 'Generative AI • Full Stack Development • Enterprise Intelligence',
    duration: 'August 2026–September 2026',
    featured: false,
    image: '/images/projects/enterprise-intelligent-platform.svg',
    imageAlt:
      'Abstract neural network and knowledge graph visualization representing enterprise AI platform',
    description:
      'Enterprise Intelligence Platform is an enterprise-grade AI-powered intelligence platform that combines Retrieval-Augmented Generation (RAG), Multi-Agent AI, Knowledge Graphs, Business Intelligence, and Explainable AI to transform enterprise data into intelligent, actionable insights.',
    detailedOverview: [
      'Enterprise Intelligence Platform is an enterprise-grade AI-powered intelligence platform designed to combine multiple AI and data technologies into a unified decision-support system. The platform integrates Retrieval-Augmented Generation, Multi-Agent AI, Knowledge Graph reasoning, Business Intelligence, and Explainable AI to provide contextual and evidence-based insights from enterprise data.',
      'The system supports intelligent document ingestion, hybrid retrieval, vector search, analytics dashboards, executive reporting, relationship-based reasoning, and real-time AI agent execution. It implements enterprise security through JWT authentication, role-based access control, organization isolation, and audit logging.',
      'The platform uses a modern React and TypeScript frontend with a Node.js, Express, and TypeScript backend, supported by MongoDB and MongoDB Atlas Vector Search for scalable enterprise data and AI workflows.',
      'This project demonstrates my ability to build complex full-stack applications, integrate Generative AI into enterprise workflows, implement RAG and multi-agent architectures, work with vector databases, and develop secure, scalable data-driven platforms.',
    ],
    problem:
      'Enterprise organizations have large amounts of structured and unstructured information spread across documents and business systems. Traditional search and analytics can make it difficult to retrieve relevant information, understand relationships, and generate explainable insights.',
    solution:
      'The platform combines RAG, Multi-Agent AI, Knowledge Graphs, Business Intelligence, and Explainable AI to provide intelligent enterprise decision support. It enables intelligent document ingestion, hybrid retrieval (vector + keyword + metadata), multi-agent orchestration, relationship reasoning via knowledge graphs, executive BI dashboards with explainable AI outputs including evidence and confidence scores, and real-time agent execution updates via WebSockets.',
    architecture:
      'React + TypeScript Frontend → Axios / REST API → Node.js + Express + TypeScript Backend → AI Orchestration Layer → MongoDB / MongoDB Atlas Vector Search → Enterprise Data + AI Services',
    technologies: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'shadcn/ui',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Mongoose',
      'MongoDB Atlas Vector Search',
      'OpenAI SDK',
      'GPT-4o',
      'RAG',
      'Multi-Agent AI',
      'Knowledge Graph',
      'WebSocket',
      'JWT',
      'RBAC',
      'Recharts',
      'Axios',
    ],
    highlightFeatures: [
      'Multi-Agent AI with Master Intelligence Agent orchestration',
      'Advanced RAG with hybrid retrieval (vector, keyword & metadata-based)',
      'Knowledge Graph-based relationship reasoning',
      'Business Intelligence dashboards with executive analytics',
      'Explainable AI with evidence and confidence scores',
    ],
    features: [
      'Multi-Agent AI with specialized AI agents',
      'Master Intelligence Agent orchestration',
      'Advanced RAG with hybrid retrieval',
      'Vector search and keyword search',
      'Metadata-based document retrieval',
      'Business Intelligence dashboards',
      'Executive analytics and reports',
      'Knowledge Graph-based relationship reasoning',
      'Explainable AI with evidence and confidence scores',
      'Enterprise document intelligence',
      'PDF, DOCX, Excel, CSV and email document ingestion',
      'JWT authentication',
      'Role-Based Access Control (RBAC)',
      'Organization-level data isolation',
      'Audit logging',
      'Real-time agent execution updates using WebSockets',
    ],
    links: {
      github: 'https://github.com/HARIESHV/pro-expo',
      live: null,
    },
  },
];

/** The full-stack project that demonstrates the widest capability. */
export const featuredProject = projects.find((project) => project.featured) ?? null;

export const supportProjects = projects.filter((project) => !project.featured);

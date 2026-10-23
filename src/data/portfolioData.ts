/**
 * CENTRALIZED PORTFOLIO DATA FILE — DR. NADEEM NAZIR
 * ============================================================================
 * Edit this file to update any text, publication, education entry, career
 * milestone, or contact detail without modifying React components.
 *
 * ITEMS TO REPLACE / VERIFY LATER:
 * 1. `profile.portraitUrl`: Set to a path like "/profile-photo.jpg" (placed in `/public`)
 *    to replace the "NN" Monogram & "Profile Photo" placeholder frame.
 * 2. `education`: Several lower rows have "// TODO: verify year and division"
 *    where the source CV columns were scrambled. Fill in verified years/divisions.
 */

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

export interface TimelineItem {
  id: string;
  period: string;
  title: string;
  institution: string;
  description: string;
  highlights?: string[];
}

export interface ExpertiseCardItem {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  summary: string;
  subjectsOrAreas?: string[];
  subjectsLabel?: string;
  additionalNote?: string;
  iconName: 'landmark' | 'calculator' | 'cpu' | 'scale' | 'compass' | 'microscope';
}

export interface PublicationItem {
  id: number;
  title: string;
  authors: string;
  journal: string;
  year: string;
  citations?: number;
}

export interface ThesisItem {
  degree: string;
  institutionAndYear: string;
  title: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  year?: string;
  division?: string;
  todoNote?: string;
}

export interface LanguageItem {
  name: string;
  proficiency: string;
  percentage: number;
}

export const PORTFOLIO_DATA = {
  profile: {
    monogram: 'NN',
    name: 'Dr. Nadeem Nazir',
    credentials: 'Ph.D. Finance; MS Business Finance; M.Com; LL.B; MCS; AAT',
    kicker: 'Professor | Researcher | Legal Advisor | Consultant',
    title: 'Professor of Accounting, Finance, Law, and Information Technology',
    currentRoleLine:
      'Chairman: Department of Management Sciences @ Government Graduate College Samanabad Faisalabad (An Affiliated College of Government College University Faisalabad)',
    heroIntro:
      'More than 32 years of Teaching, Research, Training, Marketing Head, Finance and Accounts Controller, Internal Auditor, Tax and SAP/ERP System Consultant, and Administrative Experience in a variety of fields in Renowned Institutes.',
    rotatingDisciplines: [
      'Accounting',
      'Finance',
      'Law',
      'Information Technology',
    ],
    floatingBadges: [
      '32+ Years',
      'Ph.D. Finance',
      'Advocate High Court',
    ],
    // Replace empty string with "/your-photo.jpg" (placed inside the /public folder) when ready:
    portraitUrl: '',
    portraitPlaceholderLabel: 'Profile Photo',
  },

  navLinks: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Expertise', href: '#expertise' },
    { label: 'Research', href: '#research' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ],

  stats: [
    {
      id: 'years-experience',
      value: 32,
      suffix: '+',
      label: 'Years of Teaching, Training, Consultancy, Legal Services and Research',
    },
    {
      id: 'law-faculty',
      value: 26,
      suffix: '+',
      label: 'Years as senior faculty member at a local law college in Faisalabad',
    },
    {
      id: 'lawyer-teacher',
      value: 20,
      suffix: '+',
      label: 'Years as a lawyer and a teacher of law subjects',
    },
    {
      id: 'publications-count',
      value: 9,
      suffix: '',
      label: 'Research publications listed in recognized academic journals',
    },
  ] as StatItem[],

  about: {
    heading: 'Professor of Accounting',
    summary:
      'More than 32 years of Teaching, Research, Training, Marketing Head, Finance and Accounts Controller, Internal Auditor, Tax and SAP/ERP System Consultant, and Administrative Experience in a variety of fields in Renowned Institutes. My strengths take account of a victorious and financially viable commencement of new academic programs at professionals, graduate and postgraduate; MS and Doctoral levels bringing innovation in teaching methods and use of the latest accounting software; and an adoption of newness in a range of designated administrative assignments.',
    supportingPoints: [
      {
        period: '1989 & 1995',
        title: 'Commerce & Academic Foundation',
        text: 'Did M.Com and ICMA-inter in 1989 and started a career in the industry. In 1995 joined as Lecturer in Commerce/Accounting at the Government College of Commerce Faisalabad, and also served as in charge of M.Com classes there.',
      },
      {
        period: 'Legal Education & Advisory',
        title: 'Jurisprudence & Academic Counsel',
        text: 'Completed LL.B from the University of Punjab Lahore, and served as a part-time teacher and Academic Advisor at Punjab Law College Faisalabad.',
      },
      {
        period: '2000 – 2002',
        title: 'Information Technology Integration',
        text: 'Completed Master of Computer Science (2000-2002) from National College Faisalabad in the Information Technology texture, to renew knowledge regarding computerized accounting and handling of different new business techniques in academia.',
      },
      {
        period: 'Modern Enterprise Pedagogy',
        title: 'ERP, Business Intelligence & AI in Business',
        text: 'Students are trained to use accounting software like QuickBooks, Zoho and Tally, and to work on SAP and ERP systems, with the latest techniques of business intelligence, artificial intelligence and its use in business.',
      },
    ],
    quote:
      'I am a lion-hearted person; whenever any responsibility is shifted on my shoulders, I put in my best efforts and give the best results.',
    honor: {
      organization: 'Faisalabad Women Chamber of Commerce and Industry (FWCCI)',
      title: 'An Ambassador Of Industry And Academia Linking',
      description:
        'Faisalabad Women Chamber of Commerce and Industry (FWCCI) honored him by declaring him "An Ambassador Of Industry And Academia Linking".',
    },
  },

  careerTimeline: [
    {
      id: 'early-career',
      period: 'Early Career',
      title: 'Management Trainee & Internal Auditor',
      institution: 'Riaz & Company-Chartered Accountants Faisalabad · Nishat Mills Limited Faisalabad',
      description:
        'Management trainee / internal auditor with Riaz & Company-Chartered Accountants Faisalabad; former trainee at Nishat Mills Limited Faisalabad.',
    },
    {
      id: '1989',
      period: '1989',
      title: 'M.Com & ICMA-Inter · Industry Commencement',
      institution: 'Corporate & Industrial Sector',
      description:
        'Completed M.Com and ICMA-inter in 1989 and started a professional career in the industry.',
    },
    {
      id: '1995',
      period: '1995',
      title: 'Lecturer in Accounting and Commerce',
      institution: 'Government College of Commerce Faisalabad',
      description:
        'Joined as Lecturer in Accounting and Commerce at the Government College of Commerce Faisalabad, and also served as in charge of M.Com classes there.',
    },
    {
      id: 'visiting-faculty',
      period: 'Visiting Faculty Tenure',
      title: 'Visiting Faculty Member Across Premier Institutions',
      institution: 'Faisalabad & Chiniot-Faisalabad Campuses',
      description:
        'Served as Visiting Faculty Member at leading universities and colleges across the region:',
      highlights: [
        'Punjab Law College Faisalabad',
        'University of Central Punjab Faisalabad',
        'The University of Faisalabad',
        'Government College University Faisalabad',
        'National University of Science & Technology (FAST) Chiniot-Faisalabad campus',
      ],
    },
    {
      id: '2011',
      period: '2011',
      title: 'Assistant Professor of Accounting & Commerce',
      institution: 'Government Islamia College Faisalabad',
      description:
        'As in charge of the Department of Commerce, started a new nomenclature/program B.Com at the college for graduate students.',
    },
    {
      id: '2018-2021',
      period: '2018 – 2021',
      title: 'Professor of Accounting / Finance / Law / Management (On Deputation Basis)',
      institution: 'Government College University Faisalabad (GCUF) · Department of Public Administration',
      description:
        'Served as in charge of the Admission Committee for BS & MS students, in charge of the Discipline Committee, in charge of Student Affairs, and in charge of the Results Handling Committee. Handled Board of Studies meetings, academic and curriculum handling and its application.',
    },
    {
      id: '2021',
      period: '2021',
      title: 'Ph.D. (Finance) Completion & Associate Professor / Chairman',
      institution: 'Government Graduate College Samanabad Faisalabad (Affiliated College of GCUF)',
      description:
        'Completed Ph.D. (major in finance) from GCUF. Joined as Associate Professor at Government Graduate College Samanabad Faisalabad (affiliated college of GCUF), as Chairman of the Department of Management Sciences, and re-established a new department of Bachelor of Business Administration in affiliation with GCUF.',
    },
    {
      id: 'present',
      period: 'Present',
      title: 'Chairman of Management Sciences & Professor of Accounting and Finance',
      institution: 'Government Graduate College Samanabad Faisalabad',
      description:
        'Leading the Department of Management Sciences as Chairman and serving as Professor of Accounting and Finance at Government Graduate College Samanabad Faisalabad.',
    },
  ] as TimelineItem[],

  expertiseCards: [
    {
      id: 'card-a',
      code: '01',
      title: 'Professor of Accounting & Finance',
      subtitle: 'Graduate, Postgraduate & Professional Instruction',
      summary:
        'Extensive academic instruction across foundational and advanced financial, managerial, banking, and economic disciplines.',
      subjectsLabel: 'Subjects Taught',
      subjectsOrAreas: [
        'Advance Financial Accounting',
        'Financial Accounting',
        'Cost and Management Accounting',
        'Mercantile Law & Company Laws',
        'Taxation Laws',
        'Principles of Auditing',
        'Introduction to International Business',
        'Money Banking and Currency',
        'Macro and Micro Economics',
        'Financial Management',
        'Advance Financial Modelling',
        'Investment Analysis',
        'Industrial Accounting',
        'Industrial Taxation',
        'Industrial Financial Analysis',
      ],
      iconName: 'landmark',
    },
    {
      id: 'card-b',
      code: '02',
      title: 'Accounting/Finance Consultant and Accounting Software Practitioner',
      subtitle: '"Being an accounting and Finance consultant and an authority with ERP systems."',
      summary:
        'Experience in charge of accounting, finance, and legal departments for various business enterprises; dealing with financial data, accounts preparation, report generation, and tax matters of different industrial undertakings; internal auditor, internal finance controller, external and internal accounting reports generator, and helped in the finalization of financial reports of various public limited companies.',
      subjectsLabel: 'Core Advisory Areas',
      subjectsOrAreas: [
        'ERP Systems Authority',
        'Internal Auditing & Finance Control',
        'Public Limited Company Financial Finalization',
        'Industrial Tax Matters & Compliance',
        'External & Internal Financial Reporting',
      ],
      iconName: 'calculator',
    },
    {
      id: 'card-c',
      code: '03',
      title: 'Professor of Information Technology',
      subtitle: 'Academic Planning, University Policy & Enterprise Computing',
      summary:
        'Instrumental in department planning and operations as well as development and implementation of University Policies and laws at B.Com., M.Com, BBA, BSCS, BS and MS Public Administration level; conducted undergraduate lectures in various stages of computer science, actively engaging reputable organizations like FWCCI and others; participated in outreach programs, community development, and civic works; instructed basic major and minor courses in compliance with department programs.',
      subjectsLabel: 'New Academic Areas',
      subjectsOrAreas: [
        'SAP FICO',
        'Business Intelligence',
        'Artificial Intelligence',
        'SAP Cloud',
        'Accounting Software',
      ],
      iconName: 'cpu',
    },
    {
      id: 'card-d',
      code: '04',
      title: 'Professor of Law / An Advocate',
      subtitle: 'Advocate High Court & Educationist Legal Consultant',
      summary:
        'Advocate High Court and Educationist Legal Consultant for Commercial, Business, Companies Law, Writs & Human Rights, Tax, Custom, Corporate & Banking Law. Also instructed Criminal Procedure, Constitutional Law, and Legal Writing for the Trial Counselor program. Performed legal research and drafted a memorandum on various intellectual property issues, including copyright and trademark.',
      subjectsLabel: 'Law Subjects Taught',
      subjectsOrAreas: [
        'Company Laws',
        'Law of Contracts',
        'Law of Negotiable Instruments',
        'Insurance Laws',
        'Labor Laws',
        'Industrial Laws',
        'Law of Common Carriers',
        'Limitation Act',
        'International Law',
        'Laws of Partnership',
        'Law of Governance of Public Limited and Private Limited Companies',
        'Taxation Laws',
        'Criminal Procedure',
        'Constitutional Law',
        'Legal Writing (Trial Counselor Program)',
      ],
      iconName: 'scale',
    },
    {
      id: 'card-e',
      code: '05',
      title: 'Academic Advisor / Career Consultant at GCUF',
      subtitle: 'Curriculum Innovation, Entrepreneurship & Student Mentorship',
      summary:
        'Facilitating students in making their careers better; developing a graduate course in entrepreneurship for the Master\'s Degree Program; developed International Business and Entrepreneurship programs and courses; facilitated class instruction on teacher entrepreneurship, mentoring, and leadership principles to business and education students.',
      subjectsLabel: 'Key Contributions',
      subjectsOrAreas: [
        'Master\'s Entrepreneurship Course Design',
        'International Business Program Development',
        'Teacher Entrepreneurship & Leadership',
        'Student Career Mentorship',
      ],
      iconName: 'compass',
    },
    {
      id: 'card-f',
      code: '06',
      title: 'Research Mentor',
      subtitle: 'End-to-End Postgraduate & Doctoral Research Supervision',
      summary:
        'Guiding students from research proposal, research questions, research objectives and research problems, through complete literature review, collection of primary and secondary data in sets, and the use of software for prediction of results by quantitative and qualitative techniques, up to the interpretation of research results.',
      subjectsLabel: 'Mentorship Lifecycle',
      subjectsOrAreas: [
        'Research Proposal & Problem Formulation',
        'Research Questions & Objectives',
        'Comprehensive Literature Review',
        'Primary & Secondary Dataset Collection',
        'Quantitative & Qualitative Software Modeling',
        'Result Prediction & Empirical Interpretation',
      ],
      iconName: 'microscope',
    },
  ] as ExpertiseCardItem[],

  skillsAndCompetencies: {
    items: [
      'Analytical thinking',
      'Problem solving',
      'Persuasive and strong negotiating skills',
      'Oral and written communication skills',
      'Study skills',
      'Argument skills',
      'Legal knowledge',
      'Ability to read and write about the law and construct legal arguments',
      'Comprehensive knowledge of corporate, labor and various local laws',
      'Thorough understanding of the company\'s operations, policies and related legal matters',
      'Academic administration',
      'Curriculum development',
      'Board of Studies handling',
      'Industry-academia linkage',
    ],
    synthesisParagraph:
      'A unique combination of the knowledge of commerce, information technology, business administration, research, public administration, industrial management/taxation, corporate governance, and administration of academia & industry. and the law.',
  },

  softwareAndTools: {
    researchNote: 'Complete authority over software',
    researchSoftware: ['SPSS', 'Smart PLS 3', 'EViews', 'Stata'],
    accountingErpSoftware: [
      'QuickBooks',
      'Zoho',
      'Tally',
      'SAP',
      'ERP systems',
      'SAP FICO',
      'SAP Cloud',
    ],
  },

  research: {
    intro: 'As a senior researcher, I have a wonderful career in research.',
    workflowSummary:
      'Guiding scholars from research proposal, research questions, research objectives and research problems, through complete literature review, collection of primary and secondary data in sets, and the use of software for prediction of results by quantitative and qualitative techniques, up to the interpretation of research results.',
    scholarVerification: 'Google Scholar: Verified email at gcuf.edu.pk',
    theses: [
      {
        degree: 'M.Phil Thesis',
        institutionAndYear: 'GCUF · 2013-14',
        title:
          'Impact of Dividend Policy on Stock Price Volatility: A Case Study of Pakistani Capital Market',
      },
      {
        degree: 'Ph.D. Dissertation',
        institutionAndYear: 'GCUF · 2021',
        title:
          'Managing Agency Conflicts: The Intervening Role of Alignment and Trust in Family Owned Firms',
      },
    ] as ThesisItem[],
    publications: [
      {
        id: 1,
        title:
          'Impact of Corporate Social Responsibility on financial performance: The role of intellectual capital',
        authors: 'MK Khurshid, H Shaheer, N Nazir, M Waqas, M Kashif',
        journal: 'City University Research Journal, 247-263',
        year: '2016',
        citations: 26,
      },
      {
        id: 2,
        title:
          'Impact of dividend policy on stock price volatility: A case study of Pakistani capital market',
        authors: 'N Nazir, A Ali, H Sabir',
        journal: 'Policy 6 (11), 49-61',
        year: '2014',
        citations: 13,
      },
      {
        id: 3,
        title:
          'Impact of ownership structure on firm value: A quantitative analysis of all listed companies in Karachi Stock Exchange (KSE) Pakistan',
        authors: 'Y Ali, SH Tahir, N Nazir',
        journal: 'International Journal of Management Sciences 5 (1), 102-110',
        year: '2015',
        citations: 10,
      },
      {
        id: 4,
        title:
          'Impact of supervisory support on organizational commitment in the presence of power distance: A quantitative study of textile sector of Faisalabad, Pakistan',
        authors: 'Khan, S. R., Bashir, M., Saqib, S., Abbas, G., & Nazir',
        journal: 'International Journal of Information, Business and Management 7 (2015), 259-270',
        year: '2015',
        citations: 3,
      },
      {
        id: 5,
        title:
          'Autocorrelation: What happens if the error or disturbance terms are correlated in time-series data',
        authors: 'AA Chaudhary, N Nazir, A Riaz, N Sadiq, N Riaz',
        journal: 'Competitive Education Research Journal 3 (2), 154-163',
        year: '2022',
        citations: 2,
      },
      {
        id: 6,
        title:
          'The Role of Non-Government Organization Functioning and Challenges: A Case Study on Shaukat Khanum Cancer Care and Research Center Pakistan with Comparative Analysis',
        authors: 'AA Chaudhary, A Sharif, N Riaz, N Nazir',
        journal: 'Journal of Excellence in Social Sciences 2 (2), 78-87',
        year: '2023',
        citations: 2,
      },
      {
        id: 7,
        title:
          'The Cost Leadership Strategy and its Impact on Future Performance of Non-Financial Firms; A Case Study of Pakistan',
        authors: 'AA Chaudhary, A Riaz, N Nazir, M Azad, MW Anwar',
        journal: 'Competitive Social Science Research Journal 3 (2), 561-579',
        year: '2022',
      },
      {
        id: 8,
        title:
          'Opportunistic Mania Instigating Agency Confliction: The Cradle of Decay of Family Firms',
        authors: 'N Nazir, SH Tahir, HM Sabir',
        journal: 'Journal of Organizational Behavior Research 3 (2), 146-159',
        year: '2018',
      },
      {
        id: 9,
        title: 'Testing Microstructure Theory on the Karachi Stock Exchange',
        authors: 'NNH Raza',
        journal: 'Information Management and Business Review (ISSN 2220-3796) 9 (2017), 16-24',
        year: '2017',
      },
    ] as PublicationItem[],
  },

  education: [
    {
      id: 'phd',
      degree: 'Ph.D. (Finance)',
      institution: 'Government College University, Faisalabad',
      year: '2021',
      division: '1st Division',
    },
    {
      id: 'mphil',
      degree: 'M.Phil. / MS (Business Finance)',
      institution: 'Government College University, Faisalabad',
      year: '2013',
      division: '1st Division',
    },
    {
      id: 'mcs',
      degree: 'MCS',
      institution: 'The National College Faisalabad',
      // TODO: verify year and division (known MCS period in bio: 2000-2002)
      division: '1st Division',
    },
    {
      id: 'llb',
      degree: 'LL.B.',
      institution: 'University of Punjab, Lahore',
      // TODO: verify year and division
    },
    {
      id: 'icma',
      degree: 'ICMA-inter',
      institution: 'Institute of Cost & Management Accountants Karachi',
      // TODO: verify year and division (known ICMA-inter completion in bio: 1989)
    },
    {
      id: 'mcom',
      degree: 'M.Com (Accounting)',
      institution: 'University of Punjab, Lahore',
      // TODO: verify year and division (known M.Com area in bio: 1989-1990)
    },
    {
      id: 'bcom',
      degree: 'Bachelor of Commerce',
      institution: 'University of Punjab, Lahore',
      // TODO: verify year and division
    },
    {
      id: 'fsc',
      degree: 'Intermediate (F.Sc.)',
      institution: 'Board of Intermediate and Secondary Education, Sargodha',
      // TODO: verify year and division
    },
    {
      id: 'matric',
      degree: 'Matriculation (Science)',
      institution: 'Board of Intermediate and Secondary Education, Sargodha',
      // TODO: verify year and division
    },
  ] as EducationItem[],

  teachingAndInstitutions: {
    classesTaught: [
      'B.COM',
      'BBA',
      'MBA',
      'LL.B.',
      'O-Level & A-Level',
      'ACCA',
      'ACMA',
      'M.COM',
      'M.Phil.',
      'BS',
      'MS',
    ],
    institutions: [
      'Government Graduate College Samanabad Faisalabad',
      'Government College University Faisalabad',
      'Government Islamia College Faisalabad',
      'Government College of Commerce Faisalabad',
      'University of Central Punjab Faisalabad',
      'The University of Faisalabad',
      'National University of Science & Technology (FAST) Chiniot-Faisalabad campus',
      'Punjab Law College Faisalabad',
      'Riaz & Company-Chartered Accountants Faisalabad',
      'Nishat Mills Limited Faisalabad',
    ],
  },

  languages: [
    {
      name: 'Punjabi',
      proficiency: 'Native or bilingual proficiency',
      percentage: 100,
    },
    {
      name: 'Urdu',
      proficiency: 'Full professional proficiency',
      percentage: 98,
    },
    {
      name: 'English',
      proficiency: 'Professional working proficiency',
      percentage: 90,
    },
  ] as LanguageItem[],

  contact: {
    email: 'nadeemnazir1@gmail.com',
    phoneDisplay: '+92 300 7960300',
    phoneRaw: '+923007960300',
    whatsappUrl: 'https://wa.me/923007960300',
    linkedinUrl:
      'https://www.linkedin.com/in/dr-nadeem-nazir-finance?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    linkedinDisplay: 'linkedin.com/in/dr-nadeem-nazir-finance',
    address: 'House # F--611; Block F, Gulistan Colony 1, Faisalabad',
    copyright: '© 2026 Dr. Nadeem Nazir. All rights reserved.',
    developerName: 'Muhammad Sufyan Farzand',
  },
};

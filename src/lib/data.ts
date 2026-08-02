export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  logoUrl?: string;
  description: {
    en: string;
    hi: string;
  };
  highlights: {
    en: string[];
    hi: string[];
  };
  skills: string[];
}

export interface Project {
  slug: string;
  title: string;
  description: {
    en: string;
    hi: string;
  };
  longDescription: {
    en: string;
    hi: string;
  };
  tags: string[];
  category: "Fullstack" | "Frontend" | "AI/ML" | "Tools";
  featured: boolean;
  githubUrl: string;
  demoUrl?: string;
  image: string;
  features: {
    en: string[];
    hi: string[];
  };
  challenges: {
    en: string;
    hi: string;
  };
  solution: {
    en: string;
    hi: string;
  };
  installationSteps: string[];
}

export interface SkillCategory {
  category: {
    en: string;
    hi: string;
  };
  items: {
    name: string;
    icon?: string;
    level?: string;
  }[];
}

export interface Education {
  degree: {
    en: string;
    hi: string;
  };
  institution: string;
  period: string;
  location: string;
  gpa?: string;
  highlights?: {
    en: string[];
    hi: string[];
  };
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: "Certification" | "Workshop" | "Hackathon" | "Academic";
  tags: string[];
  credentialUrl?: string;
  imageUrl: string;
  logoUrl?: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    id: "cert-1",
    title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    issuer: "Oracle",
    date: "2025",
    category: "Certification",
    tags: ["AI/ML", "Cloud Computing", "OCI"],
    credentialUrl: "https://oracle.com",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    logoUrl: "https://cdn.simpleicons.org/oracle",
  },
  {
    id: "cert-2",
    title: "Fullstack Development Workshop — Shaastra 2026 IIT Madras",
    issuer: "IIT Madras (Shaastra)",
    date: "2026",
    category: "Workshop",
    tags: ["Fullstack", "React 19", "Next.js", "Web Dev"],
    credentialUrl: "https://shaastra.org",
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    logoUrl: "https://cdn.simpleicons.org/googlescholar",
  },
  {
    id: "cert-3",
    title: "Certified Web Development Associate",
    issuer: "DevTown",
    date: "2024",
    category: "Certification",
    tags: ["Frontend", "JavaScript", "HTML/CSS"],
    credentialUrl: "https://devtown.in",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    logoUrl: "https://cdn.simpleicons.org/udemy",
  },
  {
    id: "cert-4",
    title: "GLA University Annual Technical Hackathon Participant",
    issuer: "GLA University",
    date: "2024",
    category: "Hackathon",
    tags: ["Hackathon", "Problem Solving", "Team Leader"],
    credentialUrl: "https://gla.ac.in",
    imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
  },
];

export interface Organization {
  name: string;
  role: {
    en: string;
    hi: string;
  };
  period: string;
  description: {
    en: string;
    hi: string;
  };
}

export const PERSONAL_DATA = {
  name: "Vivek",
  title: "Blockchain Engineer & Full Stack Developer | B.Tech CSE Student at GLA University",
  location: "Varanasi, Uttar Pradesh, India",
  email: "vivekcsed22@gmail.com",
  secondaryEmail: "vivek.glacs22@gla.ac.in",
  phone: "+91-8765728985",
  meeting: "https://cal.com/devxvivek/meeting",
  github: "https://github.com/webdeveloperdesigner",
  leetcode: "https://leetcode.com/u/Vivek_cs/",
  codeforces: "https://codeforces.com/profile/Vivek_csed",
  linkedin: "https://www.linkedin.com/in/vivek-vns/",
  instagram: "https://www.instagram.com/_.heyiamvivek._/",
  twitter: "https://x.com",
  discord: "https://discord.com",
  kaggle: "https://kaggle.com",
  resumeUrl: "#",
};

export const EXPERIENCES: Experience[] = [
  {
    id: "exp-1",
    company: "MotionCut",
    role: "Web Development Intern",
    period: "Jan 2025 – Feb 2025",
    location: "Remote",
    description: {
      en: "Developed and maintained responsive websites using HTML, CSS, JavaScript.",
      hi: "HTML, CSS, जावास्क्रिप्ट का उपयोग करके प्रतिक्रियाशील वेबसाइटों का विकास और रखरखाव किया।",
    },
    highlights: {
      en: [
        "Developed and maintained responsive websites using HTML, CSS, and JavaScript.",
        "Analyzed project requirements and provided solutions based on given images and specifications.",
        "Optimized website performance for better user experience.",
        "Debugged and resolved front-end issues to enhance application functionality.",
      ],
      hi: [
        "HTML, CSS और जावास्क्रिप्ट का उपयोग करके प्रतिक्रियाशील वेबसाइट विकसित की।",
        "परियोजना आवश्यकताओं का विश्लेषण किया और दी गई छवियों और विनिर्देशों के आधार पर समाधान प्रदान किया।",
        "बेहतर उपयोगकर्ता अनुभव के लिए वेबसाइट के प्रदर्शन को अनुकूलित किया।",
        "एप्लिकेशन कार्यक्षमता बढ़ाने के लिए फ्रंट-एंड समस्याओं को सुलझाया।",
      ],
    },
    skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
  },
  {
    id: "exp-2",
    company: "Digihero",
    role: "Web Developer Intern",
    period: "Jun 2024 – Jul 2024",
    location: "Mathura, UP (Remote)",
    description: {
      en: "Created and optimized SEO-friendly blog content for WordPress website, combining technical and creative writing.",
      hi: "तकनीकी और रचनात्मक लेखन को मिलाकर वर्डप्रेस वेबसाइट के लिए एसईओ-अनुकूल ब्लॉग सामग्री बनाई।",
    },
    highlights: {
      en: [
        "Created and optimized SEO-friendly blog content for WordPress website, combining technical and creative writing.",
        "Performed keyword research, crafted meta tags, and implemented SEO strategies to boost search engine visibility.",
        "Managed blog publication and formatting through the WordPress CMS.",
        "Gained hands-on experience in digital marketing and content optimization alongside web development.",
      ],
      hi: [
        "वर्डप्रेस वेबसाइट के लिए एसईओ-अनुकूल ब्लॉग सामग्री बनाई और अनुकूलित की।",
        "कीवर्ड अनुसंधान किया, मेटा टैग तैयार किए और खोज इंजन दृश्यता बढ़ाने के लिए एसईओ नीतियां लागू कीं।",
        "वर्डप्रेस सीएमएस के माध्यम से ब्लॉग प्रकाशन और प्रारूपण का प्रबंधन किया।",
        "डिजिटल मार्केटिंग और सामग्री अनुकूलन में व्यावहारिक अनुभव प्राप्त किया।",
      ],
    },
    skills: ["WordPress", "SEO", "Content Optimization", "HTML", "CMS"],
  },
];

export const PROJECTS: Project[] = [
  {
    slug: "bodhai-learning-platform",
    title: "BodhAI | AI-Powered Learning Practice Platform",
    description: {
      en: "AI-powered platform for MCQs, coding quizzes, and personalized learning insights built with React & Firebase.",
      hi: "MCQs, कोडिंग क्विज़ और व्यक्तिगत शिक्षण अंतर्दृष्टि के लिए AI-संचालित शिक्षण मंच।",
    },
    longDescription: {
      en: "Developed and maintained BodhAI, an adaptive learning platform featuring Smart MCQs, interactive coding quizzes with real-time code execution, user analytics tracking strengths and weaknesses, and Firebase admin tools.",
      hi: "BodhAI का विकास और रखरखाव किया, जो स्मार्ट MCQs, वास्तविक समय कोड निष्पादन के साथ इंटरैक्टिव कोडिंग क्विज़ और उपयोगकर्ता विश्लेषण प्रदान करता है।",
    },
    tags: ["React", "Firebase", "Tailwind CSS", "AI Analytics", "JavaScript"],
    category: "Fullstack",
    featured: true,
    githubUrl: "https://github.com",
    demoUrl: "https://bodhai.example.com",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    features: {
      en: [
        "Smart MCQs: Adaptive multiple-choice quizzes adjusting difficulty automatically.",
        "Coding Quizzes: Interactive code editor with real-time execution and instant feedback.",
        "User Analytics: Progress tracking identifying strengths, weaknesses, and suggested paths.",
        "Admin Panel: Firebase-based admin tools for quiz management.",
      ],
      hi: [
        "स्मार्ट MCQs: कठिनाई को स्वचालित रूप से समायोजित करने वाली अनुकूली प्रश्नोत्तरी।",
        "कोडिंग क्विज़: वास्तविक समय कोड निष्पादन और प्रतिक्रिया के साथ इंटरैक्टिव संपादक।",
        "उपयोगकर्ता विश्लेषण: ताकत और कमजोरियों की पहचान करने वाली प्रगति ट्रैकिंग।",
        "एडमिन पैनल: प्रश्नोत्तरी प्रबंधन के लिए फायरबेस-आधारित उपकरण।",
      ],
    },
    challenges: {
      en: "Real-time code execution and score tracking across diverse quiz types.",
      hi: "विभिन्न क्विज़ प्रकारों में वास्तविक समय कोड निष्पादन और स्कोर ट्रैकिंग।",
    },
    solution: {
      en: "Integrated sandbox code evaluation APIs and Firebase Firestore real-time database.",
      hi: "सैंडबॉक्स कोड मूल्यांकन एपीआई और फायरबेस रीअल-टाइम डेटाबेस को एकीकृत किया।",
    },
    installationSteps: [
      "git clone https://github.com/vivek/bodhai.git",
      "cd bodhai",
      "npm install",
      "npm start",
    ],
  },
  {
    slug: "ai-healthcare-chatbot",
    title: "AI Healthcare Chatbot",
    description: {
      en: "Responsive healthcare chatbot web application providing AI-powered medical assistance and health insights.",
      hi: "एआई-संचालित चिकित्सा सहायता और स्वास्थ्य अंतर्दृष्टि प्रदान करने वाला प्रतिक्रियाशील चैटबॉट।",
    },
    longDescription: {
      en: "Designed and developed the frontend of a healthcare chatbot website for user-friendly medical assistance. Built with React.js for seamless cross-device responsiveness and AI features providing personalized health insights.",
      hi: "उपयोगकर्ता के अनुकूल चिकित्सा सहायता के लिए एक स्वास्थ्य चैटबॉट वेबसाइट का फ्रंटएंड डिजाइन और विकसित किया।",
    },
    tags: ["React JS", "JavaScript", "AI Integration", "Tailwind CSS"],
    category: "AI/ML",
    featured: true,
    githubUrl: "https://github.com",
    demoUrl: "https://healthcare-bot.example.com",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    features: {
      en: [
        "User-friendly medical assistance frontend design.",
        "Responsive interface seamless across all mobile and desktop devices.",
        "Integrated AI features providing personalized health insights.",
      ],
      hi: [
        "उपयोगकर्ता के अनुकूल चिकित्सा सहायता फ्रंटएंड डिजाइन।",
        "सभी मोबाइल और डेस्कटॉप उपकरणों पर प्रतिक्रियाशील इंटरफ़ेस।",
        "व्यक्तिगत स्वास्थ्य अंतर्दृष्टि प्रदान करने वाली एकीकृत AI सुविधाएँ।",
      ],
    },
    challenges: {
      en: "Structuring intuitive medical query interactions without user friction.",
      hi: "बिना किसी बाधा के सहज चिकित्सा प्रश्न बातचीत की संरचना करना।",
    },
    solution: {
      en: "Used React state management and structured conversation cards with Tailwind CSS.",
      hi: "React स्टेट मैनेजमेंट और Tailwind CSS का उपयोग किया।",
    },
    installationSteps: [
      "git clone https://github.com/vivek/healthcare-chatbot.git",
      "cd healthcare-chatbot",
      "npm install",
      "npm start",
    ],
  },
];

export const EDUCATIONS: Education[] = [
  {
    degree: {
      en: "B.Tech - Computer Science and Engineering",
      hi: "बी.टेक - कंप्यूटर साइंस एंड इंजीनियरिंग",
    },
    institution: "GLA University",
    period: "2022 – 2026",
    location: "Mathura, Uttar Pradesh",
    gpa: "6.9 CGPA",
    highlights: {
      en: ["Core Computer Science, Web Technologies, Data Structures, and Software Engineering."],
      hi: ["कोर कंप्यूटर साइंस, वेब टेक्नोलॉजीज, डेटा स्ट्रक्चर्स और सॉफ्टवेयर इंजीनियरिंग।"],
    },
  },
];



export const ORGANIZATIONS: Organization[] = [
  {
    name: "GLA University Technical Club",
    role: {
      en: "Core Technical Member & Web Contributor",
      hi: "कोर तकनीकी सदस्य एवं वेब योगदानकर्ता",
    },
    period: "2023 - Present",
    description: {
      en: "Participated and organized coding hackathons, technical workshops, and web dev bootcamps.",
      hi: "कोडिंग हैकाथॉन, तकनीकी कार्यशालाओं और वेब देव बूटकैंप का आयोजन और भागीदारी की।",
    },
  },
];

export interface TechSkill {
  name: string;
  icon: string;
}

export interface HardSkillItem {
  name: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
  description: {
    en: string;
    hi: string;
  };
}

export interface HardSkillCategory {
  category: {
    en: string;
    hi: string;
  };
  skills: HardSkillItem[];
}

export interface SoftSkillItem {
  name: string;
  description: {
    en: string;
    hi: string;
  };
}

export const TECH_STACK_ITEMS: TechSkill[] = [
  { name: "Python", icon: "https://cdn.simpleicons.org/python" },
  { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript" },
  { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript" },
  { name: "Solidity", icon: "https://cdn.simpleicons.org/solidity" },
  { name: "React", icon: "https://cdn.simpleicons.org/react" },
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs" },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs" },
  { name: "TensorFlow", icon: "https://cdn.simpleicons.org/tensorflow" },
  { name: "Scikit-learn", icon: "https://cdn.simpleicons.org/scikitlearn" },
  { name: "Pandas", icon: "https://cdn.simpleicons.org/pandas" },
  { name: "NumPy", icon: "https://cdn.simpleicons.org/numpy" },
  { name: "Matplotlib", icon: "https://cdn.simpleicons.org/python" },
  { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss" },
  { name: "Redis", icon: "https://cdn.simpleicons.org/redis" },
  { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql" },
  { name: "Kubernetes", icon: "https://cdn.simpleicons.org/kubernetes" },
  { name: "Docker", icon: "https://cdn.simpleicons.org/docker" },
  { name: "Terraform", icon: "https://cdn.simpleicons.org/terraform" },
  { name: "LangChain", icon: "https://cdn.simpleicons.org/chainlink" },
  { name: "Mistral AI", icon: "https://cdn.simpleicons.org/openai" },
  { name: "PyTorch", icon: "https://cdn.simpleicons.org/pytorch" },
  { name: "OpenCV", icon: "https://cdn.simpleicons.org/opencv" },
  { name: "FastAPI", icon: "https://cdn.simpleicons.org/fastapi" },
  { name: "Flask", icon: "https://cdn.simpleicons.org/flask" },
  { name: "C", icon: "https://cdn.simpleicons.org/c" },
  { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb" },
  { name: "Firebase", icon: "https://cdn.simpleicons.org/firebase" },
  { name: "Bootstrap", icon: "https://cdn.simpleicons.org/bootstrap" },
];

export const TOOLS_ITEMS: TechSkill[] = [
  { name: "VS Code", icon: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg" },
  { name: "Jupyter", icon: "https://cdn.simpleicons.org/jupyter" },
  { name: "Google Colab", icon: "https://cdn.simpleicons.org/googlecolab" },
  { name: "Figma", icon: "https://cdn.simpleicons.org/figma" },
  { name: "GitHub", icon: "https://cdn.simpleicons.org/github" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git" },
  { name: "Docker", icon: "https://cdn.simpleicons.org/docker" },
  { name: "Conda", icon: "https://cdn.simpleicons.org/anaconda" },
  { name: "Linux", icon: "https://cdn.simpleicons.org/linux" },
  { name: "Postman", icon: "https://cdn.simpleicons.org/postman" },
  { name: "Canva", icon: "https://cdn.simpleicons.org/canva" },
  { name: "WordPress", icon: "https://cdn.simpleicons.org/wordpress" },
];

export const HARD_SKILLS_DATA: HardSkillCategory[] = [
  {
    category: {
      en: "SOFTWARE ENGINEERING",
      hi: "सॉफ्टवेयर इंजीनियरिंग",
    },
    skills: [
      {
        name: "System Architecture",
        level: "INTERMEDIATE",
        description: {
          en: "Designing robust, scalable, and high-performance system architectures for complex applications.",
          hi: "जटिल अनुप्रयोगों के लिए मजबूत और उच्च-प्रदर्शन प्रणाली वास्तुकला डिजाइन करना।",
        },
      },
      {
        name: "Full Stack Development",
        level: "EXPERT",
        description: {
          en: "Engineering scalable web architectures from pixel-perfect frontends to robust databases.",
          hi: "फ्रंटएंड से लेकर डेटाबेस तक स्केलेबल वेब आर्किटेक्चर का निर्माण करना।",
        },
      },
      {
        name: "System Analysis",
        level: "ADVANCED",
        description: {
          en: "Translating complex stakeholder requirements into efficient and scalable technical blueprints.",
          hi: "जटिल आवश्यकताओं को कुशल तकनीकी ब्लूप्रिंट में अनुवाद करना।",
        },
      },
      {
        name: "SDLC",
        level: "INTERMEDIATE",
        description: {
          en: "Governing the entire life cycle of software development with a focus on quality and agility.",
          hi: "गुणवत्ता पर ध्यान केंद्रित करते हुए सॉफ्टवेयर विकास के पूरे जीवन चक्र का संचालन।",
        },
      },
      {
        name: "Software Design",
        level: "ADVANCED",
        description: {
          en: "Applying architectural patterns and principles to build maintainable and modular systems.",
          hi: "रखरखाव योग्य और मॉड्यूलर सिस्टम बनाने के लिए वास्तुकला पैटर्न लागू करना।",
        },
      },
      {
        name: "Requirement Specifications",
        level: "ADVANCED",
        description: {
          en: "Defining clear, precise, and actionable technical documentation for engineering teams.",
          hi: "इंजीनियरिंग टीमों के लिए स्पष्ट और सटीक तकनीकी दस्तावेज परिभाषित करना।",
        },
      },
    ],
  },
  {
    category: {
      en: "AI & MACHINE LEARNING",
      hi: "एआई और मशीन लर्निंग",
    },
    skills: [
      {
        name: "AI Agents & Autonomy",
        level: "BEGINNER",
        description: {
          en: "Designing autonomous systems with recursive reasoning and decision-making capabilities.",
          hi: "स्वायत्त प्रणालियों और निर्णय लेने की क्षमताओं को डिजाइन करना।",
        },
      },
      {
        name: "Large Language Models (LLM)",
        level: "INTERMEDIATE",
        description: {
          en: "Expertise in fine-tuning open-source models, RAG architectures, and complex prompt engineering.",
          hi: "ओपन-सोर्स मॉडल फाइन-ट्यूनिंग और RAG आर्किटेक्चर में विशेषज्ञता।",
        },
      },
      {
        name: "Data Science",
        level: "EXPERT",
        description: {
          en: "Advanced statistical analysis and predictive modeling to extract actionable insights from big data.",
          hi: "बिग डेटा से कार्रवाई योग्य जानकारी निकालने के लिए उन्नत सांख्यिकीय विश्लेषण।",
        },
      },
      {
        name: "Deep Learning (CV/NLP)",
        level: "ADVANCED",
        description: {
          en: "Architecting deep neural networks for complex computer vision and natural language tasks.",
          hi: "कंप्यूटर विजन और प्राकृतिक भाषा कार्यों के लिए न्यूरल नेटवर्क का निर्माण।",
        },
      },
      {
        name: "Computer Vision",
        level: "INTERMEDIATE",
        description: {
          en: "Developing real-time object detection, pattern recognition, and spatial analysis systems.",
          hi: "वास्तविक समय ऑब्जेक्ट डिटेक्शन और पैटर्न मान्यता प्रणालियों का विकास।",
        },
      },
      {
        name: "Machine Learning Ops",
        level: "ADVANCED",
        description: {
          en: "Implementing robust pipelines for model training, deployment, and performance monitoring.",
          hi: "मॉडल प्रशिक्षण, परिनियोजन और निगरानी के लिए पाइपलाइनों का कार्यान्वयन।",
        },
      },
    ],
  },
  {
    category: {
      en: "DEVOPS & INFRASTRUCTURE",
      hi: "डेवऑप्स और इंफ्रास्ट्रक्चर",
    },
    skills: [
      {
        name: "DevOps",
        level: "ADVANCED",
        description: {
          en: "Streamlining development workflows, CI/CD automation, and cloud infrastructure management.",
          hi: "विकास वर्कफ़्लो, CI/CD स्वचालन और क्लाउड इंफ्रास्ट्रक्चर प्रबंधन को सुव्यवस्थित करना।",
        },
      },
      {
        name: "Docker & Kubernetes",
        level: "INTERMEDIATE",
        description: {
          en: "Containerizing microservices and orchestrating multi-node cloud deployments.",
          hi: "माइक्रोसर्विस कंटेनरीकरण और मल्टी-नोड क्लाउड परिनियोजन आर्केस्ट्रेशन।",
        },
      },
    ],
  },
];

export const SOFT_SKILLS_DATA: SoftSkillItem[] = [
  {
    name: "Leadership",
    description: {
      en: "Leading teams and managing complex projects",
      hi: "टीमों का नेतृत्व और जटिल परियोजनाओं का प्रबंधन",
    },
  },
  {
    name: "Critical Thinking",
    description: {
      en: "Analytical approach to complex problems",
      hi: "जटिल समस्याओं के प्रति विश्लेषणात्मक दृष्टिकोण",
    },
  },
  {
    name: "Public Speaking",
    description: {
      en: "Workshop facilitation and presentations",
      hi: "कार्यशाला सुविधा और प्रस्तुतियाँ",
    },
  },
  {
    name: "Teamwork",
    description: {
      en: "Collaborative work in diverse teams",
      hi: "विविध टीमों में सहयोगात्मक कार्य",
    },
  },
  {
    name: "Communication",
    description: {
      en: "Clear technical and stakeholder communication",
      hi: "स्पष्ट तकनीकी और हितधारक संचार",
    },
  },
  {
    name: "Problem Solving",
    description: {
      en: "Innovative solutions for real-world issues",
      hi: "वास्तविक दुनिया के मुद्दों के लिए नवीन समाधान",
    },
  },
  {
    name: "Adaptability",
    description: {
      en: "Thriving in changing environments and learning quickly",
      hi: "बदलते परिवेश में तेजी से सीखना और आगे बढ़ना",
    },
  },
  {
    name: "Public Relations",
    description: {
      en: "Brand visibility and community engagement",
      hi: "ब्रांड दृश्यता और समुदाय सहभागिता",
    },
  },
  {
    name: "Entrepreneurship",
    description: {
      en: "Visionary approach to value creation",
      hi: "मूल्य निर्माण के लिए दूरदर्शी दृष्टिकोण",
    },
  },
  {
    name: "Event Management",
    description: {
      en: "Planning and executing successful events",
      hi: "सफल आयोजनों की योजना और निष्पादन",
    },
  },
  {
    name: "Research Skills",
    description: {
      en: "In-depth analysis and academic contribution",
      hi: "गहन विश्लेषण और शैक्षणिक योगदान",
    },
  },
  {
    name: "Mentorship",
    description: {
      en: "Guiding and developing talent",
      hi: "प्रतिभा का मार्गदर्शन और विकास",
    },
  },
];

export interface SkillItem {
  name: string;
  icon?: string;
  color?: string;
}

export interface SkillCategoryGroup {
  title: {
    en: string;
    hi: string;
  };
  type: "icon" | "badge" | "plain";
  items: SkillItem[];
}

export const SKILL_GROUPS: SkillCategoryGroup[] = [
  {
    title: {
      en: "Tech Stack",
      hi: "टेक स्टैक",
    },
    type: "icon",
    items: TECH_STACK_ITEMS.slice(0, 10),
  },
  {
    title: {
      en: "Tools",
      hi: "टूल्स",
    },
    type: "icon",
    items: TOOLS_ITEMS.slice(0, 6),
  },
  {
    title: {
      en: "Hard Skills",
      hi: "हार्ड स्किल्स",
    },
    type: "badge",
    items: [
      { name: "Full Stack Development", color: "border-green-500/50 ring-green-500/20" },
      { name: "AI/ML Applications", color: "border-blue-500/50 ring-blue-500/20" },
      { name: "System Architecture", color: "border-amber-500/50 ring-amber-500/20" },
      { name: "Database Design", color: "border-purple-500/50 ring-purple-500/20" },
      { name: "API Development", color: "border-cyan-500/50 ring-cyan-500/20" },
    ],
  },
  {
    title: {
      en: "Soft Skills",
      hi: "सॉफ्ट स्किल्स",
    },
    type: "plain",
    items: SOFT_SKILLS_DATA.slice(0, 5).map((s) => ({ name: s.name })),
  },
];

export interface GalleryItem {
  id: string;
  title: {
    en: string;
    hi: string;
  };
  category: {
    en: string;
    hi: string;
  };
  imageUrl: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: {
      en: "Shaastra 2026 IIT Madras Fullstack Workshop",
      hi: "शास्त्र 2026 आईआईटी मद्रास फुलस्टैक वर्कशॉप",
    },
    category: {
      en: "Workshop & Event",
      hi: "कार्यशाला और कार्यक्रम",
    },
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g2",
    title: {
      en: "BodhAI Learning Practice Platform Launch",
      hi: "बोधएआई लर्निंग प्रैक्टिस प्लेटफॉर्म लॉन्च",
    },
    category: {
      en: "Project Launch",
      hi: "प्रोजेक्ट लॉन्च",
    },
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g3",
    title: {
      en: "GLA University Technical Hackathon",
      hi: "जीएलए यूनिवर्सिटी टेक्निकल हैकाथॉन",
    },
    category: {
      en: "Hackathon",
      hi: "हैकाथॉन",
    },
    imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
  },
];

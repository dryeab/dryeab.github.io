const cv = {
  name: "Yeabsira Driba",
  contact: {
    email: "dryeab@gmail.com",
    location: "Addis Ababa, Ethiopia",
    githubUsername: "dryeab",
    linkedinUsername: "dryeab",
    leetcodeUsername: "dryeab",
    xUsername: "dryeab",
  },
  education: [
    {
      title: "BSc in Software Engineering, Addis Ababa University",
      url: "https://www.aau.edu.et/",
      period: "09/2015 – 07/2020",
      details: [
        {
          text: "One of the leading Universities in Africa",
          url: "https://www.usnews.com/education/best-global-universities/addis-ababa-university-529036",
        },
        "GPA: 3.71 / 4.0",
      ],
    },
  ],
  training: [
    {
      title: "Introduction to Competitive Programming, A2SV",
      url: "https://www.a2sv.org/",
      period: "12/2019 – 12/2020",
      details: [
        "Intensive competitive programming track",
        "Cohort: 70% (31/44) pass rate at Google SWE interviews",
      ],
    },
  ],
  experience: [
    {
      role: "Senior Python Engineer, Turing",
      period: "06/2024 – 04/2026",
      url: "https://www.turing.com/",
      bullets: [
        "Enhanced a state-of-the-art AI model's performance in Python, identifying and resolving over 100 critical flaws to improve trajectory and reliability.",
        "Utilized advanced debugging and optimization techniques to refine outputs and align with project goals.",
        "Collaborated with cross-functional teams to scale and advance AI model capabilities.",
      ],
    },
    {
      role: "Frontend Developer, Stead Tech Inc",
      period: "01/2023 – 05/2024",
      url: "https://impactcareers.com/",
      bullets: [
        "Led the frontend development for Impact AI, a dynamic job search portal, using React and Tailwind CSS.",
        "Developed user-facing features for job exploration and seamless resume creation within the platform.",
        "Reduced testing time by 25% with automated unit and integration tests.",
      ],
    },
    {
      role: "Head of Education & Full Stack Developer, A2SV",
      period: "08/2021 – 12/2022",
      url: "https://a2sv.org/",
      bullets: [
        "Mentored over 50 students in software development, and data structures and algorithms.",
        "Developed the Atrons platform using Express.js and Vue.js, enabling students to share and search study materials.",
        "Implemented features such as uploading, searching, and filtering books, videos, and quizzes by department, year, and course.",
        "Attracted over 500 active users, improving study resource access for students.",
      ],
    },
    {
      role: "Backend Developer, Eskalate LLC",
      period: "08/2020 – 07/2021",
      url: "https://www.eskalate.io/",
      bullets: [
        "Designed and developed the backend for the Community Portal, automating the manual admission process of the company with ASP.NET Core and PostgreSQL.",
        "Implemented key functionalities such as scraping candidate assessment data from external platforms, scheduling interviews, managing applications, and designing the database schema.",
        "Supported a user base of over 3,000, streamlining the admissions process.",
      ],
    },
  ],
  projects: [
    {
      name: "mcp-telegram",
      url: "https://github.com/dryeab/mcp-telegram",
      tags: ["Model Context Protocol", "Telegram API", "Python", "uv"],
      command: "uv tool install mcp-telegram",
      bullets: ["Connect Large Language Models to Telegram via the Model Context Protocol (MCP)."],
    },
    {
      name: "VAIS (Voice-assisted Agricultural Information System)",
      tags: ["LSTM", "Transformers", "NLP", "Python"],
      bullets: [
        "Developed and enhanced Amharic language model using LSTM and fine-tuned transformers.",
        "Improved the performance of agricultural chatbot to facilitate better communication with Amharic-speaking farmers.",
        "Collaborated with a team of five to achieve project goals.",
      ],
    },
  ],
  skills: {
    softSkills: ["Communication", "Leadership", "Teamwork", "Teaching"],
    groups: [
      {
        label: "Languages",
        items: ["Python", "JavaScript", "C", "C++", "C#", "Java", "Go", "Rust"],
      },
      {
        label: "Frontend",
        items: ["React/Next", "VueJS", "NuxtJS", "Tailwind CSS", "Bootstrap"],
      },
      {
        label: "Backend",
        items: [
          "Express",
          "NestJS",
          "Django",
          "Flask",
          "FastAPI",
          "ASP.NET Core",
          "SQL",
          "MongoDB",
        ],
      },
      {
        label: "AI / ML",
        items: [
          "PyTorch",
          "TensorFlow",
          "Scikit-learn",
          "Pandas",
          "NumPy",
          "spaCy",
          "NLTK",
          "OpenCV",
          "Matplotlib",
        ],
      },
      {
        label: "Tools",
        items: ["Docker", "Linux", "Git", "Selenium", "Beautifulsoup"],
      },
    ],
  },
  awards: [
    {
      title: "LeetCode Guardian",
      details: ["Top 0.5% globally · 2290+ rating · 800+ problems solved"],
      url: "https://leetcode.com/u/dryeab/",
    },
    {
      title: "Second Place, EtCPC",
      details: ["Ethiopian Collegiate Programming Contest"],
      period: "2023",
      url: "https://drive.google.com/file/d/1JxYQuRKIMc82NI7V_Vs6LjMhg59_eL0f/view?usp=sharing",
    },
    {
      title: "AddisCoder Teaching Assistant",
      details: ["Intensive algorithms course for high schoolers"],
      period: "2023",
      url: "https://drive.google.com/file/d/1-0WZPN4GzDiOn8Ucp209D0hIQGEYmyEs/view?usp=sharing",
    },
    {
      title: "Best Research Project",
      details: ["Agricultural NLP model development, Addis Ababa University"],
      period: "2020",
    },
  ],
};

export default cv;

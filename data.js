const main = {
  name: 'José Costa',
  img: './imgs/profile.jpeg',
  role: ['Developer'],
  aboutShort: 'Computer Engineering master’s student and developer focused on building practical software, from AI-powered products and data pipelines to backend systems and educational technology.',
  aboutLong: [
    'I am a Computer Engineering master’s student at the University of Porto with hands-on experience across AI product development, backend engineering, and technical education. I enjoy building systems that are useful in practice, especially when they combine solid engineering with clear user impact.',
    'My recent work has involved semantic search, LLM-powered experiences, web data pipelines, and backend platforms, while my teaching work has kept me close to robotics, game development, and mentoring. Outside of work and university, I have also taken on leadership responsibilities in community and event organization.'
  ],
  timelineSections: [
    {
      title: 'Experience',
      items: [
        {
          period: '2025 - Present',
          title: 'AI Developer / R&D',
          organization: 'BAI Digital / Smark.io',
          current: true,
          description: 'Working on AI-driven search and data products for real-estate workflows.',
          points: [
            'Built a dynamic search engine using vector embeddings and LLMs.',
            'Engineered pipelines to extract, normalize, and enrich large volumes of real-estate data.',
            'Implemented hybrid search that combines structured filtering with semantic intent understanding.',
            'Defined an LLM-powered chatbot flow that converts natural language into structured queries.'
          ]
        },
        {
          period: '2025 - Current',
          title: 'Teacher',
          organization: 'SharkCoders',
          current: true,
          description: 'Teaching robotics and game development in a hands-on learning environment.',
          points: [
            'Teaching Arduino, Raspberry Pi, and basic electronics.',
            'Supporting game development with Lua, Defold, GDScript, Python, and introductory 3D modeling.'
          ]
        },
        {
          period: '2025',
          title: 'Backend Developer',
          organization: 'MedTiles / FEUP Partnership',
          description: 'Contributed to an AI-powered educational content generator in an academic-industry collaboration.',
          points: [
            'Worked primarily on backend development with occasional frontend support.',
            'Used Node.js, React, Next.js, MongoDB, PostgreSQL, and third-party AI APIs.'
          ]
        },
        {
          period: '2023',
          title: 'Software Engineering Intern',
          organization: 'Namecheap, Inc.',
          description: 'Developed backend services for internal business systems.',
          points: [
            'Built a RESTful API for back-office use and app integration.',
            'Worked on data processing, database integration, secure queries, and structured JSON responses.',
            'Focused on performance, maintainability, and clean service design with .NET Core and SQL Server.'
          ]
        }
      ]
    },
    {
      title: 'Education',
      items: [
        {
          period: '2024 - 2026',
          title: 'Master’s in Computer Engineering',
          organization: 'University of Porto',
          description: 'Currently deepening my technical background through advanced study and applied projects.'
        },
        {
          period: '2020 - 2024',
          title: 'Bachelor’s in Computer Engineering',
          organization: 'University of Porto',
          description: 'Built a strong foundation in software engineering, systems, and problem solving.'
        }
      ]
    },
    {
      title: 'Community Involvement',
      items: [
        {
          period: '2020 - 2025',
          title: 'Vice-President',
          organization: 'Lordelo Aventura',
          organizationLinks: [
            {
              name: 'Instagram',
              iconName: 'logo-instagram',
              link: 'https://www.instagram.com/lordeloaventura/'
            }
          ],
          description: 'Led planning and execution for community and sporting events.',
          points: [
            'Helped organize the Passeio Aventura motocross event.',
            'Supported the management of the National Trial Championship across the 2023, 2024, and 2025 seasons.'
          ]
        }
      ]
    }
  ],
  // Refer https://ionicons.com/ and put the icon name inside iconName key
  connects: [
    {
      name: 'Github',
      iconName: 'logo-github',
      link: 'https://github.com/JaySuave'
    },
    {
      name: 'Linkedin',
      iconName: 'logo-linkedin',
      link: 'https://www.linkedin.com/in/jose-costa27/'
    },
    {
      name: 'Email',
      iconName: 'mail-outline',
      link: 'mailto:omelhor.ze@gmail.com?Subject=Hello'
    },
    {
      name: 'WhatsApp',
      iconName: 'logo-whatsapp',
      link: 'https://wa.me/351916526767'
    },
    {
      name: 'Chess.com',
      iconImg: './imgs/chess.svg',
      link: 'https://www.chess.com/'
    }
  ],
  links: [
    { name: 'Projects', link: '#projects' },
    { name: 'About Me', link: '#about' },
    { name: 'Contacts', link: '#contacts' }
  ],
  contacts: [
    {
      label: 'Email',
      value: 'omelhor.ze@gmail.com',
      link: 'mailto:omelhor.ze@gmail.com?Subject=Hello'
    },
    {
      label: 'GitHub',
      value: 'github.com/JaySuave',
      link: 'https://github.com/JaySuave'
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/jose-costa27',
      link: 'https://www.linkedin.com/in/jose-costa27/'
    },
    {
      label: 'WhatsApp',
      value: '+351 916 526 767',
      link: 'https://wa.me/351916526767'
    }
  ],
  projects: [
    {
      name: "ToMatch - AI-Powered Search Engine",
      description: "ToMatch was developed in the context of a challenge proposed by my supervisor at BAI Digital: a natural language query such as “I like to plant tomatoes” should be understood not literally, but as a search for homes with practical attributes like a garden or large balcony, good sun exposure, and other relevant conditions.\n\nThe solution combines an intelligent ingestion system, which enriches property data extracted, via scraping, from Imovirtual.com and the Idealista API, with a conversational real-estate search engine that uses LLMs, structured filters, and semantic search to understand user intent and deliver relevant results. It supports multi-turn refinement, hard filters such as budget, location, and property type, semantic matching for subjective preferences, ranked property results, readable summaries of active criteria and listing data enrichment through thumbnails.",
      stack: ["TypeScript", "Node.js", "Express", "PostgreSql (pgvector)", "OpenAI API"],
      media: [
        {
          type: "video",
          src: "./media/tomatch-ai-powered-search-engine/tomatch-demo.mp4",
          poster: "./media/tomatch-ai-powered-search-engine/tomatch-demo.webp",
          speed: 1.5,
          alt: "tomatch-demo",
          loop: true
        }
      ]
    },
    {
      name: "Java-- Compiler",
      description: "Java-- compiler developed for FEUP Compilers, with Java implementation work around parsing, code generation, and low-level compiler tooling.",
      stack: ["Java", "ANTLR", "Jasmin", "Shell"],
      repo: "https://github.com/JaySuave/Java--Compiler"
    },
    {
      name: "Cogito Game",
      description: "Puzzle game built in Python and Pygame with player controls plus AI solvers using BFS, DFS, iterative deepening, uniform-cost search, greedy search, and A*.",
      stack: ["Python", "Pygame", "Search Algorithms", "A*"],
      repo: "https://github.com/JaySuave/IA-Proj"
    },
    {
      name: "PRI24-25",
      description: "Information processing and retrieval project focused on Python-based search and retrieval workflows, with supporting web and build assets.",
      stack: ["Python", "Makefile", "HTML", "CSS"],
      repo: "https://github.com/JaySuave/PRI24-25"
    },
    {
      name: "Tetris",
      description: "Terminal-style Tetris game in Java using Lanterna, built with MVC structure, gameplay states, collision detection, difficulty controls, and tests.",
      stack: ["Java", "Groovy", "Lanterna", "JUnit"],
      repo: "https://github.com/JaySuave/Tetris"
    },
    {
      name: "Claustro",
      description: "Text-based implementation of the Claustro abstract board game, including board generation, move validation, capture rules, and computer players.",
      stack: ["Prolog", "SICStus Prolog", "Game AI"],
      repo: "https://github.com/JaySuave/PFL-TP1"
    },
    {
      name: "Transpiler",
      description: "Source-to-source compiler and low-level assembler written in Haskell, with lexer, parser, AST construction, and stack-machine execution.",
      stack: ["Haskell", "Parser", "Compiler", "Assembler"],
      repo: "https://github.com/JaySuave/PFL-TP2"
    },
    {
      name: "DA_PROJ",
      description: "Algorithm design project centered on graph structures and C++ problem solving, with generated documentation and CMake build setup.",
      stack: ["C++", "CMake", "HTML", "TeX"],
      repo: "https://github.com/JaySuave/DA_PROJ"
    },
    {
      name: "RCOM24-25",
      description: "Computer networks project implementing a serial port protocol with link-layer and application-layer logic, virtual cable testing, and file transfer checks.",
      stack: ["C", "Makefile", "Serial Protocols"],
      repo: "https://github.com/JaySuave/RCOM24-25"
    },
    {
      name: "PROJECT_PROG",
      description: "Image processing project for representing and manipulating RGB images with 8-bit channels, built with C and C++ components.",
      stack: ["C", "C++", "Makefile"],
      repo: "https://github.com/JaySuave/PROJECT_PROG"
    },
    {
      name: "Personal Portfolio",
      description: "This personal website, built as a lightweight static portfolio with project, about, timeline, and contact sections.",
      stack: ["JavaScript", "HTML", "CSS"],
      repo: "https://github.com/JaySuave/JaySuave.github.io"
    }
  ]
};

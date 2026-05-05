const main = {
  name: 'José Costa',
  img: './imgs/profile.jpeg',
  role: ['Developer'],
  aboutShort: 'Computer Engineering master’s student and developer focused on building practical software, from AI-powered products and data pipelines to backend systems and educational technology.',
  aboutLong: [
    'I am a Computer Engineering master’s student at the University of Porto with hands-on experience across AI product development, backend engineering and technical education. I enjoy building systems that are useful in practice, especially when they combine solid engineering with clear user impact.',
    'My recent work has involved semantic search, LLM-powered experiences, web data pipelines and backend platforms, while my teaching work has kept me close to robotics, game development and mentoring. Outside of work and university, I have also taken on leadership responsibilities in community and event organization.'
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
            'Engineered pipelines to extract, normalize and enrich large volumes of real-estate data.',
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
            'Teaching Arduino, Raspberry Pi and basic electronics.',
            'Supporting game development with Lua, Defold, GDScript, Python and introductory 3D modeling.'
          ]
        },
        {
          period: '2025',
          title: 'Backend Developer',
          organization: 'MedTiles / FEUP Partnership',
          description: 'Contributed to an AI-powered educational content generator in an academic-industry collaboration.',
          points: [
            'Worked primarily on backend development with occasional frontend support.',
            'Used Node.js, React, Next.js, MongoDB, PostgreSQL and third-party AI APIs.'
          ]
        },
        {
          period: '2023',
          title: 'Software Engineering Intern',
          organization: 'Namecheap, Inc.',
          description: 'Developed backend services for internal business systems.',
          points: [
            'Built a RESTful API for back-office use and app integration.',
            'Worked on data processing, database integration, secure queries and structured JSON responses.',
            'Focused on performance, maintainability and clean service design with .NET Core and SQL Server.'
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
          description: 'Built a strong foundation in software engineering, systems and problem solving.'
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
            'Supported the management of the National Trial Championship across the 2023, 2024 and 2025 seasons.'
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
      description: "ToMatch was developed in the context of a challenge proposed by my supervisor at BAI Digital: a natural language query such as “I like to plant tomatoes” should be understood not literally, but as a search for homes with practical attributes like a garden or large balcony, good sun exposure and other relevant conditions.\n\nThe solution combines an intelligent ingestion system, which enriches property data extracted, via scraping, from Imovirtual.com and the Idealista API, with a conversational real-estate search engine that uses LLMs, structured filters and semantic search to understand user intent and deliver relevant results. It supports multi-turn refinement, hard filters such as budget, location and property type, semantic matching for subjective preferences, ranked property results, readable summaries of active criteria and listing data enrichment through thumbnails.",
      stack: ["TypeScript", "Node.js", "Express", "PostgreSql (pgvector)", "OpenAI API"],
      media: [
        {
          type: "video",
          src: "./media/tomatch-ai-powered-search-engine/tomatch-demo.mp4",
          poster: "./media/tomatch-ai-powered-search-engine/tomatch-demo.webp",
          speed: 2,
          alt: "tomatch-demo",
          loop: true
        }
      ]
    },
    {
      name: "KeyBlitz - Digital Key Online Marketplace",
      description: "KeyBlitz is an online marketplace for digital game keys, built as a full-stack Laravel application. It supports buyer, seller and admin workflows, including game browsing, cart and checkout, purchased key management, seller listings, reviews, wishlists, notifications, abuse reporting and administrative moderation.\n\nThe application uses PostgreSQL for structured marketplace data and transactional logic, Laravel for backend routing, authentication, controllers and Blade views and Bootstrap/CSS/JavaScript for the responsive frontend. The project is containerized with Docker for easier local setup and deployment.",
      stack: ["Laravel", "PostgreSQL", "Vite", "Docker", "Blade", "Git / Gitlab", "OpenAPI"],
      repo: "https://github.com/JaySuave/LBAW-25-26-KeyBlitz",
      media: [
        {
          type: "image",
          src: "./media/keyblitz-digital-key-online-marketplace/lbaw1.webp",
          alt: "lbaw1"
        },
        {
          type: "video",
          src: "./media/keyblitz-digital-key-online-marketplace/lbaw-video.mp4",
          poster: "./media/keyblitz-digital-key-online-marketplace/lbaw-video.webp",
          speed: 3,
          alt: "lbaw-video",
          loop: true
        }
      ]
    },
    {
      name: "Java-- Compiler",
      description: "Java-- Compiler is a Java-based compiler for Java-- / JMM, a Java-like subset language. It implements the full compilation pipeline: ANTLR parsing, AST construction, semantic analysis, OLLIR intermediate code generation, optimization passes and Jasmin/JVM backend generation.\n\nThe compiler supports core Java-like features such as imports, classes, methods, variables, arrays, conditionals, loops, arithmetic and boolean expressions, object creation, method calls and return statements. Before code generation, it performs semantic validation using a symbol table to catch issues such as invalid variable usage, type errors, incorrect assignments and invalid method calls.\n\nAfter validation, the compiler lowers the program into typed OLLIR code, applies optimizations such as constant folding and constant propagation and emits Jasmin code targeting the JVM.",
      stack: ["Java", "ANTLR", "Jasmin", "JUnit", "Gradle"],
      repo: "https://github.com/JaySuave/Java--Compiler",
      media: [
        {
          type: "image",
          src: "./media/java-compiler/hmm-input.webp",
          alt: "jmm-input"
        },
        {
          type: "image",
          src: "./media/java-compiler/jmm-ast.webp",
          alt: "jmm-ast"
        },
        {
          type: "image",
          src: "./media/java-compiler/jmm-ollir.webp",
          alt: "jmm-ollir"
        },
        {
          type: "image",
          src: "./media/java-compiler/jmm-jasmin.webp",
          alt: "hmm-jasmin"
        },
        {
          type: "image",
          src: "./media/java-compiler/optimized-input.webp",
          alt: "optimized-input"
        },
        {
          type: "image",
          src: "./media/java-compiler/optimized-vs-nooptimized.webp",
          alt: "optimized-vs-nooptimized"
        }
      ]
    },
    {
      name: "SGI Project - ThreeJS Scenes",
      description: "Three.js computer graphics project featuring custom 3D scenes, a JSON scene graph renderer and an interactive hot-air-balloon racing game. It includes textured environments, lighting, cameras, shaders, animations, obstacles, power-ups, HUD systems and end-game visual effects.",
      stack: ["JavaScript", "Three.js", "WebGL", "HTML", "CSS", "JSON", "GLSL"],
      repo: "https://github.com/JaySuave/sgi-project",
      media: [
        {
          type: "image",
          src: "./media/sgi-project-threejs-scenes/sgi-1.webp",
          alt: "Dune Drifters hot-air-balloon racing scene"
        },
        {
          type: "image",
          src: "./media/sgi-project-threejs-scenes/sgi-2.webp",
          alt: "Porto scene rendered with the JSON scene graph"
        },
        {
          type: "image",
          src: "./media/sgi-project-threejs-scenes/sgi-3.webp",
          alt: "Three.js festive night scene"
        }
      ]
    },
    {
      name: "AI Cogito Game",
      description: "Pygame puzzle game inspired by Cogito, featuring manual gameplay and an AI solver capable of solving board configurations using BFS, DFS, Iterative Deepening, Uniform Cost Search, Greedy Search and A*. Implemented state generation, board hashing, move-history tracking and heuristic evaluation with Manhattan Distance and Out-of-Place Cells to compare informed and uninformed search strategies.",
      stack: ["Python", "Pygame", "Search Algorithms"],
      repo: "https://github.com/JaySuave/IA-Proj",
      media: [
        {
          type: "image",
          src: "./media/ai-cogito-game/cogito.webp",
          alt: "cogito"
        },
        {
          type: "image",
          src: "./media/ai-cogito-game/cogito-menu.webp",
          alt: "cogito-menu"
        },
        {
          type: "video",
          src: "./media/ai-cogito-game/cogito-gameplay.mp4",
          poster: "./media/ai-cogito-game/cogito-gameplay.webp",
          speed: 2,
          alt: "gameplay",
          loop: true
        },
        {
          type: "video",
          src: "./media/ai-cogito-game/cogito-a-manhattan.mp4",
          poster: "./media/ai-cogito-game/cogito-a-manhattan.webp",
          speed: 1.5,
          alt: "a*-manhattan",
          loop: true
        },
        {
          type: "video",
          src: "./media/ai-cogito-game/cogito-greedy-out-of-place.mp4",
          poster: "./media/ai-cogito-game/cogito-greedy-out-of-place.webp",
          speed: 2,
          alt: "greedy-out-of-place",
          loop: true
        },
        {
          type: "image",
          src: "./media/ai-cogito-game/cogito-fast-greedy.webp",
          alt: "cogito-fast-greedy"
        }
      ]
    },
    {
      name: "Mobile Apps Information Retrieval",
      description: "Built an end-to-end search engine for Google Play apps using Apache Solr, Flask and semantic embeddings. The system processes app metadata and reviews, supports lexical and vector-based retrieval, applies query preprocessing and field boosting and evaluates ranking quality with TREC-style IR metrics.",
      stack: ["Apache Solr", "Docker", "SentenceTransformers", "spaCy", "NLTK", "BeautifulSoup"],
      repo: "https://github.com/JaySuave/PRI24-25",
      media: [
        {
          type: "video",
          src: "./media/pri24-25/search-engine-video.mp4",
          poster: "./media/pri24-25/search-engine-video.webp",
          speed: 3,
          alt: "search-engine-video",
          loop: true
        }
      ]
    },
    {
      name: "Java Tetris",
      description: "A terminal-based Tetris game built in Java using Gradle and the Lanterna text UI library. The project recreates the core Tetris gameplay loop, including random piece generation, movement, rotation, collision detection, line clearing, scoring, game-over handling and difficulty controls.\n\nThe codebase follows an MVC architecture, separating game state, rendering and input handling. It also applies design patterns such as State for piece behavior and Command for difficulty changes, making the implementation easier to extend and test.",
      stack: ["Java", "Groovy", "Lanterna", "JUnit", "Spock"],
      repo: "https://github.com/JaySuave/Tetris",
      media: [
        {
          type: "image",
          src: "./media/java-tetris/tetris-play.webp",
          alt: "tetris play"
        },
        {
          type: "video",
          src: "./media/java-tetris/tetris-gameplay.mp4",
          poster: "./media/java-tetris/tetris-gameplay.webp",
          speed: 3,
          alt: "tetris-gameplay",
          loop: true
        }
      ]
    },
    {
      name: "Prolog Claustro",
      description: "Claustro is a text-based implementation of the abstract board game Claustro, developed in Prolog. The project models the full game loop, including dynamic board generation, turn handling, move validation, captures, win detection and terminal-based board visualization.\n\nThe game supports multiple play modes, including Human vs Human, Human vs Computer, Computer vs Human and Computer vs Computer. It also includes two AI difficulty levels: a random-move bot and a greedy bot that evaluates moves based on pawn distance to the objective. The implementation emphasizes declarative logic programming, recursive board processing, game-state representation and rule-based decision making.",
      stack: ["Prolog", "SICStus Prolog", "Game AI"],
      repo: "https://github.com/JaySuave/PFL-TP1",
      media: [
        {
          type: "image",
          src: "./media/prolog-claustro/initial-state.webp",
          alt: "initial-state"
        },
        {
          type: "image",
          src: "./media/prolog-claustro/intermediate-state.webp",
          alt: "intermediate-state"
        },
        {
          type: "image",
          src: "./media/prolog-claustro/final-state.webp",
          alt: "final-state"
        }
      ]
    },
    {
      name: "Haskell Compiller",
      description: "A Haskell-based mini compiler and stack-machine interpreter developed for FEUP’s Functional and Logic Programming course. The project implements a complete pipeline for a small imperative language: lexical analysis, parsing into an abstract syntax tree, compilation into low-level stack-machine instructions and execution through a custom interpreter.\n\nThe language supports integer arithmetic, boolean expressions, variable assignment, conditional branching, while loops, nested blocks and runtime error handling. The implementation highlights functional programming techniques such as algebraic data types, pattern matching, recursion and basic compiler design.",
      stack: ["Haskell", "Parser", "Compiler", "Assembler"],
      repo: "https://github.com/JaySuave/PFL-TP2",
      media: [
        {
          type: "image",
          src: "./media/haskell-compiller/haskell-compiller-1.webp",
          alt: "Haskell-compiller-1"
        },
        {
          type: "image",
          src: "./media/haskell-compiller/haskell2.webp",
          alt: "haskell2"
        },
        {
          type: "image",
          src: "./media/haskell-compiller/haskell3.webp",
          alt: "haskell3"
        }
      ]
    },
    {
      name: "C++ TSP Route Planner",
      description: "C++ command-line application for solving delivery route optimization problems using graph algorithms. The project models shipping networks as weighted graphs and compares multiple Traveling Salesman Problem approaches, including exact backtracking, nearest-neighbour heuristics, MST-based triangular approximation and shortest-path support with Dijkstra for real-world graphs.",
      stack: ["C++", "CMake", "Clang++", "Doxygen"],
      repo: "https://github.com/JaySuave/DA_PROJ",
      media: [
        {
          type: "image",
          src: "./media/da-proj/captura-de-ecr-2026-05-05-s-23-37-29.webp",
          alt: "tsp1"
        },
        {
          type: "video",
          src: "./media/da-proj/tsp-video.mp4",
          poster: "./media/da-proj/tsp-video.webp",
          speed: 3,
          alt: "tsp-video",
          loop: true
        }
      ]
    },
    {
      name: "C-based Serial Port File Transfer",
      description: "A C-based serial port file transfer application built for a computer networks course. The project implements a custom data link layer protocol that allows files to be sent between a transmitter and receiver over virtual serial ports, with connection setup, frame sequencing, error detection, acknowledgements, retransmissions and graceful connection closing.",
      stack: ["C", "Makefile", "POSIX", "Unix Serial Port I/O"],
      repo: "https://github.com/JaySuave/RCOM24-25",
      media: [
        {
          type: "image",
          src: "./media/c-based-serial-port-file-transfer/penguin.webp",
          alt: "penguin"
        }
      ]
    },
    {
      name: "C++ Image Processing",
      description: "A C++ image-processing tool that loads PNG and XPM2 images, applies scripted transformations and exports the processed results. The project implements core pixel-level operations including inversion, grayscale conversion, color replacement, region fill, cropping, mirroring, rotation, image composition and median filtering. It also includes a script runner and automated test suite that validates output images against expected results.",
      stack: ["C++", "Makefile"],
      repo: "https://github.com/JaySuave/PROJECT_PROG",
      media: [
        {
          type: "image",
          src: "./media/c-image-processing/prog2.webp",
          alt: "prog2"
        },
        {
          type: "image",
          src: "./media/c-image-processing/prog1.webp",
          alt: "prog1"
        }
      ]
    },
    {
      name: "Personal Portfolio",
      description: "This personal website, built as a lightweight static portfolio with project, about, timeline and contact sections.",
      stack: ["HTML", "CSS", "JavaScript"],
      repo: "https://github.com/JaySuave/JaySuave.github.io"
    }
  ]
};

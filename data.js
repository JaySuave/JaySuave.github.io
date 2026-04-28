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
          period: '2025 - 2026',
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
          organization: 'Industry Internship',
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
      name: 'Project One',
      description: 'A short summary of the problem this project solves and the result it delivers.',
      stack: ['HTML', 'CSS', 'JavaScript'],
      live: 'https://example.com',
      repo: 'https://github.com/your-username/project-one'
    },
    {
      name: 'Project Two',
      description: 'A second featured project with a concise explanation focused on impact and implementation.',
      stack: ['React', 'Tailwind', 'API'],
      live: 'https://example.com',
      repo: 'https://github.com/your-username/project-two'
    },
    {
      name: 'Project Three',
      description: 'Use this slot for another project you want recruiters or clients to notice first.',
      stack: ['Node.js', 'Express', 'MongoDB'],
      live: 'https://example.com',
      repo: 'https://github.com/your-username/project-three'
    },
    {
      name: 'Project Four',
      description: 'Add another project here for the full archive page when you want to show more than the featured three.',
      stack: ['Next.js', 'TypeScript', 'PostgreSQL'],
      live: 'https://example.com',
      repo: 'https://github.com/your-username/project-four'
    },
    {
      name: 'Project Five',
      description: 'Keep this list growing and the landing page will still stay focused on your top three pieces of work.',
      stack: ['Python', 'Flask', 'Docker'],
      live: 'https://example.com',
      repo: 'https://github.com/your-username/project-five'
    }
  ]
};

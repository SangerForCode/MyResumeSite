import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ChevronRight, 
  Code2, 
  Database, 
  FlaskConical, 
  TrendingUp,
  ExternalLink,
  Download,
  MapPin,
  Sparkles,
  Cpu,
  Heart,
  MessageSquare,
  Share2,
  MoreHorizontal
} from 'lucide-react';

/* --- GLOBAL CONSTANTS & DATA --- */
const PORTFOLIO_DATA = {
  personal: {
    name: "Ayush Sanger",
    role: "Web Developer & Data Scientist",
    tagline: "Bridging Chemistry, Math, and Code.",
    location: "Noida, UP / Goa, India",
    email: "sangerforbusiness@gmail.com",
    linkedin: "linkedin.com/in/ayushsanger",
    github: "github.com/SangerForCode",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" // Placeholder
  },
  experience: [
    {
      company: "BITS Goa Sports Club (BGSC)",
      roles: [
        { title: "Chief Coordinator", date: "Jun 2025 - Present", type: "Full-time" },
        { title: "Co-Founder", date: "Jun 2025 - Present", type: "Full-time" },
        { title: "Marketing Associate", date: "Oct 2023 - Aug 2024", type: "Full-time" }
      ],
      desc: "Spearheading sports culture at BITS Goa. Managed large-scale events like InterBITS 2025 (Runners-up). Overseeing a team of 50+ members, securing sponsorships, and driving digital growth (150k+ views on socials).",
      tech: ["Leadership", "Sports Management", "Marketing"]
    },
    {
      company: "BITS Student Store",
      roles: [
        { title: "Co-Founder", date: "Mar 2025 - Present", type: "Full-time" }
      ],
      desc: "Built and scaled the official campus resale platform (bits-pilani.store) to 7,000+ users across 3 campuses. Facilitated 1,600+ listings and sustainable peer-to-peer commerce.",
      tech: ["React", "Django", "Start-up Ventures"]
    },
    {
      company: "FitSoc - Fitness Society",
      roles: [
        { title: "Chief Coordinator", date: "Jun 2025 - Aug 2025", type: "Full-time" },
        { title: "Core Member", date: "Aug 2024 - Jun 2025", type: "Full-time" },
        { title: "Crew Member", date: "Nov 2023 - Dec 2024", type: "Part-time" }
      ],
      desc: "Promoting campus wellness. Organized Campus Morning Runs and non-league fitness events. Focused on inclusive fitness initiatives.",
      tech: ["Fitness", "Event Management"]
    },
    {
      company: "Samvardhan Greenfields",
      roles: [
        { title: "Web Development Intern", date: "May 2025 - Aug 2025", type: "Internship" }
      ],
      desc: "Revamped corporate website with modern stack. Handled content design & social media integration for brand building.",
      tech: ["Web Development", "Backend", "Figma"]
    },
    {
      company: "Student Organizations",
      roles: [
        { title: "Core Member - SoFI", date: "Aug 2024 - Jun 2025", type: "Finance" },
        { title: "Crew Member - IEEE", date: "Nov 2023 - Jun 2025", type: "Tech" },
        { title: "Crew Member - Wall Street Club", date: "Oct 2023 - Dec 2024", type: "Finance" }
      ],
      desc: "Active participation in Finance and Technical societies, developing skills in algorithmic trading, stock analysis, and electronics.",
      tech: ["Python", "AutoCAD", "Stock Analysis"]
    }
  ],
  projects: [
    {
      title: "BITS Student Store",
      tag: "Full Stack / Startup",
      desc: "Campus resale platform with 7k+ users. Solved the 'WhatsApp spam' issue for buying/selling. 300k+ requests handled.",
      tech: ["React", "Django", "Cloud"],
      span: "md:col-span-2"
    },
    {
      title: "Electrocatalysis ML Model",
      tag: "ML / Chemistry",
      desc: "Brute-force ML model evaluating 18-electron rule compliance to predict stable transition metal complexes.",
      tech: ["Python", "Scikit-learn", "Chemlib"],
      span: "md:col-span-1"
    },
    {
      title: "Algorithmic Trading Bots",
      tag: "FinTech",
      desc: "Quant finance trading bots for stock market analysis using Python and Algotest.",
      tech: ["Python", "Pandas", "Algotest"],
      span: "md:col-span-1"
    },
    {
      title: "BGSC Digital Platform",
      tag: "Media / Analytics",
      desc: "Digital growth strategy for Sports Club, achieving 150k+ views and 8k+ reach on social platforms.",
      tech: ["Analytics", "Content Strategy"],
      span: "md:col-span-2"
    }
  ],
  skills: {
    languages: ["Python", "C++", "Java", "JavaScript"],
    web: ["React.js", "Django", "Flask", "Tailwind", "HTML/CSS"],
    data: ["NumPy", "Pandas", "Scikit-learn", "TensorFlow", "Matplotlib"],
    tools: ["Git", "Linux", "MySQL", "Figma", "After Effects"]
  },
  posts: [
    {
      author: "Ayush Sanger",
      role: "Co-Founder & Chief BGSC",
      time: "2mo ago",
      content: "How We Got 60% of all BITSians to Actively Use Our Platform. When Vishrut Ramraj and I first started Student Store (bits-pilani.store), the problem was simple: Buying and selling was messy. Today: 7,000+ BITSians, 1,600+ items, 600+ sold. Here's to solving more problems! 🚀",
      likes: 55,
      comments: 2,
      tags: ["#Startup", "#BITSGoa"]
    },
    {
      author: "BITS Goa Sports Club",
      role: "Official Page",
      time: "5d ago",
      content: "InterBITS 2025 was a massive moment for us! Our contingent finished 2nd overall 🥈. Standout performances in Swimming (Champions), Basketball, and Cricket. Every medal reflected the spirit BGSC nurtures. Huge thanks to SAC and our athletes! 💙❤️💛",
      likes: 53,
      comments: 0,
      tags: ["#InterBITS2025", "#SportsCulture"]
    },
    {
      author: "BITS Student Store",
      role: "Company Page",
      time: "3mo ago",
      content: "BITS Pawnshop: Empowering Student Commerce. 5,706 registered users, 1,163 items listed, 194k+ requests. Books dominate 57% of listings. A smooth professional alternative to WhatsApp trades.",
      likes: 18,
      comments: 0,
      tags: ["#BITSianInitiative", "#Marketplace"]
    },
    {
      author: "Ayush Sanger",
      role: "Chief Coordinator BGSC",
      time: "3h ago",
      content: "Director Sir shared his appreciation for the morning run organized by FitSoc! Key contributions from the team ensured a smooth event. FitSoc continues to promote campus-wide wellness.",
      likes: 5,
      comments: 0,
      tags: ["#Fitness", "#Leadership"]
    },
    {
      author: "Ayush Sanger",
      role: "Chief Coordinator BGSC",
      time: "2mo ago",
      content: "The Airball Auction was electric! ⚡ Over 200 people showed up, 100+ players drafted. It’s about the impact—seeing people come together. BGSC is something I've poured my heart into. This is just the beginning.",
      likes: 13,
      comments: 0,
      tags: ["#BGSC", "#Community"]
    },
    {
      author: "Director BITS Pilani",
      role: "K.K. Birla Goa Campus",
      time: "3w ago",
      content: "BITS Pilani – Goa Campus Shines at InterBITS Sports Meet 2025! 🏆 Overall Runners-up. Swimming Team became Overall Champions. Best Swimmer Award to Neel Ghate. Proud of our students' discipline and teamwork.",
      likes: 179,
      comments: 5,
      tags: ["#Pride", "#BITSGoa"]
    },
    {
      author: "BGSC Media",
      role: "Official Page",
      time: "1mo ago",
      content: "Growth Alert 📈: BGSC Instagram views increased from 66k to 150k+. Reach exceeding 8,000 accounts. Powerplay posts crossed 20k views. Our media team is capturing the vibrant sporting culture of BITS Goa.",
      likes: 19,
      comments: 0,
      tags: ["#DigitalGrowth", "#Media"]
    },
    {
      author: "Ayush Sanger",
      role: "Personal Update",
      time: "3mo ago",
      content: "I’m happy to share that I’m starting a new position as Chief Coordinator at BITS Goa Sports Club (BGSC)!",
      likes: 26,
      comments: 3,
      tags: ["#NewRole", "#Leadership"]
    }
  ]
};

/* --- ANIMATION COMPONENTS --- */

const BlurText = ({ children, delay = 0, className = "" }) => {
  const words = children.split(" ");
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.08, delayChildren: delay } },
        hidden: {},
      }}
      className={`inline-block ${className}`}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block mr-2 overflow-visible">
          <motion.span
            variants={{
              hidden: { filter: 'blur(10px)', opacity: 0, y: 10 },
              visible: { filter: 'blur(0px)', opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } },
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
};

const FluidGlassNavbar = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const tabs = ['Home', 'Experience', 'Projects', 'Social Feed', 'Skills'];

  const scrollTo = (id) => {
    setActiveTab(id);
    const element = document.getElementById(id.toLowerCase().replace(' ', '-'));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4">
      <div className="relative flex items-center justify-between gap-1 p-2 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)] ring-1 ring-white/5 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => scrollTo(tab)}
            className={`relative px-4 md:px-6 py-2 text-xs md:text-sm font-medium transition-colors duration-500 rounded-full z-10 whitespace-nowrap
              ${activeTab === tab ? 'text-black' : 'text-white/60 hover:text-white'}`}
          >
            {activeTab === tab && (
              <motion.div
                layoutId="fluid-pill"
                className="absolute inset-0 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                style={{ zIndex: -1 }}
              />
            )}
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

const SpotlightCard = ({ children, className = "" }) => {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      className={`relative rounded-3xl border border-white/10 bg-neutral-900/40 overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity: isFocused ? 1 : 0,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`
        }}
      />
      <div className="relative h-full z-10">{children}</div>
    </div>
  );
};

/* --- SECTIONS --- */

const Hero = () => (
  <section id="home" className="min-h-screen relative flex items-center justify-center pt-20 overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] mix-blend-screen" />
    </div>

    <div className="max-w-6xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
      <div className="order-2 lg:order-1 space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-900/10 text-blue-300 text-xs font-medium backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Open to Work • Summer 2025
        </motion.div>

        <div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white leading-[0.95] mb-6">
            <BlurText>Ayush Sanger</BlurText>
          </h1>
          <div className="text-xl md:text-2xl text-white/60 font-light max-w-lg leading-relaxed">
            <BlurText delay={0.5}>
              Crafting high-performance digital experiences at the intersection of Chemistry, Math, and Code.
            </BlurText>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 pt-4">
          <a href="#projects" className="group relative px-8 py-3 bg-white text-black rounded-full font-semibold overflow-hidden transition-transform hover:scale-105">
            <span className="relative z-10">View Projects</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="px-8 py-3 border border-white/20 text-white rounded-full font-semibold hover:bg-white/5 transition-colors backdrop-blur-sm">
            Contact Me
          </a>
        </div>
      </div>

      <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative w-72 h-80 md:w-96 md:h-[500px] rounded-[2rem] overflow-hidden border border-white/10 group"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
          <img 
            src={PORTFOLIO_DATA.personal.image} 
            alt="Ayush Sanger" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
          />
          <div className="absolute bottom-6 left-6 z-20">
            <p className="text-white/40 text-xs tracking-widest uppercase mb-1">Based in</p>
            <div className="flex items-center gap-2 text-white font-medium">
              <MapPin className="w-4 h-4 text-blue-400" />
              Noida / Goa
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const Experience = () => (
  <section id="experience" className="py-24 px-6 bg-white/[0.02]">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center">
        <BlurText>Experience</BlurText>
      </h2>
      <div className="space-y-12">
        {PORTFOLIO_DATA.experience.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Timeline Line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10 md:left-1/2 md:-ml-px hidden md:block" />
            
            <div className={`flex flex-col md:flex-row gap-8 items-start ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              
              <div className="w-full md:w-1/2 relative">
                <SpotlightCard className="p-6 md:p-8 h-full">
                  <h3 className="text-2xl font-bold text-white mb-1">{exp.company}</h3>
                  <div className="space-y-2 mb-4">
                    {exp.roles.map((role, rIdx) => (
                      <div key={rIdx} className="flex flex-col">
                        <span className="text-blue-400 font-medium">{role.title}</span>
                        <span className="text-xs text-white/40 font-mono">{role.date} • {role.type}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed mb-4">{exp.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t, i) => (
                      <span key={i} className="text-[10px] text-white/40 bg-white/5 px-2 py-1 rounded uppercase tracking-wider">
                        {t}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </div>

              {/* Center Dot for Timeline */}
              <div className="hidden md:flex absolute left-1/2 top-8 -ml-1.5 w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] z-10" />
              
              <div className="w-full md:w-1/2" /> 
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const BentoGrid = () => (
  <section id="projects" className="py-24 px-6">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            <BlurText>Magic Bento</BlurText>
          </h2>
          <p className="text-white/40 max-w-md">
            A curated collection of my technical projects, featuring ML models, FinTech bots, and full-stack applications.
          </p>
        </div>
        <div className="text-right hidden md:block">
           <Sparkles className="w-8 h-8 text-blue-400 ml-auto mb-2" />
           <p className="text-xs text-blue-400 uppercase tracking-widest">Selected Works</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
        {PORTFOLIO_DATA.projects.map((project, idx) => (
          <SpotlightCard key={idx} className={`${project.span} group p-8 flex flex-col justify-between hover:bg-white/5 transition-colors`}>
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-white">
                  {idx === 0 ? <TrendingUp /> : idx === 1 ? <FlaskConical /> : <Code2 />}
                </div>
                <span className="text-xs font-mono text-white/40 border border-white/10 px-2 py-1 rounded-full">
                  {project.tag}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {project.desc}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5 mt-4">
              {project.tech.map((t, i) => (
                <span key={i} className="text-xs text-white/30 font-medium">
                  #{t}
                </span>
              ))}
            </div>
          </SpotlightCard>
        ))}
      </div>
    </div>
  </section>
);

const LinkedInFeed = () => (
  <section id="social-feed" className="py-24 px-6 bg-gradient-to-b from-black to-blue-900/10">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-900/20 text-blue-300 text-xs font-medium mb-4">
          <Linkedin className="w-3 h-3" />
          Live Updates
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          <BlurText>Social Feed</BlurText>
        </h2>
        <p className="text-white/40 max-w-xl mx-auto">
          Highlights from my journey leading BGSC, building the Student Store, and celebrating wins with the BITS Goa community.
        </p>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {PORTFOLIO_DATA.posts.map((post, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            viewport={{ once: true }}
            className="break-inside-avoid"
          >
            <SpotlightCard className="p-5 bg-neutral-900/60 hover:bg-neutral-800/80 transition-colors border-white/5">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                    {post.author[0]}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white hover:underline cursor-pointer decoration-blue-500">{post.author}</h4>
                    <p className="text-xs text-white/40">{post.role}</p>
                    <p className="text-[10px] text-white/30 mt-0.5">{post.time} • <span className="text-blue-400">Following</span></p>
                  </div>
                </div>
                <MoreHorizontal className="w-4 h-4 text-white/30 cursor-pointer hover:text-white" />
              </div>

              {/* Content */}
              <div className="mb-4">
                <p className="text-sm text-white/80 leading-relaxed whitespace-pre-line">
                  {post.content}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {post.tags?.map((tag, tIdx) => (
                    <span key={tIdx} className="text-xs text-blue-400 hover:text-blue-300 cursor-pointer">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Footer / Stats */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-white/40 text-xs">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1.5 hover:text-red-400 transition-colors group">
                    <Heart className="w-4 h-4 group-hover:fill-red-400 group-hover:stroke-red-400" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-blue-400 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </button>
                </div>
                <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <a 
          href={`https://${PORTFOLIO_DATA.personal.linkedin}`} 
          target="_blank" 
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#0077b5] text-white rounded-full font-bold hover:bg-[#006097] transition-colors"
        >
          <Linkedin className="w-4 h-4" />
          View All Posts on LinkedIn
        </a>
      </div>
    </div>
  </section>
);

const Skills = () => (
  <section id="skills" className="py-24 px-6">
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 text-center">
        <BlurText>Technical Arsenal</BlurText>
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {Object.entries(PORTFOLIO_DATA.skills).map(([category, skills], idx) => (
          <div key={idx} className="bg-neutral-900/30 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
            <h3 className="text-lg font-bold text-white capitalize mb-6 border-b border-white/5 pb-4">
              {category}
            </h3>
            <div className="flex flex-col gap-3">
              {skills.map((skill, sIdx) => (
                <div key={sIdx} className="flex items-center gap-3 text-white/60 hover:text-white transition-colors">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  <span className="text-sm">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 px-6 border-t border-white/5 bg-black">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="text-center md:text-left">
        <h4 className="text-white font-bold text-lg">Ayush Sanger</h4>
        <p className="text-white/40 text-sm">Web Developer & Data Scientist</p>
      </div>
      
      <div className="flex gap-6">
        <a href={`https://${PORTFOLIO_DATA.personal.github}`} className="text-white/40 hover:text-white transition-colors"><Github size={20} /></a>
        <a href={`https://${PORTFOLIO_DATA.personal.linkedin}`} className="text-white/40 hover:text-blue-400 transition-colors"><Linkedin size={20} /></a>
        <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="text-white/40 hover:text-red-400 transition-colors"><Mail size={20} /></a>
      </div>
      
      <p className="text-white/20 text-xs">© 2025 All Rights Reserved.</p>
    </div>
  </footer>
);

const App = () => {
  return (
    <div className="min-h-screen bg-black text-gray-200 selection:bg-blue-500/30 font-sans">
      <FluidGlassNavbar />
      <Hero />
      <Experience />
      <BentoGrid />
      <LinkedInFeed />
      <Skills />
      <Footer />
    </div>
  );
};

export default App;
import React, { useState, useEffect } from "react";
import { Github, Instagram, Linkedin, Mail, Home, GraduationCap, Briefcase, Code2, User, FileText, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { MoreVertical } from "lucide-react";
import { FaReact, FaGitAlt, FaHtml5 } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiJavascript } from "react-icons/si";
import { MdDesignServices } from "react-icons/md";

const Navbar = () => {
  const menuItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "experience", label: "Experience", icon: FileText },
    { id: "skills", label: "Skills", icon: Code2 },
    { id: "about", label: "About", icon: User },
  ];

  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const scrollPercent = (scrollTop / docHeight) * 100;

      setProgress(scrollPercent);
      setScrolled(scrollTop > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ===== SCROLL PROGRESS BAR ===== */}
      <div className="fixed top-0 left-0 w-full h-1 z-[999]">
        <div
          className="h-full bg-accent transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* ===== NAVBAR ===== */}
      <AnimatePresence>
        {!scrolled && (
          <motion.header
            initial={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/80 border-b border-accent/40"
          >
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

              {/* LEFT */}
              <div className="hidden md:flex w-32 items-center">
                <span className="hidden md:block text-lg font-bold tracking-wide">
                  dipzz<span className="text-accent">jp</span>
                </span>
              </div>

              {/* CENTER */}
              <nav className="hidden md:flex items-center justify-center gap-10">
                {menuItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="flex items-center gap-2 text-white hover:text-accent transition font-medium"
                  >
                    <item.icon size={16} />
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="hidden md:flex items-center">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=pradiptabagas509@gmail.com"
                  target="_blank"
                  className="inline-block px-5 py-1.5 text-sm border border-accent 
                            rounded-full text-whitefont-semibold 
                            transition-all duration-300
                            hover:bg-accent hover:text-white 
                            hover:shadow-[0_0_20px_rgba(154,20,18,0.6)]"
                >
                  Let’s Collaborate
                </a>
              </div>

              {/* MOBILE */}
            <div className="md:hidden relative flex items-center justify-between w-full">
              
              {/* LEFT — MENU */}
              <button
                onClick={() => setOpen(!open)}
                className="p-2 rounded-full hover:bg-white/10"
              >
                <MoreVertical size={22} />
              </button>

              {/* CENTER — TITLE */}
              <span className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold tracking-widest">
                dipzz<span className="text-accent">jp</span>
              </span>

              {/* RIGHT — CTA */}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=pradiptabagas509@gmail.com"
                target="_blank"
                className="px-4 py-1.5 text-xs border border-accent rounded-full text-white
                          hover:bg-red-700 transition"
              >
                hire me
              </a>
            </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* ===== MOBILE MENU ===== */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-14 left-4 z-[999] w-52 bg-black border border-accent rounded-xl overflow-hidden"
          >
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-white/10 hover:text-accent"
              >
                <item.icon size={18} />
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <motion.h2 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4"
  >
    <span className="text-accent">&gt;&gt;</span> {children}
  </motion.h2>
);

const HomeSection = () => (
  <section id="home" className="h-fit flex flex-col md:flex-row items-center justify-center gap-8 py-10 pt-3 md:pt-24">
    <motion.div 
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-accent shadow-[0_0_30px_rgba(#9A1412)]">
        <img 
          src="/profile.png" 
          alt="Profile" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="absolute -inset-4 border border-accent/30 rounded-full animate-pulse" />
    </motion.div>
    
    <div className="text-center md:text-left max-w-xl">
      <motion.span 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-accent text-2xl font-mono mb-4 block"
      >
        Hi, my name is ....
      </motion.span>
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-5xl md:text-7xl font-bold mb-4 tracking-tight"
      >
        Pradipta Bagas
      </motion.h1>
      <motion.h3 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl md:text-3xl text-accent font-medium mb-6"
      >
        Front-End Developer
      </motion.h3>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="tracking-tight text-lg mb-5 leading-relaxed text-justify"
      >
        A Front-End Developer with a strong passion for building modern web interfaces focused on user experience using React, currently specialising in Web3 & Blockchain development (Solidity and Web3.js) to build decentralised applications. Currently serving as Brand Director at Shade (Stealth/Pre-Launch Project), responsible for building a visionary brand identity and strategy.
      </motion.p>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-wrap gap-4 justify-center md:justify-start"
      >
        <a
          href="/CV-PradiptaBagasYegantara-English.pdf"
          download="Pradipta-Bagas-CV.pdf"
          className="inline-flex px-8 py-3 bg-accent cursor-pointer
                    hover:bg-red-700 text-white rounded-full font-semibold
                    transition-all shadow-lg shadow-accent/20
                    items-center gap-2 group"
        >
          <FileText size={20} />
          Download CV
        </a>
        <div className="flex items-center gap-4 ml-4">
          <a href="https://github.com/PradiptaBagas" target="_blank" className="p-2 bg-accent rounded-full hover:bg-red-700 hover:text-white transition-all"><Github size={24} /></a>
          <a href="https://www.linkedin.com/in/pradiptabagas/" target="_blank" className="p-2 bg-accent rounded-full hover:bg-red-700 hover:text-white transition-all"><Linkedin size={24} /></a>
          <a href="https://www.instagram.com/callmediptaa?igsh=YjFodmZmc3Nyc3Jp" target="_blank" className="p-2 bg-accent rounded-full hover:bg-red-700 hover:text-white transition-all"><Instagram size={24} /></a>
        </div>
      </motion.div>
    </div>
  </section>
);

const ProjectsSection = () => {
  const projects = [
    { 
      title: "Shade Official (Soon Pre Launch)", 
      desc: "Experimental Poster Art and Apparel Brand Store by Shade.", 
      tags: ["React", "Tailwind", "TypeScript", "Vite"],
      image: "/shade.jpg",
      link: "#"
    },
    { 
      title: "Gallery WaktuAnalisa", 
      desc: "Gallery Analytic Market Crypto/Forex.", 
      tags: ["TypeScript", "D3.js", "Vite"],
      image: "/assets/projects/project2.png",
      link: "#"
    },
    { 
      title: "Eltibiz Palangkaraya", 
      desc: "Eltibiz itself is an educational institution in palangkaraya.", 
      tags: ["HTML", "CSS", "JS"],
      image: "/eltibiz.jpg",
      link: "https://eltibiz.com/"
    },
    { 
      title: "Dashboard Pidsus (Privacy)", 
      desc: "monitoring dashboard for the special criminal division of the Malang District Attorney's Office.", 
      tags: ["HTML", "CSS","PHP","SQL"],
      image: "/pidsus.jpg",
      link: "#"
    },
  ];

  return (
    <section id="projects" className="py-15 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading>Projects</SectionHeading>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            
            <motion.div
              onClick={() => window.open(project.link, "_blank")}
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              // bisa tambahin hover ini hover:border-accent transition-all hover:shadow-[0_0_30px_rgba(154,20,18,0.4)]"
              className="group relative bg-[#0a0a0a] border border-accent rounded-2xl p-6 cursor-pointer" 
            >
              <div className="aspect-video bg-accent rounded-xl mb-6 overflow-hidden border border-white/5">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full" //object-cover group-hover:scale-110 transition-transform duration-500 
                  onError={(e) => {
                    // Fallback jika file di public tidak ditemukan
                    e.currentTarget.src = "https://picsum.photos/800/450";
                  }}
                />
              </div>

                  {/* //bisa tambahin group-hover:text-accent transition-colors */}
              <h3 className="text-xl font-bold mb-2 text-accent"> 
                {project.title}
              </h3>
              
              <p className="text-lg mb-4 text-sm leading-relaxed">
                {project.desc}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="text-[10px] font-mono font-bold px-2 py-1 bg-accent text-lg rounded-md border border-accent/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const EducationSection = () => (
  <section
    id="education"
    className="relative py-25"
  >
      {/* GARIS TENGAH */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-transparent via-white to-transparent"/>
      <div className="flex flex-col gap-12 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-20 items-center max-w-6xl mx-auto px-6">
      
      {/* TEXT LEFT */}
      <div className="text-center md:text-right max-w-xl">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-accent text-3xl font-bold mb-4 block text-left md:text-right"
        >
          University Of Muhammadiyah Malang
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl font-bold mb-2 text-left md:text-right"
        >
          Informatics Student - Software Engineering Focus
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-accent font-bold mb-4 text-left md:text-right"
        >
          Sep 2021 - Juni 2025
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="tracking-tight text-lg leading-relaxed text-left md:text-right"
        >
          I studied Informatics Engineering where I focused on frontend
          development, UI/UX design, and modern JavaScript frameworks such as
          React. My academic experience shaped my problem-solving mindset and
          attention to detail.
        </motion.p>
      </div>

      {/* TIMELINE NODE (TENGAH) */}
      <div className="hidden md:flex relative z-10 items-center justify-center">
        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-accent bg-[#0a0a0a] shadow-lg">
          <div className="w-2 h-2 bg-accent rounded-full" />
        </div>
      </div>

      {/* IMAGE RIGHT */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        // TAMBAHKAN w-fit dan mx-auto agar glow menempel pas di gambar
        className="relative w-fit mx-auto md:mx-0" 
      >
        <div className="w-72 h-72 md:w-80 md:h-80 rounded-xl overflow-hidden border-4 border-accent shadow-[0_0_30px_rgba(154,20,18,0.6)]">
          <img
            src="/educationfoto.jpg"
            alt="Education"
            className="w-full h-full object-cover"
          />
        </div>

        {/* glow - sekarang akan pas mengikuti w-fit dari parentnya */}
        <div className="absolute -inset-2 border border-accent/30 rounded-xl animate-pulse" />
      </motion.div>
    </div>
  </section>
);

const ExperienceSection = () => {
  const experiences = [
    { role: "Web Developer (Intern)", company: "Eltibiz Palangkaraya", date: "feb 2024 - july 2024", desc: "Intern Initiator dan Planner Project at Eltibiz. Where Eltibiz itself is an educational institution in palangkaraya. Here, I design projects according to needs, create project plans (timeline, budget, risks) and ensure execution according to milestones." },
    { role: "Web Developer (Intern)", company: "Malang District Attorney's Office", date: "July 2024 - August 2024", desc: "Intern Web Developer at Office. Here, I developed a case monitoring dashboard for the special criminal division of the Malang District Attorney's Office, implementing search, filter, and real-time update features for fast and accurate data access." },
    // { role: "Junior Developer", company: "Startup Hub", date: "2018 - 2020", desc: "Assisted in the development of core product features and maintained internal dashboards." },
  ];

  return (
    <section id="experience" className="py-20">
      <SectionHeading>Experience</SectionHeading>
      <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white before:to-transparent">
        {experiences.map((exp, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-accent bg-[#0a0a0a] text-accent shadow group-hover:border-accent transition-colors shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
              <div className="w-2 h-2 bg-accent rounded-full" />
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-[#0a0a0a] border border-accent hover:border-accent transition-all">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h3 className="font-bold text-lg">{exp.role}</h3>
                <span className="text-accent font-bold text-sm">{exp.date}</span>
              </div>
              <div className="text-accent font-bold mb-3">{exp.company}</div>
              <p className="text-lg text-sm leading-relaxed text-justify">{exp.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const SkillsSection = () => {
  const skills = [
  { name: "HTML CSS", icon: <FaHtml5 />, color: "text-orange-500" },
  { name: "React", icon: <FaReact />, color: "text-sky-400" },
  { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "text-cyan-400" },
  { name: "Javascript", icon: <SiJavascript />, color: "text-yellow-400" },
  { name: "Affinity", icon: <MdDesignServices />, color: "text-purple-400" },
  { name: "TypeScript", icon: <SiTypescript />, color: "text-blue-500" },
  { name: "Git", icon: <FaGitAlt />, color: "text-red-500" },
  { name: "UI/UX Design", icon: <MdDesignServices />, color: "text-pink-400" },
];

  return (
    <section id="skills" className="py-15">
      <SectionHeading>Skills</SectionHeading>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {skills.map((skill, i) => (
          <motion.div
            whileHover={{ y: -6 }}
            className="p-6 bg-[#0a0a0a] border border-white/10 rounded-2xl text-center 
                        group hover:border-accent transition-all duration-300 
                        hover:shadow-[0_0_25px_rgba(154,20,18,0.4)] overflow-hidden flex flex-col items-center justify-center"
          >
          <div className={`text-5xl mb-4 mx-auto transition-transform duration-300 group-hover:scale-125 ${skill.color}`}>
            {skill.icon}
          </div>

          <h4 className="font-semibold tracking-wide group-hover:text-accent transition-colors">
            {skill.name}
          </h4>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const AboutSection = () => (
  <section id="about" className="py-20">
    <SectionHeading>About Me</SectionHeading>
    <div className="max-w-3xl mx-auto text-center space-y-6">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="space-y-6 text-white text-lg leading-relaxed "
      >
        <p>
          I’m a front-end developer based in Indonesia who enjoys building clean, responsive, and user-focused web experiences. I focus on modern technologies like React and TypeScript to create fast and scalable interfaces. I’m always learning, improving, and exploring new ways to craft better digital products.
        </p>
        <div className="pt-4">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=pradiptabagas509@gmail.com"
            target="_blank"
            className="inline-block mt-8 px-8 py-3 border border-accent 
                      rounded-full text-whitefont-semibold 
                      transition-all duration-300
                      hover:bg-accent hover:text-white 
                      hover:shadow-[0_0_20px_rgba(154,20,18,0.6)]"
          >
            Let’s Collaborate
          </a>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="relative group"
      >
      </motion.div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 border-t border-accent text-center text-white">
    <div className="mb-6 flex justify-center gap-6">
      <a href="https://github.com/PradiptaBagas" target="_blank" className="hover:text-accent transition-colors"><Github size={20} /></a>
      <a href="https://www.linkedin.com/in/pradiptabagas/" target="_blank" className="hover:text-accent transition-colors"><Linkedin size={20} /></a>
      <a href="https://www.instagram.com/callmediptaa?igsh=YjFodmZmc3Nyc3Jp" target="_blank" className="hover:text-accent transition-colors"><Instagram size={20} /></a>
      <a href="https://mail.google.com/mail/?view=cm&fs=1&to=pradiptabagas509@gmail.com"
            target="_blank" className="hover:text-accent transition-colors"><Mail size={20} /></a>
    </div>
    <p>© {new Date().getFullYear()} by Pradipta Bagas Yegantara</p>
  </footer>
);

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 bg-accent text-white rounded-full shadow-lg shadow-accent/20 hover:bg-red-700 cursor-pointer transition-all z-50"
        >
          <ChevronUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export { Navbar, HomeSection, ProjectsSection, EducationSection, ExperienceSection, SkillsSection, AboutSection, Footer, ScrollToTop };

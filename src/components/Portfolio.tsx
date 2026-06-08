import React, { useState, useEffect, useRef } from "react";
import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  Home,
  GraduationCap,
  Briefcase,
  Code2,
  User,
  FileText,
  ChevronUp,
  MapPin,
  Phone,
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { MoreVertical } from "lucide-react";
import { FaReact, FaGitAlt, FaHtml5 } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiJavascript } from "react-icons/si";
import { MdDesignServices } from "react-icons/md";

// ===== DOCK NAVBAR (macOS style) =====
const Dock = () => {
  const menuItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "skills", label: "Skills", icon: Code2 },
    { id: "about", label: "About", icon: User },
  ];

  const [activeId, setActiveId] = useState("home");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleClick = (id: string) => {
    setActiveId(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999]">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
        className="flex items-end gap-2 px-4 py-3 rounded-2xl"
        style={{
          background: "rgba(15, 15, 15, 0.75)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(255,255,255,0.04) inset",
        }}
      >
        {menuItems.map((item) => {
          const isHovered = hoveredId === item.id;
          const isActive = activeId === item.id;
          return (
            <div key={item.id} className="relative flex flex-col items-center">
              {/* Tooltip */}
              <AnimatePresence>
                {isHovered && (
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="absolute -top-9 text-[11px] font-semibold bg-black/80 text-white px-2 py-1 rounded-lg whitespace-nowrap border border-white/10"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>

              <motion.button
                onClick={() => handleClick(item.id)}
                onHoverStart={() => setHoveredId(item.id)}
                onHoverEnd={() => setHoveredId(null)}
                animate={{
                  scale: isHovered ? 1.35 : 1,
                  y: isHovered ? -8 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="relative w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: isActive
                    ? "rgba(154, 20, 18, 0.85)"
                    : "rgba(40, 40, 40, 0.8)",
                  border: isActive
                    ? "1px solid rgba(154,20,18,0.6)"
                    : "1px solid rgba(255,255,255,0.06)",
                  boxShadow: isActive
                    ? "0 0 20px rgba(154,20,18,0.4)"
                    : "none",
                }}
              >
                <item.icon size={20} color={isActive ? "#fff" : "#aaa"} />
              </motion.button>

              {/* Active dot */}
              {isActive && (
                <motion.div
                  layoutId="dock-dot"
                  className="w-1 h-1 bg-white rounded-full mt-1"
                />
              )}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

// ===== SECTION HEADING =====
const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4"
    style={{ fontFamily: "'Syne', sans-serif" }}
  >
    <span className="text-[#9A1412]">&gt;&gt;</span> {children}
  </motion.h2>
);

// ===== HOME SECTION (Tyrone Brooks inspired) =====
const HomeSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-black"
    >
      {/* BACKGROUND — dramatic warm glow like the reference */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 70% 50%, rgba(180,80,10,0.35) 0%, rgba(100,20,0,0.2) 40%, transparent 70%)",
        }}
      />
      {/* subtle grain */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* TOP BAR — Open to work + Download CV */}
      <div className="relative z-10 flex items-center justify-between px-8 pt-8 md:px-14 md:pt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2"
        >
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs font-semibold tracking-widest text-green-400 uppercase">
            Open to work
          </span>
        </motion.div>

        <motion.a
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          href="/CV-Pradiptaa.pdf"
          download="CV-Pradipta-Bagas.pdf"
          className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase text-white"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(12px)",
          }}
          whileHover={{ scale: 1.04, background: "rgba(154,20,18,0.5)" } as any}
        >
          <FileText size={13} />
          Download CV
        </motion.a>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex-1 flex flex-col md:flex-row items-end md:items-end justify-between px-8 md:px-14 pb-28 gap-8">
        {/* LEFT — Big name + role */}
        <div className="flex-1">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-[#f0a060] font-bold tracking-widest text-sm uppercase mb-3"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Front-End Developer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-white font-black leading-none mb-6"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(3.5rem, 10vw, 8rem)",
              letterSpacing: "-0.03em",
            }}
          >
            Pradipta
            <br />
            Bagas
          </motion.h1>

          {/* CONTACT ROW */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60"
          >
            <a
              href="mailto:pradiptabagas509@gmail.com"
              className="flex items-center gap-2 hover:text-[#f0a060] transition-colors"
            >
              <Mail size={13} />
              pradiptabagas509@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/pradiptabagas/"
              target="_blank"
              className="flex items-center gap-2 hover:text-[#f0a060] transition-colors"
            >
              <Linkedin size={13} />
              linkedin.com/in/pradiptabagas
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={13} />
              Indonesia
            </span>
          </motion.div>
        </div>

        {/* RIGHT — Profile image (dark, dramatic) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative shrink-0 self-end"
        >
          <div
            className="w-64 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden"
            style={{
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow:
                "0 0 80px rgba(180,80,10,0.25), 0 0 0 1px rgba(255,255,255,0.04)",
            }}
          >
            <img
              src="/profile.png"
              alt="Pradipta Bagas"
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.85) contrast(1.05)" }}
            />
          </div>
          {/* warm glow behind image */}
          <div
            className="absolute -inset-4 -z-10 rounded-3xl blur-2xl opacity-30"
            style={{ background: "radial-gradient(circle, #b44c0a, transparent 70%)" }}
          />
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-20 left-8 md:left-14 flex items-center gap-2 text-white/40 text-xs tracking-widest uppercase z-10"
      >
        <span>Scroll</span>
        <div className="w-8 h-px bg-white/30" />
      </motion.div>
    </section>
  );
};

// ===== PROJECTS SECTION =====
const ProjectsSection = () => {
  const projects = [
    {
      title: "Shade Official (Soon Pre Launch)",
      desc: "Experimental Poster Art and Apparel Brand Store by Shade.",
      tags: ["React", "Tailwind", "TypeScript", "Vite"],
      image: "/shade.jpg",
      link: "#",
    },
    {
      title: "Shadeart",
      desc: "Gallery Poster by Shade.",
      tags: ["React", "Tailwind", "TypeScript", "Vite"],
      image: "/artshade.png",
      link: "https://shadeart.vercel.app/",
    },
    {
      title: "Eltibiz Palangkaraya",
      desc: "Educational institution website in Palangkaraya.",
      tags: ["HTML", "CSS", "JS"],
      image: "/eltibiz.jpg",
      link: "https://eltibiz.com/",
    },
    {
      title: "Dashboard Pidsus (Private)",
      desc: "Monitoring dashboard for the special criminal division of the Malang District Attorney's Office.",
      tags: ["HTML", "CSS", "PHP", "SQL"],
      image: "/pidsus.jpg",
      link: "#",
    },
  ];

  return (
    <section id="projects" className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading>Projects</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              onClick={() => window.open(project.link, "_blank")}
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{
                background: "rgba(15,15,15,0.9)",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "0 0 0 0 rgba(154,20,18,0)",
                transition: "box-shadow 0.3s",
              }}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-75"
                />
              </div>
              <div className="p-5">
                <h3
                  className="text-lg font-bold mb-1 text-white group-hover:text-[#f0a060] transition-colors"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {project.title}
                </h3>
                <p className="text-sm text-white/50 mb-4 leading-relaxed">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-bold px-2.5 py-1 rounded-md tracking-widest uppercase"
                      style={{
                        background: "rgba(154,20,18,0.15)",
                        border: "1px solid rgba(154,20,18,0.3)",
                        color: "#f0a060",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ===== EDUCATION SECTION =====
const EducationSection = () => (
  <section id="education" className="relative py-24 bg-black">
    <div className="max-w-6xl mx-auto px-6">
      <SectionHeading>Education</SectionHeading>
      <div className="relative flex flex-col md:flex-row gap-12 items-start">
        {/* Timeline line */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="md:w-1/2 md:pr-16"
        >
          <p className="text-[#f0a060] font-bold text-xs tracking-widest uppercase mb-2">
            Sep 2021 – June 2025
          </p>
          <h3
            className="text-2xl font-black mb-1 text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            University of Muhammadiyah Malang
          </h3>
          <p className="text-white/50 mb-4 text-sm">
            Informatics Engineering — Software Engineering Focus
          </p>
          <p className="text-white/60 leading-relaxed text-sm">
            Studied frontend development, UI/UX design, and modern JavaScript frameworks like React. Academic experience shaped problem-solving mindset and attention to detail.
          </p>
        </motion.div>

        {/* Node */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-2 w-3 h-3 rounded-full bg-[#9A1412] ring-4 ring-[#9A1412]/20 z-10" />

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="md:w-1/2 md:pl-16"
        >
          <div
            className="w-full aspect-video rounded-2xl overflow-hidden"
            style={{
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 0 40px rgba(154,20,18,0.2)",
            }}
          >
            <img
              src="/educationfoto.jpg"
              alt="University"
              className="w-full h-full object-cover brightness-75"
            />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

// ===== EXPERIENCE SECTION =====
const ExperienceSection = () => {
  const experiences = [
    {
      role: "Web Developer (Intern)",
      company: "Eltibiz Palangkaraya",
      date: "Feb 2024 – July 2024",
      desc: "Intern Initiator and Project Planner at Eltibiz — an educational institution in Palangkaraya. Designed projects according to needs, created project plans including timeline, budget, and risk mitigation, and ensured execution according to milestones.",
    },
    {
      role: "Web Developer (Intern)",
      company: "Malang District Attorney's Office",
      date: "July 2024 – August 2024",
      desc: "Developed a case monitoring dashboard for the special criminal division, implementing search, filter, and real-time update features for fast and accurate data access.",
    },
  ];

  return (
    <section id="experience" className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading>Experience</SectionHeading>
        <div className="space-y-6">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl p-6 md:p-8"
              style={{
                background: "rgba(15,15,15,0.9)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-1">
                <h3
                  className="text-lg font-bold text-white"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {exp.role}
                </h3>
                <span className="text-[#f0a060] text-xs font-bold tracking-widest uppercase">
                  {exp.date}
                </span>
              </div>
              <p className="text-[#9A1412] font-bold text-sm mb-3">{exp.company}</p>
              <p className="text-white/50 text-sm leading-relaxed">{exp.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ===== SKILLS SECTION =====
const SkillsSection = () => {
  const skills = [
    { name: "HTML & CSS", icon: <FaHtml5 />, color: "text-orange-500" },
    { name: "React", icon: <FaReact />, color: "text-sky-400" },
    { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "text-cyan-400" },
    { name: "JavaScript", icon: <SiJavascript />, color: "text-yellow-400" },
    { name: "TypeScript", icon: <SiTypescript />, color: "text-blue-500" },
    { name: "Git", icon: <FaGitAlt />, color: "text-red-500" },
    { name: "Affinity", icon: <MdDesignServices />, color: "text-purple-400" },
    { name: "UI/UX Design", icon: <MdDesignServices />, color: "text-pink-400" },
  ];

  return (
    <section id="skills" className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading>Skills</SectionHeading>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {skills.map((skill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-6 rounded-2xl flex flex-col items-center text-center group"
              style={{
                background: "rgba(15,15,15,0.9)",
                border: "1px solid rgba(255,255,255,0.06)",
                transition: "box-shadow 0.3s",
              }}
            >
              <div
                className={`text-4xl mb-3 transition-transform duration-300 group-hover:scale-125 ${skill.color}`}
              >
                {skill.icon}
              </div>
              <h4 className="text-sm font-semibold text-white/70 group-hover:text-white transition-colors">
                {skill.name}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ===== ABOUT SECTION =====
const AboutSection = () => (
  <section id="about" className="py-24 bg-black">
    <div className="max-w-6xl mx-auto px-6">
      <SectionHeading>About Me</SectionHeading>
      <div className="max-w-2xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white/60 text-base leading-loose mb-8"
        >
          I'm a front-end developer based in Indonesia who enjoys building clean, responsive, and user-focused web experiences. I focus on modern technologies like React and TypeScript to create fast and scalable interfaces. Currently specializing in Web3 & Blockchain development (Solidity and Web3.js). Always learning, improving, and exploring.
        </motion.p>
        <motion.a
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          href="https://mail.google.com/mail/?view=cm&fs=1&to=pradiptabagas509@gmail.com"
          target="_blank"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-bold tracking-wide text-white"
          style={{
            background: "rgba(154,20,18,0.8)",
            border: "1px solid rgba(154,20,18,0.5)",
          }}
          whileHover={{ scale: 1.04, background: "rgba(154,20,18,1)" } as any}
        >
          <Mail size={15} />
          Let's Collaborate
        </motion.a>
      </div>
    </div>
  </section>
);

// ===== FOOTER =====
const Footer = () => (
  <footer
    className="pb-28 pt-12 text-center text-white/30 text-sm"
    style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
  >
    <div className="mb-4 flex justify-center gap-5">
      <a href="https://github.com/PradiptaBagas" target="_blank" className="hover:text-white transition-colors"><Github size={18} /></a>
      <a href="https://www.linkedin.com/in/pradiptabagas/" target="_blank" className="hover:text-white transition-colors"><Linkedin size={18} /></a>
      <a href="https://www.instagram.com/callmediptaa" target="_blank" className="hover:text-white transition-colors"><Instagram size={18} /></a>
      <a href="https://mail.google.com/mail/?view=cm&fs=1&to=pradiptabagas509@gmail.com" target="_blank" className="hover:text-white transition-colors"><Mail size={18} /></a>
    </div>
    <p>© {new Date().getFullYear()} Pradipta Bagas Yegantara</p>
  </footer>
);

// ===== SCROLL TO TOP =====
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setIsVisible(window.pageYOffset > 300);
    window.addEventListener("scroll", toggle);
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-24 right-6 p-3 text-white rounded-full z-50"
          style={{
            background: "rgba(154,20,18,0.8)",
            border: "1px solid rgba(154,20,18,0.4)",
          }}
        >
          <ChevronUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export {
  Dock,
  HomeSection,
  ProjectsSection,
  EducationSection,
  ExperienceSection,
  SkillsSection,
  AboutSection,
  Footer,
  ScrollToTop,
};
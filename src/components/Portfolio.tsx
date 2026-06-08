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
  ExternalLink,
  ChevronLeft,
  Pointer,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FaReact, FaGitAlt, FaHtml5, FaPhp } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiJavascript } from "react-icons/si";
import { MdDesignServices } from "react-icons/md";
import MacOsFinder from './MacOsFinder';
import { FaGithub, FaInstagram, FaLinkedin, FaTiktok } from 'react-icons/fa'; 


// ===== INTERFACE SINKRONISASI =====
interface WindowSectionProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DockProps {
  activeId: string;
  onMenuClick: (id: string) => void;
}

// Dock Navigasi
const Dock = ({ activeId, onMenuClick }: DockProps) => {
  const menuItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "skills", label: "Skills", icon: Code2 },
    { id: "about", label: "About", icon: User },
  ];

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  
  // State untuk mengontrol visibilitas Dock saat scroll
  const [isVisible, setIsVisible] = useState(true);

  // Menggunakan useRef agar posisi scroll terakhir terjaga dengan akurat di React Lifecycle
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Mencari element konten internal MacOSFinder yang memiliki scrollbar overflow-y-auto
    const internalScrollContainer = document.querySelector('.overflow-y-auto');
    const targetElement = internalScrollContainer || window;

    // Inisialisasi nilai awal
    lastScrollY.current = targetElement === window 
      ? window.scrollY 
      : (targetElement as HTMLElement).scrollTop;

    const handleScroll = () => {
      // BACA UKURAN LAYAR: Jika layar desktop (lebar lebih dari 768px), 
      // paksa Dock agar SELALU MUNCUL (jangan jalankan logika hide)
      if (window.innerWidth > 768) {
        setIsVisible(true);
        return; 
      }

      // Ambil nilai scroll dari element internal atau window
      const currentScrollY = targetElement === window 
        ? window.scrollY 
        : (targetElement as HTMLElement).scrollTop;

      // Logika sembunyi saat scroll ke bawah (Hanya berjalan di HP / Mobile)
      if (currentScrollY > lastScrollY.current && currentScrollY > 15) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      // Selalu perbarui posisi scroll terakhir pada objek ref
      lastScrollY.current = currentScrollY;
    };

    // Dengarkan event scroll
    targetElement.addEventListener("scroll", handleScroll, { passive: true });
    return () => targetElement.removeEventListener("scroll", handleScroll);
  }, [activeId]); // Trigger ulang binding target saat tab berganti agar element barunya kembali terdeteksi

  return (
    <motion.div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999]"
      initial={{ y: 100, opacity: 0 }}
      animate={{
        y: isVisible ? 0 : 120,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 25 }}
    >
      <div
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
                onClick={() => onMenuClick(item.id)}
                onHoverStart={() => setHoveredId(item.id)}
                onHoverEnd={() => setHoveredId(null)}
                animate={{
                  scale: isHovered ? 1.35 : 1,
                  y: isHovered ? -8 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="relative w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: isActive ? "rgba(154, 20, 18, 0.85)" : "rgba(40, 40, 40, 0.8)",
                  border: isActive ? "1px solid rgba(154,20,18,0.6)" : "1px solid rgba(255,255,255,0.06)",
                  boxShadow: isActive ? "0 0 20px rgba(154, 20, 18, 0.85)" : "none",
                  cursor : "Pointer",
                }}
              >
                <item.icon size={20} color={isActive ? "#fff" : "#aaa"} />
              </motion.button>

              {isActive && (
                <motion.div layoutId="dock-dot" className="w-1 h-1 bg-white rounded-full mt-1" />
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

// ===== SECTION HEADING =====
const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3"
    style={{ fontFamily: "'Syne', sans-serif" }}
  >
    <span className="text-[#9A1412]">&gt;&gt;</span> {children}
  </motion.h2>
);

// ===== HOME SECTION =====
const HomeSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-black w-full">
      <div className="absolute inset-0 z-0">
        <img
          src="/profile1.jpg"
          alt="Pradipta Bagas Background"
          className="w-full h-full object-cover object-center md:object-right"
          style={{ filter: "brightness(0.6) contrast(1.1) saturate(1.05)" }}
        />
        {/* Gradasi overlay mobile diperbaiki agar teks tengah lebih terbaca jelas */}
        <div className="absolute inset-0 md:hidden" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%)" }} />
        <div className="absolute inset-0 hidden md:block" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.8) 35%, rgba(0,0,0,0.4) 65%, transparent 100%)" }} />
        <div className="absolute inset-0 hidden md:block" style={{ background: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 20%, transparent 100%)" }} />
      </div>

      {/* Header Info: Ukuran padding & font disesuaikan agar tidak padat di mobile */}
      <div className="relative z-20 flex items-center justify-between gap-2 px-6 pt-6 md:px-14 md:pt-10">
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-[10px] md:text-xs font-semibold tracking-widest text-green-400 uppercase">Open to work</span>
        </div>
        <a href="/CV-Pradiptaa.pdf" download="CV-Pradipta-Bagas.pdf" className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] md:text-xs font-bold tracking-widest uppercase text-white bg-white/5 border border-white/10 backdrop-blur hover:bg-[#9A1412]/50 transition-all whitespace-nowrap">
          <FileText size={12} /> Download CV
        </a>
      </div>

      {/* Main Content: Ditambahkan items-center & text-center untuk mobile agar simetris */}
      <div className="relative z-20 flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left px-2 md:px-14 pb-24 pt-4 md:pb-28 md:max-w-[65%]">
        
        {/* Front-End Developer */}
        <p className="text-white font-bold md:text-[#9A1412] tracking-widest text-xs md:text-sm uppercase mb-3 md:mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
          Front-End Developer
        </p>
        
        {/* Nama Besar: leading-tight & width disesuaikan agar simetris sempurna di tengah screen HP */}
        <h1 className="text-white font-black leading-[0.95] mb-6 md:mb-8 w-full uppercase" style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2.3rem, 11vw, 5.5rem)", letterSpacing: "-0.03em" }}>
          PRADIPTA <br /> BAGAS
        </h1>
        
        {/* Kontak: Menggunakan items-center di mobile agar icon dan link email/linkedin rapi berjejer ke bawah di tengah */}
        <div className="flex flex-col items-center md:items-start gap-2.5 md:gap-3 text-xs md:text-sm text-white font-bold md:text-white/60 md:font-normal break-all w-full">
          <a href="mailto:pradiptabagas509@gmail.com" className="flex items-center gap-2 hover:text-[#9A1412] transition-colors w-fit">
            <Mail size={13} className="shrink-0 text-white md:text-white/60" />
            pradiptabagas509@gmail.com
          </a>
          <a href="https://www.linkedin.com/in/pradiptabagas/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#9A1412] transition-colors w-fit">
            <Linkedin size={13} className="shrink-0 text-white md:text-white/60" />
            linkedin.com/in/pradiptabagas
          </a>
          <span className="flex items-center gap-2 w-fit">
            <MapPin size={13} className="shrink-0 text-white md:text-white/60" />
            Indonesia
          </span>
        </div>
      </div>
    </section>
  );
};

// ===== PROJECTS SECTION =====
const ProjectsSection = ({ isOpen, onClose }: WindowSectionProps) => {
  const projects = [
    { 
      title: "Shade Official", 
      desc: "Experimental Poster Art and Apparel Brand Store.", 
      longDesc: "Sebuah platform e-commerce eksperimental yang menggabungkan seni poster modern dengan merchandise pakaian eksklusif. Di sini saya bertanggung jawab penuh merancang arsitektur frontend menggunakan React dan Tailwind CSS untuk menciptakan pengalaman belanja yang imersif, serta mengoptimalkan performa rendering gambar beresolusi tinggi agar tetap ringan saat diakses pengguna.",
      tags: ["React", "Tailwind", "TypeScript", "Vite"], 
      image: "/shade.jpg", 
      link: "#", 
      year: "2024" 
    },
    { 
      title: "Shadeart", 
      desc: "Gallery Poster by Shade. Browse and explore original artwork.", 
      longDesc: "Aplikasi galeri berbasis web yang dirancang khusus untuk memamerkan karya seni poster original dari Shade. Fokus utama proyek ini adalah antarmuka minimalis bernuansa premium, integrasi sistem filter kategori karya yang instan, serta pemanfaatan framer-motion untuk transisi antar aset seni yang halus layaknya aplikasi native desktop.",
      tags: ["React", "Tailwind", "TypeScript", "Vite"], 
      image: "/artshade.png", 
      link: "https://shadeart.vercel.app/", 
      year: "2024" 
    },
    { 
      title: "Eltibiz Website", 
      desc: "Website for an educational institution in Palangkaraya.", 
      longDesc: "Proyek pengembangan ulang landing page resmi untuk institusi pendidikan Eltibiz di Palangkaraya selama masa magang saya. Menggunakan fondasi HTML, CSS modern, dan JavaScript vanilla, fokus utama pengerjaan ada pada restrukturisasi informasi kursus, optimasi keramahan SEO, dan memastikan situs sepenuhnya responsif diakses dari perangkat mobile.",
      tags: ["HTML", "CSS", "JS"], 
      image: "/eltibiz.jpg", 
      link: "https://eltibiz.com/", 
      year: "2024" 
    },
    { 
      title: "Dashboard Pidsus", 
      desc: "Case monitoring dashboard for the Malang District Attorney's Office.", 
      longDesc: "Sistem aplikasi internal yang dikembangkan untuk Kejaksaan Negeri Kabupaten Malang guna memantau perkembangan kasus tindak pidana khusus. Saya merancang dashboard interaktif ini menggunakan PHP dan basis data SQL, mengimplementasikan enkripsi keamanan data, fitur filter status kasus yang kompleks, serta visualisasi data statistik yang real-time.",
      tags: ["HTML", "CSS", "PHP", "SQL"], 
      image: "/pidsus.jpg", 
      link: "#", 
      year: "2024" 
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const cardWidth = 320;  
  const cardHeight = 200; 
  const cardGap = 20;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <MacOsFinder title="Projects" onClose={onClose}>
          <SectionHeading>Projects</SectionHeading>
          
          {/* 1. AREA CAROUSEL ATAS */}
          <div className="relative w-full flex items-center justify-center min-h-[230px] mt-2 overflow-visible">
            {/* Tombol Navigasi Kiri */}
            <button 
              onClick={() => setActiveIndex(p => p === 0 ? projects.length - 1 : p - 1)} 
              className="absolute left-[-10px] z-30 p-2.5 rounded-full text-white/70 hover:text-white bg-[#161616]/80 hover:bg-[#9A1412] border border-white/10 backdrop-blur transition-all duration-200 shadow-lg"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Slider Track */}
            <div className="relative w-full h-[210px] flex items-center justify-center overflow-visible">
              {projects.map((project, i) => {
                const offset = i - activeIndex;
                const isActive = i === activeIndex;
                if (Math.abs(offset) > 1) return null;
                return (
                  <motion.div
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    animate={{ 
                      scale: isActive ? 1 : 0.82, 
                      x: offset * (cardWidth + cardGap), 
                      opacity: isActive ? 1 : 0.25, 
                      zIndex: isActive ? 20 : 10 
                    }}
                    transition={{ type: "spring", stiffness: 240, damping: 24 }}
                    className="absolute cursor-pointer select-none rounded-xl overflow-hidden bg-[#161616]"
                    style={{ 
                      width: `${cardWidth}px`, 
                      height: `${cardHeight}px`, 
                      border: isActive ? "2px solid rgba(154,20,18,0.9)" : "1px solid rgba(255,255,255,0.06)",
                      boxShadow: isActive ? "0 10px 30px -10px rgba(154,20,18,0.3)" : "none"
                    }}
                  >
                    <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover" style={{ filter: isActive ? "brightness(0.85)" : "brightness(0.12)" }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                    
                    <div className="absolute top-3 left-4 right-4 flex items-center justify-between text-[10px] text-white/40 font-bold tracking-wider">
                      <span>{project.year}</span>
                      <span className="bg-[#9A1412]/20 border border-[#9A1412]/40 px-2 py-0.5 rounded-md text-[9px] uppercase text-[#FFF] font-bold">
                      {project.tags[0]}
                    </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-black text-base tracking-wide mb-0.5">{project.title}</h3>
                      <p className="text-white/50 text-[10px] line-clamp-1">{project.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Tombol Navigasi Kanan */}
            <button 
              onClick={() => setActiveIndex(p => p === projects.length - 1 ? 0 : p + 1)} 
              className="absolute right-[-10px] z-30 p-2.5 rounded-full text-white/70 hover:text-white bg-[#161616]/80 hover:bg-[#9A1412] border border-white/10 backdrop-blur transition-all duration-200 shadow-lg"
            >
              <ChevronLeft size={18} className="rotate-180" />
            </button>
          </div>

          {/* 2. APPLE-STYLE BULLET INDICATORS */}
          <div className="flex justify-center gap-2 mb-6">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{ 
                  width: i === activeIndex ? "24px" : "6px", 
                  background: i === activeIndex ? "#9A1412" : "rgba(255,255,255,0.15)" 
                }}
              />
            ))}
          </div>

          <hr className="border-white/5 my-4" />

          {/* 3. SECTION PARAGRAF DETAIL (Dinamis dengan Animasi) */}
          <div className="min-h-[140px] px-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold tracking-wider uppercase text-neutral-400 font-mono">
                    // Project Case Study
                  </h4>
                  {projects[activeIndex].link !== "#" && (
                    <a 
                      href={projects[activeIndex].link} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="inline-flex items-center gap-1.5 text-xs text-white bg-white/5 border border-white/10 hover:bg-[#9A1412]/20 hover:border-[#9A1412]/50 px-3 py-1.5 rounded-lg transition-all font-medium"
                    >
                      Live Preview <ExternalLink size={12} />
                    </a>
                  )}
                </div>

                <p className="text-white/70 text-xs md:text-sm leading-relaxed font-normal tracking-wide">
                  {projects[activeIndex].longDesc}
                </p>

                {/* Sub-tags list */}
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {projects[activeIndex].tags.map(tag => (
                    <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] border border-white/5 text-white/50">
                      #{tag.toLowerCase()}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </MacOsFinder>
      </div>
    </div>
  );
};

// ===== EDUCATION SECTION =====
const EducationSection = ({ isOpen, onClose }: WindowSectionProps) => {
  // Data ditingkatkan dengan rincian pencapaian teknis (sangat disukai HRD)
  const experiences = [
    { 
      role: "Web Developer (Intern)", 
      company: "Eltibiz Palangkaraya", 
      date: "Feb 2024 – July 2024", 
      desc: "Bertindak sebagai Intern Initiator dan Perencana Proyek utama. Berhasil mendesain ulang arsitektur landing page institusi dengan standar SEO modern, meningkatkan kecepatan muat halaman, serta memastikan fleksibilitas antarmuka yang responsif di berbagai perangkat mobile.",
      skills: ["HTML5", "CSS3", "JavaScript", "UI Design"]
    },
    { 
      role: "Web Developer (Intern)", 
      company: "Malang District Attorney's Office", 
      date: "July 2024 – August 2024", 
      desc: "Merancang dan mengimplementasikan dashboard monitoring kasus internal untuk divisi Pidana Khusus (Pidsus). Membangun sistem manajemen basis data yang aman untuk melacak status perkara secara real-time, menyederhanakan birokrasi data, dan menyajikan visualisasi statistik yang interaktif.",
      skills: ["PHP", "MySQL", "AdminLTE", "Data Visualization"]
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <MacOsFinder title="Education" onClose={onClose}>
          <SectionHeading>Education</SectionHeading>
          
          {/* 1. BAGIAN PENDIDIKAN UTAMA (LAYOUT DIPERBARUI) */}
          <div className="flex flex-col md:flex-row gap-6 items-center bg-white/[0.01] border border-white/5 rounded-2xl p-5 backdrop-blur-sm">
            <div className="md:w-1/2 text-xs md:text-sm order-2 md:order-1">
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#9A1412]/10 text-[#9A1412] font-mono text-[10px] font-bold tracking-wider uppercase mb-2">
                Sep 2021 – June 2025
              </div>
              <h3 className="text-xl font-black mb-1 text-white tracking-wide" style={{ fontFamily: "'Syne', sans-serif" }}>
                UNIVERSITY OF MUHAMMADIYAH MALANG
              </h3>
              <p className="text-[#9A1412] font-semibold mb-3 text-xs tracking-wide">
                Informatics Engineering — Undergraduate Student
              </p>
              <p className="text-white/60 leading-relaxed text-xs">
                Fokus mendalami rekayasa perangkat lunak dengan spesialisasi pengembangan frontend, perancangan antarmuka UI/UX, serta implementasi framework JavaScript modern seperti React.js dan ekosistem eksternalnya.
              </p>
            </div>
            
            {/* Foto Kampus dengan Efek Hover Zoom */}
            <div className="md:w-1/2 w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/10 relative group order-1 md:order-2">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60" />
              <img 
                src="/educationfoto.jpg" 
                alt="University" 
                className="w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-500 ease-out" 
              />
            </div>
          </div>
          
          {/* 2. BAGIAN PENGALAMAN KERJA (TIMELINE MODEL) */}
          <div className="mt-8">
            <h3 className="text-base font-bold mb-6 text-white tracking-wider font-mono flex items-center gap-2">
              <span className="text-[#9A1412]">&gt;</span> Working Experience
            </h3>
            
            {/* Kontainer Utama Timeline */}
            <div className="relative border-l border-white/10 ml-3 pl-6 space-y-6">
              {experiences.map((exp, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="relative group bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-[#9A1412]/30 rounded-xl p-4 transition-all duration-300 shadow-xl"
                  style={{
                    transformOrigin: "left"
                  }}
                  whileHover={{ y: -2 }}
                >
                  {/* Titik Timeline Bercahaya */}
                  <div className="absolute -left-[31px] top-5 w-2.5 h-2.5 rounded-full bg-[#121212] border-2 border-neutral-600 group-hover:border-[#9A1412] group-hover:bg-[#9A1412] transition-colors duration-300 shadow-[0_0_8px_rgba(154,20,18,0)] group-hover:shadow-[0_0_8px_rgba(154,20,18,0.8)]" />
                  
                  {/* Header Konten Kerja */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 mb-2">
                    <div>
                      <h4 className="font-bold text-sm text-white group-hover:text-[#9A1412] transition-colors duration-300">
                        {exp.role}
                      </h4>
                      <p className="text-white/40 text-[11px] font-medium tracking-wide mt-0.5">
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-[#9A1412] font-mono text-[11px] bg-[#9A1412]/5 border border-[#9A1412]/10 px-2 py-0.5 rounded-md self-start sm:self-center">
                      {exp.date}
                    </span>
                  </div>
                  
                  {/* Deskripsi Kerja */}
                  <p className="text-white/60 leading-relaxed text-xs mb-3">
                    {exp.desc}
                  </p>

                  {/* Kumpulan Tech Stack saat Magang */}
                  <div className="flex flex-wrap gap-1.5">
                    {exp.skills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/[0.03] border border-white/5 text-white/40 group-hover:border-white/10 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </MacOsFinder>
      </div>
    </div>
  );
};

// ===== SKILLS SECTION =====
const SkillsSection = ({ isOpen, onClose }: WindowSectionProps) => {
  // Data distrukturisasi berdasarkan kategori + ditambahkan perkiraan level kemahiran (%)
  const skillCategories = [
    {
      category: "Frontend Core",
      items: [
        { name: "React", icon: <FaReact />, color: "text-sky-400", glow: "group-hover:border-sky-500/30 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.15)]", level: 85 },
        { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "text-cyan-400", glow: "group-hover:border-cyan-500/30 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.15)]", level: 90 },
        { name: "HTML & CSS", icon: <FaHtml5 />, color: "text-orange-500", glow: "group-hover:border-orange-500/30 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.15)]", level: 95 },
      ]
    },
    {
      category: "Programming Languages",
      items: [
        { name: "JavaScript", icon: <SiJavascript />, color: "text-yellow-400", glow: "group-hover:border-yellow-500/30 group-hover:shadow-[0_0_15px_rgba(250,204,21,0.15)]", level: 85 },
        { name: "TypeScript", icon: <SiTypescript />, color: "text-blue-500", glow: "group-hover:border-blue-500/30 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.15)]", level: 75 },
        { name: "PHP", icon: <FaPhp />, color: "text-indigo-400", glow: "group-hover:border-indigo-500/30 group-hover:shadow-[0_0_15px_rgba(129,140,248,0.15)]", level: 70 },
      ]
    },
    {
      category: "Design & Tools",
      items: [
        { name: "UI/UX Design", icon: <MdDesignServices />, color: "text-pink-400", glow: "group-hover:border-pink-500/30 group-hover:shadow-[0_0_15px_rgba(244,114,182,0.15)]", level: 80 },
        { name: "Affinity Suite", icon: <MdDesignServices />, color: "text-purple-400", glow: "group-hover:border-purple-500/30 group-hover:shadow-[0_0_15px_rgba(192,132,252,0.15)]", level: 75 },
        { name: "Git & GitHub", icon: <FaGitAlt />, color: "text-red-500", glow: "group-hover:border-red-500/30 group-hover:shadow-[0_0_15px_rgba(239,68,68,0.15)]", level: 80 },
      ]
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <MacOsFinder title="Skills" onClose={onClose}>
          <SectionHeading>Skills & Technologies</SectionHeading>
          
          {/* Sub-judul bergaya pengetikan perintah Terminal macOS */}
          <p className="text-xs text-white/40 font-mono mb-6 -mt-2 px-1">
            <span className="text-[#9A1412]">&gt;</span> dipzz@dipzz-MacBook-Pro Dekstop /Skills %
          </p>

          <div className="space-y-6">
            {skillCategories.map((cat, catIdx) => (
              <div key={catIdx} className="space-y-3">
                {/* Judul Kategori Code Style */}
                <h3 className="text-xs font-bold tracking-wider uppercase text-neutral-500 font-mono px-1">
                  // {cat.category}
                </h3>

                {/* Grid Responsif Kolom Menyesuaikan Jendela Finder */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {cat.items.map((skill, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ y: -2 }}
                      className={`p-3.5 rounded-xl flex items-center gap-4 bg-white/[0.02] border border-white/5 transition-all duration-300 group ${skill.glow}`}
                    >
                      {/* Wadah Ikon Teknologi */}
                      <div className={`text-3xl transition-transform duration-300 group-hover:scale-110 shrink-0 ${skill.color}`}>
                        {skill.icon}
                      </div>

                      {/* Detail Nama & Progress Bar Minimalis */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1.5">
                          <h4 className="text-xs font-bold text-white/80 group-hover:text-white transition-colors truncate">
                            {skill.name}
                          </h4>
                          <span className="text-[10px] font-mono text-white/30 group-hover:text-white/60 transition-colors">
                            {skill.level}%
                          </span>
                        </div>

                        {/* Progress Bar Track */}
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                          {/* Progress Fill dengan Efek Animasi Mengalir */}
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full rounded-full"
                            style={{
                              // Menggabungkan gradasi gelap ke warna aksen merah andalanmu
                              backgroundImage: "linear-gradient(to right, #444444, #9A1412)"
                            }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Ornamen Footer Finder agar halaman padat secara proporsional */}
          <div className="mt-8 p-3 rounded-xl border border-white/5 bg-white/[0.01] text-center">
            <p className="text-[11px] text-white/40 leading-relaxed">
              💡 <span className="text-white/60 font-semibold">Filosofi Kode:</span> Berfokus kuat pada performa rendering antarmuka yang bersih, manipulasi arsitektur data state yang aman, serta efisiensi penulisan komponen kode yang reusable.
            </p>
          </div>

        </MacOsFinder>
      </div>
    </div>
  );
};

// ===== ABOUT SECTION =====
const AboutSection = ({ isOpen, onClose }: WindowSectionProps) => {
  // Data Sosial Media bergaya Ikon Aplikasi Mac
  const socialLinks = [
    { name: "GitHub", icon: <FaGithub />, url: "https://github.com/PradiptaBagas", color: "hover:bg-white/10 hover:border-white/20 text-white" },
    { name: "Instagram", icon: <FaInstagram />, url: "https://www.instagram.com/callmediptaa", color: "hover:bg-pink-500/10 hover:border-pink-500/30 text-pink-400" },
    { name: "LinkedIn", icon: <FaLinkedin />, url: "https://www.linkedin.com/in/pradiptabagas/", color: "hover:bg-blue-500/10 hover:border-blue-500/30 text-blue-400" },
    { name: "TikTok", icon: <FaTiktok />, url: "https://www.tiktok.com/@diptaaonly", color: "hover:bg-cyan-500/10 hover:border-cyan-500/30 text-cyan-400" },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <MacOsFinder title="About Me" onClose={onClose}>
          <SectionHeading>About Me</SectionHeading>
          
          {/* LAYOUT UTAMA: BIO & FOTO */}
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            
            {/* Bagian Kiri: Narasi, Status Spek, dan Tombol */}
            <div className="flex-1 text-xs md:text-sm order-2 md:order-1 w-full">
              <p className="text-white/70 leading-relaxed mb-6 text-justify">
                I'm a front-end developer based in Indonesia who enjoys building clean, responsive, and user-focused web experiences. I focus on modern technologies like React and TypeScript to create fast, scalable, and high-performance interfaces.
              </p>

              {/* Tambahan Info Diagnostik Diri ala Mac System Info */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.01] font-mono text-[11px] mb-6">
                <div>
                  <p className="text-white/30">// STATUS</p>
                  <p className="text-emerald-400 font-semibold">● Available for Hire</p>
                </div>
                <div>
                  <p className="text-white/30">// LOCATION</p>
                  <p className="text-white/80">Malang, Indonesia</p>
                </div>
                <div>
                  <p className="text-white/30">// CURRENT STACK</p>
                  <p className="text-white/80">React / TS / Tailwind</p>
                </div>
                <div>
                  <p className="text-white/30">// INTERESTS</p>
                  <p className="text-[#9A1412]">UI Design & Clean Code</p>
                </div>
              </div>

              {/* Tombol Email Hubungi Saya */}
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=pradiptabagas509@gmail.com" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#9A1412] hover:bg-[#b51c19] transition-all shadow-[0_4px_12px_rgba(154,20,18,0.2)] hover:shadow-[0_4px_20px_rgba(154,20,18,0.4)] hover:-translate-y-0.5 active:translate-y-0"
              >
                <Mail size={12} /> Let's Collaborate
              </a>
            </div>

            {/* Bagian Kanan: Foto Profil dengan Efek Frame Premium */}
            <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 order-1 md:order-2 relative group">
              {/* Efek Gradasi Aksen Merah di Belakang Foto saat di-hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#9A1412] to-[#9A1412] rounded-3xl blur-md opacity-20 group-hover:opacity-50 transition-opacity duration-500" />
              
              {/* Container Bingkai Foto */}
              <div className="w-full h-full rounded-2xl overflow-hidden border border-white/10 p-1 bg-[#121212] relative z-10">
                <img 
                  src="/profile.png" // Kamu bisa ganti ke /profile1.jpg sesuai seleramu yang ada di folder public
                  alt="Pradipta Bagas" 
                  className="w-full h-full object-cover rounded-xl brightness-90 grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" 
                />
              </div>
            </div>
          </div>

          <hr className="border-white/5 my-6" />

          {/* BAGIAN BAWAH: SOCIAL MEDIA CHANNELS (GAYA MAC APP DOCK) */}
          <div>
            <h4 className="text-xs font-bold text-neutral-500 font-mono mb-3 px-1">// CONNECT WITH ME</h4>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -3 }}
                  className={`flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 transition-all duration-300 group ${social.color}`}
                >
                  <div className="text-lg group-hover:scale-110 transition-transform">
                    {social.icon}
                  </div>
                  <span className="text-xs font-semibold text-white/60 group-hover:text-white transition-colors">
                    {social.name}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>

        </MacOsFinder>
      </div>
    </div>
  );
};

// ===== MAIN PORTFOLIO CONTROLLER =====
export default function Portfolio() {
  const [activeMenu, setActiveMenu] = useState("home");
  const [openWindows, setOpenWindows] = useState({
    projects: false,
    education: false,
    skills: false,
    about: false,
  });

  const handleMenuClick = (id: string) => {
    setActiveMenu(id);
    if (id === "home") {
      // Tutup semua jendela jika klik Home
      setOpenWindows({ projects: false, education: false, skills: false, about: false });
    } else {
      // Buka jendela yang sesuai dan tutup jendela lain
      setOpenWindows({
        projects: id === "projects",
        education: id === "education",
        skills: id === "skills",
        about: id === "about",
      });
    }
  };

  const handleCloseWindow = (id: string) => {
    setOpenWindows(prev => ({ ...prev, [id]: false }));
    setActiveMenu("home");
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Utama Desktop */}
      <HomeSection />

      {/* Jendela-Jendela Finder Dua Panel */}
      <ProjectsSection isOpen={openWindows.projects} onClose={() => handleCloseWindow("projects")} />
      <EducationSection isOpen={openWindows.education} onClose={() => handleCloseWindow("education")} />
      <SkillsSection isOpen={openWindows.skills} onClose={() => handleCloseWindow("skills")} />
      <AboutSection isOpen={openWindows.about} onClose={() => handleCloseWindow("about")} />

      {/* Dock Sistem Navigasi macOS */}
      <Dock activeId={activeMenu} onMenuClick={handleMenuClick} />
    </div>
  );
}

// Export named jika dibutuhkan backward compatibility
export { Dock, HomeSection, ProjectsSection, EducationSection, SkillsSection, AboutSection };
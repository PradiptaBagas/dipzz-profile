import React from 'react';

interface MacOsFinderProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  onContentScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
}

export default function MacOsFinder({ title, onClose, children, onContentScroll }: MacOsFinderProps) {
  return (
    // Overlay latar belakang: memberikan padding kecil (p-2) di mobile agar jendela terlihat melayang estetik
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 md:p-4 bg-black/50 backdrop-blur-md animate-fade-in">
      
      {/* WINDOW UTAMA WINDOWS/MAC: 
          - Mobile: w-full h-[85vh] (tetap melayang dengan rounded-xl)
          - Desktop: max-w-[900px] h-[645px]
      */}
      <div 
        className="w-full h-[82vh] md:h-[645px] md:max-w-[900px] flex flex-col rounded-xl overflow-hidden bg-[#0f0f0f] text-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] font-sans transition-all duration-300"
        style={{
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 20px 50px -10px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.04) inset",
        }}
      >
        {/* WINDOW TOP BAR (Header Finder macOS) */}
        <div 
          className="flex items-center justify-between px-3 md:px-4 h-11 bg-[#161616] select-none shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          {/* Tombol Traffic Lights (Presisi khas Apple) */}
          <div className="flex items-center gap-1.5 w-16">
            <button 
              onClick={onClose} 
              className="w-3 h-3 rounded-full bg-[#ff5f56] flex items-center justify-center text-[7px] text-black/70 font-bold border border-[#e0443e] active:scale-90 transition-transform"
            >
              <span className="opacity-100 md:opacity-0 hover:opacity-100">x</span>
            </button>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]" />
          </div>
          
          {/* Jalur Folder Finder Aktif */}
          <span className="text-[10px] md:text-xs font-medium tracking-wide text-white/90 font-mono truncate px-2">
            Finder — {title}
          </span>
          
          {/* Spacer Kanan agar Judul tetap di tengah */}
          <div className="w-16 flex justify-end">
            <span className="text-[9px] text-[#9A1412] font-mono font-bold border border-[#9A1412]/30 px-1.5 py-0.5 rounded md:hidden">
              iOS
            </span>
          </div>
        </div>

        {/* SIDEBAR HORIZONTAL KHUSUS MOBILE (Muncul hanya di HP, menggantikan sidebar samping) */}
        <div className="md:hidden flex items-center bg-[#121212] px-3 py-1.5 border-b border-white/5 overflow-x-auto shrink-0 scrollbar-none">
          <span className="text-[9px] font-bold uppercase tracking-wider text-white/20 mr-3 font-mono">
            Fav:
          </span>
          <div className="flex gap-1.5">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/10 border border-white/5 rounded-md text-white">
              <span className="text-xs">🖥️</span>
              <span className="text-[10px] font-medium font-mono">All Files</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.02] border border-white/5 rounded-md text-white/40">
              <span className="text-xs">⬇️</span>
              <span className="text-[10px] font-medium font-mono">Downloads</span>
            </div>
          </div>
        </div>

        {/* WINDOW BODY */}
        <div className="flex flex-1 overflow-hidden">
          
          {/* SIDEBAR VERTIKAL KIRI (Hanya muncul di Desktop) */}
          <div className="hidden md:block w-48 bg-[#121212] p-4 border-r border-white/5 text-[11px] text-gray-500 select-none shrink-0">
            <p className="px-2 mb-2 font-bold uppercase tracking-wider text-[9px] text-white/30">Favorites</p>
            <ul className="space-y-1 text-gray-300 font-medium">
              <li className="flex items-center space-x-2.5 px-2.5 py-1.5 bg-white/10 rounded-md text-white">
                <span className="text-sm">🖥️</span> <span className="text-xs">All Files</span>
              </li>
              <li className="flex items-center space-x-2.5 px-2.5 py-1.5 hover:bg-white/5 rounded-md text-gray-600 cursor-not-allowed">
                <span className="text-sm">⬇️</span> <span className="text-xs">Downloads</span>
              </li>
            </ul>
          </div>

          {/* AREA KONTEN UTAMA SEBELAH KANAN (Isolasi Scroll internal tetap aktif) */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-10 bg-[#0f0f0f] custom-scrollbar" onScroll={onContentScroll}>
            {children}
          </div>

        </div>
      </div>
    </div>
  );
}
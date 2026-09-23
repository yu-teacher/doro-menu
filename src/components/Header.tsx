import React from 'react';
import { ActiveTab } from '../types/menu';
import { Sparkles, CircleDot, BookOpen, Image as ImageIcon } from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  activeMenuCount: number;
  onOpenGallery: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  activeMenuCount,
  onOpenGallery,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-pink-100 shadow-xs">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo & Brand */}
        <div 
          onClick={() => onTabChange('box')} 
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="relative">
            <img
              src="./doro/doro_logo.png"
              alt="DORO"
              className="w-10 h-10 object-contain group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 drop-shadow-sm"
            />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-black text-xl tracking-tight text-slate-800">
                도로<span className="text-pink-500">메뉴</span>
              </h1>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-pink-100 text-pink-600 border border-pink-200">
                Doro Menu
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">메뉴 정해주는 도로롱 🌸</p>
          </div>
        </div>

        {/* Tab Navigation & Gallery Button */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => onTabChange('box')}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'box'
                ? 'bg-pink-500 text-white shadow-md shadow-pink-200 scale-105'
                : 'text-slate-600 hover:text-pink-600 hover:bg-pink-50'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden xs:inline">깡통 뽑기</span>
          </button>

          <button
            onClick={() => onTabChange('roulette')}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'roulette'
                ? 'bg-pink-500 text-white shadow-md shadow-pink-200 scale-105'
                : 'text-slate-600 hover:text-pink-600 hover:bg-pink-50'
            }`}
          >
            <CircleDot className="w-4 h-4" />
            <span className="hidden xs:inline">돌려돌려 룰렛</span>
          </button>

          <button
            onClick={() => onTabChange('book')}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'book'
                ? 'bg-pink-500 text-white shadow-md shadow-pink-200 scale-105'
                : 'text-slate-600 hover:text-pink-600 hover:bg-pink-50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden xs:inline">메뉴 수첩</span>
            <span className="hidden sm:inline-block text-[11px] px-1.5 py-0.2 rounded-full bg-pink-100 text-pink-600 font-semibold">
              {activeMenuCount}
            </span>
          </button>

          <button
            onClick={onOpenGallery}
            className="flex items-center gap-1 px-2 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-pink-600 hover:bg-pink-50 transition-colors cursor-pointer border border-pink-100"
            title="도로롱 짤 보물창고 열기"
          >
            <ImageIcon className="w-4 h-4 text-pink-500" />
            <span className="hidden md:inline">짤창고 (55)</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

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
          className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group select-none shrink-0"
        >
          <div className="relative shrink-0">
            <img
              src="./doro/doro_logo.png"
              alt="DORO"
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 drop-shadow-sm"
            />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5 sm:h-3 sm:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-full w-full bg-pink-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <h1 className="font-black text-lg sm:text-xl tracking-tight text-slate-800 whitespace-nowrap">
                도로<span className="text-pink-500">메뉴</span>
              </h1>
              <span className="hidden xs:inline text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-pink-100 text-pink-600 border border-pink-200">
                Menu
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block whitespace-nowrap">메뉴 정해주는 도로롱 🌸</p>
          </div>
        </div>

        {/* Tab Navigation & Gallery Button */}
        <nav className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          <button
            onClick={() => onTabChange('box')}
            className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'box'
                ? 'bg-pink-500 text-white shadow-md shadow-pink-200'
                : 'text-slate-600 hover:text-pink-600 hover:bg-pink-50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="sm:inline hidden">깡통 뽑기</span>
            <span className="inline sm:hidden">뽑기</span>
          </button>

          <button
            onClick={() => onTabChange('roulette')}
            className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'roulette'
                ? 'bg-pink-500 text-white shadow-md shadow-pink-200'
                : 'text-slate-600 hover:text-pink-600 hover:bg-pink-50'
            }`}
          >
            <CircleDot className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="sm:inline hidden">돌려돌려 룰렛</span>
            <span className="inline sm:hidden">룰렛</span>
          </button>

          <button
            onClick={() => onTabChange('book')}
            className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'book'
                ? 'bg-pink-500 text-white shadow-md shadow-pink-200'
                : 'text-slate-600 hover:text-pink-600 hover:bg-pink-50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="sm:inline hidden">메뉴 수첩</span>
            <span className="inline sm:hidden">수첩</span>
            <span className="text-[10px] sm:text-[11px] px-1 sm:px-1.5 py-0.2 rounded-full bg-pink-100 text-pink-600 font-semibold shrink-0">
              {activeMenuCount}
            </span>
          </button>

          <button
            onClick={onOpenGallery}
            className="flex items-center gap-1 px-1.5 sm:px-2 py-1.5 sm:py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-pink-600 hover:bg-pink-50 transition-colors cursor-pointer border border-pink-100 shrink-0 whitespace-nowrap"
            title="도로롱 짤 보물창고 열기"
          >
            <ImageIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-500 shrink-0" />
            <span className="sm:inline hidden">짤창고 (55)</span>
            <span className="inline sm:hidden">짤</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

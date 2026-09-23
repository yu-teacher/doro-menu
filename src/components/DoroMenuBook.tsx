import React, { useState } from 'react';
import { MenuItem, Category } from '../types/menu';
import { CATEGORIES, getMenuAvatar } from '../constants/doroAssets';
import { Plus, Search, Trash2, Check, X, RotateCcw } from 'lucide-react';

interface DoroMenuBookProps {
  menus: MenuItem[];
  onToggleMenu: (id: string, enabled: boolean) => void;
  onAddMenu: (menu: Omit<MenuItem, 'id' | 'isCustom' | 'enabled'>) => void;
  onDeleteMenu: (id: string) => void;
  onResetMenus: () => void;
}

export const DoroMenuBook: React.FC<DoroMenuBookProps> = ({
  menus,
  onToggleMenu,
  onAddMenu,
  onDeleteMenu,
  onResetMenus,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [isAdding, setIsAdding] = useState(false);

  // 새 메뉴 폼 상태
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<Category>('korean');
  const [newDesc, setNewDesc] = useState('');
  const [newQuote, setNewQuote] = useState('');

  const filteredMenus = menus.filter(menu => {
    const matchCategory = selectedCategory === 'all' || menu.category === selectedCategory;
    const matchSearch =
      search.trim() === '' ||
      menu.name.toLowerCase().includes(search.toLowerCase()) ||
      menu.description.toLowerCase().includes(search.toLowerCase()) ||
      menu.tags?.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchCategory && matchSearch;
  });

  const activeCount = menus.filter(m => m.enabled).length;

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    onAddMenu({
      name: newName.trim(),
      category: newCategory,
      description: newDesc.trim() || '우리 동네/회사의 비밀 단골 맛집 메뉴',
      doroQuote: newQuote.trim() || `${newName.trim()}도 정말 맛있다 도로롱!`,
      tags: ['커스텀', '단골'],
    });

    setNewName('');
    setNewDesc('');
    setNewQuote('');
    setIsAdding(false);
  };

  return (
    <div className="max-w-3xl mx-auto py-4 px-4">
      {/* Header Summary & Reset */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <span>📖 도로롱의 메뉴 수첩</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-pink-100 text-pink-700">
              {activeCount} / {menus.length} 활성화
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            체크 해제한 메뉴는 깡통 뽑기와 룰렛 추천 대상에서 자동으로 제외된다 도로롱!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center gap-1.5 py-2 px-3.5 bg-pink-500 hover:bg-pink-600 text-white rounded-xl text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>내 맛집 추가</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('모든 메뉴를 기본 상태로 되돌릴까 도로롱? (직접 추가한 메뉴는 삭제됩니다)')) {
                onResetMenus();
              }
            }}
            className="flex items-center gap-1 py-2 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-semibold active:scale-95 transition-all cursor-pointer"
            title="기본값 초기화"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">초기화</span>
          </button>
        </div>
      </div>

      {/* Add Custom Menu Form Modal/Collapse */}
      {isAdding && (
        <form
          onSubmit={handleAddSubmit}
          className="glass-panel rounded-2xl p-5 mb-4 border-2 border-pink-300 animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-900">✨ 새로운 단골 메뉴 추가하기</h3>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                메뉴 이름 *
              </label>
              <input
                type="text"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                placeholder="예: 백암순대국, 버거킹 와퍼"
                required
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-pink-500 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                카테고리 *
              </label>
              <select
                value={newCategory}
                onChange={e => setNewCategory(e.target.value as Category)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-pink-500 bg-white"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.emoji} {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                메뉴 한 줄 설명
              </label>
              <input
                type="text"
                value={newDesc}
                onChange={e => setNewDesc(e.target.value)}
                placeholder="예: 회사 뒤편 3분 거리 깍두기 맛집"
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-pink-500 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                도로롱의 한마디 대사
              </label>
              <input
                type="text"
                value={newQuote}
                onChange={e => setNewQuote(e.target.value)}
                placeholder="예: 국물이 끝내주게 찐하다 도로롱!"
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-pink-500 bg-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="py-1.5 px-3 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100"
            >
              취소
            </button>
            <button
              type="submit"
              className="py-1.5 px-4 rounded-lg text-xs font-bold bg-pink-500 hover:bg-pink-600 text-white shadow-xs"
            >
              수첩에 등록하기
            </button>
          </div>
        </form>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="메뉴명, 태그, 설명 검색..."
            className="w-full text-xs pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-pink-500 shadow-2xs"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Filter Dropdown / Horizontal Scroll */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-slate-800 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            전체
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-2.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1 ${
                selectedCategory === cat.id
                  ? 'bg-pink-500 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-pink-300'
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Menu Cards Grid */}
      {filteredMenus.length === 0 ? (
        <div className="text-center py-16 text-slate-400 text-xs">
          검색 조건에 맞는 메뉴가 없다 도로롱! 단골 메뉴를 추가해보라 도로롱!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {filteredMenus.map(menu => {
            const cat = CATEGORIES.find(c => c.id === menu.category);
            const avatarUrl = getMenuAvatar(menu);
            return (
              <div
                key={menu.id}
                className={`p-3.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 ${
                  menu.enabled
                    ? 'bg-white border-slate-200/80 shadow-2xs hover:border-pink-200'
                    : 'bg-slate-50/70 border-slate-200 opacity-50'
                }`}
              >
                {/* Doro Avatar Thumbnail */}
                <div className="relative w-12 h-12 rounded-xl bg-pink-50 border border-pink-100 overflow-hidden shrink-0 flex items-center justify-center shadow-2xs">
                  <img
                    src={avatarUrl}
                    alt={menu.name}
                    loading="lazy"
                    className="w-full h-full object-contain p-0.5 hover:scale-110 transition-transform"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-xs">{cat?.emoji}</span>
                    <h4 className="font-bold text-sm text-slate-900 truncate">
                      {menu.name}
                    </h4>
                    {menu.isCustom && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-amber-100 text-amber-700">
                        MY
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-1">
                    {menu.description}
                  </p>
                  <p className="text-[11px] text-pink-600 font-medium mt-1 truncate">
                    💬 "{menu.doroQuote}"
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {/* Enable / Disable Toggle */}
                  <button
                    onClick={() => onToggleMenu(menu.id, !menu.enabled)}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                      menu.enabled
                        ? 'bg-pink-500 text-white'
                        : 'bg-slate-200 text-slate-400 hover:bg-slate-300'
                    }`}
                    title={menu.enabled ? '추천 활성화됨' : '추천에서 제외됨'}
                  >
                    <Check className="w-4 h-4" />
                  </button>

                  {/* Delete button for custom menu */}
                  {menu.isCustom && (
                    <button
                      onClick={() => onDeleteMenu(menu.id)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                      title="메뉴 삭제"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

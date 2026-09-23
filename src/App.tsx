import { useState, useEffect } from 'react';
import { MenuItem, ActiveTab } from './types/menu';
import { menuStorage } from './services/menuStorage';
import { Header } from './components/Header';
import { DoroBoxPick } from './components/DoroBoxPick';
import { DoroRoulette } from './components/DoroRoulette';
import { DoroMenuBook } from './components/DoroMenuBook';
import { DoroGalleryModal } from './components/DoroGalleryModal';

import { trackEvent } from './utils/analytics';

export function App() {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [activeTab, setActiveTab] = useState<ActiveTab>('box');
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  useEffect(() => {
    const loaded = menuStorage.getMenus();
    setMenus(loaded);
  }, []);

  const handleToggleMenu = (id: string, enabled: boolean) => {
    menuStorage.toggleMenu(id, enabled);
    setMenus(prev => prev.map(m => m.id === id ? { ...m, enabled } : m));
  };

  const handleAddMenu = (menuData: Omit<MenuItem, 'id' | 'isCustom' | 'enabled'>) => {
    const created = menuStorage.addCustomMenu(menuData);
    trackEvent('custom_menu_add', { menu_name: created.name, category: created.category });
    setMenus(prev => [created, ...prev]);
  };

  const handleDeleteMenu = (id: string) => {
    menuStorage.deleteMenu(id);
    setMenus(prev => prev.filter(m => m.id !== id));
  };

  const handleResetMenus = () => {
    const defaults = menuStorage.resetToDefault();
    setMenus(defaults);
  };

  const activeCount = menus.filter(m => m.enabled).length;

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-pink-300 selection:text-pink-900">
      <div>
        {/* Sticky Header with Navigation Tabs & Gallery Trigger */}
        <Header
          activeTab={activeTab}
          onTabChange={(tab) => {
            trackEvent('tab_change', { tab });
            setActiveTab(tab);
          }}
          activeMenuCount={activeCount}
          onOpenGallery={() => {
            trackEvent('gallery_open');
            setIsGalleryOpen(true);
          }}
        />

        {/* Main Content Area */}
        <main className="max-w-4xl mx-auto px-4 py-3 sm:py-6">
          {activeTab === 'box' && (
            <DoroBoxPick menus={menus} />
          )}

          {activeTab === 'roulette' && (
            <DoroRoulette menus={menus} />
          )}

          {activeTab === 'book' && (
            <DoroMenuBook
              menus={menus}
              onToggleMenu={handleToggleMenu}
              onAddMenu={handleAddMenu}
              onDeleteMenu={handleDeleteMenu}
              onResetMenus={handleResetMenus}
            />
          )}
        </main>
      </div>

      {/* Doro 55+ Image Gallery Modal */}
      <DoroGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />

      {/* Footer */}
      <footer className="py-6 border-t border-pink-100 bg-white/50 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="flex items-center gap-1">
            <span>🌸</span>
            <strong>도로메뉴 (Doro Menu)</strong>
            <span>- 세상의 모든 결정장애를 구원한다 도로롱!</span>
          </p>
          <p className="text-[11px] text-slate-400">
            Powered by Doro Ecosystem & Antigravity
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

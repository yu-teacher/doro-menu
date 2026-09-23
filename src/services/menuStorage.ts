import { MenuItem, StorageService } from '../types/menu';
import { DEFAULT_MENUS } from '../constants/defaultMenus';

const STORAGE_KEY_V2 = 'doro_menu_items_v2';
const STORAGE_KEY_V1 = 'doro_menu_items_v1';

class LocalStorageMenuStorage implements StorageService {
  getMenus(): MenuItem[] {
    try {
      const dataV2 = localStorage.getItem(STORAGE_KEY_V2);
      if (dataV2) {
        const parsed = JSON.parse(dataV2) as MenuItem[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }

      // V1 데이터가 있다면 커스텀 메뉴 추출 후 신규 120종 기본 메뉴와 병합
      const dataV1 = localStorage.getItem(STORAGE_KEY_V1);
      let customMenus: MenuItem[] = [];
      if (dataV1) {
        try {
          const parsedV1 = JSON.parse(dataV1) as MenuItem[];
          if (Array.isArray(parsedV1)) {
            customMenus = parsedV1.filter(m => m.isCustom);
          }
        } catch {
          // ignore
        }
      }

      const merged = [...customMenus, ...DEFAULT_MENUS];
      this.saveMenus(merged);
      return merged;
    } catch (e) {
      console.error('Failed to load menus from localStorage', e);
      return DEFAULT_MENUS;
    }
  }

  saveMenus(menus: MenuItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEY_V2, JSON.stringify(menus));
    } catch (e) {
      console.error('Failed to save menus to localStorage', e);
    }
  }

  addCustomMenu(menuData: Omit<MenuItem, 'id' | 'isCustom' | 'enabled'>): MenuItem {
    const current = this.getMenus();
    const newMenu: MenuItem = {
      ...menuData,
      id: `custom_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      isCustom: true,
      enabled: true,
    };
    const updated = [newMenu, ...current];
    this.saveMenus(updated);
    return newMenu;
  }

  deleteMenu(id: string): void {
    const current = this.getMenus();
    const updated = current.filter(m => m.id !== id);
    this.saveMenus(updated);
  }

  toggleMenu(id: string, enabled: boolean): void {
    const current = this.getMenus();
    const updated = current.map(m => m.id === id ? { ...m, enabled } : m);
    this.saveMenus(updated);
  }

  resetToDefault(): MenuItem[] {
    this.saveMenus(DEFAULT_MENUS);
    return DEFAULT_MENUS;
  }
}

export const menuStorage: StorageService = new LocalStorageMenuStorage();

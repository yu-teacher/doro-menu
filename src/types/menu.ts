export type Category = 
  | 'korean'
  | 'chinese'
  | 'japanese'
  | 'western'
  | 'snack'
  | 'asian'
  | 'fastfood'
  | 'diet'
  | 'night'
  | 'dessert';

export interface CategoryInfo {
  id: Category;
  name: string;
  emoji: string;
  color: string;
  badgeBg: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: Category;
  description: string;
  doroQuote: string;
  tags?: string[];
  isCustom?: boolean;
  enabled: boolean;
  specialDoroEmotion?: DoroEmotion;
}

export type DoroEmotion = 
  | 'idle'         // doro_beggar.png (깡통 구걸)
  | 'thinking'     // doro_think.png (수학 공식 고뇌)
  | 'point'        // doro_point.png (손가락 콕 저거다!)
  | 'eating'       // doro_eating.png (팝콘 냠냠)
  | 'angry'        // doro_angry.png (극대노 부들부들)
  | 'scream'       // doro_scream.jpg (절규)
  | 'fat'          // doro_fat.png (거대 뚱도로롱)
  | 'melt'         // doro_melt.png (흐물흐물 녹아내림)
  | 'butt'         // doro_butt.png (엉덩이 씰룩)
  | 'walk'         // doro_walk.png (터벅터벅 걸어감)
  | 'chef'         // doro_chef.jpg (요리사 도로롱)
  | 'ramen'        // doro_ramen.jpg (라멘 도로롱)
  | 'coffee'       // doro_coffee.jpg (아아메 도로롱)
  | 'beer'         // doro_beer.jpg (생맥주 도로롱)
  | 'burger'       // doro_burger.jpg (햄버거 와구와구)
  | 'pizza'        // doro_pizza.jpg (치즈 쭉 늘어나는 피자)
  | 'spicy'        // doro_spicy.jpg (불뿜는 매운맛)
  | 'salad'        // doro_salad.jpg (샐러드 풀뜯으며 눈물)
  | 'soup'         // doro_soup.jpg (뚝배기 국밥 드링킹)
  | 'icecream'     // doro_icecream.jpg (아이스크림 핥기)
  | 'sushi'        // doro_sushi.jpg (연어초밥 한입 꿀꺽)
  | 'chicken'      // doro_chicken.jpg (바삭 치킨 닭다리)
  | 'tteokbokki'   // doro_tteokbokki.jpg (떡볶이 & 튀김 분식)
  | 'bread'        // doro_bread.jpg (크루아상 & 도넛)
  | 'bbq'          // doro_bbq.jpg (삼겹살 상추쌈)
  | 'dimsum'       // doro_dimsum.jpg (딤섬 찜기 도로롱)
  | 'fire_coding'  // doro_fire_coding.gif (불타는 키보드 연타)
  | 'dance_happy'  // doro_dance_happy.gif (행복한 댄스 챌린지)
  | 'plush_dance'  // doro_plush_dance.gif (실사 인형 씰룩 댄스)
  | 'flight_jump'  // doro_flight_jump.gif (승무원 모자 점프)
  | 'tumbleweed';  // doro_tumbleweed.gif (바람에 굴러가는 쿠션)

export type ActiveTab = 'box' | 'roulette' | 'book';

export interface StorageService {
  getMenus(): MenuItem[];
  saveMenus(menus: MenuItem[]): void;
  addCustomMenu(menu: Omit<MenuItem, 'id' | 'isCustom' | 'enabled'>): MenuItem;
  deleteMenu(id: string): void;
  toggleMenu(id: string, enabled: boolean): void;
  resetToDefault(): MenuItem[];
}

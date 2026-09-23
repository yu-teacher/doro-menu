import { Category, CategoryInfo, DoroEmotion, MenuItem } from '../types/menu';

export const DORO_IMAGES: Record<DoroEmotion, string> = {
  idle: './doro/doro_beggar.png',
  thinking: './doro/doro_think.png',
  point: './doro/doro_point.png',
  eating: './doro/doro_eating.png',
  angry: './doro/doro_angry.png',
  scream: './doro/doro_scream.jpg',
  fat: './doro/doro_fat.png',
  melt: './doro/doro_melt.png',
  butt: './doro/doro_butt.png',
  walk: './doro/doro_walk.png',
  chef: './doro/doro_chef.jpg',
  ramen: './doro/doro_ramen.jpg',
  coffee: './doro/doro_coffee.jpg',
  beer: './doro/doro_beer.jpg',
  burger: './doro/doro_burger.jpg',
  pizza: './doro/doro_pizza.jpg',
  spicy: './doro/doro_spicy.jpg',
  salad: './doro/doro_salad.jpg',
  soup: './doro/doro_soup.jpg',
  icecream: './doro/doro_icecream.jpg',
  sushi: './doro/doro_sushi.jpg',
  chicken: './doro/doro_chicken.jpg',
  tteokbokki: './doro/doro_tteokbokki.jpg',
  bread: './doro/doro_bread.jpg',
  bbq: './doro/doro_bbq.jpg',
  dimsum: './doro/doro_dimsum.jpg',
  fire_coding: './doro/doro_fire_coding.gif',
  dance_happy: './doro/doro_dance_happy.gif',
  plush_dance: './doro/doro_plush_dance.gif',
  flight_jump: './doro/doro_flight_jump.gif',
  tumbleweed: './doro/doro_tumbleweed.gif',
};

// 카테고리별 대표 도로롱 아바타
export const CATEGORY_DORO_AVATARS: Record<Category, string> = {
  korean: './doro/doro_soup.jpg',
  japanese: './doro/doro_sushi.jpg',
  chinese: './doro/doro_dimsum.jpg',
  western: './doro/doro_pizza.jpg',
  snack: './doro/doro_tteokbokki.jpg',
  asian: './doro/doro_ramen.jpg',
  fastfood: './doro/doro_burger.jpg',
  diet: './doro/doro_salad.jpg',
  night: './doro/doro_beer.jpg',
  dessert: './doro/doro_icecream.jpg',
};

export const CATEGORIES: CategoryInfo[] = [
  { id: 'korean', name: '한식', emoji: '🍚', color: '#f97316', badgeBg: 'bg-orange-100 text-orange-700' },
  { id: 'japanese', name: '일식', emoji: '🍣', color: '#ec4899', badgeBg: 'bg-pink-100 text-pink-700' },
  { id: 'chinese', name: '중식', emoji: '🥟', color: '#ef4444', badgeBg: 'bg-red-100 text-red-700' },
  { id: 'western', name: '양식', emoji: '🍝', color: '#8b5cf6', badgeBg: 'bg-purple-100 text-purple-700' },
  { id: 'snack', name: '분식', emoji: '🍢', color: '#f59e0b', badgeBg: 'bg-amber-100 text-amber-700' },
  { id: 'asian', name: '아시안', emoji: '🍜', color: '#10b981', badgeBg: 'bg-emerald-100 text-emerald-700' },
  { id: 'fastfood', name: '패스트푸드', emoji: '🍔', color: '#eab308', badgeBg: 'bg-yellow-100 text-yellow-800' },
  { id: 'diet', name: '다이어트/가벼운', emoji: '🥗', color: '#84cc16', badgeBg: 'bg-lime-100 text-lime-700' },
  { id: 'night', name: '야식/술안주', emoji: '🍗', color: '#6366f1', badgeBg: 'bg-indigo-100 text-indigo-700' },
  { id: 'dessert', name: '디저트/카페', emoji: '☕', color: '#a855f7', badgeBg: 'bg-fuchsia-100 text-fuchsia-700' },
];

export const DORO_IDLE_POOL: { emotion: DoroEmotion; quote: string }[] = [
  { emotion: 'idle', quote: '배고프다 도로롱... 오늘 뭐 먹을 거냐 도로롱?' },
  { emotion: 'flight_jump', quote: '안내원 도로롱이다 도로롱! 깡총깡총 코인 넣어라 도로롱!' },
  { emotion: 'walk', quote: '맛집 찾으러 네발로 방황 중이다 도로롱...' },
  { emotion: 'butt', quote: '엉덩이 씰룩거리며 기다리는 중이다 도로롱~' },
  { emotion: 'bread', quote: '빵 먹고 싶다 도로롱... 빵 냄새 솔솔 난다 도로롱' },
  { emotion: 'burger', quote: '버거 땡기면 언제든 말하라 도로롱!' },
  { emotion: 'icecream', quote: '달콤한 디저트도 정해줄 수 있다 도로롱!' },
];

export const DORO_POKE_REACTIONS: { emotion: DoroEmotion; quote: string }[] = [
  { emotion: 'scream', quote: '으악! 왜 찌르냐 도로롱! 깜짝 놀랐다 도로롱!' },
  { emotion: 'angry', quote: '자꾸 찌르면 깡통 엎어버린다 도로롱! 💢' },
  { emotion: 'butt', quote: '히히 간지럽다 도로롱~ 엉덩이 흔들흔들~' },
  { emotion: 'dance_happy', quote: '신난다 도로롱! 둠칫둠칫 댄스 타임!' },
  { emotion: 'fat', quote: '뱃살 찌르지 마라 도로롱! 뚱도로롱 아니란 말이다 도로롱!' },
  { emotion: 'fire_coding', quote: '건드리지 마라 도로롱! 코딩에 집중 중이다 도로롱!!' },
];

export const DORO_IDLE_QUOTES = [
  "배고프다 도로롱... 오늘 뭐 먹을 거냐 도로롱?",
  "깡통에 코인 넣으면 끝내주는 메뉴를 점지해주겠다 도로롱!",
  "메뉴 못 고르는 불쌍한 인간을 구원하러 왔다 도로롱.",
  "빨리 골라라 도로롱... 나도 배에서 꼬르륵 소리 난다 도로롱.",
  "선택 장애엔 도로롱이 약이다 도로롱!",
];

export const DORO_THINKING_QUOTES = [
  "도로롱의 우주적 두뇌가 최적의 칼로리를 계산 중이다 도로롱...",
  "수학 공식이 머릿속을 스쳐 지나간다 도로롱... E = mc²...",
  "당신의 위장 상태와 날씨 데이터를 분석 중이다 도로롱...",
  "음... 이건 어떨까 도로롱... 고뇌 중이다 도로롱...",
];

export const DORO_REJECT_QUOTES = [
  [
    "으아악! 왜 안 먹겠다는 거냐 도로롱! 맛있는데 도로롱!",
    "치... 도로롱의 픽을 거부하다니 간이 배 밖으로 나왔다 도로롱.",
    "다시 뽑아보겠다 도로롱! 이번엔 먹어야 한다 도로롱.",
  ],
  [
    "또 싫다고?! 이 까다로운 혓바닥을 어쩌면 좋냐 도로롱!",
    "도로롱의 정성을 무시하지 마라 도로롱! (부들부들)",
    "도대체 먹고 싶은 게 뭐냐 도로롱! 절규가 절로 나온다 도로롱!",
  ],
  [
    "골라줘도 난리냐 도로롱! 그냥 아무거나 처먹으라 도로롱!! 💢",
    "도로롱 파업이다 도로롱! 깡통 엎어버리기 전에 닥치고 먹으라 도로롱! 💥",
    "더 이상은 못 참는다 도로롱! 이럴 거면 편의점 삼각김밥이나 씹으라 도로롱! 😡",
  ],
];

export function getEmotionForCategory(category: Category, tags: string[] = []): DoroEmotion {
  if (tags.includes('매운') || tags.includes('매콤') || tags.includes('얼큰')) {
    return 'spicy';
  }
  if (tags.includes('치킨')) return 'chicken';
  if (tags.includes('버거')) return 'burger';
  if (tags.includes('피자')) return 'pizza';
  if (tags.includes('국밥') || tags.includes('국물') || tags.includes('찌개')) return 'soup';
  if (tags.includes('초밥') || tags.includes('스시') || tags.includes('회')) return 'sushi';
  if (tags.includes('고기') || tags.includes('구이')) return 'bbq';
  if (tags.includes('빵') || tags.includes('베이커리')) return 'bread';
  if (tags.includes('아이스크림') || tags.includes('빙수')) return 'icecream';
  if (tags.includes('샐러드') || tags.includes('클린') || tags.includes('가벼운')) return 'salad';
  if (tags.includes('만두') || tags.includes('딤섬')) return 'dimsum';
  if (tags.includes('분식') || tags.includes('떡볶이')) return 'tteokbokki';
  if (tags.includes('헤비')) return 'fat';

  switch (category) {
    case 'snack':
      return 'tteokbokki';
    case 'fastfood':
      return 'burger';
    case 'diet':
      return 'salad';
    case 'dessert':
      return 'icecream';
    case 'night':
      return 'beer';
    case 'japanese':
      return 'sushi';
    case 'chinese':
      return 'dimsum';
    case 'western':
      return 'pizza';
    case 'korean':
      return 'soup';
    default:
      return 'point';
  }
}

// 개별 메뉴 아이템에 꼭 맞는 썸네일 이미지 URL 반환
export function getMenuAvatar(menu: MenuItem): string {
  if (menu.specialDoroEmotion && DORO_IMAGES[menu.specialDoroEmotion]) {
    return DORO_IMAGES[menu.specialDoroEmotion];
  }
  const emotion = getEmotionForCategory(menu.category, menu.tags || []);
  return DORO_IMAGES[emotion] || CATEGORY_DORO_AVATARS[menu.category] || './doro/doro_eating.png';
}

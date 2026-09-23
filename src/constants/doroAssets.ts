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

export interface DoroAngerStage {
  level: number;
  emotion: DoroEmotion;
  thinkingEmotion: DoroEmotion;
  isShaking?: boolean;
  stageName: string;
  stageEmoji: string;
  thinkingButtonText: string;
  thinkingQuotes: string[];
  quotes: string[];
}

export const DORO_ANGER_STAGES: Record<number, DoroAngerStage> = {
  1: {
    level: 1,
    emotion: 'thinking',
    thinkingEmotion: 'thinking',
    stageName: '진지한 고뇌 도로롱',
    stageEmoji: '🤔',
    thinkingButtonText: '진지하게 다시 고뇌 중... 🤔',
    thinkingQuotes: [
      "흠... 이건 취향이 아니었던 건가 도로롱? 도로롱의 3000년 미식 데이터를 재가동한다 도로롱... 🤔",
      "수학 공식과 위장 알고리즘을 다시 계산해본다 도로롱... 고뇌 중이다 도로롱...",
      "손님의 까다로운 입맛을 만족시키기 위해 뇌세포를 풀가동한다 도로롱!",
    ],
    quotes: [
      "좋다 도로롱! 도로롱이 심사숙고 끝에 다시 엄선했다 도로롱! 이건 어떠냐 도로롱?! ✨",
      "고뇌의 결실이다 도로롱! 당신의 오늘 운명에 딱 맞는 메뉴다 도로롱!",
      "치... 이번 메뉴는 거절하지 못할 거다 도로롱!",
    ],
  },
  2: {
    level: 2,
    emotion: 'point',
    thinkingEmotion: 'fire_coding',
    stageName: '빅데이터 심화 분석',
    stageEmoji: '💻',
    thinkingButtonText: '빅데이터 폭풍 분석 중... 💻',
    thinkingQuotes: [
      "까다로운 손님이군 도로롱... 당신의 위장 빅데이터를 샅샅이 뒤져서 완벽한 메뉴를 찾아내겠다 도로롱! (안경 쓱)",
      "미식 알고리즘 2차 튜닝 중이다 도로롱! 타닥타닥타닥... 💻",
      "이번엔 진짜 만족시켜 주겠다 도로롱! 도로롱의 명예를 걸고 서치 중이다 도로롱!",
    ],
    quotes: [
      "찾았다 도로롱! 도로롱의 명예를 건 회심의 역작이다 도로롱! 🌟",
      "이것도 마음에 안 들면 당신 미각에 문제가 있는 거다 도로롱!",
      "자! 이번엔 군말 말고 이거 먹어라 도로롱!",
    ],
  },
  3: {
    level: 3,
    emotion: 'tumbleweed',
    thinkingEmotion: 'tumbleweed',
    stageName: '의아함 & 살짝 당황',
    stageEmoji: '💨',
    thinkingButtonText: '어리둥절 뇌세포 굴리는 중... 💨',
    thinkingQuotes: [
      "어라? 이것도 아니라고 도로롱? 내 미각 엔진에 미세한 오차가 발생한 건가 도로롱... 💨",
      "사막을 구르는 쿠션처럼 도로롱 머릿속이 복잡해진다 도로롱... 으아아...",
      "3연속 거절이라니... 도로롱 자존심에 작은 균열이 가기 시작했다 도로롱...",
    ],
    quotes: [
      "휴... 다시 골라왔다 도로롱! 설마 이것까지 퇴짜 놓진 않겠지 도로롱?",
      "도로롱 픽을 3번이나 차다니... 맛있는 거 가져왔으니 어서 봐라 도로롱!",
      "이번엔 진짜 타협해라 도로롱! 맛있는데 왜 그러냐 도로롱!",
    ],
  },
  4: {
    level: 4,
    emotion: 'melt',
    thinkingEmotion: 'melt',
    stageName: '자존심 스크래치 (멘붕)',
    stageEmoji: '🫠',
    thinkingButtonText: '멘탈 잡고 억지로 고민 중... 🫠',
    thinkingQuotes: [
      "흐물흐물... 도로롱 멘탈이 바닥에 녹아내린다 도로롱... 멘탈 부여잡는 중...",
      "배고파 죽겠는데 메뉴 고르다 하루 다 가겠다 도로롱... 흐물흐물...",
      "기 빨린다 도로롱... 하지만 도로롱의 사명감으로 억지로 뇌를 쥐어짠다 도로롱...",
    ],
    quotes: [
      "바닥에 녹아내린 멘탈을 주워 담아 다시 골라왔다 도로롱... 🫠",
      "이거 먹고 제발 도로롱 좀 그만 괴롭혀라 도로롱...",
      "녹아내리는 도로롱을 살릴 수 있는 유일한 메뉴다 도로롱...",
    ],
  },
  5: {
    level: 5,
    emotion: 'point',
    thinkingEmotion: 'point',
    stageName: '의심 가득 삿대질',
    stageEmoji: '👉',
    thinkingButtonText: '의심 가득 눈초리로 고르는 중... 👉',
    thinkingQuotes: [
      "야! 솔직히 말해라 도로롱! 먹고 싶은 게 있긴 한 거냐 도로롱?! 👉",
      "너 지금 도로롱 놀리려고 일부러 거절 누르는 거 다 알고 있다 도로롱!",
      "5번째다 도로롱! 손가락 부러지기 전에 얌전히 받아 적어라 도로롱!",
    ],
    quotes: [
      "자! 일루와 봐라 도로롱! 이래도 안 먹을 거냐 도로롱?! 👉",
      "당신의 선택 장애는 기네스북 등재감이다 도로롱! 팍씨!",
      "이번엔 핑계 댈 생각도 마라 도로롱! 딱 걸렸다 도로롱!",
    ],
  },
  6: {
    level: 6,
    emotion: 'fat',
    thinkingEmotion: 'fat',
    stageName: '스트레스 폭식 뚱도로롱',
    stageEmoji: '🍔',
    thinkingButtonText: '폭식하며 투덜투덜 고르는 중... 🍔',
    thinkingQuotes: [
      "스트레스 받아서 도로롱이 대신 폭식해서 뚱도로롱 됐다 도로롱!! 🍔",
      "우걱우걱... 내가 먹고 싶은 걸로 대충 때려 맞추겠다 도로롱! 쩝쩝...",
      "답답해서 도로롱 숨넘어간다 도로롱! 뱃살 늘어나는 소리 안 들리냐 도로롱?!",
    ],
    quotes: [
      "뚱도로롱이 배 터지게 먹고 싶은 걸로 골라왔다 도로롱! 🐷",
      "내가 눈앞에 있는 거 다 처먹기 전에 얌전히 이거 먹어라 도로롱!",
      "칼로리 폭탄으로 혼쭐을 내줄 거다 도로롱!",
    ],
  },
  7: {
    level: 7,
    emotion: 'butt',
    thinkingEmotion: 'butt',
    stageName: '엉덩이 시위 (보이콧)',
    stageEmoji: '🍑',
    thinkingButtonText: '엉덩이 흔들며 대충 찾는 중... 🍑',
    thinkingQuotes: [
      "몰라 도로롱! 도로롱 삐졌다 도로롱! 엉덩이나 보고 반성하라 도로롱! 뿡뿡!",
      "도로롱도 자존심이 있다 도로롱! 7번이나 차이다니 억울하다 도로롱!",
      "이제 도로롱 발가락으로 대충 골라줄 거다 도로롱! 흥칫뿡!",
    ],
    quotes: [
      "엉덩이로 고른 특제 메뉴다 도로롱! 🍑 뿡!",
      "퉤퉤! 도로롱의 황금 같은 추천을 쓰레기통에 처박다니 도로롱!",
      "군소리 말고 이거 먹고 반성문 써라 도로롱!",
    ],
  },
  8: {
    level: 8,
    emotion: 'fire_coding',
    thinkingEmotion: 'fire_coding',
    isShaking: true,
    stageName: '두뇌 과부하 (키보드 샷건)',
    stageEmoji: '🔥',
    thinkingButtonText: '두뇌 과부하 키보드 난타 중!! 🔥',
    thinkingQuotes: [
      "으아아아악!! 도로롱 두뇌 과부하 걸렸다 도로롱!! 🔥🔥 (키보드 샷건)",
      "내 분노의 폭풍 키보드 연타를 봐라 도로롱! 쾅쾅쾅쾅쾅!! 🔥",
      "인간의 선택 장애를 강제 포맷하는 바이러스를 심어버리겠다 도로롱!!",
    ],
    quotes: [
      "뇌에서 연기 뿜으면서 뽑아왔다 도로롱!! 🔥🔥",
      "서버 터지기 직전이다 도로롱! 그냥 먹어라 도로롱!!",
      "키보드 샷건 치다 나온 기적의 메뉴다 도로롱!!",
    ],
  },
  9: {
    level: 9,
    emotion: 'angry',
    thinkingEmotion: 'angry',
    isShaking: true,
    stageName: '폭발 직전 (마지막 경고)',
    stageEmoji: '😡',
    thinkingButtonText: '부들부들 마지막 인내심 가동... 😡',
    thinkingQuotes: [
      "도로롱 인내심 한계 게이지 99%다 도로롱... 부들부들... 😡",
      "마지막 경고다 도로롱... 한 번만 더 거절하면 진짜 국물도 없다 도로롱...",
      "도로롱 눈에서 레이저 나오는 거 안 보이냐 도로롱... 부들부들...",
    ],
    quotes: [
      "마지막 기회다 도로롱... 이거 안 먹으면 다음은 없다 도로롱... 😡",
      "도로롱 참을 인(忍) 세 번 다 썼다 도로롱... 먹어라 도로롱...",
      "경고했다 도로롱... 다음 거절 누르면 진짜 끝장이다 도로롱...",
    ],
  },
  10: {
    level: 10,
    emotion: 'angry',
    thinkingEmotion: 'angry',
    isShaking: true,
    stageName: '파업 돌입 도로롱 (배 째라)',
    stageEmoji: '💥',
    thinkingButtonText: '도로롱 파업 선언!! 💥',
    thinkingQuotes: [
      "안 해 도로롱! 도로롱 파업이다 도로롱!! 💢 그냥 아무거나 처먹으라 도로롱!!",
    ],
    quotes: [
      "안 해 도로롱! 도로롱 파업이다 도로롱!! 💢💥 골라줘도 난리더니 10번이나 차버려?! 그냥 아무거나 처먹으라 도로롱!! 😡",
      "도로롱은 이제 아무것도 안 정해줄 거다 도로롱! 냉장고 열어서 김치에 찬물 말아 쳐먹으라 도로롱!! 🍚",
      "도로롱 퇴근한다 도로롱! 굶든지 아무거나 주워 먹든지 알아서 하라 도로롱!! 🚪🏃💨",
    ],
  },
};

export const STRIKE_MENU: MenuItem = {
  id: 'doro_strike',
  name: '그냥 아무거나 처먹기 (도로롱 파업)',
  category: 'snack',
  description: '도로롱의 정성 어린 메뉴 추천을 10번이나 연속으로 걷어찬 자에게 내려진 최후의 형벌. 군소리 말고 눈앞에 보이는 걸 처먹으세요.',
  doroQuote: '더 이상은 못 참는다 도로롱! 냉장고 파먹기를 하든 편의점 삼각김밥을 씹든 그냥 아무거나 쳐먹으라 도로롱!! 😡💥',
  tags: ['도로롱파업', '강제배정', '처먹으라도로롱', '선택불가'],
  enabled: true,
  specialDoroEmotion: 'angry',
};

export interface DoroRouletteStage {
  level: number;
  emotion: DoroEmotion;
  isShaking?: boolean;
  buttonLabel: string;
  spinningQuote: string;
}

export const DORO_ROULETTE_STAGES: Record<number, DoroRouletteStage> = {
  1: {
    level: 1,
    emotion: 'plush_dance',
    buttonLabel: '룰렛 돌리기!',
    spinningQuote: '돌려돌려 돌림판! 털인형 도로롱이 댄스 추며 응원 중이다 도로롱~ 🎶',
  },
  2: {
    level: 2,
    emotion: 'plush_dance',
    buttonLabel: '룰렛 다시 돌리기!',
    spinningQuote: '또 돌린다 도로롱! 이번엔 어떤 맛있는 메뉴가 걸릴까 도로롱?! ✨',
  },
  3: {
    level: 3,
    emotion: 'dance_happy',
    buttonLabel: '룰렛 또 돌리기!',
    spinningQuote: '빙글빙글~ 아직까진 신나게 돌릴 수 있다 도로롱! 💃',
  },
  4: {
    level: 4,
    emotion: 'tumbleweed',
    buttonLabel: '또 돌리기... (어질어질 💫)',
    spinningQuote: '으... 도로롱 눈앞이 핑핑 돈다 도로롱... 그만 좀 돌려라 도로롱... 💫',
  },
  5: {
    level: 5,
    emotion: 'thinking',
    buttonLabel: '또 돌리기?! (빙글빙글 🌀)',
    spinningQuote: '돌리고 또 돌리고... 도로롱 뇌세포까지 같이 회전하는 중이다 도로롱... 🌀',
  },
  6: {
    level: 6,
    emotion: 'melt',
    buttonLabel: '또 돌려? (멀미 주의 🤢)',
    spinningQuote: '흐물흐물... 룰렛 바람 때문에 도로롱이 날아갈 것 같다 도로롱... 🫠',
  },
  7: {
    level: 7,
    emotion: 'melt',
    isShaking: true,
    buttonLabel: '또 돌리기 (토할 것 같음 🤮)',
    spinningQuote: '우웩! 도로롱 토할 것 같다 도로롱!! 살려달라 도로롱!! 🤢🤮',
  },
  8: {
    level: 8,
    emotion: 'fire_coding',
    isShaking: true,
    buttonLabel: '또 돌려?! (도로롱 과부하 🔥)',
    spinningQuote: '으아아악!! 룰렛 모터에서 불꽃 튄다 도로롱!! 🔥🔥 그만 돌려라 도로롱!!',
  },
  9: {
    level: 9,
    emotion: 'angry',
    isShaking: true,
    buttonLabel: '마지막 회전... (폭발 직전 😡)',
    spinningQuote: '도로롱 인내심 한계다 도로롱... 다음 회전 누르면 룰렛 부숴버릴 거다 도로롱... 😡💥',
  },
  10: {
    level: 10,
    emotion: 'angry',
    isShaking: true,
    buttonLabel: '도로롱 룰렛 파업!! (회전 불가 💥)',
    spinningQuote: '안 해 도로롱! 룰렛 바늘 뽑아버릴 거다 도로롱!! 💢 그냥 아무거나 처먹으라 도로롱!! 💥',
  },
};

export const DORO_REJECT_QUOTES = [
  DORO_ANGER_STAGES[1].quotes,
  DORO_ANGER_STAGES[2].quotes,
  DORO_ANGER_STAGES[3].quotes,
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

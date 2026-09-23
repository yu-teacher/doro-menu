import React, { useState } from 'react';
import { MenuItem, DoroEmotion } from '../types/menu';
import { DoroReaction } from './DoroReaction';
import { ResultCard } from './ResultCard';
import {
  DORO_IDLE_QUOTES,
  DORO_THINKING_QUOTES,
  DORO_IDLE_POOL,
  DORO_POKE_REACTIONS,
  DORO_ANGER_STAGES,
  STRIKE_MENU,
  getEmotionForCategory,
} from '../constants/doroAssets';
import { Sparkles, Coins, RefreshCw } from 'lucide-react';

interface DoroBoxPickProps {
  menus: MenuItem[];
}

export const DoroBoxPick: React.FC<DoroBoxPickProps> = ({ menus }) => {
  const [isPicking, setIsPicking] = useState(false);
  const [isRerolling, setIsRerolling] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);
  const [emotion, setEmotion] = useState<DoroEmotion>('idle');
  const [quote, setQuote] = useState<string>(DORO_IDLE_QUOTES[0]);
  const [rerollCount, setRerollCount] = useState(0);
  const [showCoin, setShowCoin] = useState(false);
  const [isAngryShaking, setIsAngryShaking] = useState(false);

  const activeMenus = menus.filter(m => m.enabled);

  // 컴포넌트 마운트 시 대기 도로롱 무작위 선정
  React.useEffect(() => {
    const randomIdle = DORO_IDLE_POOL[Math.floor(Math.random() * DORO_IDLE_POOL.length)];
    setEmotion(randomIdle.emotion);
    setQuote(randomIdle.quote);
  }, []);

  // 도로롱 쿡 찌르기 (Poke)
  const handlePoke = () => {
    if (isPicking || isRerolling) return;
    const randomReaction = DORO_POKE_REACTIONS[Math.floor(Math.random() * DORO_POKE_REACTIONS.length)];
    setEmotion(randomReaction.emotion);
    setQuote(randomReaction.quote);
    if (randomReaction.emotion === 'angry') {
      setIsAngryShaking(true);
      setTimeout(() => setIsAngryShaking(false), 800);
    }
  };

  const pickRandomMenu = () => {
    if (activeMenus.length === 0) return;

    setIsPicking(true);
    setShowCoin(true);
    setEmotion('fire_coding');
    const randomThinkingQuote =
      DORO_THINKING_QUOTES[Math.floor(Math.random() * DORO_THINKING_QUOTES.length)];
    setQuote(randomThinkingQuote);
    setIsAngryShaking(false);

    setTimeout(() => {
      setShowCoin(false);
      const randomIndex = Math.floor(Math.random() * activeMenus.length);
      const picked = activeMenus[randomIndex];
      setSelectedMenu(picked);
      setIsPicking(false);

      // 메뉴 특성에 따른 감정 결정
      let finalEmotion: DoroEmotion = 'point';
      if (picked.specialDoroEmotion) {
        finalEmotion = picked.specialDoroEmotion;
      } else {
        finalEmotion = getEmotionForCategory(picked.category, picked.tags || []);
      }

      setEmotion(finalEmotion);
      setQuote(picked.doroQuote);
    }, 1400);
  };

  const handleReroll = () => {
    if (isRerolling) return;
    const nextCount = rerollCount + 1;
    setRerollCount(nextCount);

    if (nextCount >= 10) {
      // 10단계 도달: 즉시 파업 선언! "그냥 아무거나 처먹으라 도로롱!"
      setIsAngryShaking(true);
      setEmotion('angry');
      const stage10 = DORO_ANGER_STAGES[10];
      const randomRejectQuote = stage10.quotes[Math.floor(Math.random() * stage10.quotes.length)];
      setQuote(randomRejectQuote);
      setSelectedMenu(STRIKE_MENU);
      return;
    }

    // 1-9단계: 고뇌(Thinking) 시퀀스 진입!
    setIsRerolling(true);
    const stage = DORO_ANGER_STAGES[nextCount] || DORO_ANGER_STAGES[9];
    setIsAngryShaking(Boolean(stage.isShaking));
    setEmotion(stage.thinkingEmotion);
    const randomThinkingQuote =
      stage.thinkingQuotes[Math.floor(Math.random() * stage.thinkingQuotes.length)];
    setQuote(randomThinkingQuote);

    // 1.2초간 진지한 고뇌 / 분석 / 투덜거림 연출 후 새 메뉴 점지!
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * activeMenus.length);
      const picked = activeMenus[randomIndex];
      setSelectedMenu(picked);
      setIsRerolling(false);

      // 새 메뉴 점지 후 도로롱 표정 및 대사
      setEmotion(stage.emotion);
      const randomRevealQuote = stage.quotes[Math.floor(Math.random() * stage.quotes.length)];
      setQuote(randomRevealQuote);
      setIsAngryShaking(Boolean(stage.isShaking));
    }, 1200);
  };

  const handleResetAnger = () => {
    setRerollCount(0);
    setIsAngryShaking(false);
    setEmotion('dance_happy');
    setQuote("흥... 깡통에 코인 넣고 진심으로 싹싹 비니까 이번 한 번만 봐준다 도로롱! 다시 골라줄 테니 앞으론 군말 말고 먹어라 도로롱! ✨");
    setTimeout(() => {
      pickRandomMenu();
    }, 1200);
  };

  if (activeMenus.length === 0) {
    return (
      <div className="text-center py-16">
        <DoroReaction
          emotion="melt"
          quote="활성화된 메뉴가 하나도 없다 도로롱... 메뉴 수첩에서 메뉴를 켜달라 도로롱!"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center max-w-lg mx-auto py-4 sm:py-6 px-4">
      {/* Coin Drop Animation overlay */}
      {showCoin && (
        <div className="fixed top-1/3 left-1/2 -translate-x-1/2 z-50 animate-coin-drop pointer-events-none">
          <div className="w-14 h-14 bg-amber-400 border-4 border-amber-200 rounded-full flex items-center justify-center shadow-2xl text-2xl">
            🪙
          </div>
        </div>
      )}

      {/* Main Doro Reaction */}
      <DoroReaction
        emotion={emotion}
        quote={quote}
        size={selectedMenu && !isPicking && !isRerolling ? 'md' : 'lg'}
        isShaking={isAngryShaking}
        onPoke={handlePoke}
        showPokeHint={!selectedMenu && !isPicking && !isRerolling}
      />

      {/* 3-State Layout: 1) Deliberating (Card GONE, Banner shown), 2) Selected (Card shown), 3) Initial (Big button) */}
      {isPicking || isRerolling ? (
        <div className="mt-6 flex flex-col items-center gap-3 w-full animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white font-black text-sm sm:text-base rounded-2xl shadow-xl shadow-pink-200/80 animate-pulse">
            <RefreshCw className="w-5 h-5 animate-spin shrink-0" />
            <span>
              {isRerolling
                ? (DORO_ANGER_STAGES[rerollCount]?.thinkingButtonText || '도로롱이 진지하게 고뇌 중... 🤔')
                : '도로롱이 신중하게 고뇌 중... 🤔'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-bold break-keep text-center animate-pulse">
            {isRerolling
              ? '이전 메뉴는 깡통에 털어 넣고, 새 메뉴를 고심하고 있다 도로롱!'
              : '도로롱의 3000년 미식 알고리즘이 풀가동 중이다 도로롱! ✨'}
          </p>
        </div>
      ) : selectedMenu ? (
        <div className="w-full mt-2 animate-in fade-in zoom-in-95 duration-500">
          <ResultCard
            menu={selectedMenu}
            onReroll={handleReroll}
            rerollCount={rerollCount}
            onResetAnger={handleResetAnger}
            mode="box"
          />
        </div>
      ) : (
        <div className="mt-4 flex flex-col items-center gap-3 w-full px-2">
          <button
            onClick={pickRandomMenu}
            className="group relative flex items-center justify-center gap-2 sm:gap-2.5 w-full max-w-sm sm:max-w-md py-3.5 sm:py-4 px-4 sm:px-8 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-black text-sm sm:text-lg rounded-2xl shadow-xl shadow-pink-300/60 active:scale-95 transition-all cursor-pointer disabled:opacity-50 whitespace-nowrap break-keep"
          >
            <Coins className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform shrink-0" />
            <span className="whitespace-nowrap break-keep tracking-tight sm:tracking-normal">
              깡통에 코인 넣고 메뉴 점지받기!
            </span>
            <Sparkles className="w-4 h-4 text-pink-200 animate-pulse shrink-0" />
          </button>
          <p className="text-xs text-slate-500 font-medium">
            현재 추천 가능한 메뉴: <strong className="text-pink-600">{activeMenus.length}가지</strong>
          </p>
        </div>
      )}
    </div>
  );
};

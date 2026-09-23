import React, { useState } from 'react';
import { MenuItem, DoroEmotion } from '../types/menu';
import { DoroReaction } from './DoroReaction';
import { ResultCard } from './ResultCard';
import {
  DORO_IDLE_QUOTES,
  DORO_THINKING_QUOTES,
  DORO_REJECT_QUOTES,
  DORO_IDLE_POOL,
  DORO_POKE_REACTIONS,
  getEmotionForCategory,
} from '../constants/doroAssets';
import { Sparkles, Coins } from 'lucide-react';

interface DoroBoxPickProps {
  menus: MenuItem[];
}

export const DoroBoxPick: React.FC<DoroBoxPickProps> = ({ menus }) => {
  const [isPicking, setIsPicking] = useState(false);
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
    if (isPicking) return;
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
    const nextCount = rerollCount + 1;
    setRerollCount(nextCount);

    // 거절 횟수에 따른 도로롱 반응
    let rejectEmotion: DoroEmotion = 'tumbleweed';
    let quoteList = DORO_REJECT_QUOTES[0];

    if (nextCount === 1) {
      rejectEmotion = 'tumbleweed';
      quoteList = DORO_REJECT_QUOTES[0];
    } else if (nextCount === 2) {
      rejectEmotion = 'scream';
      quoteList = DORO_REJECT_QUOTES[1];
    } else {
      rejectEmotion = 'angry';
      quoteList = DORO_REJECT_QUOTES[2];
      setIsAngryShaking(true);
    }

    const randomRejectQuote = quoteList[Math.floor(Math.random() * quoteList.length)];
    setEmotion(rejectEmotion);
    setQuote(randomRejectQuote);

    // 약간의 딜레이 후 다시 추첨
    setTimeout(() => {
      pickRandomMenu();
    }, 900);
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
        size={selectedMenu ? 'md' : 'lg'}
        isShaking={isAngryShaking}
        onPoke={handlePoke}
        showPokeHint={!selectedMenu && !isPicking}
      />

      {/* Result Card or Initial Trigger Button */}
      {selectedMenu && !isPicking ? (
        <div className="w-full mt-2 animate-in fade-in zoom-in-95 duration-300">
          <ResultCard
            menu={selectedMenu}
            onReroll={handleReroll}
            rerollCount={rerollCount}
          />
        </div>
      ) : (
        <div className="mt-4 flex flex-col items-center gap-3 w-full">
          <button
            onClick={pickRandomMenu}
            disabled={isPicking}
            className="group relative flex items-center justify-center gap-2.5 w-full sm:w-80 py-4 px-8 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-pink-300/60 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
          >
            <Coins className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform" />
            <span>{isPicking ? '도로롱이 고뇌 중...' : '깡통에 코인 넣고 메뉴 점지받기!'}</span>
            <Sparkles className="w-4 h-4 text-pink-200 animate-pulse" />
          </button>
          <p className="text-xs text-slate-500 font-medium">
            현재 추천 가능한 메뉴: <strong className="text-pink-600">{activeMenus.length}가지</strong>
          </p>
        </div>
      )}
    </div>
  );
};

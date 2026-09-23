import React, { useState, useRef, useEffect } from 'react';
import { MenuItem, Category } from '../types/menu';
import { CATEGORIES } from '../constants/doroAssets';
import { DoroReaction } from './DoroReaction';
import { ResultCard } from './ResultCard';
import { Play, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DoroRouletteProps {
  menus: MenuItem[];
}

export const DoroRoulette: React.FC<DoroRouletteProps> = ({ menus }) => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(
    CATEGORIES.map(c => c.id)
  );
  const [isSpinning, setIsSpinning] = useState(false);
  const [pickedMenu, setPickedMenu] = useState<MenuItem | null>(null);
  const [rotationAngle, setRotationAngle] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 선택된 카테고리에 속하고 활성화된 메뉴들 필터링
  const availableMenus = menus.filter(
    m => m.enabled && selectedCategories.includes(m.category)
  );

  // 룰렛에 표시할 최대 메뉴 수 (너무 많으면 시인성이 떨어지므로 랜덤 샘플링 최대 12개)
  const [displayMenus, setDisplayMenus] = useState<MenuItem[]>([]);

  useEffect(() => {
    if (availableMenus.length === 0) {
      setDisplayMenus([]);
      return;
    }
    // 셔플 후 최대 10개 선택
    const shuffled = [...availableMenus].sort(() => 0.5 - Math.random());
    setDisplayMenus(shuffled.slice(0, Math.min(10, shuffled.length)));
  }, [selectedCategories, menus]);

  // 룰렛 그리기
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || displayMenus.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
    const center = size / 2;
    const radius = center - 12;
    const totalSlices = displayMenus.length;
    const sliceAngle = (2 * Math.PI) / totalSlices;

    const colors = [
      '#f43f5e', '#fb7185', '#ec4899', '#f97316', '#fbbf24',
      '#10b981', '#3b82f6', '#8b5cf6', '#a855f7', '#06b6d4',
    ];

    ctx.clearRect(0, 0, size, size);

    // 슬라이스 그리기
    displayMenus.forEach((menu, i) => {
      const startAngle = i * sliceAngle;
      const endAngle = startAngle + sliceAngle;

      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, startAngle, endAngle);
      ctx.closePath();

      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.stroke();

      // 메뉴명 텍스트
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 13px sans-serif';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
      ctx.shadowBlur = 4;
      ctx.fillText(menu.name, radius - 20, 5);
      ctx.restore();
    });

    // 중앙 원
    ctx.beginPath();
    ctx.arc(center, center, 24, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#f43f5e';
    ctx.stroke();

    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#f43f5e';
    ctx.fillText('DORO', center, center);
  }, [displayMenus]);

  const toggleCategory = (catId: Category) => {
    setSelectedCategories(prev =>
      prev.includes(catId) ? prev.filter(c => c !== catId) : [...prev, catId]
    );
  };

  const selectAllCategories = () => setSelectedCategories(CATEGORIES.map(c => c.id));
  const deselectAllCategories = () => setSelectedCategories([]);

  const spinRoulette = () => {
    if (isSpinning || displayMenus.length === 0) return;

    setIsSpinning(true);
    setPickedMenu(null);

    // 무작위로 당첨 인덱스 선정
    const targetIndex = Math.floor(Math.random() * displayMenus.length);
    const sliceAngleDeg = 360 / displayMenus.length;
    // 룰렛 바늘이 맨 위(270도)에 위치하므로 각도 보정
    const targetSliceCenterDeg = targetIndex * sliceAngleDeg + sliceAngleDeg / 2;
    const spins = 5 * 360; // 5바퀴 회전
    const targetRotation = spins + (270 - targetSliceCenterDeg);

    setRotationAngle(prev => prev + targetRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const chosen = displayMenus[targetIndex];
      setPickedMenu(chosen);

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    }, 3500);
  };

  return (
    <div className="flex flex-col items-center max-w-xl mx-auto py-4 px-4">
      {/* Category Filter Chips */}
      <div className="w-full glass-panel rounded-2xl p-4 mb-4">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold text-slate-700">카테고리 선택</span>
          <div className="flex gap-2">
            <button
              onClick={selectAllCategories}
              className="text-[11px] font-semibold text-pink-600 hover:underline cursor-pointer"
            >
              전체 선택
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={deselectAllCategories}
              className="text-[11px] font-semibold text-slate-500 hover:underline cursor-pointer"
            >
              전체 해제
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map(cat => {
            const isSelected = selectedCategories.includes(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => toggleCategory(cat.id)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-pink-500 text-white shadow-xs scale-102'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-pink-300'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Animated Doro Reaction while spinning */}
      {isSpinning ? (
        <DoroReaction
          emotion="plush_dance"
          quote="돌려돌려 돌림판! 털인형 도로롱이 댄스 추며 응원 중이다 도로롱~!"
          size="sm"
        />
      ) : pickedMenu ? (
        <DoroReaction
          emotion="dance_happy"
          quote={pickedMenu.doroQuote}
          size="sm"
        />
      ) : (
        <DoroReaction
          emotion="flight_jump"
          quote="룰렛을 돌려서 운명에 메뉴를 맡겨보라 도로롱! (깡총깡총)"
          size="sm"
        />
      )}

      {/* Roulette Wheel Container */}
      {displayMenus.length === 0 ? (
        <div className="text-center py-10 text-slate-500 font-medium">
          선택된 카테고리에 추천할 수 있는 메뉴가 없다 도로롱! 카테고리를 선택해달라 도로롱!
        </div>
      ) : (
        <div className="relative my-4 flex flex-col items-center">
          {/* Needle Pin at Top */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-x-8 border-x-transparent border-t-16 border-t-red-600 filter drop-shadow-md"></div>

          {/* Rotating Canvas Wheel */}
          <div
            className="w-64 h-64 sm:w-80 sm:h-80 rounded-full shadow-2xl overflow-hidden transition-transform duration-[3500ms] ease-out"
            style={{ transform: `rotate(${rotationAngle}deg)` }}
          >
            <canvas ref={canvasRef} width={320} height={320} className="w-full h-full" />
          </div>

          {/* Spin Trigger Button */}
          <button
            onClick={spinRoulette}
            disabled={isSpinning || displayMenus.length === 0}
            className="mt-6 flex items-center justify-center gap-2 py-3 sm:py-3.5 px-6 sm:px-8 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-black text-sm sm:text-base rounded-2xl shadow-lg shadow-pink-200 active:scale-95 transition-all cursor-pointer disabled:opacity-50 whitespace-nowrap break-keep"
          >
            {isSpinning ? (
              <>
                <RotateCcw className="w-5 h-5 animate-spin shrink-0" />
                <span>빙글빙글 도는 중...</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-white shrink-0" />
                <span>룰렛 돌리기!</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Result Card Modal or Block */}
      {pickedMenu && !isSpinning && (
        <div className="w-full mt-4 animate-in fade-in zoom-in-95 duration-300">
          <ResultCard
            menu={pickedMenu}
            onReroll={spinRoulette}
            rerollCount={0}
          />
        </div>
      )}
    </div>
  );
};

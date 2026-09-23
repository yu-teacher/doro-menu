import React, { useState } from 'react';
import { MenuItem } from '../types/menu';
import { CATEGORIES, getMenuAvatar, DORO_ANGER_STAGES } from '../constants/doroAssets';
import { useUserLocation } from '../hooks/useUserLocation';
import { getSearchKeyword } from '../utils/searchKeyword';
import {
  Share2,
  RefreshCw,
  CheckCircle2,
  Heart,
  MapPin,
  ExternalLink,
  LocateFixed,
  Edit2,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const POPULAR_DISTRICTS = ['강남역', '판교', '성수동', '홍대입구', '여의도', '종로', '잠실', '신촌'];

interface ResultCardProps {
  menu: MenuItem;
  onReroll: () => void;
  rerollCount: number;
  onResetAnger?: () => void;
  mode?: 'box' | 'roulette';
}

export const ResultCard: React.FC<ResultCardProps> = ({
  menu,
  onReroll,
  rerollCount,
  onResetAnger,
  mode = 'box',
}) => {
  const [copied, setCopied] = useState(false);
  const [isDecided, setIsDecided] = useState(false);
  const [isEditingDistrict, setIsEditingDistrict] = useState(false);
  const [districtInput, setDistrictInput] = useState('');

  const { location, isLoadingGps, locationError, clearError, requestGps, setDistrict } = useUserLocation();

  const categoryInfo = CATEGORIES.find(c => c.id === menu.category);

  const handleConfirm = () => {
    setIsDecided(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff69b4', '#f43f5e', '#fbbf24', '#34d399', '#60a5fa'],
    });
  };

  const handleShare = async () => {
    const locText = location.district ? ` (📍 ${location.district})` : '';
    const text = `🍽️ 도로롱이 점지해준 오늘의 식사 메뉴!\n👉 [${menu.name}]${locText}\n"${menu.doroQuote}"\n다들 오늘 이거 먹으라 도로롱! 🌸`;

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // 지도 검색용 최적화 키워드 추출 (예: '반미 바게트 샌드위치' -> '반미', '차돌 / 우렁 된장찌개' -> '된장찌개')
  const targetFood = getSearchKeyword(menu);

  // 실제 내 위치(동네 또는 GPS 좌표) 기반 지도 검색 쿼리 구성
  const searchKeyword = location.district
    ? `${location.district} ${targetFood}`
    : targetFood;

  // 네이버 지도 URL (GPS 좌표가 있으면 중심 좌표 파라미터 c=lng,lat,15 부여)
  const naverMapUrl =
    location.lat && location.lng
      ? `https://map.naver.com/v5/search/${encodeURIComponent(searchKeyword)}?c=${location.lng},${location.lat},15,0,0,0,dh`
      : `https://map.naver.com/v5/search/${encodeURIComponent(searchKeyword)}`;

  // 카카오맵 URL
  const kakaoMapUrl = `https://map.kakao.com/?q=${encodeURIComponent(searchKeyword)}`;

  const handleSaveDistrict = () => {
    if (districtInput.trim()) {
      setDistrict(districtInput.trim());
    }
    setIsEditingDistrict(false);
  };

  return (
    <div className="w-full max-w-md mx-auto glass-panel rounded-3xl p-6 sm:p-7 shadow-xl border-2 border-pink-200/80 transition-all duration-300 animate-in fade-in zoom-in-95 duration-500">
      {/* Category Badge & Tags */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span
          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
            categoryInfo?.badgeBg || 'bg-pink-100 text-pink-700'
          }`}
        >
          <span>{categoryInfo?.emoji}</span>
          <span>{categoryInfo?.name}</span>
        </span>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {menu.tags?.map((tag, idx) => (
            <span
              key={idx}
              className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Menu Title with Doro Food Avatar */}
      <div className="text-center my-4 flex flex-col items-center">
        {/* Cute Doro Avatar Stamp */}
        <div className="relative w-20 h-20 rounded-2xl bg-white border-2 border-pink-200 shadow-md p-1 mb-2.5 overflow-hidden animate-bounce">
          <img
            src={getMenuAvatar(menu)}
            alt={menu.name}
            className="w-full h-full object-contain"
          />
          <span className="absolute -top-1 -right-1 text-sm">✨</span>
        </div>

        <span className="text-xs font-bold text-pink-500 tracking-wider uppercase block mb-1">
          TODAY'S SPECIAL PICK
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {menu.name}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1.5 font-medium break-keep">
          {menu.description}
        </p>
      </div>

      {/* Doro Quote Box */}
      <div className="my-4 p-3.5 bg-rose-50/70 border border-rose-100 rounded-2xl flex items-start gap-2.5">
        <span className="text-lg shrink-0">💬</span>
        <p className="text-xs sm:text-sm text-rose-900 font-semibold leading-relaxed">
          {menu.doroQuote}
        </p>
      </div>

      {/* Real Location-based Restaurant Finder */}
      <div className="my-3 p-3.5 bg-white/90 rounded-2xl border border-pink-100 shadow-2xs">
        {/* Location Status Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5 pb-2.5 border-b border-slate-100">
          <div className="flex items-center gap-1.5 min-w-0">
            <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span className="text-xs text-slate-500 font-medium shrink-0">내 위치:</span>

            {isEditingDistrict ? (
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={districtInput}
                  onChange={e => setDistrictInput(e.target.value)}
                  placeholder="예: 역삼동, 판교, 홍대"
                  className="text-xs px-2 py-1 border border-pink-300 rounded-lg focus:outline-none w-28 sm:w-32 bg-white"
                  autoFocus
                  onKeyDown={e => e.key === 'Enter' && handleSaveDistrict()}
                />
                <button
                  onClick={handleSaveDistrict}
                  className="p-1 text-emerald-600 hover:bg-emerald-50 rounded-lg cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1 truncate">
                <strong className="text-xs font-bold text-slate-800 truncate">
                  {location.district ? location.district : '위치 미설정'}
                </strong>
                <button
                  onClick={() => {
                    setDistrictInput(location.district);
                    setIsEditingDistrict(true);
                  }}
                  className="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                  title="동네 직접 입력"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {/* GPS Permission Consent Button */}
          <button
            onClick={requestGps}
            disabled={isLoadingGps}
            className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-pink-600 hover:text-pink-700 bg-pink-50 hover:bg-pink-100 border border-pink-200 px-2.5 py-1.5 rounded-xl transition-all cursor-pointer shrink-0 disabled:opacity-50 active:scale-95"
            title="브라우저 위치 권한을 동의하고 현재 GPS 위치를 가져옵니다"
          >
            <LocateFixed className={`w-3.5 h-3.5 shrink-0 ${isLoadingGps ? 'animate-spin' : ''}`} />
            <span>{isLoadingGps ? '위치 권한 요청 중...' : 'GPS 권한 동의 및 찾기'}</span>
          </button>
        </div>

        {/* Gentle Location Error / Guidance Notice (Never alert!) */}
        {locationError && (
          <div className="mb-2.5 p-2.5 bg-amber-50 border border-amber-200 rounded-xl flex items-start justify-between gap-2 text-xs text-amber-900 leading-relaxed animate-in fade-in">
            <div className="flex items-start gap-1.5">
              <span className="text-sm shrink-0">💡</span>
              <p className="break-keep">{locationError}</p>
            </div>
            <button
              onClick={clearError}
              className="text-amber-500 hover:text-amber-700 p-0.5 shrink-0 cursor-pointer"
              title="닫기"
            >
              ✕
            </button>
          </div>
        )}

        {/* Quick District Presets */}
        <div className="mb-2.5 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[10px] text-slate-400 font-bold shrink-0">빠른 동네:</span>
          {POPULAR_DISTRICTS.map(dist => (
            <button
              key={dist}
              onClick={() => {
                setDistrict(dist);
                clearError();
              }}
              className={`text-[10px] px-2 py-0.5 rounded-md font-bold transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                location.district === dist
                  ? 'bg-pink-500 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-pink-100 hover:text-pink-700'
              }`}
            >
              {dist}
            </button>
          ))}
          <button
            onClick={() => {
              setDistrictInput(location.district);
              setIsEditingDistrict(true);
            }}
            className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 shrink-0 whitespace-nowrap cursor-pointer"
          >
            직접 입력 ✏️
          </button>
        </div>

        {/* Action Link Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-100">
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-slate-700 truncate">
              {location.district ? `"${location.district}" 근처 맛집:` : '주변 맛집 찾기:'}
            </span>
            {targetFood !== menu.name && (
              <span className="text-[10px] text-pink-600 font-medium truncate">
                검색 키워드: &quot;{targetFood}&quot; 🔍
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <a
              href={naverMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#03C75A] text-white hover:opacity-90 shadow-2xs transition-all whitespace-nowrap"
            >
              <span>네이버 지도</span>
              <ExternalLink className="w-3 h-3 shrink-0" />
            </a>
            <a
              href={kakaoMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#FEE500] text-slate-900 hover:opacity-90 shadow-2xs transition-all whitespace-nowrap"
            >
              <span>카카오맵</span>
              <ExternalLink className="w-3 h-3 shrink-0" />
            </a>
          </div>
        </div>
      </div>

      {/* Doro Anger Gauge Bar (1-10 Stages) */}
      {rerollCount > 0 && (
        <div className={`mt-4 p-3.5 rounded-2xl border transition-all ${
          rerollCount >= 10
            ? 'bg-red-50/90 border-red-300 shadow-md shadow-red-100 animate-pulse'
            : rerollCount >= 7
            ? 'bg-orange-50/90 border-orange-200 shadow-xs'
            : 'bg-amber-50/80 border-amber-200'
        }`}>
          <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
            <span className="flex items-center gap-1.5 text-slate-800">
              <span>도로롱 분노 게이지</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] text-white font-extrabold ${
                rerollCount >= 10
                  ? 'bg-red-600 animate-bounce'
                  : rerollCount >= 7
                  ? 'bg-orange-500'
                  : 'bg-amber-500'
              }`}>
                Lv.{Math.min(rerollCount, 10)} {rerollCount >= 10 ? 'MAX (파업)' : `(${DORO_ANGER_STAGES[rerollCount]?.stageName})`}
              </span>
            </span>
            <span className={`text-[11px] font-extrabold ${rerollCount >= 10 ? 'text-red-600' : 'text-amber-800'}`}>
              {rerollCount >= 10 ? '💥 파업 선언!' : `${10 - rerollCount}단계 남음`}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200/80 rounded-full h-2.5 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                rerollCount >= 10
                  ? 'bg-gradient-to-r from-red-500 via-rose-600 to-red-700 animate-pulse'
                  : rerollCount >= 7
                  ? 'bg-gradient-to-r from-amber-400 via-orange-500 to-red-500'
                  : 'bg-gradient-to-r from-yellow-300 via-amber-400 to-amber-500'
              }`}
              style={{ width: `${Math.min(rerollCount * 10, 100)}%` }}
            />
          </div>

          {rerollCount >= 10 && (
            <p className="text-[11px] text-red-600 font-bold mt-2 text-center animate-pulse">
              ⚠️ 도로롱이 10번 연속 거절당해 파업에 돌입했습니다! 새 메뉴를 정해주지 않습니다!
            </p>
          )}
        </div>
      )}

      {/* Decided Banner or Action Buttons */}
      {isDecided ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center animate-bounce mt-4">
          <div className="flex items-center justify-center gap-2 text-emerald-600 font-bold text-base mb-1">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span className="break-keep">
              {rerollCount >= 10
                ? '결국 아무거나 처먹기로 타협 완료! 도로롱!'
                : '오늘의 메뉴로 결정 완료! 도로롱!'}
            </span>
          </div>
          <p className="text-xs text-emerald-700 break-keep">
            {rerollCount >= 10
              ? '진작에 아무거나 처먹을 것이지 도로롱! 맛있게 먹고 다음엔 속 썩이지 마라 도로롱! ✨'
              : '맛있게 드시고 든든한 하루 보내세요 💖'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:gap-2.5 mt-4">
          <button
            onClick={handleConfirm}
            className="flex items-center justify-center gap-1.5 py-3 sm:py-3.5 px-3 sm:px-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-2xl font-bold text-xs sm:text-sm shadow-md shadow-pink-200 active:scale-95 transition-all cursor-pointer whitespace-nowrap break-keep"
          >
            <Heart className="w-4 h-4 fill-white shrink-0" />
            <span>{rerollCount >= 10 ? '알았어 이거 먹을게...' : '이거 먹을래!'}</span>
          </button>

          {rerollCount >= 10 ? (
            <button
              onClick={onResetAnger}
              className="flex items-center justify-center gap-1.5 py-3 sm:py-3.5 px-2 sm:px-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-2xl font-bold text-xs sm:text-sm shadow-md shadow-orange-200 active:scale-95 transition-all cursor-pointer whitespace-nowrap break-keep"
            >
              <span>도로롱 싹싹 빌기 (사죄) 🙇</span>
            </button>
          ) : (
            <button
              onClick={onReroll}
              className={`flex items-center justify-center gap-1 sm:gap-1.5 py-3 sm:py-3.5 px-3 sm:px-4 border rounded-2xl font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer whitespace-nowrap break-keep active:scale-95 ${
                rerollCount >= 7
                  ? 'bg-white hover:bg-red-50 border-red-300 text-red-600'
                  : 'bg-white hover:bg-rose-50 border-rose-200 text-rose-600'
              }`}
            >
              <RefreshCw className={`w-4 h-4 shrink-0 ${rerollCount > 0 ? 'animate-spin' : ''}`} />
              <span>
                {mode === 'roulette'
                  ? (rerollCount > 0 ? `룰렛 다시 돌리기 (Lv.${rerollCount})` : '룰렛 다시 돌리기!')
                  : (rerollCount > 0 ? `다시 뽑기 (Lv.${rerollCount})` : '다시 뽑기')}
              </span>
            </button>
          )}
        </div>
      )}

      {/* Share Button */}
      <div className="mt-3 text-center">
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-pink-600 font-medium py-1.5 px-3 rounded-lg hover:bg-pink-50 transition-colors cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{copied ? '클립보드에 복사 완료! ✨' : '카톡/슬랙에 결과 공유하기'}</span>
        </button>
      </div>
    </div>
  );
};

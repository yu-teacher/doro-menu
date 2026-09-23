import { useState } from 'react';

export interface UserLocation {
  lat: number | null;
  lng: number | null;
  district: string; // 동네 이름 (예: "강남역", "판교", "성수동")
  isGps: boolean;
}

const LOCATION_STORAGE_KEY = 'doro_user_location_v1';

export function useUserLocation() {
  const [location, setLocation] = useState<UserLocation>(() => {
    try {
      const saved = localStorage.getItem(LOCATION_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return { lat: null, lng: null, district: '', isGps: false };
  });

  const [isLoadingGps, setIsLoadingGps] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // 위치 저장
  const updateLocation = (newLoc: UserLocation) => {
    setLocation(newLoc);
    setLocationError(null);
    localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(newLoc));
  };

  // GPS로 내 실제 위치 가져오기 (사용자가 직접 버튼 클릭 시 실행)
  const requestGps = () => {
    setLocationError(null);

    // 1. 브라우저 지원 여부 확인
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setLocationError('이 브라우저는 위치 정보(GPS)를 지원하지 않습니다.');
      return;
    }

    // 2. HTTP 비보안 환경 확인 (모던 브라우저는 HTTP 환경에서 Geolocation API 차단)
    if (
      typeof window !== 'undefined' &&
      !window.isSecureContext &&
      window.location.hostname !== 'localhost' &&
      window.location.hostname !== '127.0.0.1'
    ) {
      setLocationError(
        '현재 접속 주소(HTTP)에서는 브라우저 보안 정책상 GPS 조회가 제한됩니다. 아래에서 동네를 간편하게 선택하거나 직접 입력해주세요! 💡'
      );
      return;
    }

    setIsLoadingGps(true);
    navigator.geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;
        let districtName = '';

        try {
          // 무료 오픈 리버스 지오코딩 (위도/경도 -> 동네/구 이름 변환)
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=ko`
          );
          if (res.ok) {
            const data = await res.json();
            const addr = data.address;
            districtName =
              addr.suburb ||
              addr.borough ||
              addr.city_district ||
              addr.quarter ||
              addr.city ||
              '내 위치';
          }
        } catch {
          districtName = '내 위치';
        }

        const newLoc: UserLocation = {
          lat: latitude,
          lng: longitude,
          district: districtName || '내 위치',
          isGps: true,
        };

        updateLocation(newLoc);
        setIsLoadingGps(false);
      },
      error => {
        setIsLoadingGps(false);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationError(
            '브라우저 위치 권한이 차단되었습니다. 주소창 좌측의 설정/자물쇠 아이콘에서 위치 권한을 허용하시거나, 아래에서 동네를 선택해주세요!'
          );
        } else if (error.code === error.TIMEOUT) {
          setLocationError('GPS 신호 응답 시간이 초과되었습니다. 다시 시도하시거나 아래에서 동네를 선택해주세요.');
        } else {
          setLocationError('위치 정보를 가져올 수 없습니다. 아래에서 동네를 선택하거나 직접 입력해주세요.');
        }
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  return {
    location,
    isLoadingGps,
    locationError,
    clearError: () => setLocationError(null),
    requestGps,
    setDistrict: (district: string) =>
      updateLocation({ ...location, district, isGps: false }),
  };
}

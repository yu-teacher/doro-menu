import { useState, useEffect } from 'react';

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

  // 위치 저장
  const updateLocation = (newLoc: UserLocation) => {
    setLocation(newLoc);
    localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(newLoc));
  };

  // GPS로 내 실제 위치 가져오기
  const requestGps = () => {
    if (!navigator.geolocation) {
      alert('이 브라우저는 위치 정보(GPS)를 지원하지 않는다 도로롱!');
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
        console.warn('Geolocation error:', error);
        setIsLoadingGps(false);
        alert(
          '위치 권한이 차단되었거나 위치를 가져올 수 없다 도로롱! 아래에서 직접 동네를 입력해달라 도로롱!'
        );
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  useEffect(() => {
    // 최초 실행 시 위치가 없고 권한이 허용되어 있다면 부드럽게 GPS 요청 시도
    if (!location.district && navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then(result => {
        if (result.state === 'granted') {
          requestGps();
        }
      });
    }
  }, []);

  return {
    location,
    isLoadingGps,
    requestGps,
    setDistrict: (district: string) =>
      updateLocation({ ...location, district, isGps: false }),
  };
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * GA4 커스텀 이벤트 전송 유틸리티.
 * 브라우저 환경에서 gtag가 로드되어 있을 때 안전하게 이벤트를 발송하며,
 * 에드블록 등으로 로드되지 않았을 때도 서비스 동작에 전혀 영향을 주지 않습니다.
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, string | number | boolean | undefined>
) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    // undefined 값 제거
    const sanitizedParams: Record<string, string | number | boolean> = {};
    if (eventParams) {
      Object.entries(eventParams).forEach(([key, value]) => {
        if (value !== undefined) {
          sanitizedParams[key] = value;
        }
      });
    }
    window.gtag('event', eventName, sanitizedParams);
  }
};

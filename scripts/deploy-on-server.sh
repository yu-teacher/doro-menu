#!/usr/bin/env bash
# 서버(mini)의 셀프호스티드 러너가 실행한다: 이미지 빌드 -> 롤백 태그 -> 컨테이너 교체 -> 헬스체크 -> 실패하면 이전 이미지로 자동 복구.
# doro-menu 컨테이너는 compose 밖에서 직접 실행하는 서비스라서 기존 실행 인자(네트워크/포트/재시작 정책)를 그대로 유지한다.
#
#   scripts/deploy-on-server.sh            # 배포
#   scripts/deploy-on-server.sh --dry-run  # 무엇을 할지만 출력
set -Eeuo pipefail

NAME="${MENU_CONTAINER:-doro-menu}"
IMAGE="${MENU_IMAGE:-doro-menu}"
NETWORK="${MENU_NETWORK:-doro_doro-network}"
PUBLISH="${MENU_PUBLISH:-127.0.0.1:3003:80}"
HEALTH_URL="${MENU_HEALTH_URL:-http://127.0.0.1:3003/}"
HEALTH_TIMEOUT_SEC="${MENU_HEALTH_TIMEOUT_SEC:-30}"
DRY_RUN=false
[ "${1:-}" = "--dry-run" ] && DRY_RUN=true

cd "$(dirname "${BASH_SOURCE[0]}")/.."
TS="$(date +%Y%m%d-%H%M%S)"
REV="$(git rev-parse --short HEAD 2>/dev/null || echo "$TS")"
log() { printf '[%s] %s\n' "$(date +%H:%M:%S)" "$*"; }
run_container() { docker run -d --name "$NAME" --restart always --network "$NETWORK" -p "$PUBLISH" "$1" >/dev/null; }
healthy() {
  local deadline=$((SECONDS + HEALTH_TIMEOUT_SEC))
  until curl -fsS -o /dev/null "$HEALTH_URL"; do
    [ $SECONDS -lt $deadline ] || return 1
    sleep 2
  done
}

# 지금 서비스 중인 이미지. 새 빌드가 latest 태그를 옮기기 전에 롤백 태그를 붙여 둔다.
PREV_REF="$(docker inspect --format '{{.Config.Image}}' "$NAME" 2>/dev/null || true)"
log "대상: $NAME ($IMAGE:$REV), 이전 이미지: ${PREV_REF:-없음}"
if [ "$DRY_RUN" = true ]; then log "--dry-run: 여기서 종료"; exit 0; fi

PREV_IMAGE=""
if [ -n "$PREV_REF" ]; then
  docker tag "$PREV_REF" "$IMAGE-rollback:$TS"
  PREV_IMAGE="$IMAGE-rollback:$TS"
  log "롤백 지점: $PREV_IMAGE"
fi

log "== 이미지 빌드 (컨테이너는 아직 건드리지 않는다) =="
docker build -t "$IMAGE:$REV" -t "$IMAGE:latest" .

log "== 컨테이너 교체 =="
docker rm -f "$NAME" >/dev/null 2>&1 || true
run_container "$IMAGE:$REV"

if healthy; then
  log "배포 완료: $IMAGE:$REV (헬스체크 통과)"
  # 오래된 롤백 이미지는 최근 5개만 남긴다
  docker images "$IMAGE-rollback" --format '{{.Tag}}' | sort -r | tail -n +6 | while read -r tag; do docker rmi "$IMAGE-rollback:$tag" >/dev/null 2>&1 || true; done
  exit 0
fi

log "ERROR: ${HEALTH_TIMEOUT_SEC}초 안에 헬스체크를 통과하지 못했다."
docker logs --tail 30 "$NAME" || true
if [ -n "$PREV_IMAGE" ]; then
  log "== 자동 롤백: 이전 이미지로 되돌린다 =="
  docker rm -f "$NAME" >/dev/null 2>&1 || true
  run_container "$PREV_IMAGE"
  if healthy; then log "롤백 완료. 이전 버전이 서비스 중이다."; else log "ERROR: 롤백 후에도 헬스체크 실패. 수동 확인 필요."; fi
fi
exit 1

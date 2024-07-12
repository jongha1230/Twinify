export const formatTimestamp = (createdAt: string) => {
  // 현재시간 가져오기
  const now = new Date();
  const past = new Date(createdAt);

  // 현재 시간과 주어진 시간의 차이 계산하기
  // 단순히 '-'로 Date를 비교하면 사파리 브라우저에서 작동이 안될 수 있다.
  const diff = now.getTime() - past.getTime();

  // 시간 단위별로 차이 계산하기
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    if (days < 7) {
      return `${days}일 전`;
    } else {
      const formattedDate = past.toISOString().slice(0, 10);
      return `${formattedDate} ${past.toLocaleTimeString().slice(0, 7)}`;
    }
  } else if (hours > 0) {
    return `${hours}시간 전`;
  } else if (minutes > 0) {
    return `${minutes}분 전`;
  } else {
    return `${seconds}초 전`;
  }
};

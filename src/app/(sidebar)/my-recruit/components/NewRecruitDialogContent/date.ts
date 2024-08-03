// NOTE: 서버에서 넘어오는 값에 따라 변경될 예정입니다.
export function getCurrentYearAndHalf() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const half = month <= 6 ? '상반기' : '하반기';

  return `${year}년 ${half}`;
}

export function getNextYearAndHalf() {
  const now = new Date();
  let year = now.getFullYear();
  const month = now.getMonth() + 1;

  let half: string;
  if (month <= 6) {
    half = '하반기';
  } else {
    half = '상반기';
    year += 1;
  }

  return `${year}년 ${half}`;
}

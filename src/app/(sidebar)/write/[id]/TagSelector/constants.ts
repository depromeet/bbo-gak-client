export const abilityTags = [
  { name: '커뮤니케이션', type: 'ability' },
  { name: '시각화', type: 'ability' },
  { name: '서비스 운영경험', type: 'ability' },
  { name: '프로젝트 경험', type: 'ability' },
  { name: '성능개선', type: 'ability' },
  { name: '코드 품질', type: 'ability' },
  { name: '지식 공유', type: 'ability' },
  { name: '테스트 코드', type: 'ability' },
  { name: 'UX', type: 'ability' },
  { name: 'UI', type: 'ability' },
] as const;

export const personalityTags = [{ name: '인성 태그', type: 'personality' }] as const;

export const categoryTags = [
  { name: '서류 준비', type: 'category' },
  { name: '과제 준비', type: 'category' },
  { name: '면접 준비', type: 'category' },
] as const;

export const tags = [...abilityTags, ...personalityTags];
export const categories = [...categoryTags];

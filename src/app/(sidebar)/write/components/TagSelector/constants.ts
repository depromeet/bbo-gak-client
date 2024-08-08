export const abilityTags = [
  { value: '커뮤니케이션', type: 'ability' },
  { value: '시각화', type: 'ability' },
  { value: '서비스 운영경험', type: 'ability' },
  { value: '프로젝트 경험', type: 'ability' },
  { value: '성능개선', type: 'ability' },
  { value: '코드 품질', type: 'ability' },
  { value: '지식 공유', type: 'ability' },
  { value: '테스트 코드', type: 'ability' },
  { value: 'UX', type: 'ability' },
  { value: 'UI', type: 'ability' },
] as const;

export const personalityTags = [{ value: '인성 태그', type: 'personality' }] as const;

export const categoryTags = [
  { value: '서류 준비', type: 'category' },
  { value: '과제 준비', type: 'category' },
  { value: '면접 준비', type: 'category' },
] as const;

export const tags = [...abilityTags, ...personalityTags];
export const categories = [...categoryTags] as const;

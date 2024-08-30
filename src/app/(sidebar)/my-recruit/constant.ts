export const recruitScheduleStageList = ['서류 마감', '1차 면접', '2차 면접', '3차 면접', '최종 면접'];

export const recruitStatusList = [
  { variant: 'text', text: '지원 준비' },
  { variant: 'text', text: '지원 완료' },
  { variant: 'border' },
  { variant: 'text', text: '서류 통과' },
  { variant: 'text', text: '서류 탈락' },
  { variant: 'border' },
  { variant: 'text', text: '면접 통과' },
  { variant: 'text', text: '면접 탈락' },
  { variant: 'border' },
  { variant: 'text', text: '최종 합격' },
  { variant: 'text', text: '최종 탈락' },
] as const;

export const INFO_CATEGORIES = ['경험_정리', '자기소개서', '면접_질문'] as const;

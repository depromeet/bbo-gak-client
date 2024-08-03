export interface InfoCard {
  id: number;
  title: string;
  updatedDate: string;
  cardTagList: CardTag[];
}

export interface CardTag {
  id: number;
  name: string;
  type: '인성' | '역량';
}

export const CARD_TYPES = ['경험 정리', '자기소개서', '면접 질문'] as const;

export type CardType = (typeof CARD_TYPES)[number];

export const TAG_TYPE_COLOR = {
  역량: 'blue',
  인성: 'purple',
} as const;

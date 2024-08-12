export interface InfoCard {
  id: number;
  title: string;
  updateDate: string;
  cardTagList: InfoCardTag[];
}

export interface InfoCardTag {
  id: number;
  name: string;
  type: '인성' | '역량';
}

export const INFO_CARD_TYPES = ['경험_정리', '자기소개서', '면접_질문'] as const;

export type InfoCardType = (typeof INFO_CARD_TYPES)[number];

export const TAG_TYPE_COLOR = {
  역량: 'blue',
  인성: 'purple',
} as const;

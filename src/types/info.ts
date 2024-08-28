export interface InfoCardType {
  id: number;
  title: string;
  updatedDate: string;
  tagList: TagType[];
}

export interface TagType {
  id: number;
  name: string;
  type: '인성' | '역량';
}

export const INFO_TYPES = ['경험_정리', '자기소개서', '면접_질문'] as const;

export type InfoType = (typeof INFO_TYPES)[number];

export const TAG_TYPE_COLOR = {
  역량: 'blue',
  인성: 'purple',
} as const;

export const CARD_GROUP = ['내_정보', '내_공고'] as const;

export type CardGroup = (typeof CARD_GROUP)[number];

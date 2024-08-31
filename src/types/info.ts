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

export const ANNOUNCEMENT_TYPES = ['서류_준비', '과제_준비', '면접_준비', '내_정보_복사'] as const;

export const TYPE_LIST = [...INFO_TYPES, ...ANNOUNCEMENT_TYPES] as const;
export type TypeTag = (typeof TYPE_LIST)[number];

export const TAG_TYPE_COLOR = {
  역량: 'blue',
  인성: 'purple',
} as const;

export const CARD_GROUP = ['내_정보', '공고', '공고_복사본_제외'] as const;

export type CardGroup = (typeof CARD_GROUP)[number];

export type TagType = {
  id: number;
  type: '인성' | '역량';
  name: string;
};

export type SearchedCardType = {
  id: number;
  title: string;
  updatedDate: string;
  tagList: Array<TagType>;
  cardTypeValueGroup: string;
  cardTypeValue: string;
  recruitTitle: null;
  content: string;
};

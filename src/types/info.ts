export interface TagType {
  id: number;
  name: string;
  type: '인성' | '역량';
}

export interface InfoCardType {
  id: number;
  title: string;
  updatedDate: string;
  cardTagList: TagType[];
}

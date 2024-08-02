export interface Tag {
  id: number;
  name: string;
  type: '인성' | '역량';
}

export interface InfoCard {
  id: number;
  title: string;
  updatedDate: string;
  cardTagList: Tag[];
}

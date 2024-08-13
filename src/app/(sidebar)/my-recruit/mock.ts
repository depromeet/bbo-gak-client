import { ProgressingCardType } from './containers/components/Card/BoxCard';

export const cardList: ProgressingCardType[] = [
  {
    type: '1차 면접',
    status: '서류 통과',
    dueDate: null,
    period: '2024 상반기',
    title: '디프만 15기 디자이너 직군',
  },
  {
    type: '2차 면접',
    status: '지원 완료',
    dueDate: new Date('2024-08-20'),
    period: '2024 하반기',
    title: '2024 네이버 프로덕트 디자이너 신입공채 지원서 제출',
  },
];

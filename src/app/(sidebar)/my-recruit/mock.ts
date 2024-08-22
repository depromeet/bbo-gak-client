import { ProgressingCardType } from './containers/components/Card/BoxCard';
import { InfoCardType } from '@/types/info';

export const cardList: ProgressingCardType[] = [
  {
    id: 1,
    type: '1차 면접',
    status: '서류 통과',
    dueDate: null,
    period: '2024 상반기',
    title: '디프만 15기 디자이너 직군',
  },
  {
    id: 2,
    type: '2차 면접',
    status: '지원 완료',
    dueDate: new Date('2024-08-20'),
    period: '2024 하반기',
    title: '2024 네이버 프로덕트 디자이너 신입공채 지원서 제출',
  },
];

export const mockInfoList: InfoCardType[] = [
  {
    id: 1,
    title: '제목',
    updatedDate: '2024-07-20T20:00:00',
    cardTagList: [
      {
        id: 1,
        name: '인성태그1',
        type: '인성',
      },
      {
        id: 2,
        name: '역량태그1',
        type: '역량',
      },
    ],
  },
  {
    id: 2,
    title: 'test title2',
    updatedDate: '2024-07-10T20:00:00',
    cardTagList: [
      {
        id: 1,
        name: '인성태그1',
        type: '인성',
      },
      {
        id: 2,
        name: '역량태그1',
        type: '역량',
      },
    ],
  },
  {
    id: 3,
    title: '제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목',
    updatedDate: '2024-07-15T20:00:00',
    cardTagList: [
      {
        id: 1,
        name: '인성태그1',
        type: '인성',
      },
      {
        id: 2,
        name: '역량태그1',
        type: '역량',
      },
    ],
  },
];

import { InfoCard } from './components/InfoCardItem';

export const mockInfoCount = {
  '경험 정리': 1,
  자기소개서: 3,
  '면접 질문': 2,
};

export const mockInfoList: InfoCard[] = [
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

import { TagColor } from '@/system/components';
import { InfoCardType, TagType } from '@/types';

export const mockInfoCount = {
  '서류 준비': 16,
  '과제 준비': 7,
  '면접 준비': 4,
};

export const mockInfoList: InfoCardType[] = [
  {
    id: 1,
    title: '제목 입력 제목 입력 제목 입력 제목 입력 제목 입력 제목 입력 제목 입력 제목 입력 제목 입력 ',
    updatedDate: '2024-07-20T20:00:00',
    tagList: [
      {
        id: 1,
        name: '직무태그',
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
    tagList: [
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
    tagList: [
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
    id: 4,
    title: '제목4 제목4 제목4 제목4 제목4 제목4 제목4 제목4 제목4 제목4',
    updatedDate: '2024-07-18T20:00:00',
    tagList: [
      {
        id: 1,
        name: '직무태그2',
        type: '인성',
      },
      {
        id: 2,
        name: '역량태그2',
        type: '역량',
      },
    ],
  },
  {
    id: 5,
    title: 'test title5',
    updatedDate: '2024-07-19T20:00:00',
    tagList: [
      {
        id: 1,
        name: '인성태그2',
        type: '인성',
      },
      {
        id: 2,
        name: '역량태그2',
        type: '역량',
      },
    ],
  },
  {
    id: 6,
    title: '제목6 제목6 제목6 제목6 제목6 제목6 제목6 제목6 제목6',
    updatedDate: '2024-07-17T20:00:00',
    tagList: [
      {
        id: 1,
        name: '직무태그3',
        type: '인성',
      },
      {
        id: 2,
        name: '역량태그3',
        type: '역량',
      },
    ],
  },
  {
    id: 7,
    title: '제목7 제목7 제목7 제목7 제목7 제목7 제목7 제목7 제목7',
    updatedDate: '2024-07-21T20:00:00',
    tagList: [
      {
        id: 1,
        name: '인성태그3',
        type: '인성',
      },
      {
        id: 2,
        name: '역량태그3',
        type: '역량',
      },
    ],
  },
  {
    id: 8,
    title: 'test title8',
    updatedDate: '2024-07-22T20:00:00',
    tagList: [
      {
        id: 1,
        name: '직무태그4',
        type: '인성',
      },
      {
        id: 2,
        name: '역량태그4',
        type: '역량',
      },
    ],
  },
  {
    id: 9,
    title: '제목9 제목9 제목9 제목9 제목9 제목9 제목9 제목9 제목9',
    updatedDate: '2024-07-23T20:00:00',
    tagList: [
      {
        id: 1,
        name: '인성태그4',
        type: '인성',
      },
      {
        id: 2,
        name: '역량태그4',
        type: '역량',
      },
    ],
  },
  {
    id: 10,
    title: '제목10 제목10 제목10 제목10 제목10 제목10 제목10 제목10 제목10',
    updatedDate: '2024-07-24T20:00:00',
    tagList: [
      {
        id: 1,
        name: '직무태그5',
        type: '인성',
      },
      {
        id: 2,
        name: '역량태그5',
        type: '역량',
      },
    ],
  },
  {
    id: 11,
    title: 'test title11',
    updatedDate: '2024-07-25T20:00:00',
    tagList: [
      {
        id: 1,
        name: '인성태그5',
        type: '인성',
      },
      {
        id: 2,
        name: '역량태그5',
        type: '역량',
      },
    ],
  },
  {
    id: 12,
    title: '제목12 제목12 제목12 제목12 제목12 제목12 제목12 제목12 제목12',
    updatedDate: '2024-07-26T20:00:00',
    tagList: [
      {
        id: 1,
        name: '직무태그6',
        type: '인성',
      },
      {
        id: 2,
        name: '역량태그6',
        type: '역량',
      },
    ],
  },
  {
    id: 13,
    title: '제목13 제목13 제목13 제목13 제목13 제목13 제목13 제목13 제목13',
    updatedDate: '2024-07-27T20:00:00',
    tagList: [
      {
        id: 1,
        name: '인성태그6',
        type: '인성',
      },
      {
        id: 2,
        name: '역량태그6',
        type: '역량',
      },
    ],
  },
  {
    id: 14,
    title: 'test title14',
    updatedDate: '2024-07-28T20:00:00',
    tagList: [
      {
        id: 1,
        name: '직무태그7',
        type: '인성',
      },
      {
        id: 2,
        name: '역량태그7',
        type: '역량',
      },
    ],
  },
  {
    id: 15,
    title: '제목15 제목15 제목15 제목15 제목15 제목15 제목15 제목15 제목15',
    updatedDate: '2024-07-29T20:00:00',
    tagList: [
      {
        id: 1,
        name: '인성태그7',
        type: '인성',
      },
      {
        id: 2,
        name: '역량태그7',
        type: '역량',
      },
    ],
  },
  {
    id: 16,
    title: 'test title16',
    updatedDate: '2024-07-30T20:00:00',
    tagList: [
      {
        id: 1,
        name: '직무태그8',
        type: '인성',
      },
      {
        id: 2,
        name: '역량태그8',
        type: '역량',
      },
    ],
  },
  {
    id: 17,
    title: '제목17 제목17 제목17 제목17 제목17 제목17 제목17 제목17 제목17',
    updatedDate: '2024-07-31T20:00:00',
    tagList: [
      {
        id: 1,
        name: '인성태그8',
        type: '인성',
      },
      {
        id: 2,
        name: '역량태그8',
        type: '역량',
      },
    ],
  },
  {
    id: 18,
    title: '제목18 제목18 제목18 제목18 제목18 제목18 제목18 제목18 제목18',
    updatedDate: '2024-08-01T20:00:00',
    tagList: [
      {
        id: 1,
        name: '직무태그9',
        type: '인성',
      },
      {
        id: 2,
        name: '역량태그9',
        type: '역량',
      },
    ],
  },
  {
    id: 19,
    title: 'test title19',
    updatedDate: '2024-08-02T20:00:00',
    tagList: [
      {
        id: 1,
        name: '인성태그9',
        type: '인성',
      },
      {
        id: 2,
        name: '역량태그9',
        type: '역량',
      },
    ],
  },
  {
    id: 20,
    title: '제목20 제목20 제목20 제목20 제목20 제목20 제목20 제목20 제목20',
    updatedDate: '2024-08-03T20:00:00',
    tagList: [
      {
        id: 1,
        name: '직무태그10',
        type: '인성',
      },
      {
        id: 2,
        name: '역량태그10',
        type: '역량',
      },
    ],
  },
  {
    id: 21,
    title: 'test title21',
    updatedDate: '2024-08-04T20:00:00',
    tagList: [
      {
        id: 1,
        name: '인성태그10',
        type: '인성',
      },
      {
        id: 2,
        name: '역량태그10',
        type: '역량',
      },
    ],
  },
  {
    id: 22,
    title: '제목22 제목22 제목22 제목22 제목22 제목22 제목22 제목22 제목22',
    updatedDate: '2024-08-05T20:00:00',
    tagList: [
      {
        id: 1,
        name: '직무태그11',
        type: '인성',
      },
      {
        id: 2,
        name: '역량태그11',
        type: '역량',
      },
    ],
  },
  {
    id: 23,
    title: '제목23 제목23 제목23 제목23 제목23 제목23 제목23 제목23 제목23',
    updatedDate: '2024-08-06T20:00:00',
    tagList: [
      {
        id: 1,
        name: '인성태그11',
        type: '인성',
      },
      {
        id: 2,
        name: '역량태그11',
        type: '역량',
      },
    ],
  },
  {
    id: 24,
    title: 'test title24',
    updatedDate: '2024-08-07T20:00:00',
    tagList: [
      {
        id: 1,
        name: '직무태그12',
        type: '인성',
      },
      {
        id: 2,
        name: '역량태그12',
        type: '역량',
      },
    ],
  },
  {
    id: 25,
    title: '제목25 제목25 제목25 제목25 제목25 제목25 제목25 제목25 제목25',
    updatedDate: '2024-08-08T20:00:00',
    tagList: [
      {
        id: 1,
        name: '인성태그12',
        type: '인성',
      },
      {
        id: 2,
        name: '역량태그12',
        type: '역량',
      },
    ],
  },
];

export const TAG_MOCKS: TagType[] = [
  {
    id: 1,
    name: '커뮤니케이션',
    type: '역량',
  },
  {
    id: 2,
    name: '리더십',
    type: '인성',
  },
  {
    id: 3,
    name: '봉사활동',
    type: '인성',
  },
  {
    id: 4,
    name: '문제 해결 능력',
    type: '역량',
  },
  {
    id: 5,
    name: '팀워크',
    type: '인성',
  },
  {
    id: 6,
    name: '시각화',
    type: '역량',
  },
  {
    id: 7,
    name: '프로젝트 관리',
    type: '역량',
  },
  {
    id: 8,
    name: '창의력',
    type: '역량',
  },
  {
    id: 9,
    name: '대인관계',
    type: '인성',
  },
  {
    id: 10,
    name: '의사결정',
    type: '역량',
  },
  {
    id: 11,
    name: '어바웃타임',
    type: '인성',
  },
  {
    id: 12,
    name: '프로그래밍',
    type: '역량',
  },
  {
    id: 13,
    name: '주도성',
    type: '인성',
  },
  {
    id: 14,
    name: '프로그래밍',
    type: '역량',
  },
  {
    id: 15,
    name: '설득력',
    type: '인성',
  },
  {
    id: 16,
    name: '협상 기술',
    type: '역량',
  },
  {
    id: 17,
    name: '문서 작성',
    type: '역량',
  },
  {
    id: 18,
    name: '열정',
    type: '인성',
  },
  {
    id: 19,
    name: '비판적 사고',
    type: '역량',
  },
  {
    id: 20,
    name: '갈등 관리',
    type: '인성',
  },
  {
    id: 21,
    name: '의사소통 능력',
    type: '역량',
  },
  {
    id: 22,
    name: '책임감',
    type: '인성',
  },
  {
    id: 23,
    name: '정보 처리 능력',
    type: '역량',
  },
  {
    id: 24,
    name: '신뢰성',
    type: '인성',
  },
  {
    id: 25,
    name: '디자인 사고',
    type: '역량',
  },
  {
    id: 26,
    name: '자기 개발',
    type: '인성',
  },
  {
    id: 27,
    name: '자원 관리',
    type: '역량',
  },
];

export const TAG_TYPE_COLOR: Record<TagType['type'], TagColor> = {
  역량: 'blue',
  인성: 'purple',
};

export const colorStyle = {
  default: 'bg-[#F1F2F3] text-[#37383C]',
  blue: 'bg-[#E8F1FF] text-[#418CC3]',
  purple: 'bg-[#F1E8FF] text-[#9C6BB3]',
};

export const DEFAULT_TAG_MOCKS: TagType[] = [
  {
    id: 0,
    name: '인성태그',
    type: '인성',
  },
  {
    id: 1,
    name: '역량태그',
    type: '역량',
  },
  {
    id: 2,
    name: '인성태그',
    type: '인성',
  },
  {
    id: 3,
    name: '역량태그',
    type: '역량',
  },
  {
    id: 4,
    name: '인성태그',
    type: '인성',
  },
  {
    id: 5,
    name: '역량태그',
    type: '역량',
  },
  {
    id: 6,
    name: '인성태그',
    type: '인성',
  },
  {
    id: 7,
    name: '역량태그',
    type: '역량',
  },
  {
    id: 8,
    name: '인성태그',
    type: '인성',
  },
  {
    id: 9,
    name: '역량태그',
    type: '역량',
  },
  {
    id: 10,
    name: '인성태그',
    type: '인성',
  },
  {
    id: 11,
    name: '역량태그',
    type: '역량',
  },
  {
    id: 12,
    name: '인성태그',
    type: '인성',
  },
  {
    id: 13,
    name: '역량태그',
    type: '역량',
  },
  {
    id: 14,
    name: '인성태그',
    type: '인성',
  },
  {
    id: 15,
    name: '역량태그',
    type: '역량',
  },
  {
    id: 16,
    name: '인성태그',
    type: '인성',
  },
  {
    id: 17,
    name: '역량태그',
    type: '역량',
  },
  {
    id: 18,
    name: '인성태그',
    type: '인성',
  },
  {
    id: 19,
    name: '역량태그',
    type: '역량',
  },
  {
    id: 20,
    name: '인성태그',
    type: '인성',
  },
  {
    id: 21,
    name: '역량태그',
    type: '역량',
  },
  {
    id: 22,
    name: '인성태그',
    type: '인성',
  },
  {
    id: 23,
    name: '역량태그',
    type: '역량',
  },
  {
    id: 24,
    name: '인성태그',
    type: '인성',
  },
  {
    id: 25,
    name: '역량태그',
    type: '역량',
  },
  {
    id: 26,
    name: '인성태그',
    type: '인성',
  },
  {
    id: 27,
    name: '역량태그',
    type: '역량',
  },
  {
    id: 28,
    name: '인성태그',
    type: '인성',
  },
  {
    id: 29,
    name: '역량태그',
    type: '역량',
  },
  {
    id: 30,
    name: '인성태그',
    type: '인성',
  },
  {
    id: 31,
    name: '역량태그',
    type: '역량',
  },
  {
    id: 32,
    name: '인성태그',
    type: '인성',
  },
];

export const categoryTags = [
  { value: '서류 준비', type: 'category' },
  { value: '과제 준비', type: 'category' },
  { value: '면접 준비', type: 'category' },
] as const;

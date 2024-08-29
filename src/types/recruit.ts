export const RECRUIT_TYPES = ['서류_준비', '과제_준비', '인터뷰_준비', '내_정보_복사'] as const;

export type RecruitType = (typeof RECRUIT_TYPES)[number];

export interface RecruitCard {
  id: number;
  title: string;
  season: string;
  siteUrl: string;
  recruitStatus: string;
  createdDate: string;
  nearestSchedule: {
    id: number;
    recruitScheduleStage: string;
    deadLine: `${number}-${number}-${number}`;
  } | null;
}

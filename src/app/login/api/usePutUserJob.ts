import { http } from '@/apis/http';
import { useMutation } from '@tanstack/react-query';

type JobType = '개발자' | '디자이너';

const putUserJob = async (job: JobType) => http.put({ url: '/users/job', data: { job } });

export const usePutUserJob = () => useMutation({ mutationFn: putUserJob });

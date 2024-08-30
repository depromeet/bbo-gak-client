import { useMutation } from '@tanstack/react-query';
import { http } from './http';

export type PostImagePresignedUrlRequest = Array<{ fileExtension: string }>;
export type PostImagePresignedUrlResponse = {
  filename: string;
  presignedUrl: string;
};

export type PostImageRequest = Array<{ fileName: string }>;
export type PostImageResponse = Array<{ staticUrl: string }>;

export const postImagePresignedUrl = (extensions: PostImagePresignedUrlRequest) =>
  http.post<Array<PostImagePresignedUrlResponse>>({
    url: '/images/presigned-urls',
    data: extensions,
  });

export const postImage = ({ cardId, urls }: { cardId: number } & { urls: PostImageRequest }) =>
  http.post<PostImageResponse>({
    url: `/card-images/static-urls/${cardId}`,
    data: urls,
  });

export const putImageToS3 = async ({ url, file }: { url: string; file: ArrayBuffer }) =>
  await fetch(url, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': 'image/png',
    },
    cache: 'no-store',
  });

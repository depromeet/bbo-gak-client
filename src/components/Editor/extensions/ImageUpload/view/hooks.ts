import { postImagePresignedUrl, postImage, putImageToS3 } from '@/apis/image';
import { usePathname } from 'next/navigation';
import { DragEvent, useCallback, useEffect, useRef, useState } from 'react';

function getFileExtension(file: File) {
  return file.name.split('.').pop()?.toUpperCase();
}

export function useUploader({ onUpload }: { onUpload: (url: string) => void }) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  const uploadFile = useCallback(
    async (_file?: File) => {
      setLoading(true);
      try {
        const extension = getFileExtension(_file!) || '';

        const file = (await postImagePresignedUrl([{ fileExtension: extension }])).data[0];
        const { presignedUrl, filename } = file;

        const arrayBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as ArrayBuffer);
          reader.onerror = reject;
          reader.readAsArrayBuffer(_file!);
        });

        await putImageToS3({ file: arrayBuffer, url: presignedUrl });

        const staticUrl = (
          await postImage({ cardId: Number(pathname.split('/').at(-1)), urls: [{ fileName: filename }] })
        ).data[0].staticUrl;

        onUpload(staticUrl);
      } catch (errPayload: any) {
        const error = errPayload?.response?.data?.error || 'Something went wrong';
        console.error(error);
      }
      setLoading(false);
    },
    [onUpload],
  );

  return { loading, uploadFile };
}

export function useFileUpload() {
  const fileInput = useRef<HTMLInputElement>(null);

  const handleUploadClick = useCallback(() => {
    fileInput.current?.click();
  }, []);

  return { ref: fileInput, handleUploadClick };
}

export function useDropZone({ uploader }: { uploader: (file: File) => void }) {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [draggedInside, setDraggedInside] = useState<boolean>(false);

  useEffect(() => {
    const dragStartHandler = () => {
      setIsDragging(true);
    };

    const dragEndHandler = () => {
      setIsDragging(false);
    };

    document.body.addEventListener('dragstart', dragStartHandler);
    document.body.addEventListener('dragend', dragEndHandler);

    return () => {
      document.body.removeEventListener('dragstart', dragStartHandler);
      document.body.removeEventListener('dragend', dragEndHandler);
    };
  }, []);

  const onDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      setDraggedInside(false);
      if (e.dataTransfer.files.length === 0) {
        return;
      }

      const fileList = e.dataTransfer.files;
      const files: File[] = [];

      for (let i = 0; i < fileList.length; i += 1) {
        const item = fileList.item(i);
        if (item) {
          files.push(item);
        }
      }

      if (files.some((file) => file.type.indexOf('image') === -1)) {
        return;
      }

      e.preventDefault();

      const filteredFiles = files.filter((f) => f.type.indexOf('image') !== -1);
      const file = filteredFiles.length > 0 ? filteredFiles[0] : undefined;

      if (file) {
        uploader(file);
      }
    },
    [uploader],
  );

  const onDragEnter = useCallback(() => {
    setDraggedInside(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setDraggedInside(false);
  }, []);

  return { isDragging, draggedInside, onDragEnter, onDragLeave, onDrop };
}

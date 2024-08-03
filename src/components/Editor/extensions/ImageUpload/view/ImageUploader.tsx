import { ChangeEvent, useCallback } from 'react';
import { EditorButton } from '@/components/Editor/extensions/EditorButton/EditorButton';
import { useDropZone, useFileUpload, useUploader } from './hooks';
import { EditorIcon } from '@/components/Editor/extensions/EditorIcon/EditorIcon';
import { Spinner } from '@/components/Editor/extensions/Spinner/Spinner';
import { cn } from '@/utils';

export function ImageUploader({ onUpload }: { onUpload: (url: string) => void }) {
  const { loading, uploadFile } = useUploader({ onUpload });
  const { handleUploadClick, ref } = useFileUpload();
  const { draggedInside, onDrop, onDragEnter, onDragLeave } = useDropZone({ uploader: uploadFile });

  const onFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => (e.target.files ? uploadFile(e.target.files[0]) : null),
    [uploadFile],
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center p-32 rounded-lg min-h-[10rem] bg-opacity-80">
        <Spinner className="text-neutral-500" size={1.5} />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center px-32 py-40 rounded-lg bg-opacity-80',
        draggedInside && 'bg-neutral-100',
      )}
      onDrop={onDrop}
      onDragOver={onDragEnter}
      onDragLeave={onDragLeave}
      contentEditable={false}>
      <EditorIcon name="Image" className="w-48 h-48 mb-16 text-black dark:text-white opacity-20" />
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="text-sm font-medium text-center text-neutral-400 dark:text-neutral-500">
          {draggedInside ? '이미지 올려놓기' : '이미지를 드래깅하거나'}
        </div>

        <div>
          <EditorButton
            className="gap-10"
            disabled={draggedInside}
            onClick={handleUploadClick}
            variant="primary"
            buttonSize="small">
            <EditorIcon name="Upload" />
            이미지 업로드
          </EditorButton>
        </div>
      </div>

      <input hidden ref={ref} type="file" accept=".jpg,.jpeg,.png,.webp,.gif" onChange={onFileChange} />
    </div>
  );
}

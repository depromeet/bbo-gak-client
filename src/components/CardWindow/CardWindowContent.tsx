import { Tag } from '@/system/components';
import { Spacing } from '@/system/utils/Spacing';
import { formatToYYMMDD } from '@/utils/date';
import { useGetInfoCardDetail } from './hooks/useGetInfoCardDetail';
import { EditorContent, useEditor } from '@tiptap/react';
import { ExtensionKit } from '../Editor/extensionKit';

interface CardWindowContentProps {
  cardId: number;
}
export function CardWindowContent({ cardId }: CardWindowContentProps) {
  const { data: card } = useGetInfoCardDetail(cardId);

  const cardContent = card.content ? JSON.parse(card.content) : '내용을 입력해주세요';

  const editor = useEditor(
    {
      content: cardContent,
      extensions: [...ExtensionKit()],
      editable: false,
      immediatelyRender: false,
    },
    [cardId],
  );

  return (
    <div className="px-20">
      <div className="flex items-center">
        <h1 className="flex-1 text-heading1 font-bold text-neutral-95 truncate">
          {card.title || '제목을 입력해주세요'}
        </h1>
        <p className="text-caption1 font-medium text-neutral-20">
          {formatToYYMMDD(card.updatedDate || '', { separator: '.' })}
        </p>
      </div>
      <Spacing size={24} />
      <div className="flex gap-8">
        {card.cardTypeValueList.map((type) => (
          <Tag key={type} color="yellow">
            {type.replaceAll('_', ' ')}
          </Tag>
        ))}
        {card.tagList.map(({ id, name, type }) => (
          <Tag key={id} color={type === '역량' ? 'blue' : 'purple'}>
            {name}
          </Tag>
        ))}
      </div>
      <Spacing size={20} />
      <div className="min-h-200 max-h-[600px] overflow-auto">
        <EditorContent readOnly editor={editor} contentEditable={false} />
      </div>
    </div>
  );
}

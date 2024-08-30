import { TouchButton } from '@/components/TouchButton';
import { Icon, Tag } from '@/system/components';
import { color } from '@/system/token/color';
import { ReactNode, useState } from 'react';
import { useGetInfoCardDetail } from '../../hooks/apis/useGetInfoCardDetail';
import { Spacing } from '@/system/utils/Spacing';
import { formatToYYMMDD } from '@/utils/date';
import { motion } from 'framer-motion';
import { If } from '@/system/utils/If';
import { useRouter } from 'next/navigation';
import { useEditor } from '../Editor/useEditor';
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('../Editor/Editor').then(({ Editor }) => Editor), { ssr: false });

interface CardWindowProps {
  cardId: number;
  onClose: () => void;
}

export function CardWindow({ cardId, onClose }: CardWindowProps) {
  const router = useRouter();
  const [isRight, setIsRight] = useState(true);

  const { data: card, isLoading } = useGetInfoCardDetail(cardId);
  const { editor } = useEditor({
    initialContent: card?.content,
    readOnly: true,
  });

  if (!editor) {
    return null;
  }

  return (
    <motion.div
      initial={{
        y: 50,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      exit={{
        scale: 0.9,
        opacity: 0,
      }}
      style={{
        right: isRight ? 16 : undefined,
        left: !isRight ? 16 : undefined,
      }}
      transition={{
        ease: 'easeIn',
        duration: 0.2,
      }}
      layout
      className="absolute bottom-16 w-368 max-h-[768px] rounded-20 bg-white shadow-[0px_3px_8px_0px_rgba(0,0,0,0.24)]">
      <div className="p-20 pb-24">
        <div className="flex justify-between">
          <div className="flex gap-12">
            <WindowButton
              onClick={() => {
                router.push(`/write/${cardId}`);
                onClose();
              }}
              description="해당 글로 이동하기">
              <Icon name="fullScreenCorner" color={color.neutral35} size={20} />
            </WindowButton>
            <WindowButton
              onClick={() => setIsRight((prev) => !prev)}
              description={`${isRight ? '왼쪽' : '오른쪽'}으로 옮기기`}>
              <span className={!isRight ? '[&>svg]:rotate-180' : undefined}>
                <Icon name="toLeft" color={color.neutral35} size={20} />
              </span>
            </WindowButton>
          </div>
          <TouchButton onClick={onClose}>
            <Icon name="x" color={color.neutral40} />
          </TouchButton>
        </div>
      </div>
      <If condition={isLoading}>
        <Skeleton />
      </If>
      <If condition={!isLoading}>
        <div className="px-20">
          <div className="flex items-center">
            <h1 className="flex-1 text-heading1 font-bold text-neutral-95 truncate">
              {card?.title || '제목을 입력해주세요'}
            </h1>
            <p className="text-caption1 font-medium text-neutral-20">
              {formatToYYMMDD(card?.updatedDate || '', { separator: '.' })}
            </p>
          </div>
          <Spacing size={24} />
          <div className="flex gap-8">
            {card?.cardTypeValueList.map((type) => (
              <Tag key={type} color="yellow">
                {type.replaceAll('_', ' ')}
              </Tag>
            ))}
            {card?.tagList.map(({ id, name, type }) => (
              <Tag key={id} color={type === '역량' ? 'blue' : 'purple'}>
                {name}
              </Tag>
            ))}
          </div>
          <Spacing size={20} />
          <div className="min-h-200 max-h-[600px] overflow-auto">
            <Editor editor={editor} />
          </div>
        </div>
      </If>
    </motion.div>
  );
}

interface WindowButtonProps {
  onClick?: () => void;
  description?: string;
  children: ReactNode;
}

function WindowButton({ onClick, children, description }: WindowButtonProps) {
  return (
    <motion.button
      whileHover="hover"
      className="relative p-2 border rounded-[3.8px] transition-colors hover:bg-neutral-3"
      onClick={onClick}>
      {children}
      <motion.div
        initial={{ opacity: 0 }}
        variants={{ hover: { opacity: 1 } }}
        className="absolute top-[50%] translate-y-[-50%] left-28 px-10 w-max py-4 rounded-6 bg-[#70737C] text-white text-label1 font-regular pointer-events-none z-10">
        {description}
      </motion.div>
    </motion.button>
  );
}

function Skeleton() {
  return (
    <motion.div
      variants={{
        show: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      initial="hide"
      animate="show"
      className="flex flex-col gap-16 mb-200">
      <motion.div
        transition={{ repeat: Infinity, repeatType: 'reverse', duration: 0.5 }}
        variants={{
          hide: { opacity: 0.1, scale: 1 },
          show: { opacity: 1, scale: 0.98 },
        }}
        className="mx-20 h-[30px] rounded-[16px] bg-neutral-3"
      />
      <motion.div
        transition={{ repeat: Infinity, repeatType: 'reverse', duration: 0.5 }}
        variants={{
          hide: { opacity: 0.1, scale: 1 },
          show: { opacity: 1, scale: 0.98 },
        }}
        className="mx-20 h-[30px] rounded-[16px] bg-neutral-3"
      />
    </motion.div>
  );
}

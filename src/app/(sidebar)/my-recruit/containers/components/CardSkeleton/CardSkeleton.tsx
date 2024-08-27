import { motion } from 'framer-motion';
import { match } from 'ts-pattern';

interface Props {
  variant: 'box' | 'row';
  count: number;
}

export function CardSkeleton({ variant, count }: Props) {
  const wrapperClassName = match(variant)
    .with('box', () => 'flex gap-[16px]')
    .with('row', () => 'flex flex-col gap-[12px]')
    .exhaustive();

  const itemClassName = match(variant)
    .with('box', () => 'w-[280px] h-[142px] bg-neutral-3 rounded-[10px]')
    .with('row', () => 'w-full h-[70px] bg-neutral-3 rounded-[10px]')
    .exhaustive();

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
      className={wrapperClassName}>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <motion.div
            key={index}
            variants={{
              hide: { opacity: 0.1, scale: 1 },
              show: { opacity: 1, scale: 0.98, transition: { repeat: Infinity, repeatType: 'reverse', duration: 0.5 } },
            }}
            className={itemClassName}
          />
        ))}
    </motion.div>
  );
}

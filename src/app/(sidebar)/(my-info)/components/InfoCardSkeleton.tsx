import { motion } from 'framer-motion';

interface InfoCardSkeletonProps {
  count: number;
}

export function InfoCardSkeleton({ count }: InfoCardSkeletonProps) {
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
      className="grid grid-cols-[repeat(auto-fill,minmax(343px,1fr))] gap-[16px]">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <motion.div
            key={index}
            variants={{
              hide: { opacity: 0.1, scale: 1 },
              show: { opacity: 1, scale: 0.98, transition: { repeat: Infinity, repeatType: 'reverse', duration: 0.5 } },
            }}
            className="h-[140px] p-[24px] rounded-[16px] bg-neutral-3"
          />
        ))}
    </motion.div>
  );
}

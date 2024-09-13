import { motion } from 'framer-motion';

export function EasterEgg() {
  return (
    <div
      className="relative w-full h-[500px] font-[NanumDaheng] text-[80px] flex justify-center items-center"
      style={{ overflow: 'hidden' }}>
      <div className="relative flex gap-[20px] items-center">
        디프만 15기 수고 많으셨습니다!
        <motion.img
          initial={{ scale: 3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 5.5 }}
          src="/easteregg/모두박수.png"
          style={{ height: '120px' }}
        />
        <motion.div
          className="absolute"
          initial={{ x: '-10%' }}
          animate={{ x: '120%' }}
          transition={{ delay: 0.5, duration: 8 }}
          style={{ top: 0, left: 0, height: '100%', width: '110%', display: 'flex' }}>
          <div
            style={{
              background: 'linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))',
              width: '30px',
              height: '100%',
            }}
          />
          <div style={{ flex: 1, backgroundColor: 'white' }} />
        </motion.div>
      </div>
    </div>
  );
}

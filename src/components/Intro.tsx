'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface IntroProps {
  onComplete: () => void;
}

const greetings = ['Hello', 'Bonjour', 'Ciao', 'Olá', 'やあ', 'Hallå', 'مرحبا', 'Guten tag', 'Hallo', 'नमस्ते'];
const TOTAL_DURATION = 3000;
const INTERVAL = TOTAL_DURATION / greetings.length;

const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [showFinalGreeting, setShowFinalGreeting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        const next = prev + 1;
        if (next >= greetings.length) {
          clearInterval(interval);
          setShowFinalGreeting(true);
          setDone(true);
          setTimeout(onComplete, 800); // match slide duration
        }
        return next;
      });
    }, INTERVAL);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      initial={{ y: 0 }}
      animate={done ? { y: '-100%' } : { y: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      {!showFinalGreeting ? (
        <motion.p
          className="text-[#c2c1b8] text-4xl font-normal flex items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-4xl font-bold leading-none">•</span>
          {greetings[index]}
        </motion.p>
      ) : (
        <motion.p
          className="text-[#c2c1b8] text-4xl font-normal flex items-center gap-2"
          initial={{ opacity: 1, y: 0 }}
        >
          <span className="text-4xl font-bold leading-none">•</span>
          {greetings[greetings.length - 1]}
        </motion.p>
      )}
    </motion.div>
  );
};

export default Intro;

// Mods

// 'use client';

// import { motion } from 'framer-motion';
// import { useEffect, useState } from 'react';

// interface IntroProps {
//   onComplete: () => void;
// }

// const greetings = ['Hello', 'Bonjour', 'Ciao', 'Olá', 'やあ', 'Hallå', 'مرحبا', 'Guten tag', 'Hallo', 'नमस्ते'];
// const HELLO_DURATION = 500; // Hello stays for 1 second
// const MIDDLE_DURATION = 200; // Middle greetings move faster
// const NAMASTE_DURATION = 600; // Namaste stays till the end

// const Intro: React.FC<IntroProps> = ({ onComplete }) => {
//   const [index, setIndex] = useState(0);
//   const [done, setDone] = useState(false);
//   const [showFinalGreeting, setShowFinalGreeting] = useState(false);

//   useEffect(() => {
//     const getInterval = (currentIndex: number) => {
//       if (currentIndex === 0) return HELLO_DURATION;
//       if (currentIndex === greetings.length - 1) return NAMASTE_DURATION;
//       return MIDDLE_DURATION;
//     };

//     const interval = setInterval(() => {
//       setIndex((prev) => {
//         const next = prev + 1;
//         if (next >= greetings.length) {
//           clearInterval(interval);
//           setShowFinalGreeting(true);
//           setDone(true);
//           setTimeout(onComplete, 800); // match slide duration
//         }
//         return next;
//       });
//     }, getInterval(index));

//     return () => clearInterval(interval);
//   }, [onComplete, index]);

//   return (
//     <motion.div
//       className="fixed inset-0 bg-black z-50 flex items-center justify-center"
//       initial={{ y: 0 }}
//       animate={done ? { y: '-100%' } : { y: 0 }}
//       transition={{ duration: 0.8, ease: 'easeInOut' }}
//     >
//       {!showFinalGreeting ? (
//         <motion.p
//           className="text-[#c2c1b8] text-4xl font-normal flex items-center gap-2"
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3 }}
//         >
//           <span className="text-4xl font-bold leading-none">•</span>
//           {greetings[index]}
//         </motion.p>
//       ) : (
//         <motion.p
//           className="text-[#c2c1b8] text-4xl font-normal flex items-center gap-2"
//           initial={{ opacity: 1, y: 0 }}
//         >
//           <span className="text-4xl font-bold leading-none">•</span>
//           {greetings[greetings.length - 1]}
//         </motion.p>
//       )}
//     </motion.div>
//   );
// };

// export default Intro;

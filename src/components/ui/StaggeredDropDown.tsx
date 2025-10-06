import { motion, AnimatePresence } from "framer-motion";

interface IconActionButtonProps {
  children: React.ReactNode;
  isVisible: boolean;
}

const StaggeredDropDown: React.FC<IconActionButtonProps> = ({ children, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <div className='absolute top-0 left-0 w-full h-full'>

          <motion.div
            key="dropdown"
            initial="closed"
            animate="open"
            exit="closed"
            variants={wrapperVariants}
            style={{ originY: "top", translateY: "40%" }}
            className="flex flex-col gap-2 p-2 rounded-lg shadow-xl absolute w-[90vw] max-w-xl bg-[rgba(255,255,255,0.95)] border-1 border-gray-300 left-1/2 -translate-x-1/2 z-50"
          >

            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default StaggeredDropDown;

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

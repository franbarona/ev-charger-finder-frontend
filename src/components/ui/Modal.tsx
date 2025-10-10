import { motion, AnimatePresence } from "framer-motion";
import { type MouseEvent, useEffect, useRef } from "react";
import { LuX } from "react-icons/lu";
import IconActionButton from "./IconActionButton";

interface ModalProps {
  children: React.ReactNode;
  isVisible: boolean;
  handleClose: () => void;
  handleOverlayClick: (e: MouseEvent<HTMLDivElement>) => void;
  title?: string;
}

const overlayVariants = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      duration: 0.2,
      delayChildren: 0.2,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren",
      duration: 0.3,
      delay: 0.2,
    },
  },
};

const Modal: React.FC<ModalProps> = ({
  children,
  isVisible,
  handleClose,
  handleOverlayClick,
  title,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible) return;

    const preventZoom = (e: TouchEvent) => {
      // Prevent pinch-to-zoom
      if (e.touches.length > 1) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const preventWheel = (e: WheelEvent) => {
      // Prevent zoom ctrl + scroll in desktop
      if (e.ctrlKey) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const overlay = overlayRef.current;
    if (overlay) {
      overlay.addEventListener('touchstart', preventZoom, { passive: false });
      overlay.addEventListener('touchmove', preventZoom, { passive: false });
      overlay.addEventListener('wheel', preventWheel, { passive: false });
    }

    return () => {
      if (overlay) {
        overlay.removeEventListener('touchstart', preventZoom);
        overlay.removeEventListener('touchmove', preventZoom);
        overlay.removeEventListener('wheel', preventWheel);
      }
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={overlayRef}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={overlayVariants}
          className="fixed top-0 left-0 bottom-0 right-0 w-full h-full bg-[rgba(0,0,0,0.4)] bg-opacity-50 z-40"
          onClick={handleOverlayClick}
          style={{ touchAction: 'pan-y' }}
        >
          <motion.div
            key="dropdown"
            initial={{ y: "100vh" }}
            animate={{ y: 0 }}
            exit={{ y: "100vh" }}
            transition={{ duration: 0.2 }}
            className="
            flex flex-col gap-2 p-2 rounded-lg shadow-xl absolute w-[90vw] max-w-xl max-h-[90vh] overflow-hidden frosted-bg
            border-1 border-gray-300 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-50"
          >
            <div className="flex justify-between w-full">
              <h2 className="font-medium text-2xl text-gray-700 pl-5 pt-3">{title}</h2>
              <div className="ml-auto">
                <IconActionButton
                  icon={LuX}
                  action={handleClose}
                  iconSize="lg"
                />
              </div>
            </div>
            <div className="overflow-auto px-2">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
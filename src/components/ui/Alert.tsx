import { IoCheckmarkCircle, IoCheckmarkSharp, IoInformationCircle } from "react-icons/io5";
import type { AlertType } from "../../types/types";
import { GrClose } from "react-icons/gr";

type AlertProps = {
  id: number;
  type: AlertType;
  message: string;
  onClose: (id: number) => void;
  isLeaving?: boolean;
}

const typeStyles = {
  success: {
    icon: <IoCheckmarkCircle className="h-5 w-5 text-emerald-700" />,
  },
  error: {
    icon: <IoCheckmarkSharp className="h-5 w-5 text-rose-700" />,
  },
  info: {
    icon: <IoInformationCircle className="h-5 w-5 text-sky-700" />,
  },
};

const Alert = ({ id, type = 'info', message, onClose, isLeaving = false }: AlertProps) => {
  const style = typeStyles[type] || typeStyles.info;

  return (
    <div className={`
    flex items-center justify-between h-15 px-6 rounded bg-neutral-50/90 shadow-md max-w-[350px]
    transition-all duration-300 ${isLeaving ? 'animate-fade-out' : 'animate-fade-in'}`}>
      <div className="flex gap-2 justify-start items-center">
        {style.icon}
        <div className="mr-3 flex-1">{message}</div>
      </div>
      <button onClick={() => onClose(id)} className=" text-sm cursor-pointer">
        <GrClose />
      </button>
    </div>
  );
};

export default Alert;

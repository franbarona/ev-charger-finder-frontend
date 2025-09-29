import { MdKeyboardArrowLeft } from "react-icons/md";

interface ButtonHideListProps {
  action: () => void;
  isSidebarExpanded?: boolean;
}

const ButtonHideList: React.FC<ButtonHideListProps> = ({ action, isSidebarExpanded }) => {
  const arrowRotation = isSidebarExpanded ? "" : "rotate-180";
  return (
    <button
      className={`
                cursor-pointer absolute bottom-1/8 -right-8 bg-emerald-700/90 border-2 border-gray-200
                py-4 pl-1.5 pr-1 rounded-r-xl shadow-2xl text-2xl text-white`}
      onClick={action}
    >
      <MdKeyboardArrowLeft className={`transition-all duration-600 easy-in-out ${arrowRotation}`} />
    </button>
  )
}

export default ButtonHideList;
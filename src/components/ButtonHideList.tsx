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
                cursor-pointer absolute bottom-1/8 -right-7 bg-gray-100 border-1 border-gray-300
                py-4 px-1.5 rounded-r-xl shadow-2xl text-xl`}
      onClick={action}
    >
      <MdKeyboardArrowLeft className={`transition-all duration-600 easy-in-out ${arrowRotation}`} />
    </button>
  )
}

export default ButtonHideList;
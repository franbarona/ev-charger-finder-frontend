import type { ButtonStyle } from "../../types/types";

interface ActionButtonProps {
  action: (e?: any) => void;
  label: string;
  style?: ButtonStyle;
}

function getStyleClasses(style: ButtonStyle) {
  switch (style) {
    case "secondary":
      return "bg-white text-gray-700 border-gray-700 text-lg";
    case "tertiary":
      return "bg-emerald-700/95 text-white border-gray-300 text-normal";
    default:
      return "bg-gray-700 text-white border-gray-700 text-lg";
  }
}

const ActionButton: React.FC<ActionButtonProps> = ({
  action,
  label,
  style = "primary",
}) => {
  return (
    <button
      type="button"
      onClick={action}
      className={`cursor-pointer py-1 px-4 border-1 rounded-lg transition-transform opacity-90
        ${getStyleClasses(style)} hover:opacity-100`}
    >
      <span>{label}</span>
    </button>
  );
};

export default ActionButton;

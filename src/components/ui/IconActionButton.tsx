interface IconActionButtonProps {
  icon: React.ElementType,
  action: () => void;
  iconSize?: string;
  bgClass?: string;
}

const IconActionButton: React.FC<IconActionButtonProps> = ({icon: Icon, action, iconSize, bgClass}) => {
  return (
    <button
      type="button"
      onClick={action}
      className={`cursor-pointer p-2 text-gray-700 font-semibold ${bgClass ? bgClass : 'bg-white'}  rounded-lg border-1 border-gray-300`}
    >
      <Icon className={`${iconSize ? iconSize: 'text-2xl'}`} />
    </button>
  )
}

export default IconActionButton;
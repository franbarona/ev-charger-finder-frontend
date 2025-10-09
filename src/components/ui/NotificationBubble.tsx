interface NotificationBubbleProps {
  number: number;
}
const NotificationBubble = ({ number }: NotificationBubbleProps) => {
  return (
    <div className="absolute -right-2 -top-2 z-40 w-fit h-5 aspect-square px-1 pb-1 pt-0.5 bg-green-700 rounded-full flex">
      <span className="m-auto text-white text-xs font-semibold">{number}</span>
    </div>
  );
};

export default NotificationBubble;

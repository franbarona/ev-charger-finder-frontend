import { LuInfo, LuList } from "react-icons/lu";
import type { ChargingStation } from "../types/types";
import IconActionButton from "./ui/IconActionButton";
import NotificationBubble from "./ui/NotificationBubble";

interface MobileActionsProps {
  stations: ChargingStation[];
  openAboutSection: () => void;
  toggleList: () => void;
}

const MobileActions: React.FC<MobileActionsProps> = ({
  stations,
  openAboutSection,
  toggleList,
}) => {
  return (
    <div className="absolute lg:hidden bottom-10 right-3 shadow-2xl z-10 flex flex-col gap-2">
      {stations.length > 0 && (
        <div>
          <IconActionButton icon={LuList} action={toggleList} />
          <NotificationBubble number={stations.length} />
        </div>
      )}
      <div>
        <IconActionButton icon={LuInfo} action={openAboutSection} />
      </div>
    </div>
  );
};

export default MobileActions;

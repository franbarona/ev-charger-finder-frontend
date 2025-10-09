import { EnumSizesToNumber, type Sizes } from "../../types/types";

interface LogoProps {
  size: Sizes;
}

const Logo: React.FC<LogoProps> = ({ size }) => {
  return (
    <div className={`flex justify-start items-center font-medium font-outfit gap-1 ${size ? `text-${size}` : 'text-2xl'}`}>
      {/* <TbMapPinBolt className={`text-emerald-700 text-shadow-sm  ${size ? `text-4xl` : 'text-3xl'}`} /> */}
      <img src="/EV_finder_logo.svg" alt="" width={EnumSizesToNumber[size]} />
      <span className="tracking-tight text-shadow-xs">Charging</span>
      {/* <span className="tracking-tight text-shadow-sm text-emerald-700 text-3xl">
        ·
      </span> */}
    </div>
  );
};

export default Logo;
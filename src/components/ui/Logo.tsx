import { FaBolt } from "react-icons/fa6";
import { type Sizes } from "../../types/types";

interface LogoProps {
  size: Sizes;
}

const Logo: React.FC<LogoProps> = ({ size }) => {
  return (
    <div
      className={`flex justify-start items-center font-semibold font-outfit gap-0 ${
        size === "big" ? `text-4xl` : "text-2xl"
      }`}
    >
      <span className="tracking-tighter font-extrabold">V</span>
      <div className="p-0.5 bg-emerald-700 rounded-full">
        <FaBolt
          className={`text-white  ${size === "big" ? `text-2xl` : "text-base"}`}
        />
      </div>
      <span className="tracking-tighter font-extrabold">LTIFY</span>
    </div>
  );
};

export default Logo;

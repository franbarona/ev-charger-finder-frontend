import { NavLink } from "react-router-dom";
import menuConfig from "../constants/menu-config"; // ajusta la ruta si es necesario
import { TbMapPinBolt } from "react-icons/tb";

const NavLogo = () => {
  return (
    <>
      <div className={`hidden xl:flex justify-start items-center font-medium font-outfit text-2xl gap-1`}>
        <TbMapPinBolt className="text-emerald-700 text-3xl text-shadow-sm" />
        <span className="tracking-tight text-shadow-xs">Charging</span>
        <span className="tracking-tight text-shadow-sm text-emerald-700 text-3xl">·</span>
      </div>
    </>
  )
}

const NavLinks = () => {
  return (
    <div className={`hidden xl:flex gap-8 items-center text-lg font-medium`}>
      {menuConfig.map(({ to, label }) => {
        return (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `flex items-center gap-1 rounded justify-start 
              ${isActive ? "text-emerald-700" : "text-gray-700/50 hover:text-emerald-700"}
              `}
          >
            {/* {icon} */}
            <span className={`whitespace-nowrap transition-opacity duration-300 easy-in-out delay-300`}>
              {label}
            </span>
          </NavLink>
        );
      })}
    </div>
  )
}

const Navbar = () => {
  return (
    <div className="absolute shadow-2xl z-50 w-[90vw] md:w-[50vw] xl:w-[90vw] top-2 xl:top-0 mx-auto left-0 right-0 rounded-b-2xl xl:border-b-2 border-l-2 border-r-2 border-gray-300 xl:bg-[rgba(255,255,255,0.6)] xl:backdrop-blur-2xl">
      <nav className={`flex justify-between items-center xl:py-3 xl:px-10 `}>
        <NavLogo />
        <NavLinks />
      </nav>
    </div>
  );
};

export default Navbar;
import { NavLink } from "react-router-dom";
import menuConfig from "../constants/menu-config"; // ajusta la ruta si es necesario
import { FaMapMarkerAlt } from "react-icons/fa";
import SearchBar from "./SearchBar";

const NavLogo = () => {
  return (
    <div className={`hidden xl:flex justify-start items-center font-bold font-outfit text-2xl gap-2`}>
      <FaMapMarkerAlt className="text-emerald-700 text-2xl" />
      <span>Charging</span>
    </div>
  )
}

const NavLinks = () => {
  return (
    <div className={`hidden xl:flex gap-8 items-center text-lg font-medium`}>
      {menuConfig.map(({ to, label, icon }) => {
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
    <div className="absolute shadow-2xl z-50 w-[90vw] md:w-[50vw] xl:w-[80vw] max-w-5xl mx-auto top-2 left-0 right-0 rounded-2xl xl:border-b-1 border-gray-300 xl:bg-[rgba(255,255,255,0.3)] xl:backdrop-blur-2xl">
      <nav className={`flex justify-between items-center xl:py-2 xl:px-10 `}>
        <NavLogo />
        <div className="flex-1 xl:max-w-xl xl:mx-10">
          <SearchBar />
        </div>
        <NavLinks />
      </nav>
    </div>
  );
};

export default Navbar;
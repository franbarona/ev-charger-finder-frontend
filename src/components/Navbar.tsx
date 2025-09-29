import { NavLink } from "react-router-dom";
import menuConfig from "../constants/menu-config"; // ajusta la ruta si es necesario
import { FaMapMarkerAlt } from "react-icons/fa";
import SearchBar from "./SearchBar";

const NavLogo = () => {
  return (
    <div className={`flex justify-start items-center font-bold font-outfit text-2xl gap-2`}>
      <FaMapMarkerAlt className="text-emerald-700 text-2xl" />
      <span>Charging</span>
    </div>
  )
}

const NavLinks = () => {
  return (
    <div className={`flex gap-8 items-center text-lg font-medium`}>
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
    <nav className={`flex justify-between items-center py-2 px-10`}>
      <NavLogo />
      <div className="flex-1 max-w-lg mx-10">
      <SearchBar/>
      </div>
      <NavLinks />
    </nav>
  );
};

export default Navbar;
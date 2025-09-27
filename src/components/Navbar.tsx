import { NavLink } from "react-router-dom";
import menuConfig from "../constants/menu-config"; // ajusta la ruta si es necesario

const NavLogo = () => {
  return (
    <div className={`flex justify-start items-center font-bold font-outfit text-4xl px-6`}>
      <img src="/EV_finder_logo.svg" alt="" width={45} height={45} />
      <h1>Volterit.</h1>
    </div>
  )
}

const NavLinks = () => {
  return (
    <div className={`flex gap-10 items-center text-xl pr-10 font-medium`}>
      {menuConfig.map(({ to, label, icon }) => {
        return (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `flex items-center gap-1 rounded justify-start 
              ${isActive ? "text-emerald-700" : "text-gray-700/50 hover:text-emerald-700"}
              `}
          >
            {icon}
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
    <nav className={`flex justify-between py-2 bg-gray-100 border-b-1 border-gray-300`}>
      <NavLogo />
      <NavLinks />
    </nav>
  );
};

export default Navbar;
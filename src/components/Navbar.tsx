import ActionButton from "./ui/ActionButton";
import { useAboutSection } from "../context/AboutSectionContext";
import Logo from "./ui/Logo";

const Navbar = () => {
  const { openAboutSection } = useAboutSection();
  return (
    <div className="hidden lg:block absolute shadow-2xl z-30 w-[90vw] md:w-[50vw] lg:w-[90vw] top-0 mx-auto left-0 right-0 rounded-b-2xl border-b-2 border-l-2 border-r-2 border-gray-300 bg-[rgba(255,255,255,0.6)] backdrop-blur-2xl">
      <nav className={`flex justify-between items-center lg:py-3 lg:px-10 `}>
        <Logo size="normal" />
        <ActionButton
          action={openAboutSection}
          label="About"
          style="tertiary"
        ></ActionButton>
      </nav>
    </div>
  );
};

export default Navbar;

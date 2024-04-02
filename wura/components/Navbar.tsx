import { useState } from "react";
import NavbarItem from "./NavbarItem";
import MobileMenu from "./MobileMenu";
import { BiSolidChevronDownCircle } from "react-icons/bi";

const Navbar = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
  return (
    <nav className="w-full fixed z-40 mt-2">
      <div
        className="
     md:px-16
     flex
     flex-row
     items-center
     px-4
     bg-zince-900
     bg-opacity-90
     "
      >
        <img
          src="./images/wura.jpeg"
          alt="app_logo"
          className="h-4 lg:h-12 cursor-pointer"
        />

        <div
          className="
          flex-row
          ml-8
          gap-7
          hidden
          lg:flex
          "
        >
          <NavbarItem label="Home" />
          <NavbarItem label="Series" />
          <NavbarItem label="Films" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Search By Languages" />
        </div>
        <div
          className="
          lg:hidden flex flex-row items-center relative gap-2 ml-8 cursor-pointer
          "
        >
          <p className="text-white text-sm">Browse</p>
          <BiSolidChevronDownCircle className="text-slate-400 transition" />
          <MobileMenu visible/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

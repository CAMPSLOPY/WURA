import { useCallback, useEffect, useState } from "react";
import NavbarItem from "./NavbarItem";
import MobileMenu from "./MobileMenu";
import AccountMenu from "./AccountMenu";
import {
  BiSolidChevronDownCircle,
  BiSearchAlt,
  BiSolidBell,
} from "react-icons/bi";

const TOP_OFFSET = 66;

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

useEffect(() => {
const handleScroll = () => {
    if(window.scrollY >= TOP_OFFSET) {
setShowBackground(true);
    } else {
setShowBackground(false);
    }
}
window.addEventListener("scroll", handleScroll);
return () => window.removeEventListener("scroll", handleScroll);
}, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  return (
    <nav className="w-full fixed z-40 mt-0">
      <div
        className={`
     md:px-16
     flex
     flex-row
     items-center
     px-4
       py-6
     transition
     duration-500
     ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}
     `}
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
          onClick={toggleMobileMenu}
          className="
          lg:hidden flex flex-row items-center relative gap-2 ml-8 cursor-pointer
          "
        >
          <p className="text-white text-sm">Browse</p>
          <BiSolidChevronDownCircle className={`"text-white bg-white transition" ${showMobileMenu ? "rotate-180" : "rotate-0"}`}/>
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row gap-7 item-center ml-auto">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <BiSearchAlt className="text-white relative top-1 md:size-8" />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <BiSolidBell className="text-white relative top-1  md:size-8" />
          </div>

          <div onClick={toggleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img className="h-9" src="./images/user.png" alt="" />
            </div>
            <BiSolidChevronDownCircle className={`text-slate-400 transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />

            <AccountMenu visible = {showAccountMenu}/>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

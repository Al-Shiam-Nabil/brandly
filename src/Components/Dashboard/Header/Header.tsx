import {
  Bell,
  CircleCheckBig,
  CirclePlus,
  Clock4,
  Globe,
  LayoutGrid,
  Mail,
  Menu,
  Monitor,
  Search,
} from "lucide-react";

import DefaultUser from "../../../assets/defaultUser.webp";
import useDashboardHook from "../../../Hooks/useDashboardHook";

export default function Header() {
  const { isOpen, setIsOpen } = useDashboardHook();

  return (
    <div className="h-16.25 bg-white shadow-sm px-6 flex items-center justify-between">
      {/* left */}
      <div className="flex items-center gap-7 ">
        {/* menu icon */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className=" cursor-pointer"
        >
          <Menu size={20} stroke="#0000008c" />
        </button>
        {/* tick  */}
        <button className=" cursor-pointer">
          <CircleCheckBig size={20} stroke="#0000008c" />
        </button>

        <button className=" cursor-pointer">
          <LayoutGrid size={20} stroke="#0000008c" />
        </button>
        <button className=" cursor-pointer">
          <Monitor size={20} stroke="#0000008c" />
        </button>
      </div>

      {/* right */}
      <div className="flex items-center gap-7">
        <button className="cursor-pointer">
          <Search size={20} stroke="#0000008c" />
        </button>
        <button className="cursor-pointer">
          <CirclePlus size={20} stroke="#0000008c" />
        </button>
        <button className="cursor-pointer">
          <Globe size={20} stroke="#0000008c" />
        </button>
        <button className="cursor-pointer">
          <Clock4 size={20} stroke="#0000008c" />
        </button>
        <button className="cursor-pointer">
          <Bell size={20} stroke="#0000008c" />
        </button>
        <button className="cursor-pointer">
          <Mail size={20} stroke="#0000008c" />
        </button>

        <div className="flex items-center gap-4">
          <img
            src={DefaultUser}
            alt="user"
            className="w-7.5 h-7.5 object-cover rounded-full"
          />
          <p className="capitalize text-sm text-dark2">Al shiam nabil</p>
        </div>
      </div>
    </div>
  );
}

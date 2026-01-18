import {
  Calendar,
  ChevronDown,
  ChevronUp,
  CircleCheckBig,
  CircleQuestionMark,
  Command,
  Folder,
  Mail,
  MessageCircle,
  Minus,
  Monitor,
  PanelBottom,
  PieChart,
  SquareCheckBig,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router";
import BarndlyLogo from "../assets/brandlyLogo.png";
import LogoIcon from "../assets/logoIcon.png";
import Header from "../Components/Dashboard/Header/Header";
import useDashboardHook from "../Hooks/useDashboardHook";

type SubmenuTypes = {
  label: string;
  path: string;
};

type SidebarTypes = {
  label: string;
  path?: string;
  icon: LucideIcon;
  subMenus?: SubmenuTypes[];
};
const sidebarLinks: SidebarTypes[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: Monitor,
  },
  {
    label: "to do",
    path: "/hhesh",
    icon: SquareCheckBig,
  },
  {
    label: "Events",
    path: "/fiywf",
    icon: Calendar,
  },
  {
    label: "Projects",
    path: "/juwihew",
    icon: Command,
  },
  {
    label: "Tasks",
    path: "/iue",
    icon: CircleCheckBig,
  },
  {
    label: "Email Marketing",
    path: "/uhfuiwef",
    icon: Mail,
  },
  {
    label: "Notes",
    path: "/iujheiw",
    icon: PanelBottom,
  },
  {
    label: "Messages",
    path: "/juhdfufh",
    icon: MessageCircle,
  },
  {
    label: "Messages",
    icon: Users,
    subMenus: [
      {
        label: "Team members",
        path: "/uwidgui",
      },
      {
        label: "Time cards",
        path: "/jwehu",
      },
      {
        label: "Leave",
        path: "/ueh",
      },
      {
        label: "timeline",
        path: "/uidg",
      },
      {
        label: "Announcements",
        path: "/oihaseyh",
      },
    ],
  },
  {
    label: "Reports",
    path: "/hujhdf",
    icon: PieChart,
  },
  {
    label: "Files",
    path: "/kjiefw",
    icon: Folder,
  },
  {
    label: "Help & Support",

    icon: CircleQuestionMark,
    subMenus: [
      {
        label: "Help",
        path: "/uqw",
      },
    ],
  },
];

export default function DsahboardLayout() {
  const { isOpen } = useDashboardHook();

  console.log(isOpen);
  const [subMenuIndex, setsubMenuIndex] = useState<number | null>(null);
  return (
    <div className="flex ">
      {/* left sidebar */}
      <div
        className={`${isOpen ? "w-62.5" : "w-17"}  min-h-screen bg-primary `}
      >
        {/* logo */}
        <div
          className={`w-full h-16.25 ${isOpen ? "px-10 py-3" : ""} bg-white flex items-center justify-center  border-r border-gray-100  shadow-sm`}
        >
          {isOpen ? (
            <img
              src={BarndlyLogo}
              alt="logo"
              className="w-full h-full object-contain"
            />
          ) : (
            <img src={LogoIcon} alt="logo" />
          )}
        </div>

        {/* sidebar links container */}

        <div className="text-[#ffffffcc] space-y-2 p-2.5 text-sm select-none">
          {sidebarLinks.map((sidebarLink, index) => {
            if (sidebarLink.subMenus || !sidebarLink.path) {
              let showSubMenu = subMenuIndex === index;

              return (
                <div key={index}>
                  <div
                    onClick={() =>
                      setsubMenuIndex((prev) => (prev === index ? null : index))
                    }
                    className="flex items-center justify-between px-3.5 py-2.5 cursor-pointer rounded-md hover:bg-[#ffffff33] hover:text-white whitespace-nowrap group"
                  >
                    <div className="flex items-center gap-4  ">
                      {/* icon */}
                      <div>
                        <sidebarLink.icon size={20} />
                      </div>

                      {/* link Name */}

                      {isOpen && <div>{sidebarLink.label}</div>}
                    </div>

                    {isOpen && (
                      <div>
                        {showSubMenu ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </div>
                    )}
                  </div>

                  {/* submenus */}
                  {showSubMenu && isOpen && (
                    <div className="flex flex-col mt-3">
                      {sidebarLink.subMenus.map((submenu, ind) => (
                        <div>
                          <div key={ind}>
                            <NavLink to={submenu.path}>
                              {" "}
                              <div className="flex items-center gap-2  pl-5 px-3.5 py-2.5 hover:bg-[#ffffff33] hover:text-white rounded-md">
                                {/* icon */}
                                <div>
                                  <Minus size={12} />
                                </div>

                                {/* link Name */}
                                <div>{submenu.label}</div>
                              </div>
                            </NavLink>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <NavLink
                key={index}
                to={sidebarLink.path}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-3.5 py-2.5 cursor-pointer ${isActive && "bg-[#ffffff33] font-medium text-white"}   rounded-md hover:bg-[#ffffff33] hover:text-white whitespace-nowrap`
                }
              >
                {/* icon */}
                <div>
                  <sidebarLink.icon size={20} />
                </div>

                {/* link Name */}
                {isOpen && <div>{sidebarLink.label}</div>}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* right content  */}
      <div className=" flex-1 ">
        <Header />

        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

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
import { useTranslation } from "react-i18next";
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
    label: "sidebar.dashboard",
    path: "/dashboard",
    icon: Monitor,
  },
  {
    label: "sidebar.todo",
    path: "/dashboard/todos",
    icon: SquareCheckBig,
  },
  {
    label: "sidebar.events",
    path: "/dashboard/events",
    icon: Calendar,
  },
  {
    label: "sidebar.projects",
    path: "/dashboard/projects",
    icon: Command,
  },
  {
    label: "sidebar.tasks",
    path: "/dashboard/tasks",
    icon: CircleCheckBig,
  },
  {
    label: "sidebar.emailMarketing",
    path: "/uhfuiwef",
    icon: Mail,
  },
  {
    label: "sidebar.notes",
    path: "/dashboard/notes",
    icon: PanelBottom,
  },
  {
    label: "sidebar.messages",
    path: "/juhdfufh",
    icon: MessageCircle,
  },
  {
    label: "sidebar.teams",
    icon: Users,
    subMenus: [
      {
        label: "sidebar.teamMembers",
        path: "/dashboard/team-members",
      },
      {
        label: "sidebar.timeCards",
        path: "/jwehu",
      },
      {
        label: "sidebar.leave",
        path: "/dashboard/leave",
      },
      {
        label: "sidebar.timeline",
        path: "/uidg",
      },
      {
        label: "sidebar.announcements",
        path: "/oihaseyh",
      },
    ],
  },
  {
    label: "sidebar.reports",
    path: "/dashboard/reports",
    icon: PieChart,
  },
  {
    label: "sidebar.files",
    path: "/dashboard/files",
    icon: Folder,
  },
  {
    label: "sidebar.helpSupport",

    icon: CircleQuestionMark,
    subMenus: [
      {
        label: "sidebar.help",
        path: "/uqw",
      },
    ],
  },
];

export default function DsahboardLayout() {
  const { isOpen, isMobile } = useDashboardHook();

  const [subMenuIndex, setsubMenuIndex] = useState<number | null>(null);
  const { t } = useTranslation();

  return (
    <div className="flex ">
      {/* left sidebar */}

      {isMobile && (
        <div
          className={`${isOpen ? "translate-x-0" : "-translate-x-full"} w-62.5  min-h-screen bg-primary  fixed left-0 top-0 z-30  transition-all duration-700 ease-in-out`}
        >
          {/* logo */}
          <div
            className={`w-full h-16.25 px-10 py-3 bg-white flex items-center justify-center  border-r border-gray-100  shadow-sm relative z-100`}
          >
            <img
              src={BarndlyLogo}
              alt="logo"
              className="w-full h-full object-contain"
            />
          </div>

          {/* sidebar links container */}

          <div className="text-[#ffffffcc] space-y-2 p-2.5 text-sm select-none capitalize  ">
            {sidebarLinks.map((sidebarLink, index) => {
              if (sidebarLink.subMenus || !sidebarLink.path) {
                let showSubMenu = subMenuIndex === index;

                return (
                  <div key={index} className="relative">
                    <div
                      onClick={() => {
                        if (!isOpen) {
                          return;
                        }
                        setsubMenuIndex((prev) =>
                          prev === index ? null : index,
                        );
                      }}
                      className="flex items-center justify-between px-3.5 py-2.5 cursor-pointer rounded-md hover:bg-[#ffffff33] hover:text-white whitespace-nowrap group "
                    >
                      <div className="flex items-center gap-4  ">
                        {/* icon */}
                        <div>
                          <sidebarLink.icon size={20} />
                        </div>

                        {/* link Name */}

                        {isOpen && <div>{t(sidebarLink.label)}</div>}
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

                      {/* when collupsed */}
                    </div>

                    {/* submenus */}
                    {showSubMenu && isOpen && (
                      <div className="flex flex-col mt-3 space-y-2">
                        {sidebarLink.subMenus?.map((submenu, ind) => (
                          <div key={ind}>
                            <div key={ind}>
                              <NavLink
                                to={submenu.path}
                                className={({ isActive }) =>
                                  `flex items-center gap-4 px-3.5 py-2.5 cursor-pointer ${isActive && "bg-[#ffffff33] font-medium text-white"}   rounded-md hover:bg-[#ffffff33] hover:text-white whitespace-nowrap`
                                }
                              >
                                {" "}
                                <div className="flex items-center gap-3 pl-4">
                                  {/* icon */}
                                  <div>
                                    <Minus size={12} />
                                  </div>

                                  {/* link Name */}
                                  <div>{t(submenu.label)}</div>
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
                    `flex items-center gap-4 px-3.5 py-2.5 cursor-pointer ${isActive && "bg-[#ffffff33] font-medium text-white"}   rounded-md hover:bg-[#ffffff33] hover:text-white whitespace-nowrap relative group`
                  }
                >
                  {/* icon */}
                  <div>
                    <sidebarLink.icon size={20} />
                  </div>

                  {/* link Name */}
                  {isOpen && <div>{t(sidebarLink.label)}</div>}

                  {!isOpen && (
                    <div className="absolute opacity-0 invisible group-hover:visible group-hover:opacity-100 left-[130%] bg-primary font-medium text-white px-3.5 rounded-lg py-2.5 transition-all duration-300 ease-in-out">
                      {t(sidebarLink.label)}
                    </div>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>
      )}

      {!isMobile && (
        <div
          className={`${isOpen ? "w-62.5" : "w-17"}   min-h-screen bg-primary  fixed left-0 top-0 z-30 `}
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

          <div className="text-[#ffffffcc] space-y-2 p-2.5 text-sm select-none capitalize ">
            {sidebarLinks.map((sidebarLink, index) => {
              if (sidebarLink.subMenus || !sidebarLink.path) {
                let showSubMenu = subMenuIndex === index;

                return (
                  <div key={index} className="relative">
                    <div
                      onClick={() => {
                        if (!isOpen) {
                          return;
                        }
                        setsubMenuIndex((prev) =>
                          prev === index ? null : index,
                        );
                      }}
                      className="flex items-center justify-between px-3.5 py-2.5 cursor-pointer rounded-md hover:bg-[#ffffff33] hover:text-white whitespace-nowrap group "
                    >
                      <div className="flex items-center gap-4  ">
                        {/* icon */}
                        <div>
                          <sidebarLink.icon size={20} />
                        </div>

                        {/* link Name */}

                        {isOpen && <div>{t(sidebarLink.label)}</div>}
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

                      {/* when collupsed */}
                      {sidebarLink.subMenus && !isOpen && (
                        <div className="flex flex-col mt-3 space-y-2 absolute left-full -top-3 bg-primary invisible opacity-0 group-hover:opacity-100 group-hover:visible  p-4 ">
                          {sidebarLink.subMenus?.map((submenu, ind) => (
                            <div key={ind}>
                              <div key={ind}>
                                <NavLink
                                  to={submenu.path}
                                  className={({ isActive }) =>
                                    `flex items-center gap-4 px-3.5 py-2.5 cursor-pointer ${isActive && "bg-[#ffffff33] font-medium text-white"} rounded-md  hover:bg-[#ffffff33] hover:text-white whitespace-nowrap `
                                  }
                                >
                                  {" "}
                                  <div className="flex items-center gap-3 ">
                                    {/* link Name */}
                                    <div className="px-4">
                                      {t(submenu.label)}
                                    </div>
                                  </div>
                                </NavLink>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* submenus */}
                    {showSubMenu && isOpen && (
                      <div className="flex flex-col mt-3 space-y-2">
                        {sidebarLink.subMenus?.map((submenu, ind) => (
                          <div key={ind}>
                            <div key={ind}>
                              <NavLink
                                to={submenu.path}
                                className={({ isActive }) =>
                                  `flex items-center gap-4 px-3.5 py-2.5 cursor-pointer ${isActive && "bg-[#ffffff33] font-medium text-white"}   rounded-md hover:bg-[#ffffff33] hover:text-white whitespace-nowrap`
                                }
                              >
                                {" "}
                                <div className="flex items-center gap-3 pl-4">
                                  {/* icon */}
                                  <div>
                                    <Minus size={12} />
                                  </div>

                                  {/* link Name */}
                                  <div>{t(submenu.label)}</div>
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
                    `flex items-center gap-4 px-3.5 py-2.5 cursor-pointer ${isActive && "bg-[#ffffff33] font-medium text-white"}   rounded-md hover:bg-[#ffffff33] hover:text-white whitespace-nowrap relative group`
                  }
                >
                  {/* icon */}
                  <div>
                    <sidebarLink.icon size={20} />
                  </div>

                  {/* link Name */}
                  {isOpen && <div>{t(sidebarLink.label)}</div>}

                  {!isOpen && (
                    <div className="absolute opacity-0 invisible group-hover:visible group-hover:opacity-100 left-[130%] bg-primary font-medium text-white px-3.5 rounded-lg py-2.5 transition-all duration-300 ease-in-out">
                      {t(sidebarLink.label)}
                    </div>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>
      )}

      {/* right content  */}
      <div className=" flex-1 relative w-full">
        <Header />

        {isMobile ? (
          <div className={`p-4 mt-17 max-w-full `}>
            <Outlet />
          </div>
        ) : (
          <div
            className={`p-8 mt-17 max-w-full ${isOpen ? "ml-62.5" : "ml-17"}`}
          >
            <Outlet />
          </div>
        )}
      </div>
    </div>
  );
}

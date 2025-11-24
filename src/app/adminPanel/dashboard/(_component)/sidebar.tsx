"use client";
import Link from "next/link";
import { useState } from "react";
import { BsReverseLayoutTextSidebarReverse } from "react-icons/bs";
import { MdOutlineSpaceDashboard, MdOutlineGroup } from "react-icons/md";
import { usePathname } from "next/navigation";
import { CiSettings } from "react-icons/ci";
const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();
  const Menus = [
    {
      title: "DashBoard",
      href: "/adminPanel/dashboard",
      comp: <MdOutlineSpaceDashboard />,
    },
    {
      title: "Sangeet",
      href: "/adminPanel/sangeet",
      comp: <MdOutlineGroup />,
    },
    {
      title:"Settings",
      href:"/adminPanel/settings",
      comp:<CiSettings/>
    },
  ];

  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-72" : "w-20"
        } bg-black h-screen p-5 pt-8 relative duration-300`}
      >
        <BsReverseLayoutTextSidebarReverse
          className="absolute text-white -right-1 top-9 w-7 cursor-pointer"
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Nisha & Amit
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => {
            const isActive = pathname === Menu.href;
            return(
              <Link href={Menu.href} key={index}>
              <li
                className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                  ${index === 0 ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"}`}
              >
                <div>{Menu.comp}</div>
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </li>
            </Link>
            )
})}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

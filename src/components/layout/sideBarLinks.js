import { AiFillBook, AiOutlineDashboard, AiOutlineUser } from "react-icons/ai";
import { MdListAlt, MdOutlineGavel } from "react-icons/md";
import { PiChartLine } from "react-icons/pi";

const menu = {
  "Super Admin": [
    { name: "Dashboard", link: "/dashboard", icon: AiOutlineDashboard },
    { name: "User/Role Management", link: "/user-role-management", icon: MdOutlineGavel },
    { name: "Line of Business", link: "/line-of-business", icon: MdListAlt },
    { name: "Projects", link: "/projects", icon: AiFillBook },
    { name: "Reports", link: "/reports", icon: PiChartLine },
    { name: "Profile", link: "/profile", icon: AiOutlineUser },
  ],
  admin: [
    { name: "Dashboard", link: "/dashboard", icon: AiOutlineDashboard },
    { name: "Role Management", link: "/role-management", icon: MdOutlineGavel },
    { name: "Line of Business", link: "/line-of-business", icon: MdListAlt },
    { name: "Projects", link: "/projects", icon: AiFillBook },
    { name: "Reports", link: "/reports", icon: PiChartLine },
    { name: "Profile", link: "/profile", icon: AiOutlineUser },
  ],
  Developer: [
    { name: "Dashboard", link: "/dashboard", icon: AiOutlineDashboard },
    { name: "Projects", link: "/dev-projects", icon: MdOutlineGavel },
    { name: "Profile", link: "/dev-profile", icon: AiOutlineUser },
  ],
  "Other Staff": [
    { name: "Dashboard", link: "/dashboard", icon: AiOutlineDashboard },
    {
      name: "Line of Business",
      link: "/line-of-business",
      icon: MdOutlineGavel,
    },
    { name: "Profile", link: "/staff-profile", icon: AiOutlineUser },
  ],
};

export default menu;

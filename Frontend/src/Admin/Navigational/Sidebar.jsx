/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BiHomeCircle, BiLogOut } from "react-icons/bi";
import { IoIosAnalytics } from "react-icons/io";
import { BsBox } from "react-icons/bs";
import { GrUserManager } from 'react-icons/gr';
import { AiOutlineSchedule } from 'react-icons/ai';
import axios from 'axios';

const Sidebar = () => {
    const [isSidebarOpen, setSidebarOpen] = React.useState(true);
    const navigate = useNavigate();
    const [selectedMenu, setSelectedMenu] = React.useState("Dashboard");

    const handleLogout = () => {
        localStorage.removeItem('token');
        axios.get('http://localhost:8081/authentication/logout')
            .then(res => {
                navigate('/')
            }).catch(err => console.log(err));
    };

    const handleMenuClick = (menuName) => {
        setSelectedMenu(menuName);
    };

    const Menu = {
        Dashboard: {
            icon: <BiHomeCircle className="w-[20px] h-[20px]" />,
            name: "Dashboard",
            link: "/dashboard",
        },
        Employees: {
            icon: <IoIosAnalytics className="w-[20px] h-[20px]" />,
            name: "Manage Employees",
            link: "/dashboard/employee",
        },
        Profile: {
            icon: <BsBox className="w-[20px] h-[20px]" />,
            name: "Profile",
            link: "/dashboard/profile",
        },
        AssignTasks: {
            icon: <AiOutlineSchedule className="w-[20px] h-[20px]" />,
            name: "Assign tasks",
            link: "/dashboard/assign-tasks",
        },
    };

    return (
        <div
            className={`z-50 mr-[247px] top-0 left-0 bg-black h-screen
        transition-transformation xl:translate-x-0
        border-r border-solid w-[247px]  font-poppins
        fixed`}
        >
            <div className=" icons inline-flex pb-2">
                <img className="w-[350px] h-36 p-r" src={`http://localhost:8081/images/Manage.png`} alt="Starboard" />
            </div>
            {Object.keys(Menu).map((key, index) => {
                return (
                    <div
                        className={` ml-[16px] w-[215px] h-[40px] menu text-white hover:text-[#000000] hover:bg-[#316aaa] flex 
                        items-center cursor-pointer
                        my-5 rounded py-2 px-4 text-sm/[16px] font-[500]  
                        leading-3 ${selectedMenu === Menu[key].name
                                ? "text-[#000000] bg-[#316aaa]"
                                : ""
                            }`}
                        onClick={() => {
                            if (Menu[key].name === 'Dashboard' || Menu[key].name === 'Manage Employees' || Menu[key].name === 'Profile' || Menu[key].name === 'Assign tasks') {
                                navigate(Menu[key].link);
                            }
                            handleMenuClick(Menu[key].name);
                        }}
                        key={index}
                    >
                        <div className="mr-[10px]">
                            {Menu[key].icon}
                        </div>
                        {Menu[key].name}
                    </div>
                );
            })}
            <div className="mt-[80px] sub-sidebar border-t width-[247px] h-[72px] mb-[36px]">
                <div
                    className={` ml-[16px] w-[215px] h-[40px] menu text-[#ffffff] hover:text-[#000000] hover:bg-[#316aaa] flex
                items-center cursor-pointer
                my-5 rounded py-2 px-4 text-sm/[16px] font-[500] 
                leading-3 ${selectedMenu === "Logout" ? "bg-[#316aaa] text-[#000000]" : ""
                        }`}
                    onClick={handleLogout}
                >
                    <BiLogOut className="mr-[10px] w-[20px] h-[20px]" />
                    Logout
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

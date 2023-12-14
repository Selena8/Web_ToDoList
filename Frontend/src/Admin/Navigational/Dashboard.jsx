/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { HiMenu } from 'react-icons/hi';
import { BiHomeCircle, BiLogOut } from "react-icons/bi";
import { IoIosAnalytics } from "react-icons/io";
import { BsBox } from "react-icons/bs";
import { GrUserManager } from 'react-icons/gr';
import { AiOutlineSchedule } from 'react-icons/ai';

function Dashboard() {
  const [isSidebarOpen, setSidebarOpen] = React.useState(true);
  const navigate1 = useNavigate();
  const [selectedMenu, setSelectedMenu] = React.useState('Dashboard');
  const [employee_id, setEmployeeId] = useState(null);
  const [isEmployee, setIsEmployee] = useState(false); // Thêm biến để kiểm tra vai trò employee

  const handleLogout = () => {
    localStorage.removeItem('token');
    axios
      .get('http://localhost:8081/authentication/logout')
      .then((res) => {
        navigate1('/');
      })
      .catch((err) => console.log(err));
  };

  const handleMenuClick = (menuName) => {
    setSelectedMenu(menuName);
  };

  const Menu = {
    Dashboard: {
      icon: <BiHomeCircle className="w-[20px] h-[20px]" />,
      name: 'Dashboard',
      link: '/dashboard',
    },
    Employees: {
      icon: <IoIosAnalytics className="w-[20px] h-[20px]" />,
      name: 'Manage Employees',
      link: '/dashboard/employee',
    },
    Profile: {
      icon: <BsBox className="w-[20px] h-[20px]" />,
      name: 'Profile',
      link: `/dashboard/profile/${employee_id}`,
    },
    AssignTasks: {
      icon: <AiOutlineSchedule className="w-[20px] h-[20px]" />,
      name: 'Assign tasks',
      link: `/dashboard/assign-tasks/${employee_id}`,
    },
  };

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  useEffect(() => {
    const dbh = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/');
        return;
      }

      await axios
        .get('http://localhost:8081/authentication/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.data.Status === 'Success') {
            if (res.data.role === 'admin') {
              navigate('/dashboard');
              setEmployeeId(res.data.id);
            } else if (res.data.role === 'employee') {
              navigate('/dashboard');
              setEmployeeId(res.data.id);
              setIsEmployee(true); // Đánh dấu người dùng là employee
            }
          } else {
            navigate('/');
          }
        })
        .catch((err) => {
          console.log(err);
          navigate('/');
        });
    };
    dbh();
  }, []);

  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="lg:ml-[247px]">
      <div className={showSidebar ? 'block' : 'hidden lg:block'}>
        <div
          className={`z-50 mr-[247px] top-0 left-0 bg-black h-screen
        transition-transformation xl:translate-x-0
        border-r border-solid w-[247px]  font-poppins
        fixed`}
        >
          <div className=" icons inline-flex pb-2">
            <img
              className="w-[350px] h-36 p-r"
              src={`http://localhost:8081/images/Manage.png`}
              alt="Starboard"
            />
          </div>
          {Object.keys(Menu).map((key, index) => {
            // Kiểm tra xem người dùng có phải là employee và mục menu là 'Employees'
            if (isEmployee && key === 'Employees') {
              return null; // Không hiển thị cho employees
            }

            return (
              <div
                className={` ml-[16px] w-[215px] h-[40px] menu text-white hover:text-[#000000] hover:bg-[#316aaa] flex 
                        items-center cursor-pointer
                        my-5 rounded py-2 px-4 text-sm/[16px] font-[500]  
                        leading-3 ${selectedMenu === Menu[key].name
                  ? 'text-[#000000] bg-[#316aaa]'
                  : ''
                }`}
                onClick={() => {
                  if (
                    Menu[key].name === 'Dashboard' ||
                    Menu[key].name === 'Manage Employees' ||
                    Menu[key].name === 'Profile' ||
                    Menu[key].name === 'Assign tasks'
                  ) {
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
                leading-3 ${selectedMenu === 'Logout'
                  ? 'bg-[#316aaa] text-[#000000]'
                  : ''
                }`}
              onClick={handleLogout}
            >
              <BiLogOut className="mr-[10px] w-[20px] h-[20px]" />
              Logout
            </div>
          </div>
        </div>
      </div>
      <div className={showSidebar ? 'flex flex-col w-full bg-white max-[1024px]:ml-56' : 'flex flex-col bg-white'}>
        <div className="bg-white">
          <div className="fixed z-20 top-0  w-full flex flex-row items-center bg-white min-[1024px]:hidden">
            <button className="ml-8 bg-white" onClick={toggleSidebar}>
              <HiMenu className="h-8 w-8 text-black" />
            </button>
            <div className="icons inline-flex pb-2 mt-4 bg-white max-[1024px]:ml-8">
              <img className="w-28 h-14 pr-2" src={`http://localhost:8081/images/Manage.png`} alt="Starboard" />
            </div>
          </div>
          <Outlet className="z-0 h-full" />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

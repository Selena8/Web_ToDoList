/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Title from '../../Utils/title';
import { Link } from 'react-router-dom';
function Profile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEmployee, setIsEmployee] = useState(false);
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    salary: '',
    address: '',
    role: '',
    image: '',
  });
  console.log(isEmployee)
  useEffect(() => {
    axios.get(`http://localhost:8081/employee/get/${id}`)
      .then((response) => {
        const data = response.data.Result[0];
        setEmployee({
          name: data.name,
          email: data.email,
          salary: data.salary,
          address: data.address,
          role: data.role,
          image: data.image,
        });
        setIsEmployee(data.role === 'employee');
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);
  const handleEdit = (employeeId) => {
    navigate(`/dashboard/editprofile/${employeeId}`);
  };

  return (
    <div className="h-screen flex mt-[110px] flex-col flex-1 bg-[#F7F7F7] font-Poppins-700 max-[800px]:gap-y-8">
      <Title title="Profile" />
      <form className="ml-8 flex flex-col flex-1 mt-8">
        <div className="flex flex-1">
          <div className="h-[600px] max-[800px]:h-[900px] flex-1 rounded-lg bg-white p-4 mr-96">
            <div className="flex flex-row">
              <div>
                <div className=" mb-2 flex item-center text-left mt-[16px] gap-x-10 gap-y-3  md:grid-cols-1 max-[800px]:flex-col">
                  <label className="ml-12 flex items-center w-64 font-Poppins-700">
                    Name
                    <span className="ml-2 text-red-500 mr-2">*</span>
                  </label>
                  <div className="w-full">
                    <input
                      type="text"
                      className="border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                      id="inputName"
                      placeholder="Enter Name"
                      autoComplete="off"
                      name="name"
                      value={employee.name}
                    />
                  </div>
                </div>
                <div className="mb-2 flex item-center text-left mt-[16px] gap-x-10 gap-y-3  md:grid-cols-1 max-[800px]:flex-col">
                  <label className="ml-12 flex items-center w-64 font-Poppins-700">
                    Email
                    <span className="ml-2 text-red-500 mr-2">*</span>
                  </label>
                  <div className="w-full">
                    <input
                      type="email"
                      className="border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                      id="inputEmail"
                      placeholder="Enter Email"
                      autoComplete="off"
                      name="email"
                      value={employee.email}
                    />
                  </div>
                </div>
                <div className="mb-2 flex item-center text-left mt-[16px] gap-x-10 gap-y-3 md:grid-cols-1 max-[800px]:flex-col">
                  <label className="ml-12 flex items-center w-64 font-Poppins-700">
                    Salary
                    <span className="ml-2 text-red-500 mr-2">*</span>
                  </label>
                  <div className="w-full">
                    <input
                      type="text"
                      className="border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                      id="inputSalary"
                      placeholder="Enter Salary"
                      autoComplete="off"
                      name="salary"
                      value={employee.salary}
                    />
                  </div>
                </div>
                <div className="mb-2 flex item-center text-left mt-[16px] gap-x-10 gap-y-3 md:grid-cols-1 max-[800px]:flex-col">
                  <label className="ml-12 flex items-center w-64 font-Poppins-700">
                    Address
                    <span className="ml-2 text-red-500 mr-2">*</span>
                  </label>
                  <div className="w-full">
                    <input
                      type="text"
                      className="border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                      id="inputAddress"
                      placeholder="1234 Main St"
                      autoComplete="off"
                      name="address"
                      value={employee.address}
                    />
                  </div>
                </div>
                <div className="mb-2 flex item-center text-left mt-[26px] gap-x-10 gap-y-3 md:grid-cols-1 max-[800px]:flex-col">
                  <label className="ml-12 flex items-center w-64 font-Poppins-700">
                    Role
                    <span className="ml-2 text-red-500 mr-2">*</span>
                  </label>
                  <div className="w-full flex flex-col">
                    <div className="flex flex-row gap-6">
                      <div className="radio">
                        <label className="flex gap-2">
                          <input
                            type="radio"
                            value="admin"
                            name="role"
                            onChange=""
                            checked={employee.role === 'admin'}
                          />
                          <span>Admin</span>
                        </label>
                      </div>
                      <div className="radio">
                        <label className="flex gap-2">
                          <input
                            type="radio"
                            value="employee"
                            name="role"
                            onChange=""
                            checked={employee.role === 'employee'}
                          />
                          <span>User</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center flex flex-col">
                <div className="ml-12 flex items-center justify-center w-80 h-80 border-1 flex flex-col">
                  <img
                    src={`http://localhost:8081/images/${employee.image}`}
                    alt="Employee Image"
                    className="w-[200px] h-[200px] border-[2px] border-gray-800 rounded-lg"
                    style={{
                      objectFit: 'cover',
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-center text-left mt-[50px]">
              <div>
                <button
                  className={`mb-[9px] bg-blue-700 hover:bg-[#FE881C] 
    text-white font-bold w-24 h-10 py-2 px-4 rounded-lg mt-[10px] ${isEmployee ? 'hidden' : '' 
                    }`}
                  onClick={() => handleEdit(id)}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Profile;

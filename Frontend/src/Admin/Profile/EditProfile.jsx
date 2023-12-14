/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Title from '../../Utils/title';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function EditEmployee() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8081/employee/get/${id}`)
      .then((res) => {
        const employeeData = res.data.Result[0];
        setData({
          name: employeeData.name,
          email: employeeData.email,
          address: employeeData.address,
          salary: employeeData.salary,
          role: employeeData.role, 
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    salary: Yup.number()
      .typeError('Salary must be a number')
      .required('Salary is required'),
    address: Yup.string().required('Address is required'),
    role: Yup.string().required('Role is required'), 
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      salary: '',
      address: '',
      role: '', 
    },
    validationSchema,
    onSubmit: (values) => {
      updateEmployee(values);
    },
  });

  useEffect(() => {
    if (data) {
      formik.setValues({
        name: data.name,
        email: data.email,
        salary: data.salary,
        address: data.address,
        role: data.role,
      });
    }
  }, [data]);

  const updateEmployee = (values) => {
    const employee = {
      ...data,
      ...values,
    };
    axios
      .put(`http://localhost:8081/employee/update/${id}`, employee)
      .then((res) => {
        if (res.data.Status === 'Success') {
          navigate(`/dashboard/profile/${id}`);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleCancel = (employeeId) => {
    navigate(`/dashboard/profile/${employeeId}`);
  };

  return (
    <div className="h-screen flex mt-[110px] flex-col flex-1 bg-[#F7F7F7] font-Poppins-700 max-[800px]:gap-y-8">
      <Title title="Manage Employees" />
      <form className="ml-8 flex flex-col flex-1 mt-8">
        <div className="flex flex-1">
          <div className="h-[600px] max-[800px]:h-[900px] flex-1 rounded-lg bg-white p-4 mr-8">
            <span className="ml-[20px] font-Poppins-700 text-2xl text-black">
              Edit Profile
            </span>
            <div className="flex flex-row">
              <div>
                <div className="mb-2 flex item-center text-left mt-[16px] gap-x-10 gap-y-3 md:grid-cols-1 max-[800px]:flex-col">
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
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="name"
                      value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <p className="text-red-500">{formik.errors.name}</p>
                    )}
                  </div>
                </div>
                <div className="mb-2 flex item-center text-left mt-[16px] gap-x-10 gap-y-3 md:grid-cols-1 max-[800px]:flex-col">
                  <label className="ml-12 flex items-center w-64 font-Poppins-700">
                    Email
                    <span className="ml-2 text-red-500 mr-2">*</span>
                  </label>
                  <div className="w-full">
                    <input
                      type="email"
                      className="border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                      id="inputEmail4"
                      placeholder="Enter Email"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="email"
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="text-red-500">{formik.errors.email}</p>
                    )}
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
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="salary"
                      value={formik.values.salary}
                    />
                    {formik.touched.salary && formik.errors.salary && (
                      <p className="text-red-500">{formik.errors.salary}</p>
                    )}
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
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="address"
                      value={formik.values.address}
                    />
                    {formik.touched.address && formik.errors.address && (
                      <p className="text-red-500">{formik.errors.address}</p>
                    )}
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
                            onChange={formik.handleChange}
                            checked={formik.values.role === 'admin'}
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
                            onChange={formik.handleChange}
                            checked={formik.values.role === 'employee'}
                          />
                          <span>User</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  {formik.touched.role && formik.errors.role && (
                    <p className="text-red-500">{formik.errors.role}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-center text-left mt-[50px]">
              <div>
                <button
                  className="mb-[9px] bg-blue-700 hover:bg-[#FE881C] 
                  text-white font-bold w-24 h-10 py-2 px-4 rounded-lg mt-[10px]"
                  type="button"
                  onClick={() => {
                    formik.handleSubmit(); 
                  }}
                >
                  Update
                </button>
              </div>
              <div className="ml-8">
                  <button
                    className="mb-[9px] bg-[#7c7c7c] hover:bg-[#FE881C] 
                    text-white font-bold w-24 h-10 py-2 px-4 rounded-lg mt-[10px] "
                    onClick={() => handleCancel(id)}
                  >
                    Cancel

                  </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditEmployee;
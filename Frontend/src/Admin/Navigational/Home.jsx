/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Title from "../../Utils/title";

function Home() {
  const [adminCount, setAdminCount] = useState()
  const [employeeCount, setEmployeeCount] = useState()
  const [salary, setSalary] = useState()
  const [admin, setAdmin] = useState()

  useEffect(() => {
    axios.get('http://localhost:8081/employee/adminCount')
      .then(res => {
        setAdminCount(res.data[0].admin)
      }).catch(err => console.log(err));

    axios.get('http://localhost:8081/employee/employeeCount')
      .then(res => {
        setEmployeeCount(res.data[0].employee)
      }).catch(err => console.log(err));

    axios.get('http://localhost:8081/employee/salary')
      .then(res => {
        setSalary(res.data[0].sumOfSalary)
      }).catch(err => console.log(err));

  }, [])
  return (
    <div className=" flex  mt-[110px] flex-col flex-1 bg-[#F7F7F7] font-Poppins-700 max-[800px]:gap-y-8  ">
      <Title title="Manage Employees" />
      <div className='p-3 px-5 py-3 bg-[#f1f5f9] h-screen'>
        <div className='d-flex justify-content-around'>
          <div className='px-3 pt-2 pb-3 border shadow-sm w-25 bg-[#3da6da] rounded-4'>
            <div className='text-center pb-1'>
              <h4>Admin</h4>
            </div>
            <hr />
            <div className=''>
              <h5>Total: {adminCount}</h5>
            </div>
          </div>
          <div className='px-3 pt-2 pb-3 border shadow-sm w-25 bg-[#dfce88] rounded-4'>
            <div className='text-center pb-1'>
              <h4>Employee</h4>
            </div>
            <hr />
            <div className=''>
              <h5>Total: {employeeCount}</h5>
            </div>
          </div>
          <div className='px-3 pt-2 pb-3 border shadow-sm w-25 bg-[#47c057] rounded-4'>
            <div className='text-center pb-1'>
              <h4>Salary</h4>
            </div>
            <hr />
            <div className=''>
              <h5>Total: {salary}</h5>
            </div>
          </div>
        </div>

        {/* List of admin  */}
        <div className='mt-4 px-5 pt-3'>
          <h3>List of Admins</h3>
          <table className='table'>
            <thead>
              <tr>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Admin</td>
                <td>Admin</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Home
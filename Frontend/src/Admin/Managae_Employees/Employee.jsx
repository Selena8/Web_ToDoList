/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem } from '@mui/material';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import Title from "../../Utils/title";
import { AiOutlineSchedule } from 'react-icons/ai';
import Dialog from '../../Utils/Dialog_Delete';

function Employee() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8081/employee/getEmployee')
      .then((res) => {
        if (res.data.Status === 'Success') {
          setData(res.data.Result);
        } else {
          alert('Error');
        }
      })
      .catch((err) => console.error(err));
  }, []);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const handleDelete = (Employee_Id) => {
    setSelectedEmployeeId(Employee_Id);
    setShowDialog(true);
  };
  const handleCancelDelete = () => {
    setShowDialog(false);
  };

  const handleConfirmDelete = () => {
    axios.delete(`http://localhost:8081/employee/delete/${selectedEmployeeId}`)
      .then((res) => {
        if (res.data.Status === 'Success') {
          // Tải lại dữ liệu sau khi xoá
          axios.get('http://localhost:8081/employee/getEmployee')
            .then((res) => {
              if (res.data.Status === 'Success') {
                setData(res.data.Result);
              } else {
                alert('Error');
              }
            })
            .catch((err) => console.error(err));
        } else {
          alert('Error');
        }
      })
      .catch((err) => console.error(err));
    setShowDialog(false);
  };

  const handleEdit = (employeeId) => {
    navigate(`/dashboard/employeeEdit/${employeeId}`);
  };

  const handleAssignTask = (employeeId) => {
    navigate(`/dashboard/assign-tasks_employee/${employeeId}`);
  };
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div className="h-full flex  mt-[110px] flex-col flex-1 bg-[#F7F7F7] font-Poppins-700 max-[800px]:gap-y-8  ">
      <Title title="Manage Employees" />
      <div className='h-full px-5 py-3 bg-[#f1f5f9] h-screen'>
        <Link to="/dashboard/create" className="btn btn-success">Add Employee</Link>
        <div className='mt-3 h-[600px] lg:mr-10 md:mr-10 max-[800px]:mr-5  overflow-y-auto ml-2 mt-[20px] bg-white flex flex-col border rounded-xl '>
          <table className='table p-4 border-separate border-spacing-y-1 border-slate-400 w-full '>
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Email</th>
                <th>Address</th>
                <th>Salary</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((employee, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td>{employee.name}</td>
                  <td>
                    {employee.image && (
                      <img
                        src={`http://localhost:8081/images/${employee.image}`}
                        alt=""
                        className='employee_image'
                      />
                    )}
                  </td>
                  <td>{employee.email}</td>
                  <td>{employee.address}</td>
                  <td>{employee.salary}</td>
                  <td>
                    <div className="mb-3">
                      <td
                        className="edit-column cursor-pointer"
                        onClick={() => handleEdit(employee.id)}
                      >
                        <div className="flex items-center justify-center">
                          <Link to="">
                            <FaEdit className="w-5 h-5 text-[#366D05] hover:text-[#366D05] " />
                          </Link>
                        </div>
                      </td>
                      <td>
                        <span>/</span>
                      </td>
                      <td
                        className="delete-column cursor-pointer"
                        onClick={() => handleDelete(employee.id)}
                      >
                        <div className="flex items-center justify-center">
                          <RiDeleteBin5Fill className="w-5 h-5 text-red-500 hover:text-red-600" />
                        </div>
                      </td>
                      <td>
                        <span>/</span>
                      </td>
                      <td
                        className="task-column cursor-pointer"
                        onClick={() => handleAssignTask(employee.id)}
                      >
                        <div className="flex items-center justify-center">
                          <AiOutlineSchedule className="w-5 h-5 text-[#212529] hover:text-[#212529]" />
                        </div>
                      </td>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='table-container flex flex-col mt-5 mr-5'>
          <div className='flex justify-end redirect-page'>
            <Pagination
              count={Math.ceil(data.length / rowsPerPage)}
              page={currentPage}
              onChange={(event, value) => setCurrentPage(value)}
              color="primary"
              showFirstButton
              showLastButton
              renderItem={(item) => (
                <PaginationItem
                  component="a"
                  {...item}
                />
              )}
            />
          </div>
        </div>
      </div>
      {showDialog && (
          <Dialog
            className=''
            message='Do you want to delete the employee?'
            onCancel={handleCancelDelete}
            onConfirm={handleConfirmDelete}
          />
        )}
    </div>
  );
}

export default Employee;

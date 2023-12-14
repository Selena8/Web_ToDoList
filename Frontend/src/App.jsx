/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Admin/Navigational/Dashboard';
import Employee from './Admin/Managae_Employees/Employee';
import Home from './Admin/Navigational/Home';
import Profile from './Admin/Profile/Profile';
import EditProfile from './Admin/Profile/EditProfile';
import Login from './Login';
import AddEmployee from './Admin/Managae_Employees/AddEmployee';
import EmployeeEdit from './Admin/Managae_Employees/EditEmployee';
import EmployeeDetail from './User/EmployeeDetail'
import Assign_task from './Admin/Assign_tasks/Task'
import Assign_task_Employee from './Admin/Assign_tasks/Task_Employee'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/employeedetail/:id' element={<EmployeeDetail />}></Route>
        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path="employee" element={<Employee />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="editprofile/:id" element={<EditProfile />} />
          <Route path="create" element={<AddEmployee />} />
          <Route path="employeeEdit/:id" element={<EmployeeEdit />} />
          <Route path="assign-tasks/:id_employee" element={<Assign_task />} />
          <Route path="assign-tasks_employee/:id_employee" element={<Assign_task_Employee />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

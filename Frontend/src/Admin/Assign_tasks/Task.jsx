/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Title from "../../Utils/title";
import Dialog from './Add_task';
import Dialog_Update from './Update_task';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import Dialog_Delete from '../../Utils/Dialog_Delete';

function Task() {
    const [showDialog_Add, setShowDialog_Add] = useState(false);
    const [showDialog_Update, setShowDialog_Update] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [tasks, setTasks] = useState([]);
    const { id_employee } = useParams();
    const [draggedTask, setDraggedTask] = useState(null);
    const [Task_id, setTaskId] = useState(null);
    const handleDelete = (Task_Id) => {
        setTaskId(Task_Id);
        setShowDialog(true);
        console.log(Task_Id)
    };
    const handleCancelDelete = () => {
        setShowDialog(false);
    };
    const handleConfirmDelete = () => {
        axios.delete(`http://localhost:8081/task/delete/${Task_id}`)
      .then((res) => {
        if (res.data.Status === 'Success') {
          // Tải lại dữ liệu sau khi xoá
          axios.get(`http://localhost:8081/task/tasks/${id_employee}`)
          .then((res) => {
              if (res.data.Status === 'Success') {
                  const Tasks = res.data.Result.map((task) => ({
                      'IdTask': task.id_task,
                      'IdEmployee': task.id_employee,
                      Category: task.category,
                      Title: task.title,
                      Content: task.content,
                      'TimeCreate': task.time_create,
                      'TimeDeadline': task.time_deadline,
                      Status: task.status
                  }));
                  setTasks(Tasks);
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
    const handleAddTask = () => {
        setShowDialog_Add(true);
    };

    const handleConfirm_AddTask = () => {
        axios.get(`http://localhost:8081/task/tasks/${id_employee}`)
            .then((res) => {
                if (res.data.Status === 'Success') {
                    const Tasks = res.data.Result.map((task) => ({
                        'IdTask': task.id_task,
                        'IdEmployee': task.id_employee,
                        Category: task.category,
                        Title: task.title,
                        Content: task.content,
                        'TimeCreate': task.time_create,
                        'TimeDeadline': task.time_deadline,
                        Status: task.status
                    }));
                    setTasks(Tasks);
                } else {
                    alert('Error');
                }
            })
            .catch((err) => console.error(err));
        setShowDialog_Add(false);
    };

    const handleCancel_AddTask = () => {
        setShowDialog_Add(false);
    };

    const handleUpdateTask = (id_task) => {
        setTaskId(id_task)
        setShowDialog_Update(true);
    };

    const handleConfirm_UpdateTask = () => {
        axios.get(`http://localhost:8081/task/tasks/${id_employee}`)
            .then((res) => {
                if (res.data.Status === 'Success') {
                    const Tasks = res.data.Result.map((task) => ({
                        'IdTask': task.id_task,
                        'IdEmployee': task.id_employee,
                        Category: task.category,
                        Title: task.title,
                        Content: task.content,
                        'TimeCreate': task.time_create,
                        'TimeDeadline': task.time_deadline,
                        Status: task.status
                    }));
                    setTasks(Tasks);
                } else {
                    alert('Error');
                }
            })
            .catch((err) => console.error(err));
        setShowDialog_Update(false);
    };

    const handleCancel_UpdateTask = () => {
        setShowDialog_Update(false);
    };

    useEffect(() => {
        axios.get(`http://localhost:8081/task/tasks/${id_employee}`)
            .then((res) => {
                if (res.data.Status === 'Success') {
                    const Tasks = res.data.Result.map((task) => ({
                        'IdTask': task.id_task,
                        'IdEmployee': task.id_employee,
                        Category: task.category,
                        Title: task.title,
                        Content: task.content,
                        'TimeCreate': task.time_create,
                        'TimeDeadline': task.time_deadline,
                        Status: task.status
                    }));
                    setTasks(Tasks);
                } else {
                    alert('Error');
                }
            })
            .catch((err) => console.error(err));
    }, [id_employee]);

    const handleDragStart = (e, task) => {
        e.dataTransfer.setData('task', JSON.stringify(task));
        setDraggedTask(task);
    };

    const handleDrop = (e, status) => {
        e.preventDefault();

        if (draggedTask) {
            const updatedTasks = tasks.map(task => {
                if (task.IdTask === draggedTask.IdTask) {
                    task.Status = status;
                }
                return task;
            });
            setTasks(updatedTasks);

            axios.put(`http://localhost:8081/task/update/status/${draggedTask.IdTask}/${status}`)
                .then(response => {
                    if (response.data.Status === 'Success') {
                        console.log('Update status successfully.');
                    } else {
                        console.error('Error updating status on server.');
                    }
                })
                .catch(error => {
                    console.error('Error updating status on server.', error);
                });

            setDraggedTask(null);
        }
    };

    const handleDragOver = e => {
        e.preventDefault();
    };

    return (
        <div className="h-screen flex mt-[110px] flex-col flex-1 bg-[#F7F7F7] font-Poppins-700 max-[800px]:gap-y-8 max-[1023px]:h-full ">
            <Title title="Assign Task" />
            <div className="w-full h-full font-['Plus Jakarta Sans'] relative overflow-hidden max-[1023px]:overflow-auto">
                <div className="w-4/5 mx-auto py-[20px]">
                    <div className="flex flex-col max-[1023px]:items-center">
                        <div className="flex justify-between items-center my-2 max-[1023px]:flex-col">
                            <div className="flex gap-1">
                                <div className="leading-5 text-[#5A5C63] max-[1023px]:text-sm">Let's get shit done!</div>
                                <img src="http://localhost:8081/images/hi.png" alt="" className="w-5 h-5" />
                            </div>
                            <div className="flex gap-1 leading-5 text-[#5A5C63] cursor-pointer open-form max-[1023px]:border-[2px] max-[1023px]:border-[#000000] max-[1023px]:rounded-[5px] max-[1023px]:p-3 max-[1023px]:my-3" onClick={() => handleAddTask()}>
                                <i className="fa-sharp fa-solid fa-plus font-normal"></i>
                                <span className="">New Task</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-full flex justify-between max-[1023px]:flex-col max-[1023px]:gap-[30px] content">
                        <div className="w-[30%] max-[1023px]:w-[100%]">
                            <div
                                className="status-bar rounded flex justify-between items-center bg-[#00A6DA] relative after:absolute after:w-full after:bottom-[-15px] after:border after:border-solid after:border-[#00A6DA] max-[1023px]:cursor-pointer"
                                onDrop={e => handleDrop(e, 'todo')}
                                onDragOver={handleDragOver}
                            >
                                <div className="font-bold leading-5 text-white p-[5px]">Todo</div>
                                <span className="bg-[#00CDDA] text-center text-white mr-[10px] rounded w-5 h-5 leading-5 todo-counting">
                                    {tasks.filter(task => task.Status === 'todo').length}
                                </span>
                            </div>
                            <div
                                className="flex flex-col mt-[30px] gap-[30px] max-h-[500px] overflow-y-auto max-[1023px]:overflow-y-hidden max-[1023px]:h-full list lists-todo"
                                onDrop={e => handleDrop(e, 'todo')}
                                onDragOver={handleDragOver}
                            >
                                {tasks
                                    .filter(task => task.Status === 'todo')
                                    .map(task => (
                                        <div
                                            key={task.IdTask}
                                            draggable="true"
                                            onDragStart={e => handleDragStart(e, task)}
                                            className="h-[154px] max-[1023px]:h-auto bg-white rounded-lg px-[30px] pt-[10px] pb-[30px] shadow-sm border-[2px]"
                                        >
                                            <div className="flex justify-between items-center">
                                                <div className="font-bold text-[12px] leading-[15px] underline text-[#4D8EFF]">{task.Category}</div>
                                                <div className="w-[20%] flex justify-around">
                                                    <button className="bg-white opacity-60" onClick={() => handleUpdateTask(task.IdTask)}><i className="fa-solid fa-pen-to-square"></i></button>
                                                    <button className="bg-white opacity-60" onClick={() => handleDelete(task.IdTask)}><i className="fa-solid fa-trash"></i></button>
                                                </div>
                                            </div>
                                            <div className="relative font-bold leading-5 text-[#393939] after:absolute after:mt-[30px] after:left-[0] after:w-[80%] after:h-0 after:border after:border-solid after:border-[#DBDBDB]">{task.Title}</div>
                                            <div className="mt-[20px] text-[10px] leading-[13px] text-[#5A5C63]">
                                                <div>{task.Content}</div>
                                                <div className="flex flex-row gap-3 max-[1023px]:gap-0 max-[1023px]:flex-col ">
                                                    <div className="mt-[10px] flex gap-1">
                                                        <i className="fa-regular fa-clock"></i>
                                                        {format(new Date(task.TimeCreate), 'yyyy-MM-dd HH:mm:ss')}
                                                    </div>
                                                    <div className="mt-[10px] text-red-700 flex gap-1">
                                                        <i className="fa-regular fa-clock"></i>
                                                        {format(new Date(task.TimeDeadline), 'yyyy-MM-dd HH:mm:ss')}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <div className="w-[30%] max-[1023px]:w-[100%]">
                            <div
                                className="status-bar rounded flex justify-between items-center bg-[#ccac038f] relative after:absolute after:w-full after:bottom-[-15px] after:border after:border-solid after:border-[#ccac038f] max-[1023px]:cursor-pointer"
                                onDrop={e => handleDrop(e, 'doing')}
                                onDragOver={handleDragOver}
                            >
                                <div className="font-bold leading-5 text-white p-[5px]">Doing</div>
                                <span className="bg-[#ccac038f] text-center text-white mr-[10px] rounded w-5 h-5 leading-5 doing-counting">
                                    {tasks.filter(task => task.Status === 'doing').length}
                                </span>
                            </div>
                            <div
                                className="flex flex-col mt-[30px] gap-[30px] max-h-[500px] overflow-y-auto max-[1023px]:overflow-y-hidden max-[1023px]:h-full list lists-doing"
                                onDrop={e => handleDrop(e, 'doing')}
                                onDragOver={handleDragOver}
                            >
                                {tasks
                                    .filter(task => task.Status === 'doing')
                                    .map(task => (
                                        <div
                                            key={task.IdTask}
                                            draggable="true"
                                            onDragStart={e => handleDragStart(e, task)}
                                            className="h-[154px] max-[1023px]:h-auto bg-white rounded-lg px-[30px] pt-[10px] pb-[30px] shadow-sm border-[2px]"
                                        >
                                            <div className="flex justify-between items-center">
                                                <div className="font-bold text-[12px] leading-[15px] underline text-[#4D8EFF]">{task.Category}</div>
                                                <div className="w-[20%] flex justify-around">
                                                    <button className="bg-white opacity-60" onClick={() => handleUpdateTask(task.IdTask)}><i className="fa-solid fa-pen-to-square"></i></button>
                                                    <button className="bg-white opacity-60"  onClick={() => handleDelete(task.IdTask)}><i className="fa-solid fa-trash"></i></button>
                                                </div>
                                            </div>
                                            <div className="relative font-bold leading-5 text-[#393939] after:absolute after:mt-[30px] after:left-[0] after:w-[80%] after:h-0 after:border after:border-solid after:border-[#DBDBDB]">{task.Title}</div>
                                            <div className="mt-[20px] text-[10px] leading-[13px] text-[#5A5C63]">
                                                <div>{task.Content}</div>
                                                <div className="flex flex-row gap-3 max-[1023px]:gap-0 max-[1023px]:flex-col ">
                                                    <div className="mt-[10px] flex gap-1">
                                                        <i className="fa-regular fa-clock"></i>
                                                        {format(new Date(task.TimeCreate), 'yyyy-MM-dd HH:mm:ss')}
                                                    </div>
                                                    <div className="mt-[10px] text-red-700 flex gap-1">
                                                        <i className="fa-regular fa-clock"></i>
                                                        {format(new Date(task.TimeDeadline), 'yyyy-MM-dd HH:mm:ss')}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <div className="w-[30%] max-[1023px]:w-[100%]">
                            <div
                                className="status-bar rounded flex justify-between items-center bg-[#3BC057] relative after:absolute after:w-full after:bottom-[-15px] after:border after:border-solid after:border-[#3BC057] max-[1023px]:cursor-pointer"
                                onDrop={e => handleDrop(e, 'finished')}
                                onDragOver={handleDragOver}
                            >
                                <div className="font-bold leading-5 text-white p-[5px]">Finished</div>
                                <span className="bg-[#3BC057] text-center text-white mr-[10px] rounded w-5 h-5 leading-5 finished-counting">
                                    {tasks.filter(task => task.Status === 'finished').length}
                                </span>
                            </div>
                            <div
                                className="flex flex-col mt-[30px] gap-[30px] max-h-[500px] overflow-y-auto max-[1023px]:overflow-y-hidden max-[1023px]:h-full list lists-finished"
                                onDrop={e => handleDrop(e, 'finished')}
                                onDragOver={handleDragOver}
                            >
                                {tasks
                                    .filter(task => task.Status === 'finished')
                                    .map(task => (
                                        <div
                                            key={task.IdTask}
                                            draggable="true"
                                            onDragStart={e => handleDragStart(e, task)}
                                            className="h-[154px] max-[1023px]:h-auto bg-white rounded-lg px-[30px] pt-[10px] pb-[30px] shadow-sm border-[2px]"
                                        >
                                            <div className="flex justify-between items-center">
                                                <div className="font-bold text-[12px] leading-[15px] underline text-[#4D8EFF]">{task.Category}</div>
                                                <div className="w-[20%] flex justify-around">
                                                    <button className="bg-white opacity-60" onClick={() => handleUpdateTask(task.IdTask)}><i className="fa-solid fa-pen-to-square"></i></button>
                                                    <button className="bg-white opacity-60"  onClick={() => handleDelete(task.IdTask)}><i className="fa-solid fa-trash"></i></button>
                                                </div>
                                            </div>
                                            <div className="relative font-bold leading-5 text-[#393939] after:absolute after:mt-[30px] after:left-[0] after:w-[80%] after:h-0 after:border after:border-solid after:border-[#DBDBDB]">{task.Title}</div>
                                            <div className="mt-[20px] text-[10px] leading-[13px] text-[#5A5C63]">
                                                <div>{task.Content}</div>
                                                <div className="flex flex-row gap-3 max-[1023px]:gap-0 max-[1023px]:flex-col ">
                                                    <div className="mt-[10px] flex gap-1">
                                                        <i className="fa-regular fa-clock"></i>
                                                        {format(new Date(task.TimeCreate), 'yyyy-MM-dd HH:mm:ss')}
                                                    </div>
                                                    <div className="mt-[10px] text-red-700 flex gap-1">
                                                        <i className="fa-regular fa-clock"></i>
                                                        {format(new Date(task.TimeDeadline), 'yyyy-MM-dd HH:mm:ss')}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
                {showDialog_Add && (
                    <Dialog
                        className="dialog-container"
                        id_employee={id_employee}
                        onCancel={handleCancel_AddTask}
                        onConfirm={handleConfirm_AddTask}
                    />
                )}
                {showDialog_Update && (
                    <Dialog_Update
                        className="dialog-container"
                        id_task={Task_id}
                        onCancel={handleCancel_UpdateTask}
                        onConfirm={handleConfirm_UpdateTask}
                    />
                )}
                {showDialog && (
                    <Dialog_Delete
                        className=''
                        message='Do you want to delete this task?'
                        onCancel={handleCancelDelete}
                        onConfirm={handleConfirmDelete}
                    />
                )}
            </div>
        </div>
    );
}

export default Task;







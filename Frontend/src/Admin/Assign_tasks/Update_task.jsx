/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { format } from 'date-fns';

const Update_task = ({ id_task,onCancel, onConfirm }) => {
  const [taskData, setTaskData] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:8081/task/tasks/get/${id_task}`)
      .then((response) => {
        const data = response.data;
        if (data.Status === 'Success' && data.Result.length > 0) {
          const task = data.Result[0];
          setTaskData(task);
          setSelectedDate(new Date(task.time_deadline));
          setStatus(task.status);
        }
      })
      .catch((error) => {
        console.error('Error fetching task data:', error);
      });
  }, [id_task]);

  const validationSchema = Yup.object().shape({
    category: Yup.string().required('Category is required'),
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
    time_deadline: Yup.date().required('Time deadline is required'),
  });

  const formik = useFormik({
    initialValues: {
      category: '',
      title: '',
      content: '',
      time_deadline: null,
    },
    validationSchema,
    onSubmit: (values) => {
      updateTask(values);
    },
  });

  useEffect(() => {
    if (taskData) {
      formik.setValues({
        category: taskData.category,
        title: taskData.title,
        content: taskData.content,
        time_deadline: new Date(taskData.time_deadline),
      });
      setStatus(taskData.status);
    }
  }, [taskData]);

  const updateTask = (values) => {
    const formattedTimeDeadline = format(selectedDate, 'yyyy-MM-dd HH:mm:ss');
    const task = {
      ...taskData,
      ...values,
      time_deadline: formattedTimeDeadline,
      status: status, 
    };
    console.log(task)

    axios
      .put(`http://localhost:8081/task/update/${id_task}`, task)
      .then((response) => {
        if (response.data.Status === 'Success') {
          onConfirm();
        } else {
          console.error('Error updating task:', response.data.Errors);
        }
      })
      .catch((error) => {
        console.error('Error updating task:', error);
      });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4">
            <div className="">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <div className="text-26px text-heading">
                  <h3>Edit Task</h3>
                </div>
                <form className="flex flex-col w-90% mx-auto mb-4 gap-2 form" onSubmit={formik.handleSubmit}>
                  <DatePicker
                    className="border border-black rounded pl-1 w-full p-1 text-sm"
                    selected={selectedDate}
                    onChange={handleDateChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={1}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    timeCaption="Time"
                    placeholderText="Select deadline"
                  />
                  {formik.touched.time_deadline && formik.errors.time_deadline ? (
                    <p className="text-red-500">{formik.errors.time_deadline}</p>
                  ) : null}
                  <input
                    className="border border-black rounded pl-1 p-1 text-sm"
                    type="text"
                    name="category"
                    id="category"
                    placeholder="Category. Etc. Marketing..."
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.category && formik.errors.category ? (
                    <p className="text-red-500">{formik.errors.category}</p>
                  ) : null}
                  <input
                    className="border border-black rounded pl-1 p-1 text-sm"
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.title && formik.errors.title ? (
                    <p className="text-red-500">{formik.errors.title}</p>
                  ) : null}
                  <textarea
                    className="border border-black rounded pl-1 p-1 text-sm"
                    name="content"
                    id="content"
                    cols=""
                    rows="4"
                    placeholder="Content"
                    value={formik.values.content}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.content && formik.errors.content ? (
                    <p className="text-red-500">{formik.errors.content}</p>
                  ) : null}
                  <div className="flex flex-row justify-evenly gap-10 text-[#605F60] radio-btn">
                    <div className="todo flex gap-1">
                      <input
                        type="radio"
                        name="radio"
                        value="todo"
                        checked={status === 'todo'}
                        onChange={handleStatusChange}
                      />
                      <label htmlFor="todo">To do</label>
                    </div>
                    <div className="doing flex gap-1">
                      <input
                        type="radio"
                        name="radio"
                        value="doing"
                        checked={status === 'doing'}
                        onChange={handleStatusChange}
                      />
                      <label htmlFor="doing">Doing</label>
                    </div>
                    <div className="finished flex gap-1">
                      <input
                        type="radio"
                        name="radio"
                        value="finished"
                        checked={status === 'finished'}
                        onChange={handleStatusChange}
                      />
                      <label htmlFor="finished">Finished</label>
                    </div>
                  </div>
                  <div className="item-center justify-center px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#2a7c00] text-base font-medium text-white hover:bg-[#3eab01] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Submit
                    </button>
                    <button
                      onClick={onCancel}
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#ffffff] text-base font-medium text-black hover:bg-[#b8b9bb] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update_task;

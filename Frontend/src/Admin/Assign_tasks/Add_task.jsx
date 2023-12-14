// import React, { useState, useEffect } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// const AddTask = ({id_employee,onCancel, onConfirm }) => {
//   const [selectedDate, setSelectedDate] = useState(null);

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };
//   return (
//     <div className="fixed inset-0 overflow-y-auto">
//       <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0">
//         <div className="fixed inset-0 transition-opacity" aria-hidden="true">
//           <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
//         </div>
//         <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
//         <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
//           <div className="bg-white px-4">
//             <div className="">
//               <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
//                 <div className="text-26px text-heading"><h3>Add New Task</h3></div>
//                 <form className="flex flex-col w-90% mx-auto mb-4 gap-2 form">
//                   <DatePicker
//                     className="border border-black rounded pl-1 w-full p-1 text-sm"
//                     selected={selectedDate}
//                     onChange={handleDateChange}
//                     showTimeSelect
//                     timeFormat="HH:mm"
//                     timeIntervals={1}
//                     dateFormat="MMMM d, yyyy h:mm aa"
//                     timeCaption="Time"
//                     placeholderText="Select deadline"
//                   />
//                   <input className="border border-black rounded pl-1 p-1 text-sm" type="text" name="category" id="category" placeholder="Category. Etc. Marketing..." />
//                   <input className="border border-black rounded pl-1 p-1 text-sm" type="text" name="title" id="title" placeholder="Title" />
//                   <textarea className="border border-black rounded pl-1 p-1 text-sm" name="text" id="text" cols="" rows="4" placeholder="Content"></textarea>
//                   <div className="flex flex-row justify-evenly gap-10 text-[#605F60] radio-btn">
//                     <div className="todo flex gap-1">
//                       <input type="radio" name="radio" value="todo" />
//                       <label htmlFor="todo">To do</label>
//                     </div>
//                     <div className="doing flex gap-1">
//                       <input type="radio" name="radio" value="doing" />
//                       <label htmlFor="doing">Doing</label>
//                     </div>
//                     <div className="finished flex gap-1">
//                       <input type="radio" name="radio" value="finished" />
//                       <label htmlFor="finished">Finished</label>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//           <div className="item-center justify-center bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//             <button onClick={onConfirm} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#2a7c00] text-base font-medium text-white hover:bg-[#3eab01] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
//               Submit
//             </button>
//             <button onClick={onCancel} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#ffffff] text-base font-medium text-black hover:bg-[#b8b9bb] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddTask;

/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { format } from 'date-fns';

// eslint-disable-next-line react/prop-types
const AddTask = ({ id_employee, onCancel, onConfirm }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const validationSchema = Yup.object({
    category: Yup.string().required('Category is required'),
    title: Yup.string().required('Title is required'),
    text: Yup.string().required('Content is required'),
    status: Yup.string().required('Status is required'),
  });

  const formik = useFormik({
    initialValues: {
      category: '',
      title: '',
      text: '',
      status: 'todo',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd HH:mm:ss');

      const postData = {
        id_employee,
        category: values.category,
        title: values.title,
        content: values.text,
        time_deadline: formattedDate,
        status: values.status,
      };

      axios
        .post('http://localhost:8081/task/create', postData)
        .then((response) => {
          onConfirm();
          resetForm();
        })
        .catch((error) => {
          console.error(error);
        });
    },
  });

  return (
    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4">
            <div className="">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <div className="text-26px text-heading">
                  <h3>Add New Task</h3>
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
                  <input
                    className="border border-black rounded pl-1 p-1 text-sm"
                    type="text"
                    name="category"
                    id="category"
                    placeholder="Category. Etc. Marketing..."
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.category}
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
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                  />
                   {formik.touched.title && formik.errors.title ? (
                    <p className="text-red-500">{formik.errors.title}</p>
                  ) : null}
                  <textarea
                    className="border border-black rounded pl-1 p-1 text-sm"
                    name="text"
                    id="text"
                    cols=""
                    rows="4"
                    placeholder="Content"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.text}
                  ></textarea>
                  {formik.touched.text && formik.errors.text ? (
                    <p className="text-red-500">{formik.errors.text}</p>
                  ) : null}
                  <div className="flex flex-row justify-evenly gap-10 text-[#605F60] radio-btn">
                    <div className="todo flex gap-1">
                      <input type="radio" name="status" value="todo" onChange={formik.handleChange} onBlur={formik.handleBlur} checked={formik.values.status === 'todo'} />
                      <label htmlFor="todo">To do</label>
                    </div>
                    <div className="doing flex gap-1">
                      <input type="radio" name="status" value="doing" onChange={formik.handleChange} onBlur={formik.handleBlur} checked={formik.values.status === 'doing'} />
                      <label htmlFor="doing">Doing</label>
                    </div>
                    <div className="finished flex gap-1">
                      <input type="radio" name="status" value="finished" onChange={formik.handleChange} onBlur={formik.handleBlur} checked={formik.values.status === 'finished'} />
                      <label htmlFor="finished">Finished</label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#2a7c00] text-base font-medium text-white hover:bg-[#3eab01] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={onCancel}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#ffffff] text-base font-medium text-black hover:bg-[#b8b9bb] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="item-center justify-center bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTask;


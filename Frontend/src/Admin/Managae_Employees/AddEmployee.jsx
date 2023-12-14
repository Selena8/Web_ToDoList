import axios from 'axios';
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Title from '../../Utils/title';
import { Link } from 'react-router-dom';

function AddEmployee() {
	const navigate = useNavigate();
	const [submitted, setSubmitted] = useState(false);
	const [selectedImage, setSelectedImage] = useState(null);

	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			password: '',
			address: '',
			salary: '',
			image: null,
			role: '',
		},
		validationSchema: Yup.object({
			name: Yup.string().when('submitted', (submitted, schema) =>
				submitted ? schema.required('Required') : schema
			),
			email: Yup.string()
				.email('Invalid email format')
				.when('submitted', (submitted, schema) =>
					submitted ? schema.required('Required') : schema
				),
			password: Yup.string().when('submitted', (submitted, schema) =>
				submitted ? schema.required('Required') : schema
			),
			address: Yup.string().when('submitted', (submitted, schema) =>
				submitted ? schema.required('Required') : schema
			),
			salary: Yup.string().when('submitted', (submitted, schema) =>
				submitted ? schema.required('Required') : schema
			),
			image: Yup.mixed().when('submitted', (submitted, schema) =>
				submitted ? schema.required('Image is required') : schema
			),
			role: Yup.string().when('submitted', (submitted, schema) =>
				submitted ? schema.required('Role is required') : schema
			),
		}),
		onSubmit: (values) => {
			setSubmitted(true);
			const formData = new FormData();
			formData.append('name', values.name);
			formData.append('email', values.email);
			formData.append('password', values.password);
			formData.append('address', values.address);
			formData.append('salary', values.salary);
			formData.append('image', values.image);
			formData.append('role', values.role);

			axios
				.post('http://localhost:8081/employee/create', formData)
				.then((res) => {
					navigate('/dashboard/employee');
				})
				.catch((err) => console.log(err));
		},
	});
	const handleImageChange = (event) => {
		const imageFile = event.currentTarget.files[0];
		formik.setFieldValue('image', imageFile);
		if (imageFile) {
			const imageUrl = URL.createObjectURL(imageFile);
			setSelectedImage(imageUrl);
		} else {
			setSelectedImage(null);
		}
	};

	return (
		<div className="h-screen flex  mt-[110px] flex-col flex-1 bg-[#F7F7F7] font-Poppins-700 max-[800px]:gap-y-8  ">
			<Title title="Manage Employees" />
			<form
				className="ml-8 flex flex-col flex-1 mt-8"
				onSubmit={formik.handleSubmit}
			>
				<div className="flex flex-1">
					<div className="h-[600px] max-[800px]:h-[900px] flex-1 rounded-lg bg-white p-4 mr-8">
						<span className="ml-[20px] font-Poppins-700 text-2xl text-black">
							Add Employee
						</span>
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
											onChange={formik.handleChange}
											value={formik.values.name}
										/>
										{formik.errors.name && formik.touched.name && (
											<div className="text-danger">{formik.errors.name}</div>
										)}
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
											id="inputEmail4"
											placeholder="Enter Email"
											autoComplete="off"
											name="email"
											onChange={formik.handleChange}
											value={formik.values.email}
										/>
										{formik.errors.email && formik.touched.email && (
											<div className="text-danger">{formik.errors.email}</div>
										)}
									</div>
								</div>
								<div className="mb-2 flex item-center text-left mt-[16px] gap-x-10 gap-y-3  md:grid-cols-1 max-[800px]:flex-col">
									<label className="ml-12 flex items-center w-64 font-Poppins-700">
										Password
										<span className="ml-2 text-red-500 mr-2">*</span>
									</label>
									<div className="w-full">
										<input
											type="password"
											className="border border-gray-300 text-sm rounded-lg block w-full p-2.5"
											id="inputPassword4"
											placeholder="Enter Password"
											autoComplete="off"
											name="password"
											onChange={formik.handleChange}
											value={formik.values.password}
										/>
										{formik.errors.password && formik.touched.password && (
											<div className="text-danger">{formik.errors.password}</div>
										)}
									</div>
								</div>
								<div className="mb-2 flex item-center text-left mt-[16px] gap-x-10 gap-y-3  md:grid-cols-1 max-[800px]:flex-col">
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
											onChange={formik.handleChange}
											value={formik.values.salary}
										/>
										{formik.errors.salary && formik.touched.salary && (
											<div className="text-danger">{formik.errors.salary}</div>
										)}
									</div>
								</div>
								<div className=" mb-2 flex item-center text-left mt-[16px] gap-x-10 gap-y-3  md:grid-cols-1 max-[800px]:flex-col">
									<label className="ml-12 flex items-center w-64 font-Poppins-700">
										Address
										<span className=" ml-2 text-red-500 mr-2">*</span>
									</label>
									<div className="w-full">
										<input
											type="text"
											className="border border-gray-300 text-sm rounded-lg block w-full p-2.5"
											id="inputAddress"
											placeholder="1234 Main St"
											autoComplete="off"
											name="address"
											onChange={formik.handleChange}
											value={formik.values.address}
										/>
										{formik.errors.address && formik.touched.address && (
											<div className="text-danger">{formik.errors.address}</div>
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
										{formik.errors.role && formik.touched.role && (
											<div className="text-danger">{formik.errors.role}</div>
										)}
									</div>
								</div>
							</div>
							<div className="flex items-center justify-center flex flex-col">
								<div className="ml-12 flex items-center justify-center w-80 h-80 border-1 flex flex-col">
									<img
										src={selectedImage || 'http://localhost:8081/images/Upload_image.png'}
										alt=""
										className="w-[200px] h-[200px] border-[2px] border-gray-800 rounded-lg"
										style={{
											objectFit: 'cover',
										}}
									/>
									<div className="ml-4 mr-4 mt-4">
										<input
											type="file"
											className="form-control"
											id="inputGroupFile01"
											name="image"
											onChange={handleImageChange}
										/>
										{formik.errors.image && formik.touched.image && (
											<div className="text-danger">{formik.errors.image}</div>
										)}
									</div>
								</div>
							</div>
						</div>
						<div className="flex flex-row justify-center text-left mt-[50px]">
							<div>
								<button
									className="mb-[9px] bg-blue-700 hover:bg-[#FE881C] 
                        text-white font-bold w-24 h-10 py-2 px-4 rounded-lg mt-[10px]"
									type="submit"
								>
									Create
								</button>
							</div>

							<div className="ml-8">
								<Link to="/dashboard/employee">
									<button
										className="mb-[9px] bg-[#7c7c7c] hover:bg-[#FE881C] 
                        text-white font-bold w-24 h-10 py-2 px-4 rounded-lg mt-[10px] "
									>
										Cancel
									</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}

export default AddEmployee;
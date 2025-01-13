'use client';
import axios from 'axios';
import React from 'react';
import { baseUrl } from '../../utils/helper';
import { useFormik } from 'formik';
import { registrationSchema } from '../../validationSchema/registrationSchema';
import { useRouter } from 'next/navigation';

function Register() {
    const navigate = useRouter();

    // using formik for handling input fields
    const initialValues = {
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    };

    // values, handleBlur, handleChange, handleSubmit, errors, touched
    const formik = useFormik({
        initialValues,
        validationSchema: registrationSchema,
        validateOnChange: true,
        validateOnBlur: false,
        // By disabling validation onChange and onBlur formik will validate on submit.
        onSubmit: (values, action) => {
            handleRegistration(values);

            // to get rid of all the values after submitting the form
            action.resetForm();
        }
    })


    const handleRegistration = (formData) => {
        console.log(formData)
        axios.post(`${baseUrl}/users/register`, formData)
            .then(response => {
                console.log(response.data);
                navigate.push('/login');
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                // loading false
            })
    }

    return (
        <div className='flex justify-center my-20'>
            <form action="post" onSubmit={formik.handleSubmit} className='space-y-3 w-80'>
                <div className="flex justify-center my-8">
                    <div className="flex items-center justify-center h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                        <span className="text-xl font-bold">PLAY</span>
                    </div>
                </div>

                <div className="">
                    <label htmlFor="email">Email*</label>
                    <input
                        id="email"
                        name="email"
                        className='block p-2 bg-black outline-none border rounded w-full'
                        type="email"
                        placeholder='Enter your email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                    />
                    {
                        (formik.touched.email && formik.errors.email) &&
                        <p className="text-red-600">{formik.errors.email}</p>
                    }
                </div>


                <div className="">
                    <label htmlFor="username">Username*</label>
                    <input
                        id="username"
                        name="username"
                        className='block p-2 bg-black outline-none border rounded w-full'
                        type="text"
                        placeholder='Create username'
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                        min={3}
                        max={16}
                    />
                    {
                        (formik.touched.username && formik.errors.username) &&
                        <p className="text-red-600">{formik.errors.username}</p>
                    }
                </div>

                <div className="">
                    <label htmlFor="password">Password*</label>
                    <input
                        id="password"
                        name="password"
                        className='block p-2 bg-black outline-none border rounded w-full'
                        type="password"
                        placeholder='Enter your password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                    />
                    {
                        (formik.touched.password && formik.errors.password) &&
                        <p className="text-red-600">{formik.errors.password}</p>
                    }
                </div>

                <div className="">
                    <label htmlFor="confirmPassword">Confirm Password*</label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        className='block p-2 bg-black outline-none border rounded w-full'
                        type="password"
                        placeholder='Confirm password'
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                    />
                    {
                        (formik.touched.confirmPassword && formik.errors.confirmPassword) &&
                        <p className="text-red-600">{formik.errors.confirmPassword}</p>
                    }
                </div>

                <button type="submit" className='bg-purple-600 p-2 px-6 w-full'>Register</button>
                <p className='text-center space-x-2'>
                    <span>Already have account?</span>
                    <span className='text-blue-500 cursor-pointer'
                        onClick={() => navigate.push('/login')}>
                        Login
                    </span>
                </p>
            </form>
        </div>
    )
}

export default Register;
'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { loginSchema } from '../../validationSchema/loginSchema';
import { baseUrl } from '../../utils/helper';
import Cookies from 'js-cookie';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

function Login() {
    const navigate = useRouter();
    const { setIsAuthenticated, setLoggedInUser } = useAuth();


    // using formik for handling input fields
    const initialValues = {
        email: "",
        password: "",
    };

    // values, handleBlur, handleChange, handleSubmit, errors, touched
    // By disabling validation onChange and onBlur formik will validate on submit.
    const formik = useFormik({
        initialValues,
        validationSchema: loginSchema,
        validateOnChange: true,
        validateOnBlur: false,
        onSubmit: (values, action) => {
            handleLogin(values);    // function to handle login 

            // to get rid of all the values after submitting the form
            action.resetForm();
        }
    })


    const handleLogin = (formData) => {
        axios.post(`${baseUrl}/users/login`, formData)
            .then(response => {
                console.log(response.data.data.accessToken);
                Cookies.set("accessToken", response.data.data.accessToken);
                navigate.push('/');

                setIsAuthenticated(true);
                setLoggedInUser(response.data.data.user);
                toast.success("Log in successful", {
                    theme: "dark",
                });
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
            <form action="post" className='space-y-3 w-80' onSubmit={formik.handleSubmit}>
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

                <button type="submit" className='bg-purple-600 p-2 px-6 w-full'>Login</button>
                <p className='text-center space-x-2'>
                    <span>New to videoexchange?</span>
                    <span className='text-blue-500 cursor-pointer'
                        onClick={() => navigate.push('/register')}>
                        Register
                    </span>
                </p>
            </form>
        </div>
    )
}

export default Login;
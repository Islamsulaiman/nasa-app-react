import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from "react-redux";
import { login } from '../../store/authSlice/login';
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import "./Login.css";

const LoginForm = () => {

  console.log("ligin comp")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string().required('email is required').min(3, 'email must be at least 3 characters').email(),
    password: Yup.string().required('Password is required')
  });


  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/login/`,
        values
      );

      if (!response.data.token) {
        toast.error("Invalid email or password", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }

      localStorage.setItem("token", response.data.token);
      toast.success("Login Successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/");
      dispatch(login());
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='login'>
        <div className="login-container">
        <h1>Login</h1>
        <p>Please enter your username and password.</p>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form>
            <div>
                <label htmlFor="email"><b>Email:</b></label>
                <Field type="text" id="email" name="email" placeholder="Enter email" />
                <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div>
                <label htmlFor="password"><b>Password:</b></label>
                <Field type="password" id="password" name="password" placeholder="Enter Password" />
                <ErrorMessage name="password" component="div" className="error" />
            </div>
            <div className="clearfix">
                <button type="submit" className="btn">Login</button>
            </div>
            </Form>
        </Formik>
        </div>
    </div>
  );
};

export default LoginForm;

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./Registration.css"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialValues = {
  fullName: '',
  userName: '',
  email: '',
  password: '',
  confirm_password: '',
  // image: "placeholder",
};

const RegistrationForm = () => {

  const navigate = useNavigate();
  const validationSchema = Yup.object({
    fullName: Yup.string().required('Name is required').min(3, 'First name must be at least 3 characters'),
    userName: Yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,
        'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character'
      ),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match')
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log("hello")
    try {
      let formData = new FormData();

      formData.append("fullname", values.fullname);
      formData.append("username", values.username);
      formData.append("password", values.password);
      formData.append("confirm_password", values.confirm_password);
      formData.append("email", values.email);

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/register/`,
        formData
      );

      if (response.status === 201) {
        resetForm();
        toast.success("Form submitted successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/login");
      } else {
        toast.error("Failed to submit the form, please try again later.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const { data } = error.response;

        if (typeof data === "string") {
          toast.error(data, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else if (typeof data === "object") {
          const errorMessages = Object.values(data).flat();

          errorMessages.forEach((errorMessage) => {
            toast.error(errorMessage, {
              position: toast.POSITION.TOP_RIGHT,
            });
          });
        } else {
          toast.error("An error occurred while submitting the form.", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } else {
        toast.error("An error occurred while submitting the form.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <h1>Sign Up</h1>
      <p>Please fill in this form to create an account.</p>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} validateOnChange={true}>
        <Form>
        <div>
            <label htmlFor="fullname"><b>Full Name:</b></label>
            <Field type="text" id="fullname" name="fullname" placeholder="Enter First Name" />
            <ErrorMessage name="fullname" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="username"><b>User Name:</b></label>
            <Field type="text" id="username" name="username" placeholder="Enter First Name" />
            <ErrorMessage name="username" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="email"><b>Email:</b></label>
            <Field type="email" id="email" name="email" placeholder="Enter Email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="password"><b>Password:</b></label>
            <Field type="password" id="password" name="password" placeholder="Enter Password" />
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="confirmPassword"><b>Confirm Password:</b></label>
            <Field type="password" id="confirmPassword" name="confirmPassword" placeholder="Enter Confirm Password" />
            <ErrorMessage name="confirmPassword" component="div" className="error" />
          </div>
          <p>By creating an account you agree to our <span style={{ color: 'dodgerblue' }}>Terms & Privacy</span>.</p>
          <div className="clearfix">
            <button type="submit" className="btn">Sign Up</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default RegistrationForm;

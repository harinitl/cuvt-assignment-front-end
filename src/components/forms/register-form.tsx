"use client";
import { FC, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { phoneIcon } from "../../../public/assets/icons";
import { IoPerson } from "react-icons/io5";
import { MdOutlineGroups, MdOutlineMailOutline } from "react-icons/md";
import OtpVerificationForm from "./otp-verification-form";

interface FormValues {
  name: string;
  mobile: string;
  companyName: string;
  email: string;
  employeSize: string;
}

const RegisterForm: FC = () => {
  const [isRegistered, setIsRegistered] = useState(false); // State to track registration status
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State to hold error messages
  const [email, setEmail] = useState<string>(""); // State to hold the email for OTP verification
  const [loading, setLoading] = useState(false); // State to manage loading status

  const initialValues: FormValues = {
    name: "",
    mobile: "",
    companyName: "",
    email: "",
    employeSize: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    mobile: Yup.string().required("Phone number is required"),
    companyName: Yup.string().required("Company Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Company Email is required"),
    employeSize: Yup.string().required("Employee Size is required"),
  });

  const handleSubmit = async (values: FormValues) => {
    setLoading(true); // Set loading to true when form submission starts
    try {
      const response = await axios.post(
        "https://cuvette-assignment-server.onrender.com/v1/api/auth/register",
        values
      );
      console.log("Registration successful:", response.data);
      setIsRegistered(true); // Set registration status to true
      setEmail(values.email); // Store the email for OTP verification
      setErrorMessage(null); // Clear any previous error messages
    } catch (error) {
      console.error("Registration failed:", error);
      setIsRegistered(false); // Ensure the registration status is false
      setErrorMessage("Registration failed. Please try again."); // Set error message
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="grid grid-cols-2 items-center h-screen px-28 py-36 gap-32 w-full">
      {/* Left Section */}
      <div className="flex-1 p-8">
        <p className="text-[#292929B2] text-2xl font-medium font-sans">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley{" "}
        </p>
      </div>

      {/* Right Section */}
      <div className="bg-white shadow-md rounded-lg border border-blue-600 p-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 items-center">
            <span className="text-3xl font-semibold font-sans">Sign Up</span>
            <span className="text-base text-slate-600 font-medium">
              Lorem Ipsum is simply dummy text
            </span>
          </div>
          {errorMessage && (
            <div className="text-red-500 text-sm mb-4">{errorMessage}</div> // Display error message
          )}
          {!isRegistered ? (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form className="space-y-4">
                {/* Name Field */}
                <div>
                  <div className="relative">
                    <IoPerson className="absolute left-3 top-3 w-6 h-6 text-[#535353]" />
                    <Field
                      name="name"
                      type="text"
                      placeholder="Name"
                      className="w-full p-3 pl-10 bg-[#F4F4F4] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-[#535353]"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                {/* Phone Field */}
                <div>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500 flex items-center gap-3">
                      <span className="text-[#535353]">{phoneIcon}</span>
                    </span>
                    <Field
                      name="mobile"
                      type="text"
                      placeholder="Phone no"
                      className="w-full p-3 pl-10 bg-[#F4F4F4] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-[#535353]"
                    />
                    <ErrorMessage
                      name="mobile"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                {/* Company Name Field */}
                <div>
                  <div className="relative">
                    <IoPerson className="absolute left-3 top-3 w-6 h-6 text-[#535353]" />
                    <Field
                      name="companyName"
                      type="text"
                      placeholder="Company name"
                      className="w-full p-3 pl-10 bg-[#F4F4F4] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-[#535353]"
                    />
                    <ErrorMessage
                      name="companyName" // Corrected the name here
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                {/* Company Email Field */}
                <div>
                  <div className="relative">
                    <MdOutlineMailOutline className="absolute left-3 top-3 w-6 h-6 text-[#535353]" />
                    <Field
                      name="email"
                      type="email"
                      placeholder="Email"
                      className="w-full p-3 pl-10 bg-[#F4F4F4] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-[#535353]"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                {/* Employee Size Field */}
                <div>
                  <div className="relative">
                    <MdOutlineGroups className="absolute left-3 top-3 w-6 h-6 text-[#535353]" />
                    <Field
                      name="employeSize"
                      type="text"
                      placeholder="Employee size"
                      className="w-full p-3 pl-10 bg-[#F4F4F4] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-[#535353]"
                    />
                    <ErrorMessage
                      name="employeSize"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading} // Disable button while loading
                  className={`w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <div className="flex justify-center items-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-3 ..."
                        viewBox="0 0 24 24"
                      >
                        <svg
                          className="animate-spin h-5 w-5 mr-3 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          ></path>
                        </svg>
                      </svg>
                      Loading...
                    </div>
                  ) : (
                    "Register"
                  )}{" "}
                  {/* Show loading icon */}
                </button>
              </Form>
            </Formik>
          ) : (
            <OtpVerificationForm email={email} />
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

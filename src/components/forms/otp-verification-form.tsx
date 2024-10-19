"use client";
import { FC, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";

const OtpVerificationForm: FC<{ email: string }> = ({ email }) => {
  const router = useRouter();
  const [loadingEmail, setLoadingEmail] = useState(false); // Loading state for email verification
  const [loadingMobile, setLoadingMobile] = useState(false); // Loading state for mobile verification
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Error message state

  const handleVerifyOtp = async (otp: string, isEmail: boolean) => {
    // Reset error message
    setErrorMessage(null); 
    try {
      const endpoint = isEmail
        ? "https://cuvette-assignment-server.onrender.com/v1/api/auth/verify-email"
        : "https://cuvette-assignment-server.onrender.com/v1/api/auth/verify-mobile";

      const response = await axios.post(endpoint, {
        email: email,
        otp: otp,
      });

      console.log(
        `${isEmail ? "Email" : "Mobile"} OTP verification successful:`,
        response.data
      );
      localStorage.setItem("token", response.data.token);
      router.push("/dashboard"); // Redirect directly to the dashboard
    } catch (error) {
      console.error(
        `${isEmail ? "Email" : "Mobile"} OTP verification failed:`,
        error
      );
      setErrorMessage(`${isEmail ? "Email" : "Mobile"} verification failed. Please try again.`); // Set error message
    } finally {
      if (isEmail) {
        setLoadingEmail(false); // Stop loading for email
      } else {
        setLoadingMobile(false); // Stop loading for mobile
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Error message display */}
      {errorMessage && (
        <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
      )}

      {/* Email OTP Verification Form */}
      <Formik
        initialValues={{ emailOtp: "" }}
        validationSchema={Yup.object({
          emailOtp: Yup.string().required("Email OTP is required"),
        })}
        onSubmit={(values) => {
          setLoadingEmail(true); // Start loading for email
          handleVerifyOtp(values.emailOtp, true);
        }}
      >
        <Form className="space-y-4">
          <div>
            <Field
              name="emailOtp"
              type="text"
              placeholder="Enter Email OTP"
              className="w-full p-3 bg-[#F4F4F4] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-[#535353]"
            />
            <ErrorMessage
              name="emailOtp"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors ${
              loadingEmail ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loadingEmail} // Disable button while loading
          >
            {loadingEmail ? (
              <div className="flex justify-center items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3"
                  viewBox="0 0 24 24"
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
                Loading...
              </div>
            ) : (
              "Verify Email OTP"
            )}
          </button>
        </Form>
      </Formik>

      {/* Mobile OTP Verification Form */}
      <Formik
        initialValues={{ mobileOtp: "" }}
        validationSchema={Yup.object({
          mobileOtp: Yup.string().required("Mobile OTP is required"),
        })}
        onSubmit={(values) => {
          setLoadingMobile(true); // Start loading for mobile
          handleVerifyOtp(values.mobileOtp, false);
        }}
      >
        <Form className="space-y-4">
          <div>
            <Field
              name="mobileOtp"
              type="text"
              placeholder="Enter Mobile OTP"
              className="w-full p-3 bg-[#F4F4F4] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-[#535353]"
            />
            <ErrorMessage
              name="mobileOtp"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors ${
              loadingMobile ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loadingMobile} // Disable button while loading
          >
            {loadingMobile ? (
              <div className="flex justify-center items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3"
                  viewBox="0 0 24 24"
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
                Loading...
              </div>
            ) : (
              "Verify Mobile OTP"
            )}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default OtpVerificationForm;

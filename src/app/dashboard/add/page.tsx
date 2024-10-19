"use client";
import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation"; 


function AddInterviewPage() {
  const router = useRouter(); // Initialize useRouter
  const [submitError, setSubmitError] = useState<string | null>(null);
  const experienceLevels = Array.from({ length: 10 }, (_, index) => index + 1); // Creates an array [1, 2, ..., 10]

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Add Interview</h1>

      <Formik
        initialValues={{
          title: "",
          description: "",
          experienceLevel: "",
          endDate: "",
        }}
        validationSchema={Yup.object({
          title: Yup.string().required("Title is required"),
          description: Yup.string().required("Description is required"),
          experienceLevel: Yup.string().required(
            "Experience level is required"
          ),
          endDate: Yup.date().required("End date is required").nullable(),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitError(null); // Reset any previous submit errors
          try {
            const token = window.localStorage.getItem("token");
            console.log("aa",token)
            const response = await axios.post(
              "https://cuvette-assignment-server.onrender.com/v1/api/job/add",
              values,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            console.log("Interview added successfully:", response.data);

            router.push("/dashboard");
           
          } catch (error) {
            console.error("Error adding interview:", error);
            setSubmitError("Failed to add interview. Please try again."); // Set the error message
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Title</label>
              <Field
                name="title"
                type="text"
                placeholder="Enter title"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Description</label>
              <Field
                as="textarea"
                name="description"
                placeholder="Enter description"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Experience Level (Years)
              </label>
              <Field
                as="select"
                name="experienceLevel"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select experience level</option>
                {experienceLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="experienceLevel"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">End Date</label>
              <Field
                name="endDate"
                type="date"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <ErrorMessage
                name="endDate"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              {isSubmitting ? "Adding..." : "Add Interview"}
            </button>

            {submitError && (
              <div className="text-red-500 text-sm mt-1">{submitError}</div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddInterviewPage;

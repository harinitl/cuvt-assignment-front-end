"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface InterviewData {
  title: string;
  description: string;
  experienceLevel: string;
  endDate: string;
  company: string;
}

function DashBoardPage() {
  const [interviews, setInterviews] = useState<InterviewData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await axios.get<InterviewData[]>('https://cuvette-assignment-server.onrender.com/v1/api/job/get');
        setInterviews(response.data); // Assuming the data structure is an array of interviews
      } catch (err) {
        console.error(err); // Log the error for debugging
        setError('Failed to fetch interview data.');
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (interviews.length === 0) {
    return <div>No interviews found.</div>; // Handle empty state
  }

  return (
   
     <div className="p-4 overflow-hidden">
      <button
        onClick={() => router.push('/dashboard/add')} // Redirect to Add Interview page
        className="mb-4 bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors"
      >
        Create Interview
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {interviews.map((interview, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold">{interview.title}</h2>
            <p className="mt-2 text-gray-700">{interview.description}</p>
            <p className="mt-2 text-gray-600">Experience Level: {interview.experienceLevel}</p>
            <p className="mt-2 text-gray-600">End Date: {interview.endDate}</p>
            {/* <p className="mt-2 text-gray-600">Company: {interview.company}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashBoardPage;

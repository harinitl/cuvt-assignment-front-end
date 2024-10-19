/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js
import NavBar from "@/components/nav-bar/nav-bar";
import SideBar from "@/components/side-bar/side-bar";
import PrivateRoute from "@/components/private-routes";

interface UserInfo {
  name: string;
  email: string;
  companyName: string;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter(); // Initialize the useRouter hook

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get(
          "https://cuvette-assignment-server.onrender.com/v1/api/auth/userInfo",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Send token in the Authorization header
            },
          }
        );

        setUserInfo(response.data); // Set user data in state
      } catch (error) {
        console.error("Error fetching user info:", error);
        setError("Failed to fetch user information");
        localStorage.removeItem("token"); // Optionally remove invalid token
        router.push("/"); // Redirect to '/' if there's an error
      } finally {
        setLoading(false); // Stop loading when the request completes
      }
    };

    fetchUserInfo();
  }, [router]);


  return (
    <PrivateRoute>
      <div className="overflow-x-hidden">
        <NavBar
          name={userInfo?.name}
          email={userInfo?.email}
          companyName={userInfo?.companyName}
        />
        <div className="flex">
          <SideBar />
          <div className="w-full b-white p-6">{children}</div>
        </div>
      </div>
    </PrivateRoute>
  );
}

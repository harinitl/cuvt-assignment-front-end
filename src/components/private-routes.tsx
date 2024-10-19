"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if running in the browser
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("token");

      if (!token) {
        router.push("/");
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [router]);

  // Don't render the children until authentication is confirmed
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoute;

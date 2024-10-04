import React, { useEffect } from "react";
import toast from "react-hot-toast";
import "../../index.css";

function Dashboard() {
  useEffect(() => {
    // Check if there is a toast message in sessionStorage
    const message = sessionStorage.getItem("toastMessage");
    if (message) {
      toast.success(message);
      sessionStorage.removeItem("toastMessage"); // Clear message after showing
    }
  }, []);

  return (
    <div className="dashboard">
      <h1 className="text-white">Dashboard</h1>
      <p>Welcome to the dashboard!</p>
    </div>
  );
}

export default Dashboard;

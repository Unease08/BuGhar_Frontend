import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");
    const error = params.get("error");
    const message = params.get("message");

    console.log("URL Params:", { accessToken, refreshToken, error, message });

    if (error && message) {
      console.log("Error detected:", message);
      toast.error(`Error: ${message}`);
      navigate("/login");
    } else if (accessToken && refreshToken) {
      const loadingToastId = toast.loading("Logging in... Please wait.");

      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);

      setTimeout(() => {
        toast.success("Login successful!", {
          id: loadingToastId,
        });
        navigate("/dashboard");
      }, 3000);
    } else {
      console.error("Error: Tokens are missing");
      toast.error("Error: Tokens are missing or invalid. Please try again.");
      navigate("/login");
    }
  }, [navigate]);

  return <div></div>;
};

export default OAuthCallback;

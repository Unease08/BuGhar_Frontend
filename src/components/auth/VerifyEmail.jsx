import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../library/Api"; // Assuming you have an axios instance setup in 'api.js'

const VerifyEmail = () => {
  const { id } = useParams(); // Extract ID from the URL
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Sending GET request to verify the email
        const response = await api.get(`/auth/verify-email/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const { message } = response.data;
        toast.success(message); // Show success message from the backend

        // Redirect to the login page after successful email verification
        navigate("/auth/login");
      } catch (error) {
        // Handle error response
        const errorMessage =
          (error.response &&
            error.response.data &&
            error.response.data.detail) ||
          "An error occurred during email verification.";

        toast.error(errorMessage);

        // Always navigate to the login page on error
        navigate("/auth/login");
      }
    };

    verifyEmail();
  }, [id, navigate]);

  return <div>Verifying your email, please wait...</div>;
};

export default VerifyEmail;

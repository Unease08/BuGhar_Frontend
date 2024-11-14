import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../library/Api"; 

const VerifyEmail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await api.get(`/auth/verify-email/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const { message } = response.data;
        toast.success(message); 

        navigate("/auth/login");
      } catch (error) {
        const errorMessage =
          (error.response &&
            error.response.data &&
            error.response.data.detail) ||
          "An error occurred during email verification.";

        toast.error(errorMessage);

        navigate("/auth/login");
      }
    };

    verifyEmail();
  }, [id, navigate]);

  return <div>Verifying your email, please wait...</div>;
};

export default VerifyEmail;

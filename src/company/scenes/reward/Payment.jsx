import { Box, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { Header } from "../../components";
import { useParams } from "react-router-dom";
import api from "../../../library/Api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [bounty, setBounty] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchReportDetails = async () => {
      try {
        const response = await api.get(`/reward/company/reward/${id}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching report details:", error);
      }
    };

    const fetchBountyDetails = async () => {
      try {
        const response = await api.get(`/reward/calculate_bounty/${id}`);
        setBounty(response.data.amount);
      } catch (error) {
        console.error("Error fetching bounty details:", error);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchReportDetails(), fetchBountyDetails()]);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  const handleBountyChange = (e) => {
    setBounty(e.target.value);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const endpoint = `/reward/pay?report_id=${id}&amount=${encodeURIComponent(
        bounty
      )}&reward_status=paid`;

      console.log("Request Endpoint:", endpoint);

      // Make the API request
      const response = await api.post(endpoint, null, {
        headers: {
          "Content-Type": "application/json", // Ensure the correct content type for JSON
        },
      });

      toast.success("Bounty amount updated successfully!");
      navigate("/reward");
    } catch (error) {
      console.error("Error updating bounty amount:", error);
      if (error.response) {
        console.error("Server Response:", error.response.data); // Log server error details
        alert(
          `Failed to update the bounty amount: ${
            error.response.data.message || "Unknown error"
          }`
        );
      } else {
        alert("Failed to update the bounty amount.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box m="20px">
      <Header title="Payment Details" />
      <div className="max-w-8xl mx-auto mt-10 p-6 bg-gray-900 rounded-lg shadow-lg flex flex-col gap-8">
        <div className="ml-6">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <p className="font-bold text-gray-200 text-lg">Program Name:</p>
              <p className="text-gray-300 mt-1">{data.program_name}</p>
            </Grid>
            <Grid item xs={12} md={6}>
              <p className="font-bold text-gray-200 text-lg">Report Title:</p>
              <p className="text-gray-300 mt-1">{data.title}</p>
            </Grid>
            <Grid item xs={12} md={6}>
              <p className="font-bold text-gray-200 text-lg">Impact:</p>
              <p className="text-gray-300 mt-1">{data.impact}</p>
            </Grid>
            <Grid item xs={12} md={6}>
              <p className="font-bold text-gray-200 text-lg">Status:</p>
              <p className="text-gray-300 mt-1">{data.status}</p>
            </Grid>
            <Grid item xs={12} md={6}>
              <p className="font-bold text-gray-200 text-lg">
                Vulnerabilities:
              </p>
              <p className="text-gray-300 mt-1">
                {data.vulnerabilities.join(", ")}
              </p>
            </Grid>
            <Grid item xs={12} md={6}>
              <p className="font-bold text-gray-200 text-lg">
                Reporter Full Name:
              </p>
              <p className="text-gray-300 mt-1">
                {data.first_name} {data.last_name}
              </p>
            </Grid>
            <Grid item xs={12} md={6}>
              <p className="font-bold text-gray-200 text-lg">Reporter Email:</p>
              <p className="text-gray-300 mt-1">{data.email}</p>
            </Grid>
            <Grid item xs={12} md={6}>
              <p className="font-bold text-gray-200 text-lg">
                Reporter Username:
              </p>
              <p className="text-gray-300 mt-1">{data.username}</p>
            </Grid>
            <Grid item xs={12} md={6}>
              <p className="font-bold text-gray-200 text-lg">Date:</p>
              <p className="text-gray-300 mt-1">
                {formatDate(data.created_at)}
              </p>
            </Grid>
            <Grid item xs={12} md={6}>
              <p className="font-bold text-gray-200 text-lg">
                Calculated Bounty Amount:
              </p>
              <div className="mt-2">
                <input
                  type="text"
                  id="calculated_bounty"
                  className="w-full md:w-48 border text-sm rounded-lg p-3 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-300"
                  placeholder="Enter amount"
                  value={bounty}
                  onChange={handleBountyChange}
                />
              </div>
            </Grid>
          </Grid>
          <div className="flex justify-between">
            <div className="ml-4 mt-4">
              <Link to="/payable">
                <button className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none font-medium rounded-md text-lg w-full sm:w-auto px-5 py-2.5 text-center focus:ring-gray-700">
                  Back
                </button>
              </Link>
            </div>
            <div className="ml-4 mt-4">
              <button
                className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-md text-lg w-full sm:w-auto px-5 py-2.5 text-center focus:ring-gray-700"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Payment;

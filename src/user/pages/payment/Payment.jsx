import React, { useEffect, useState } from "react";
import api from "../../../library/Api";

const Payment = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await api.get("/user/rewards");
        setPayments(response.data);
      } catch (error) {
        console.error("Failed to fetch payment data:", error);
      }
    };

    fetchPayments();
  }, []);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <div className="mt-10 ml-24 bg-gray-700 text-card-foreground p-8 rounded-lg max-w-7xl">
        <h1 className="text-3xl font-bold text-indigo-400 mb-6">
          Payment Report
        </h1>
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-500">SN</th>
              <th className="py-2 px-4 border-b border-gray-500">Company</th>
              <th className="py-2 px-4 border-b border-gray-500">Amount</th>
              <th className="py-2 px-4 border-b border-gray-500">Date</th>
              <th className="py-2 px-4 border-b border-gray-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((payment, index) => (
                <tr key={payment.id}>
                  <td className="py-2 px-4 border-b border-gray-600">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-600">
                    {payment.company.name}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-600">
                    Rs.{payment.amount}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-600">
                    <span>{formatDate(payment.rewarded_at)}</span>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-600">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        payment.status === "paid"
                          ? "bg-green-600 text-white"
                          : "bg-yellow-600 text-white"
                      }`}
                    >
                      {payment.status.charAt(0).toUpperCase() +
                        payment.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-400">
                  No payment records available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payment;

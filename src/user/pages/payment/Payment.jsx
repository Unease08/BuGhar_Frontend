import React from "react";

const Payment = () => {
  const transactions = [
    {
      id: 1,
      company: "Tech Solutions",
      amount: "Rs.500",
      date: "2024-09-25",
      status: "Paid",
    },
    {
      id: 2,
      company: "Creative Minds",
      amount: "Rs.750",
      date: "2024-09-28",
      status: "Paid",
    },
    {
      id: 3,
      company: "Design Hub",
      amount: "Rs.900",
      date: "2024-10-01",
      status: "Paid",
    },
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <div className="mt-10 ml-24 bg-gray-700 text-card-foreground p-8 rounded-lg max-w-7xl">
        <h1 className="text-3xl font-bold text-indigo-400 mb-6">
          Payment Report
        </h1>
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-500">
                Transaction ID
              </th>
              <th className="py-2 px-4 border-b border-gray-500">Company</th>
              <th className="py-2 px-4 border-b border-gray-500">Amount</th>
              <th className="py-2 px-4 border-b border-gray-500">Date</th>
              <th className="py-2 px-4 border-b border-gray-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="py-2 px-4 border-b border-gray-600">
                  {transaction.id}
                </td>
                <td className="py-2 px-4 border-b border-gray-600">
                  {transaction.company}
                </td>
                <td className="py-2 px-4 border-b border-gray-600">
                  {transaction.amount}
                </td>
                <td className="py-2 px-4 border-b border-gray-600">
                  {transaction.date}
                </td>
                <td className="py-2 px-4 border-b border-gray-600">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      transaction.status === "Paid"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payment;

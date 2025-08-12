import React, { useEffect, useState } from "react";

const RepaymentTracker = () => {
  const [repayments, setRepayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      const dummyRepayments = [
        {
          id: "EMI001",
          borrower: "Amit Sharma",
          phone: "9876543210",
          dueDate: "2025-07-05",
          amount: 8500,
          status: "Paid",
        },
        {
          id: "EMI002",
          borrower: "Neha Kapoor",
          phone: "9812345678",
          dueDate: "2025-07-07",
          amount: 9200,
          status: "Overdue",
        },
        {
          id: "EMI003",
          borrower: "Ravi Verma",
          phone: "9123456780",
          dueDate: "2025-07-10",
          amount: 7800,
          status: "Upcoming",
        },
      ];
      setRepayments(dummyRepayments);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h1 className="text-2xl font-bold text-blue-800 mb-6">Repayment Tracker</h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading repayment records...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-sm text-left border border-gray-200">
              <thead className="bg-blue-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">EMI ID</th>
                  <th className="px-4 py-3">Borrower</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Due Date</th>
                  <th className="px-4 py-3">Amount (₹)</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {repayments.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-900">{entry.id}</td>
                    <td className="px-4 py-2">{entry.borrower}</td>
                    <td className="px-4 py-2">{entry.phone}</td>
                    <td className="px-4 py-2">{entry.dueDate}</td>
                    <td className="px-4 py-2 text-green-700 font-semibold">
                      ₹{entry.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          entry.status === "Paid"
                            ? "bg-green-100 text-green-700"
                            : entry.status === "Overdue"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {entry.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {repayments.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-6 text-gray-500">
                      No repayment records available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RepaymentTracker;

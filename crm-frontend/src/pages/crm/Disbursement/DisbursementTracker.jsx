import React, { useEffect, useState } from "react";

const DisbursementTracker = () => {
  const [disbursements, setDisbursements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchDisbursements = async () => {
      setLoading(true);

      setTimeout(() => {
        const dummyData = [
          {
            id: "DISB001",
            borrower: "Amit Verma",
            amount: 200000,
            bank: "HDFC Bank",
            disbursedOn: "2025-07-09",
            status: "Success",
          },
          {
            id: "DISB002",
            borrower: "Neha Sharma",
            amount: 150000,
            bank: "ICICI Bank",
            disbursedOn: "2025-07-08",
            status: "Pending",
          },
          {
            id: "DISB003",
            borrower: "Ravi Kumar",
            amount: 300000,
            bank: "Axis Bank",
            disbursedOn: "2025-07-07",
            status: "Failed",
          },
        ];

        setDisbursements(dummyData);
        setLoading(false);
      }, 1000);
    };

    fetchDisbursements();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-blue-800 mb-4">Disbursement Tracker</h1>

        {loading ? (
          <p className="text-gray-600 text-center">Loading disbursement data...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-sm text-left text-gray-700 border border-gray-200">
              <thead className="bg-blue-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Txn ID</th>
                  <th className="px-4 py-3">Borrower</th>
                  <th className="px-4 py-3">Amount (₹)</th>
                  <th className="px-4 py-3">Bank</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {disbursements.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-900">{entry.id}</td>
                    <td className="px-4 py-2">{entry.borrower}</td>
                    <td className="px-4 py-2 text-green-700 font-semibold">
                      ₹{entry.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-2">{entry.bank}</td>
                    <td className="px-4 py-2">{entry.disbursedOn}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          entry.status === "Success"
                            ? "bg-green-100 text-green-700"
                            : entry.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {entry.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {disbursements.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center text-gray-500 py-6">
                      No disbursement records found.
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

export default DisbursementTracker;

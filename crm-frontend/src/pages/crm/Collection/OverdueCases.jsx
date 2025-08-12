import React, { useEffect, useState } from "react";

const OverdueCases = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const dummyData = [
        {
          id: "ODC001",
          name: "Amit Sharma",
          phone: "9876543210",
          overdueAmount: 15000,
          lastPaidDate: "2025-06-10",
          dueSince: "2025-06-15",
          status: "Pending",
        },
        {
          id: "ODC002",
          name: "Priya Kapoor",
          phone: "9801234567",
          overdueAmount: 27000,
          lastPaidDate: "2025-05-28",
          dueSince: "2025-06-01",
          status: "Follow-up",
        },
        {
          id: "ODC003",
          name: "Rohit Saini",
          phone: "9123456780",
          overdueAmount: 11000,
          lastPaidDate: "2025-06-01",
          dueSince: "2025-06-05",
          status: "Legal",
        },
      ];
      setCases(dummyData);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h1 className="text-2xl font-bold text-blue-800 mb-6">Overdue Cases</h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading overdue cases...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-sm text-left border border-gray-200">
              <thead className="bg-blue-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Case ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Overdue (₹)</th>
                  <th className="px-4 py-3">Last Paid</th>
                  <th className="px-4 py-3">Due Since</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {cases.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-800">{item.id}</td>
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2">{item.phone}</td>
                    <td className="px-4 py-2 text-red-700 font-semibold">
                      ₹{item.overdueAmount.toLocaleString()}
                    </td>
                    <td className="px-4 py-2">{item.lastPaidDate}</td>
                    <td className="px-4 py-2">{item.dueSince}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          item.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : item.status === "Follow-up"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {cases.length === 0 && (
                  <tr>
                    <td colSpan="7" className="py-4 text-center text-gray-500">
                      No overdue cases found.
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

export default OverdueCases;

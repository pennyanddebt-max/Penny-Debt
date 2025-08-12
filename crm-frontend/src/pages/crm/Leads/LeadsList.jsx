import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LeadsList = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchLeads = async () => {
      setLoading(true);

      setTimeout(() => {
        const dummyLeads = [
          {
            id: "LD001",
            fullName: "Amit Verma",
            phone: "9876543210",
            loanAmount: 250000,
            status: "Under Review",
            createdAt: "2025-07-08",
          },
          {
            id: "LD002",
            fullName: "Neha Sharma",
            phone: "9801234567",
            loanAmount: 400000,
            status: "Approved",
            createdAt: "2025-07-09",
          },
          {
            id: "LD003",
            fullName: "Ravi Singh",
            phone: "9123456780",
            loanAmount: 180000,
            status: "Rejected",
            createdAt: "2025-07-09",
          },
        ];
        setLeads(dummyLeads);
        setLoading(false);
      }, 1000);
    };

    fetchLeads();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-blue-800 mb-6">Leads List</h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading leads...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border border-gray-200">
              <thead className="bg-blue-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Lead ID</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Loan Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Created</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-800">{lead.id}</td>
                    <td className="px-4 py-3">{lead.fullName}</td>
                    <td className="px-4 py-3">{lead.phone}</td>
                    <td className="px-4 py-3 text-green-700 font-semibold">
                      ₹{lead.loanAmount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          lead.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : lead.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">{lead.createdAt}</td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        to={`/leads/details/${lead.id}`}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}

                {leads.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center py-6 text-gray-500">
                      No leads found.
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

export default LeadsList;

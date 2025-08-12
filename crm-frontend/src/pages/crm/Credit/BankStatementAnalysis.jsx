import React from "react";

const BankStatementAnalysis = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-2xl font-bold text-blue-800 mb-6">
          Bank Statement Analysis
        </h1>

        {/* Upload Section */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Bank Statement (PDF/CSV):
          </label>
          <input
            type="file"
            accept=".pdf,.csv"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>

        {/* Summary Table */}
        <div className="overflow-x-auto mt-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Statement Summary
          </h2>
          <table className="min-w-full border divide-y divide-gray-200">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Account Holder</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Bank Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Opening Balance</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Closing Balance</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Monthly Avg Balance</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              <tr>
                <td className="px-4 py-2 text-sm text-gray-800">Rohit Sharma</td>
                <td className="px-4 py-2 text-sm text-gray-800">HDFC Bank</td>
                <td className="px-4 py-2 text-sm text-green-700 font-semibold">₹25,000</td>
                <td className="px-4 py-2 text-sm text-green-700 font-semibold">₹1,12,500</td>
                <td className="px-4 py-2 text-sm text-gray-800">₹78,200</td>
              </tr>
              {/* Add more rows dynamically when backend is integrated */}
            </tbody>
          </table>
        </div>

        {/* Notes */}
        <div className="mt-10">
          <h3 className="text-md font-semibold text-gray-800 mb-2">
            Analyst Notes:
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            This account shows stable inflow with healthy average balance.
            No major overdraft observed in the last 3 months. Suitable for credit assessment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BankStatementAnalysis;

import React, { useState } from "react";

const CIBILCheck = () => {
  const [pan, setPan] = useState("");
  const [cibilData, setCibilData] = useState(null);

  const handleCheckCIBIL = () => {
    // Placeholder logic (replace with real API call)
    if (pan.trim() === "") {
      alert("Please enter a valid PAN number.");
      return;
    }

    // Simulate API response
    setCibilData({
      name: "Amit Kumar",
      pan: pan.toUpperCase(),
      score: 742,
      status: "Good",
      reportDate: "July 5, 2025",
      remarks: "Eligible for standard credit products. No recent defaults.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-2xl font-bold text-blue-800 mb-6">CIBIL Score Check</h1>

        {/* PAN Input Section */}
        <div className="mb-6">
          <label htmlFor="pan" className="block text-sm font-medium text-gray-700 mb-2">
            Enter PAN Number:
          </label>
          <input
            type="text"
            id="pan"
            maxLength={10}
            value={pan}
            onChange={(e) => setPan(e.target.value.toUpperCase())}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="e.g., ABCDE1234F"
          />
        </div>

        <button
          onClick={handleCheckCIBIL}
          className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200"
        >
          Check Score
        </button>

        {/* Result Section */}
        {cibilData && (
          <div className="mt-10 bg-blue-50 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">CIBIL Report</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <span className="font-medium">Name:</span> {cibilData.name}
              </div>
              <div>
                <span className="font-medium">PAN:</span> {cibilData.pan}
              </div>
              <div>
                <span className="font-medium">CIBIL Score:</span>{" "}
                <span
                  className={`font-semibold ${
                    cibilData.score >= 750 ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  {cibilData.score}
                </span>
              </div>
              <div>
                <span className="font-medium">Status:</span> {cibilData.status}
              </div>
              <div>
                <span className="font-medium">Report Date:</span> {cibilData.reportDate}
              </div>
              <div className="md:col-span-2 mt-2">
                <span className="font-medium">Remarks:</span> {cibilData.remarks}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CIBILCheck;

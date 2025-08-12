import React, { useState } from "react";

const CreateLead = () => {
  const [lead, setLead] = useState({
    fullName: "",
    phone: "",
    email: "",
    loanAmount: "",
    loanPurpose: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setLead({ ...lead, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!lead.fullName || !lead.phone || !lead.loanAmount) {
      alert("Please fill all required fields.");
      return;
    }

    // TODO: Replace this with API call
    console.log("Lead Submitted:", lead);
    alert("Lead created successfully!");

    // Reset form
    setLead({
      fullName: "",
      phone: "",
      email: "",
      loanAmount: "",
      loanPurpose: "",
      city: "",
      pincode: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-2xl font-bold text-blue-800 mb-6">Create New Lead</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={lead.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter full name"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={lead.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter phone number"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={lead.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email (optional)"
            />
          </div>

          {/* Loan Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loan Amount (₹) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="loanAmount"
              value={lead.loanAmount}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter required loan amount"
              required
            />
          </div>

          {/* Loan Purpose */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Loan Purpose</label>
            <input
              type="text"
              name="loanPurpose"
              value={lead.loanPurpose}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Business Expansion, Medical, Education"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input
              type="text"
              name="city"
              value={lead.city}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter city"
            />
          </div>

          {/* Pincode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={lead.pincode}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter pincode"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg shadow transition duration-200"
            >
              Submit Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateLead;

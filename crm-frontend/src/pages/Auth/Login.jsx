// src/pages/Public/Login.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>
        <p className="mb-4 text-gray-600">Select your login type:</p>

        <div className="space-y-4">
          <button
            onClick={() => navigate("/customer/login")}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Login as Customer
          </button>

          <button
            onClick={() => navigate("/employee/login")}
            className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Login as Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

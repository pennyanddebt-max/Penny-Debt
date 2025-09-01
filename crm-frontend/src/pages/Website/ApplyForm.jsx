import React, { useState } from "react";
import { motion } from "framer-motion";

const fontFamily = `'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`;
export default function DebtReliefEnrollment() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    totalDebt: "",
    city: "",
    pincode: "",
    message: "",
    loanType: "personal"
  });

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would use:
      // const res = await fetch("/api/debt-enroll/submit", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(form),
      // });
      // if (!res.ok) throw new Error("Submission failed");

      setSubmitted(true);
    } catch (error) {
      alert("Failed to submit. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Enrollment Successful!</h2>
          <p className="text-gray-600 mb-6">
            Our debt relief specialist will contact you within 24 hours to discuss your options.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg text-left">
            <h3 className="font-medium text-blue-800 mb-2">Next Steps:</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>Verification call from our team</li>
              <li>Document collection</li>
              <li>Custom debt relief plan</li>
            </ul>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full"
      >
  <div className="md:flex">
          {/* Left Side - Visuals */}
          <div className="md:w-2/5 bg-gradient-to-b from-blue-600 to-indigo-700 p-6 text-white hidden md:block">
            <motion.div 
              variants={itemVariants}
              className="flex flex-col h-full justify-center items-center"
            >
              <div>
                <h1 className="text-2xl font-bold mb-2">DebtFree Solutions</h1>
                <h2 className="text-xl font-semibold mb-3">Find Your Path to Financial Freedom</h2>
                <p className="text-blue-100 mb-6 text-sm text-center">
                  Our experts will analyze your debt situation and create a customized plan to help you regain control of your finances.
                </p>
              </div>
            </motion.div>
          </div>
          
          {/* Right Side - Form */}
          <div className="md:w-3/5 p-8 flex items-center justify-center">
            <motion.div variants={itemVariants} className="w-full max-w-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Debt Relief Enrollment</h2>
              <p className="text-gray-600 mb-6 text-center">Complete this form to begin your journey to financial freedom</p>
              <form onSubmit={handleSubmit} className="space-y-4 bg-white/90 border border-blue-100 rounded-2xl shadow-lg px-8 py-8">
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-blue-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition placeholder-gray-400"
                  placeholder="John Doe"
                />
              </motion.div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold text-blue-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="john@example.com"
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold text-blue-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="+91 9876543210"
                  />
                </motion.div>
              </div>
              
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-blue-700 mb-1">Total Debt Amount (₹)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">₹</span>
                  </div>
                  <input
                    type="number"
                    name="totalDebt"
                    value={form.totalDebt}
                    onChange={handleChange}
                    required
                    min="10000"
                    className="w-full pl-8 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="50,000"
                  />
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-blue-700 mb-1">Debt Type</label>
                <select
                  name="loanType"
                  value={form.loanType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
                >
                  <option value="personal">Personal Loan</option>
                  <option value="credit-card">Credit Card Debt</option>
                  <option value="medical">Medical Bills</option>
                  <option value="business">Business Debt</option>
                  <option value="other">Other</option>
                </select>
              </motion.div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold text-blue-700 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Mumbai"
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold text-blue-700 mb-1">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="400001"
                  />
                </motion.div>
              </div>
              
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-blue-700 mb-1">Additional Information (Optional)</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="Tell us more about your debt situation..."
                />
              </motion.div>
              
              <motion.div variants={itemVariants} className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                  style={{ letterSpacing: 1.1 }}
                >
                  {isLoading ? (
                    <span className="animate-pulse">Processing...</span>
                  ) : (
                    "Begin Debt Relief Process"
                  )}
                </button>
              </motion.div>
              
              <motion.div variants={itemVariants} className="text-center text-xs text-gray-400 mt-4">
                <p>By submitting, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a></p>
              </motion.div>
            </form>
          </motion.div>
        </div>
        </div>
      </motion.div>
    </div>
  );
}
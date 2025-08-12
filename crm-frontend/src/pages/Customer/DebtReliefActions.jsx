import React, { useState } from "react";
import axios from "axios";

const DebtReliefActions = () => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  // Replace with actual logged-in customer ID from auth context or localStorage
  const customerId = localStorage.getItem('customerId') || 1;
  const handlePay = async () => {
    try {
      const res = await axios.post(`http://localhost:5000/api/customer-workflow/actions/${customerId}/pay`, { amount });
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Payment failed");
    }
  };
  return (
    <div style={{ padding: 32, maxWidth: 900, margin: "0 auto" }}>
      <h1>Debt Relief Actions</h1>
      <div>
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Enter payment amount" />
        <button onClick={handlePay}>Make Payment</button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default DebtReliefActions;

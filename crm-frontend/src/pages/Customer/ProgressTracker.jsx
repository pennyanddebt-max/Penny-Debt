import React, { useEffect, useState } from "react";
import axios from "axios";

const ProgressTracker = () => {
  const [progress, setProgress] = useState([]);
  // Replace with actual logged-in customer ID from auth context or localStorage
  const customerId = localStorage.getItem('customerId') || 1;
  useEffect(() => {
    axios.get(`http://localhost:5000/api/customer-workflow/progress/${customerId}`)
      .then(res => setProgress(res.data.progress))
      .catch(() => {});
  }, [customerId]);
  return (
    <div style={{ padding: 32, maxWidth: 900, margin: "0 auto" }}>
      <h1>Debt Relief Progress Tracker</h1>
      <pre>{JSON.stringify(progress, null, 2)}</pre>
    </div>
  );
};

export default ProgressTracker;

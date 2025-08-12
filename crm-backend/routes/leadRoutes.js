const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/", (req, res) => {
  const {
    full_Name,
    email,
    phone,
    state,
    loanAmount,
    monthlyEMI,
    totalOutstanding,
    incomeSource,
    occupation,
    debtType,
    additionalNotes,
  } = req.body;

  const sql = `
    INSERT INTO leads (
      full_name, email, mobile, location,
      debt_amount, existing_emis, monthly_income,
      lead_status, created_at
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, 'new', CURRENT_TIMESTAMP)
  `;

  const values = [
    full_Name,
    email,
    phone,
    state,
    loanAmount,
    monthlyEMI,
    incomeSource,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("❌ Error inserting lead:", err.message);
      return res.status(500).json({ message: "Error saving lead", error: err.message });
    }
    res.status(200).json({ message: "✅ Lead saved successfully", leadId: result.insertId });
  });
});

// ✅ Don't forget to export the router
module.exports = router;

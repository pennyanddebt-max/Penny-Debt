const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Submit debt relief application
router.post("/submit", async (req, res) => {
  const {
    full_name,
    email,
    mobile,
    location,
    debt_amount,
    monthly_income,
    existing_emis,
    incomeSource,
    occupation,
    debtType,
    additionalNotes
  } = req.body;

  try {
    await db.promise().query(
      `INSERT INTO applications (
        full_name, email, mobile, location, debt_amount, monthly_income, existing_emis, incomeSource, occupation, debtType, additionalNotes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        full_name,
        email,
        mobile,
        location,
        debt_amount,
        monthly_income,
        existing_emis,
        incomeSource,
        occupation,
        debtType,
        additionalNotes
      ]
    );
    res.status(200).json({ message: "Application submitted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

module.exports = router;

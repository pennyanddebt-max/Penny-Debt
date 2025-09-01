const express = require("express");
const router = express.Router();
const db = require("../config/db");


const sendMail = require("../utils/sendMail");

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

    // Send notification email to care@pennyanddebt.in
    await sendMail({
      subject: "New Debt Relief Application Submitted",
      to: "care@pennyanddebt.in",
      text: `A new application has been submitted.\n\nName: ${full_name}\nEmail: ${email}\nMobile: ${mobile}\nLocation: ${location}\nDebt Amount: ${debt_amount}\nMonthly Income: ${monthly_income}\nExisting EMIs: ${existing_emis}\nIncome Source: ${incomeSource}\nOccupation: ${occupation}\nDebt Type: ${debtType}\nNotes: ${additionalNotes}`
    });

    res.status(200).json({ message: "Application submitted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

module.exports = router;

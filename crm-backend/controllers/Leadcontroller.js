const Lead = require("../models/Lead");

exports.submitLead = (req, res) => {
  const leadData = req.body;

  Lead.createLead(leadData, (err, results) => {
    if (err) {
      console.error("Error saving lead:", err);
      return res.status(500).json({ message: "Server error" });
    }
    res.status(201).json({ message: "Lead submitted successfully", leadId: results.insertId });
  });
};

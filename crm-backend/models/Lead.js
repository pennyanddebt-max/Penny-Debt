const db = require("../config/db");

const createLead = (leadData, callback) => {
  const { name, email, phone, loanAmount, message } = leadData;
  const query = `INSERT INTO leads (name, email, phone, loanAmount, message)
                 VALUES (?, ?, ?, ?, ?)`;
  db.query(query, [name, email, phone, loanAmount, message], callback);
};

module.exports = { createLead };

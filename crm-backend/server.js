// server.js
const express = require("express");
const cors = require("cors");
const app = express();
const customerRoutes = require("./routes/customerRoutes");
const customerWorkflowRoutes = require("./routes/customerWorkflowRoutes");
const customerAuthRoutes = require("./routes/customerAuthRoutes");
const employeeAuthRoutes = require("./routes/employeeAuthRoutes");

app.use(cors());
app.use(express.json());
const applyFormRoutes = require("./routes/applyFormRoutes");
app.use("/api/apply-form", applyFormRoutes);
app.use("/api/customer-auth", customerAuthRoutes);
app.use("/api/employee-auth", employeeAuthRoutes);



const loanApplicationRoutes = require('./routes/loanApplicationRoutes');
const careersRoutes = require('./routes/careersRoutes');
const contactRoutes = require('./routes/contactRoutes');
const staffDashboardRoutes = require('./routes/staffDashboardRoutes');


app.use("/api/loan-applications", loanApplicationRoutes);
app.use("/api/careers", careersRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/customer-workflow", customerWorkflowRoutes);
app.use('/api/staff', staffDashboardRoutes);


// Serve uploaded resumes statically
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

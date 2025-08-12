import React from "react";
import { Routes, Route, Link } from "react-router-dom";

// Website Pages
import Home from "./pages/Website/Home";
import About from "./pages/Website/About";
import ApplyForm from "./pages/Website/ApplyForm";
import Blog from "./pages/Website/Blog";
import Careers from "./pages/Website/Careers";
import Contact from "./pages/Website/Contact";
import FAQ from "./pages/Website/FAQ";
import PrivacyPolicy from "./pages/Website/PrivacyPolicy";
import Terms from "./pages/Website/Terms";
import Services from "./pages/Website/Services";
import Signup from "./pages/Website/Signup";

// Auth Pages (keep AuthLogin and AuthSignup if used)
import AuthLogin from "./pages/Auth/Login";
import CustomerLogin from "./pages/Auth/Login";
import EmployeeLogin from "./pages/Auth/EmployeeLogin";
import AuthSignup from "./pages/Auth/Signup";

// Shared Pages
import NotFound from "./pages/Shared/NotFound";
import Logout from "./pages/Shared/Logout";

// Customer Pages
import CustomerHome from "./pages/crm/Customer/CustomerHome";
import CustomerRegister from "./pages/crm/Customer/Register";
import CustomerProfile from "./pages/crm/Customer/Profile";
import CustomerDashboard from "./pages/crm/Customer/CustomerDashboard";
import CustomerSignup from "./pages/crm/Customer/CustomerSignup";
import CustomerForgotPassword from "./pages/crm/Customer/CustomerForgotPassword";
import CustomerDebts from "./pages/crm/Customer/Debts";
import CustomerDocuments from "./pages/crm/Customer/Documents";
import CustomerPayments from "./pages/crm/Customer/Payments";
import CustomerProgress from "./pages/crm/Customer/Progress";
import CustomerSupport from "./pages/crm/Customer/Support";

// Customer Dashboard Components
import CustomerDashboardMain from "./pages/Customer/CustomerDashboard";
import DebtReliefActions from "./pages/Customer/DebtReliefActions";
import ProgressTracker from "./pages/Customer/ProgressTracker";

// Employee Pages
import EmployeeHome from "./pages/crm/Employee/EmployeeHome";
import EmployeeForgotPassword from "./pages/crm/Employee/EmployeeForgotPassword";
import EmployeeDashboard from "./pages/crm/Employee/Dashboard";
import EmployeeAccounts from "./pages/crm/Employee/Accounts";
import EmployeeApplications from "./pages/crm/Employee/Applications";
import EmployeeCollections from "./pages/crm/Employee/Collections";
import EmployeeDocuments from "./pages/crm/Employee/Documents";
import EmployeeLeads from "./pages/crm/Employee/Leads";
import EmployeeReports from "./pages/crm/Employee/Reports";
import EmployeeSupport from "./pages/crm/Employee/Support";

// Dashboard Pages
import AdminDashboard from "./pages/crm/Dashboard/AdminDashboard";
import Dashboard from "./pages/crm/Dashboard/Dashboard";
import ManagerDashboard from "./pages/crm/Dashboard/ManagerDashboard";
import StaffDashboard from "./pages/crm/Dashboard/StaffDashboard";
import SupportDashboard from "./pages/crm/Dashboard/SupportDashboard";

// Admin Pages
// Note: Add admin imports when admin pages are created

// Manager Pages
import ManagerCases from "./pages/crm/Manager/Cases";
import ManagerDashboardPage from "./pages/crm/Manager/Dashboard";
import ManagerReports from "./pages/crm/Manager/Reports";
import ManagerTeam from "./pages/crm/Manager/Team";

// Finance Pages
import FinanceDashboard from "./pages/crm/Finance/FinanceDashboard";
import FinanceClients from "./pages/crm/Finance/Clients";
import FinanceLeads from "./pages/crm/Finance/Leads";
import FinanceReports from "./pages/crm/Finance/Reports";
import FinanceSettings from "./pages/crm/Finance/Settings";
import FinanceTasks from "./pages/crm/Finance/Tasks";

// HR Pages
import HRDashboard from "./pages/crm/HR/HRDashboard";
import HRClients from "./pages/crm/HR/Clients";
import HRLeads from "./pages/crm/HR/Leads";
import HRReports from "./pages/crm/HR/Reports";
import HRSettings from "./pages/crm/HR/Settings";
import HRTasks from "./pages/crm/HR/Tasks";

// Legal Pages
import LegalDashboard from "./pages/crm/Legal/LegalDashboard";
import LegalClients from "./pages/crm/Legal/Clients";
import LegalLeads from "./pages/crm/Legal/Leads";
import LegalReports from "./pages/crm/Legal/Reports";
import LegalSettings from "./pages/crm/Legal/Settings";
import LegalTasks from "./pages/crm/Legal/Tasks";

// Operations Pages
import OperationsDashboard from "./pages/crm/Operations/OperationsDashboard";
import OperationsClients from "./pages/crm/Operations/Clients";
import OperationsLeads from "./pages/crm/Operations/Leads";
import OperationsReports from "./pages/crm/Operations/Reports";
import OperationsSettings from "./pages/crm/Operations/Settings";
import OperationsTasks from "./pages/crm/Operations/Tasks";
import DocumentVerification from "./pages/crm/Operations/DocumentVerification";
import FieldInvestigation from "./pages/crm/Operations/FieldInvestigation";

// Credit Pages
import CreditDashboard from "./pages/crm/Credit/CreditDashboard";
import CreditClients from "./pages/crm/Credit/Clients";
import CreditLeads from "./pages/crm/Credit/Leads";
import CreditReports from "./pages/crm/Credit/Reports";
import CreditSettings from "./pages/crm/Credit/Settings";
import CreditTasks from "./pages/crm/Credit/Tasks";
import BankStatementAnalysis from "./pages/crm/Credit/BankStatementAnalysis";
import CIBILCheck from "./pages/crm/Credit/CIBILCheck";

// Recovery Pages
import RecoveryDashboard from "./pages/crm/Recovery/RecoveryDashboard";
import RecoveryClients from "./pages/crm/Recovery/Clients";
import RecoveryLeads from "./pages/crm/Recovery/Leads";
import RecoveryReports from "./pages/crm/Recovery/Reports";
import RecoverySettings from "./pages/crm/Recovery/Settings";
import RecoveryTasks from "./pages/crm/Recovery/Tasks";

// Support Pages
import SupportDashboardPage from "./pages/crm/Support/SupportDashboard";
import SupportClients from "./pages/crm/Support/Clients";
import SupportLeads from "./pages/crm/Support/Leads";
import SupportReports from "./pages/crm/Support/Reports";
import SupportSettings from "./pages/crm/Support/Settings";
import SupportTasks from "./pages/crm/Support/Tasks";

// TeamLead Pages
import TeamLeadDashboard from "./pages/crm/TeamLead/TeamLeadDashboard";
import TeamLeadClients from "./pages/crm/TeamLead/Clients";
import TeamLeadLeads from "./pages/crm/TeamLead/Leads";
import TeamLeadReports from "./pages/crm/TeamLead/Reports";
import TeamLeadSettings from "./pages/crm/TeamLead/Settings";
import TeamLeadTasks from "./pages/crm/TeamLead/Tasks";

// Tech Pages
import TechDashboard from "./pages/crm/Tech/TechDashboard";
import TechClients from "./pages/crm/Tech/Clients";
import TechLeads from "./pages/crm/Tech/Leads";
import TechReports from "./pages/crm/Tech/Reports";
import TechSettings from "./pages/crm/Tech/Settings";
import TechTasks from "./pages/crm/Tech/Tasks";

// Verifier Pages
import VerifierDashboard from "./pages/crm/Verifier/VerifierDashboard";
import VerifierClients from "./pages/crm/Verifier/Clients";
import VerifierLeads from "./pages/crm/Verifier/Leads";
import VerifierReports from "./pages/crm/Verifier/Reports";
import VerifierSettings from "./pages/crm/Verifier/Settings";
import VerifierTasks from "./pages/crm/Verifier/Tasks";

// CTO Pages
import CTODashboard from "./pages/crm/CTO/CTODashboard";
import CTOClients from "./pages/crm/CTO/Clients";
import CTOLeads from "./pages/crm/CTO/Leads";
import CTOReports from "./pages/crm/CTO/Reports";
import CTOSettings from "./pages/crm/CTO/Settings";
import CTOTasks from "./pages/crm/CTO/Tasks";

// Counsellor Pages
import CounsellorDashboard from "./pages/crm/Counsellor/CounsellorDashboard";
import CounsellorClients from "./pages/crm/Counsellor/Clients";
import CounsellorLeads from "./pages/crm/Counsellor/Leads";
import CounsellorReports from "./pages/crm/Counsellor/Reports";
import CounsellorSettings from "./pages/crm/Counsellor/Settings";
import CounsellorTasks from "./pages/crm/Counsellor/Tasks";

// Leads Pages
import CreateLead from "./pages/crm/Leads/CreateLead";
import LeadDetails from "./pages/crm/Leads/LeadDetails";
import LeadsList from "./pages/crm/Leads/LeadsList";
import LeadForm from "./pages/crm/Lead/LeadForm";

// Reports Pages
import CollectionReport from "./pages/crm/Reports/CollectionReport";
import PerformanceReport from "./pages/crm/Reports/PerformanceReport";

// Disbursement Pages
import DisbursementDashboard from "./pages/crm/Disbursement/Dashboard";
import ApprovedLoans from "./pages/crm/Disbursement/ApprovedLoans";
import DisbursementTracker from "./pages/crm/Disbursement/DisbursementTracker";

// LoanInsight Pages
import LoanDetails from "./pages/crm/LoanInsight/LoanDetails";
import LoanStatus from "./pages/crm/LoanInsight/LoanStatus";

// Notification Pages
import NotificationList from "./pages/crm/Notification/NotificationList";

// Payment Pages
import Subscription from "./pages/crm/Payment/Subscription";

// Shared CRM Pages
import SharedDashboard from "./pages/crm/Shared/SharedDashboard";
import SharedClients from "./pages/crm/Shared/Clients";
import SharedLeads from "./pages/crm/Shared/Leads";
import SharedReports from "./pages/crm/Shared/Reports";
import SharedSettings from "./pages/crm/Shared/Settings";
import SharedTasks from "./pages/crm/Shared/Tasks";
import CRMLogout from "./pages/crm/Shared/Logout";
import CRMNotFound from "./pages/crm/Shared/NotFound";

const fontFamily = `'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`;

import Header from "./components/Header";

// Footer
const Footer = () => (
  <footer
    style={{
      backgroundColor: "#0070f3",
      color: "white",
      padding: "40px 20px",
      fontFamily,
      display: "flex",
      justifyContent: "space-around",
      flexWrap: "wrap",
      gap: 28,
      userSelect: "none",
    }}
  >
    <div style={{ maxWidth: 280, minWidth: 200 }}>
      <h3 style={{ marginBottom: 16, fontSize: 22 }}>Penny & Debt</h3>
      <p style={{ fontSize: 14, lineHeight: 1.5 }}>
        Your trusted partner in debt settlement and loan solutions.
      </p>
    </div>
    <div style={{ minWidth: 200 }}>
      <h4 style={{ fontSize: 18, marginBottom: 14 }}>Contact</h4>
      <p>Email: support@pennyanddebt.com</p>
      <p>Phone: +1 (800) 123-4567</p>
    </div>
    <div style={{ minWidth: 160 }}>
      <h4 style={{ fontSize: 18, marginBottom: 14 }}>Legal</h4>
      <Link
        to="/terms"
        style={{ color: "white", textDecoration: "underline", fontSize: 14 }}
      >
        Terms & Conditions
      </Link>
      <br />
      <Link
        to="/privacypolicy"
        style={{ color: "white", textDecoration: "underline", fontSize: 14 }}
      >
        Privacy Policy
      </Link>
    </div>
    <div style={{ minWidth: 160 }}>
      <h4 style={{ fontSize: 18, marginBottom: 14 }}>Follow Us</h4>
      <div style={{ display: "flex", gap: 16 }}>
        <a
          href="https://twitter.com/pennyanddebt"
          style={{
            color: "white",
            fontWeight: "700",
            fontSize: 18,
            textDecoration: "none",
            userSelect: "none",
          }}
          aria-label="Twitter"
          target="_blank"
          rel="noopener noreferrer"
        >
          🐦
        </a>
        <a
          href="https://facebook.com/pennyanddebt"
          style={{
            color: "white",
            fontWeight: "700",
            fontSize: 18,
            textDecoration: "none",
            userSelect: "none",
          }}
          aria-label="Facebook"
          target="_blank"
          rel="noopener noreferrer"
        >
          📘
        </a>
      </div>
    </div>
  </footer>
);

// App without BrowserRouter
export default function App() {
  return (
    <>
      <Header />
      <main
        style={{
          minHeight: "80vh",
          maxWidth: 1280,
          margin: "0 auto",
          padding: "16px 24px",
          fontFamily,
          color: "#2c3e50",
        }}
      >
        <Routes>
          {/* Website Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/applyform" element={<ApplyForm />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/services" element={<Services />} />
          <Route path="/signup" element={<Signup />} />

          {/* Auth Routes */}
          <Route path="/auth/login" element={<AuthLogin />} />
          <Route path="/auth/customer/login" element={<CustomerLogin />} />
          <Route path="/auth/employee/login" element={<EmployeeLogin />} />
          <Route path="/auth/signup" element={<AuthSignup />} />

          {/* Customer Routes */}
          <Route path="/customer" element={<CustomerHome />} />
          <Route path="/customer/register" element={<CustomerRegister />} />
          <Route path="/customer/profile" element={<CustomerProfile />} />
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/customer/signup" element={<CustomerSignup />} />
          <Route path="/customer/forgot-password" element={<CustomerForgotPassword />} />
          <Route path="/customer/debts" element={<CustomerDebts />} />
          <Route path="/customer/documents" element={<CustomerDocuments />} />
          <Route path="/customer/payments" element={<CustomerPayments />} />
          <Route path="/customer/progress" element={<CustomerProgress />} />
          <Route path="/customer/support" element={<CustomerSupport />} />

          {/* Customer Dashboard Components */}
          <Route path="/customer/dashboard-main" element={<CustomerDashboardMain />} />
          <Route path="/customer/debt-relief-actions" element={<DebtReliefActions />} />
          <Route path="/customer/progress-tracker" element={<ProgressTracker />} />

          {/* Employee Routes */}
          <Route path="/employee" element={<EmployeeHome />} />
          <Route path="/employee/forgot-password" element={<EmployeeForgotPassword />} />
          <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
          <Route path="/employee/accounts" element={<EmployeeAccounts />} />
          <Route path="/employee/applications" element={<EmployeeApplications />} />
          <Route path="/employee/collections" element={<EmployeeCollections />} />
          <Route path="/employee/documents" element={<EmployeeDocuments />} />
          <Route path="/employee/leads" element={<EmployeeLeads />} />
          <Route path="/employee/reports" element={<EmployeeReports />} />
          <Route path="/employee/support" element={<EmployeeSupport />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/manager" element={<ManagerDashboard />} />
          <Route path="/dashboard/staff" element={<StaffDashboard />} />
          <Route path="/dashboard/support" element={<SupportDashboard />} />

          {/* Manager Routes */}
          <Route path="/manager/dashboard" element={<ManagerDashboardPage />} />
          <Route path="/manager/cases" element={<ManagerCases />} />
          <Route path="/manager/reports" element={<ManagerReports />} />
          <Route path="/manager/team" element={<ManagerTeam />} />

          {/* Finance Routes */}
          <Route path="/finance/dashboard" element={<FinanceDashboard />} />
          <Route path="/finance/clients" element={<FinanceClients />} />
          <Route path="/finance/leads" element={<FinanceLeads />} />
          <Route path="/finance/reports" element={<FinanceReports />} />
          <Route path="/finance/settings" element={<FinanceSettings />} />
          <Route path="/finance/tasks" element={<FinanceTasks />} />

          {/* HR Routes */}
          <Route path="/hr/dashboard" element={<HRDashboard />} />
          <Route path="/hr/clients" element={<HRClients />} />
          <Route path="/hr/leads" element={<HRLeads />} />
          <Route path="/hr/reports" element={<HRReports />} />
          <Route path="/hr/settings" element={<HRSettings />} />
          <Route path="/hr/tasks" element={<HRTasks />} />

          {/* Legal Routes */}
          <Route path="/legal/dashboard" element={<LegalDashboard />} />
          <Route path="/legal/clients" element={<LegalClients />} />
          <Route path="/legal/leads" element={<LegalLeads />} />
          <Route path="/legal/reports" element={<LegalReports />} />
          <Route path="/legal/settings" element={<LegalSettings />} />
          <Route path="/legal/tasks" element={<LegalTasks />} />

          {/* Operations Routes */}
          <Route path="/operations/dashboard" element={<OperationsDashboard />} />
          <Route path="/operations/clients" element={<OperationsClients />} />
          <Route path="/operations/leads" element={<OperationsLeads />} />
          <Route path="/operations/reports" element={<OperationsReports />} />
          <Route path="/operations/settings" element={<OperationsSettings />} />
          <Route path="/operations/tasks" element={<OperationsTasks />} />
          <Route path="/operations/document-verification" element={<DocumentVerification />} />
          <Route path="/operations/field-investigation" element={<FieldInvestigation />} />

          {/* Credit Routes */}
          <Route path="/credit/dashboard" element={<CreditDashboard />} />
          <Route path="/credit/clients" element={<CreditClients />} />
          <Route path="/credit/leads" element={<CreditLeads />} />
          <Route path="/credit/reports" element={<CreditReports />} />
          <Route path="/credit/settings" element={<CreditSettings />} />
          <Route path="/credit/tasks" element={<CreditTasks />} />
          <Route path="/credit/bank-statement-analysis" element={<BankStatementAnalysis />} />
          <Route path="/credit/cibil-check" element={<CIBILCheck />} />

          {/* Recovery Routes */}
          <Route path="/recovery/dashboard" element={<RecoveryDashboard />} />
          <Route path="/recovery/clients" element={<RecoveryClients />} />
          <Route path="/recovery/leads" element={<RecoveryLeads />} />
          <Route path="/recovery/reports" element={<RecoveryReports />} />
          <Route path="/recovery/settings" element={<RecoverySettings />} />
          <Route path="/recovery/tasks" element={<RecoveryTasks />} />

          {/* Support Routes */}
          <Route path="/support/dashboard" element={<SupportDashboardPage />} />
          <Route path="/support/clients" element={<SupportClients />} />
          <Route path="/support/leads" element={<SupportLeads />} />
          <Route path="/support/reports" element={<SupportReports />} />
          <Route path="/support/settings" element={<SupportSettings />} />
          <Route path="/support/tasks" element={<SupportTasks />} />

          {/* TeamLead Routes */}
          <Route path="/teamlead/dashboard" element={<TeamLeadDashboard />} />
          <Route path="/teamlead/clients" element={<TeamLeadClients />} />
          <Route path="/teamlead/leads" element={<TeamLeadLeads />} />
          <Route path="/teamlead/reports" element={<TeamLeadReports />} />
          <Route path="/teamlead/settings" element={<TeamLeadSettings />} />
          <Route path="/teamlead/tasks" element={<TeamLeadTasks />} />

          {/* Tech Routes */}
          <Route path="/tech/dashboard" element={<TechDashboard />} />
          <Route path="/tech/clients" element={<TechClients />} />
          <Route path="/tech/leads" element={<TechLeads />} />
          <Route path="/tech/reports" element={<TechReports />} />
          <Route path="/tech/settings" element={<TechSettings />} />
          <Route path="/tech/tasks" element={<TechTasks />} />

          {/* Verifier Routes */}
          <Route path="/verifier/dashboard" element={<VerifierDashboard />} />
          <Route path="/verifier/clients" element={<VerifierClients />} />
          <Route path="/verifier/leads" element={<VerifierLeads />} />
          <Route path="/verifier/reports" element={<VerifierReports />} />
          <Route path="/verifier/settings" element={<VerifierSettings />} />
          <Route path="/verifier/tasks" element={<VerifierTasks />} />

          {/* CTO Routes */}
          <Route path="/cto/dashboard" element={<CTODashboard />} />
          <Route path="/cto/clients" element={<CTOClients />} />
          <Route path="/cto/leads" element={<CTOLeads />} />
          <Route path="/cto/reports" element={<CTOReports />} />
          <Route path="/cto/settings" element={<CTOSettings />} />
          <Route path="/cto/tasks" element={<CTOTasks />} />

          {/* Counsellor Routes */}
          <Route path="/counsellor/dashboard" element={<CounsellorDashboard />} />
          <Route path="/counsellor/clients" element={<CounsellorClients />} />
          <Route path="/counsellor/leads" element={<CounsellorLeads />} />
          <Route path="/counsellor/reports" element={<CounsellorReports />} />
          <Route path="/counsellor/settings" element={<CounsellorSettings />} />
          <Route path="/counsellor/tasks" element={<CounsellorTasks />} />

          {/* Leads Routes */}
          <Route path="/leads" element={<LeadsList />} />
          <Route path="/leads/create" element={<CreateLead />} />
          <Route path="/leads/:id" element={<LeadDetails />} />
          <Route path="/lead/form" element={<LeadForm />} />

          {/* Reports Routes */}
          <Route path="/reports/collection" element={<CollectionReport />} />
          <Route path="/reports/performance" element={<PerformanceReport />} />

          {/* Disbursement Routes */}
          <Route path="/disbursement/dashboard" element={<DisbursementDashboard />} />
          <Route path="/disbursement/approved-loans" element={<ApprovedLoans />} />
          <Route path="/disbursement/tracker" element={<DisbursementTracker />} />

          {/* LoanInsight Routes */}
          <Route path="/loan-insight/details" element={<LoanDetails />} />
          <Route path="/loan-insight/status" element={<LoanStatus />} />

          {/* Notification Routes */}
          <Route path="/notifications" element={<NotificationList />} />

          {/* Payment Routes */}
          <Route path="/payment/subscription" element={<Subscription />} />

          {/* Shared CRM Routes */}
          <Route path="/shared/dashboard" element={<SharedDashboard />} />
          <Route path="/shared/clients" element={<SharedClients />} />
          <Route path="/shared/leads" element={<SharedLeads />} />
          <Route path="/shared/reports" element={<SharedReports />} />
          <Route path="/shared/settings" element={<SharedSettings />} />
          <Route path="/shared/tasks" element={<SharedTasks />} />

          {/* Utility Routes */}
          <Route path="/logout" element={<Logout />} />
          <Route path="/crm/logout" element={<CRMLogout />} />

          {/* 404 and Fallback Routes */}
          <Route path="/404" element={<NotFound />} />
          <Route path="/crm/404" element={<CRMNotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
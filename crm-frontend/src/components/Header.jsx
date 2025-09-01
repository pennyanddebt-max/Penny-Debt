import React, { useState } from "react";
import { Link } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
  { label: "FAQ", to: "/faq" },
  { label: "Blog", to: "/blog" },
  { label: "Apply", to: "/applyform" },
  { label: "Apply Loan", to: "/applyloan" },
];

export default function Header() {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <header style={{ position: "relative", zIndex: 100, background: "#fff", boxShadow: "0 2px 10px rgba(0, 112, 243, 0.08)", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <Link to="/" style={{ fontWeight: "900", fontSize: "1.2rem", color: "#0070f3", textDecoration: "none", letterSpacing: "0.08em", whiteSpace: "nowrap", userSelect: "none" }}>PENNY & DEBT</Link>
      <nav style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "nowrap", fontWeight: "600", fontSize: 14, color: "#223759", flexGrow: 1, marginLeft: 20, userSelect: "none" }}>
        {navItems.map(({ label, to }) => (
          <Link
            key={to}
            to={to}
            style={{ color: "#223759", textDecoration: "none", padding: "8px 10px", borderRadius: 6, whiteSpace: "nowrap", transition: "background-color 0.25s ease, color 0.25s ease" }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#0070f3"; e.currentTarget.style.color = "white"; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#223759"; }}
          >
            {label}
          </Link>
        ))}
        <div style={{ marginLeft: "auto", position: "relative", userSelect: "none" }}>
          <button
            onClick={() => setLoginOpen(o => !o)}
            aria-haspopup="true"
            aria-expanded={loginOpen}
            aria-controls="login-dropdown"
            style={{ backgroundColor: "transparent", border: "2px solid #0070f3", borderRadius: 8, cursor: "pointer", color: "#0070f3", fontWeight: "700", padding: "8px 16px", fontSize: 14, display: "flex", alignItems: "center", gap: 6, userSelect: "none", whiteSpace: "nowrap", transition: "all 0.3s ease" }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#0070f3"; e.currentTarget.style.color = "white"; }}
            onMouseLeave={e => { if (!loginOpen) { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#0070f3"; } }}
          >
            Login
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: loginOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {loginOpen && (
            <ul id="login-dropdown" role="menu" aria-label="Login options" style={{ listStyle: "none", margin: 0, padding: "10px 0", position: "absolute", top: "calc(100% + 8px)", right: 0, backgroundColor: "#fff", boxShadow: "0 8px 24px rgba(0,0,0,0.15)", borderRadius: 10, minWidth: 200, fontWeight: "600", fontSize: 14, zIndex: 25, border: "1px solid #e2ecff" }}>
              <li role="none"><Link to="/customer-login" role="menuitem" tabIndex={0} style={{ display: "block", padding: "12px 20px", color: "#0070f3", textDecoration: "none", userSelect: "none", transition: "background-color 0.15s ease", borderRadius: "6px", margin: "2px 8px" }} onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#e2ecff")} onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}>Customer Login</Link></li>
              <li role="none"><Link to="/employee-login" role="menuitem" tabIndex={0} style={{ display: "block", padding: "12px 20px", color: "#0070f3", textDecoration: "none", userSelect: "none", transition: "background-color 0.15s ease", borderRadius: "6px", margin: "2px 8px" }} onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#e2ecff")} onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}>Employee Login</Link></li>
              <li role="none"><Link to="/signup" role="menuitem" tabIndex={0} style={{ display: "block", padding: "12px 20px", color: "#0070f3", textDecoration: "none", userSelect: "none", transition: "background-color 0.15s ease", borderRadius: "6px", margin: "2px 8px" }} onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#e2ecff")} onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}>Sign Up</Link></li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
}

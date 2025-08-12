import React from "react";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#0070f3",
        color: "white",
        padding: "40px 20px",
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        gap: "40px",
      }}
    >
      <div style={{ flex: "1 1 250px", minWidth: "200px" }}>
        <h3>Penny & Debt</h3>
        <p>
          Helping you manage your debt and take back control of your finances.
        </p>
      </div>

      <div style={{ flex: "1 1 200px", minWidth: "180px" }}>
        <h4>Contact</h4>
        <address style={{ lineHeight: "1.6" }}>
          <div>Email: <a href="mailto:care@pennyanddebt.in" style={{ color: "white" }}>care@pennyanddebt.in</a></div>
          <div>Phone: <a href="tel:+917814447895" style={{ color: "white" }}>+91 7814447895</a></div>
        </address>
      </div>

      <div style={{ flex: "1 1 150px", minWidth: "150px" }}>
        <h4>Legal</h4>
        <p>
          <a href="/terms" style={{ color: "white", textDecoration: "underline" }}>
            Terms & Conditions
          </a>
          <br />
          <a href="/privacy-policy" style={{ color: "white", textDecoration: "underline" }}>
            Privacy Policy
          </a>
        </p>
      </div>

      <div style={{ flex: "1 1 150px", minWidth: "150px" }}>
        <h4>Follow Us</h4>
        <p>
          <a href="https://twitter.com/pennyanddebt" style={{ color: "white" }}>
            Twitter
          </a>
          <br />
          <a href="https://facebook.com/pennyanddebt" style={{ color: "white" }}>
            Facebook
          </a>
        </p>
      </div>
    </footer>
  );
}

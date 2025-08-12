import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmployeeLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    captchaInput: "",
  });
  const [captcha, setCaptcha] = useState("");
  const [captchaValid, setCaptchaValid] = useState(null);
  const [formError, setFormError] = useState("");
  const captchaCanvas = useRef(null);

  // Generate Captcha
  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPRSTUVWXYZ23456789";
    let text = "";
    for (let i = 0; i < 6; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(text);
  };

  // Draw Captcha with distortion
  const drawCaptcha = () => {
    if (!captchaCanvas.current) return;
    const ctx = captchaCanvas.current.getContext("2d");
    const width = 150;
    const height = 50;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#f5faff";
    ctx.fillRect(0, 0, width, height);
    // Noise lines
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = "#B7D6FF";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(Math.random() * width, Math.random() * height);
      ctx.lineTo(Math.random() * width, Math.random() * height);
      ctx.stroke();
    }
    // Text
    ctx.font = "28px Segoe UI";
    ctx.fillStyle = "#0070f3";
    ctx.textBaseline = "middle";
    for (let i = 0; i < captcha.length; i++) {
      const char = captcha[i];
      const x = 20 + i * 22;
      const y = height / 2;
      const angle = (Math.random() - 0.5) * 0.4;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillText(char, 0, 0);
      ctx.restore();
    }
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    drawCaptcha();
  }, [captcha]);

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
    if (e.target.name === "captchaInput") {
      setCaptchaValid(null);
      setFormError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate captcha
    if (
      formData.captchaInput.trim().toUpperCase() !== captcha.toUpperCase()
    ) {
      setCaptchaValid(false);
      setFormError("Captcha does not match. Please try again.");
      generateCaptcha();
      setFormData((p) => ({ ...p, captchaInput: "" }));
      return;
    }

    setCaptchaValid(true);
    setFormError("");

    try {
      const response = await axios.post("http://localhost:5000/api/employee-auth/login", {
        identifier: formData.identifier,
        password: formData.password
      });
      
      // Save token and user info to localStorage
      localStorage.setItem("employeeToken", response.data.token);
      localStorage.setItem("employeeUser", JSON.stringify(response.data.user));
      
      alert(response.data.message || "Login successful");
      
      // Navigate to employee dashboard
      navigate("/employee/dashboard");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed. Please check your credentials.";
      setFormError(errorMessage);
      console.error("Employee login error:", err);
    }

    // Reset form
    setFormData({
      identifier: "",
      password: "",
      captchaInput: "",
    });
    generateCaptcha();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
        background:
          "linear-gradient(135deg, #0070f3 0%, #005bb5 50%, #0070f3 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
      aria-label="Employee Login Page"
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: 16,
          boxShadow: "0 8px 20px rgba(0,112,243,0.15)",
          width: "100%",
          maxWidth: 420,
          padding: 36,
          boxSizing: "border-box",
          color: "#333",
        }}
      >
        <h2
          style={{
            marginBottom: 28,
            fontSize: 28,
            fontWeight: "800",
            color: "#0070f3",
            textAlign: "center",
          }}
        >
          Employee Login
        </h2>

        <form onSubmit={handleSubmit} noValidate>
          <label
            htmlFor="identifier"
            style={{ display: "block", marginBottom: 6, fontWeight: 600 }}
          >
            Employee ID or Email
          </label>
          <input
            type="text"
            id="identifier"
            name="identifier"
            value={formData.identifier}
            onChange={handleChange}
            placeholder="Enter your employee ID or email"
            required
            style={{
              width: "100%",
              padding: "12px 14px",
              fontSize: 16,
              borderRadius: 10,
              border: "1.8px solid #cbd5e1",
              marginBottom: 20,
              boxSizing: "border-box",
              outline: "none",
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#0070f3")}
            onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
          />

          <label
            htmlFor="password"
            style={{ display: "block", marginBottom: 6, fontWeight: 600 }}
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            style={{
              width: "100%",
              padding: "12px 14px",
              fontSize: 16,
              borderRadius: 10,
              border: "1.8px solid #cbd5e1",
              marginBottom: 20,
              boxSizing: "border-box",
              outline: "none",
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#0070f3")}
            onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
          />

          <label
            htmlFor="captchaInput"
            style={{ display: "block", marginBottom: 6, fontWeight: 600 }}
          >
            Enter Captcha
          </label>
          <canvas
            ref={captchaCanvas}
            width={150}
            height={50}
            aria-label="Captcha image"
            style={{
              borderRadius: 10,
              border: "1.8px solid #cbd5e1",
              marginBottom: 12,
              width: "100%",
              maxWidth: 150,
              display: "block",
            }}
          ></canvas>
          <input
            id="captchaInput"
            name="captchaInput"
            type="text"
            value={formData.captchaInput}
            onChange={handleChange}
            placeholder="Enter the characters above"
            required
            style={{
              width: "100%",
              padding: "12px 14px",
              fontSize: 16,
              borderRadius: 10,
              border: captchaValid === false ? "2px solid #f56565" : "1.8px solid #cbd5e1",
              marginBottom: formError ? 12 : 28,
              boxSizing: "border-box",
              outline: "none",
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) =>
              (e.target.style.borderColor =
                captchaValid === false ? "#f56565" : "#0070f3")
            }
            onBlur={(e) =>
              (e.target.style.borderColor =
                captchaValid === false ? "#f56565" : "#cbd5e1")
            }
          />
          {formError && (
            <p
              style={{
                color: "#f56565",
                marginBottom: 20,
                fontWeight: "600",
                fontSize: 14,
              }}
              role="alert"
            >
              {formError}
            </p>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px 0",
              backgroundColor: "#0070f3",
              color: "white",
              fontWeight: "700",
              fontSize: 18,
              borderRadius: 30,
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
              boxShadow: "0 6px 14px rgba(0,112,243,0.4)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#005bb5")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#0070f3")
            }
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeLogin;
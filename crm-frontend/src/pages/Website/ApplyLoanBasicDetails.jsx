import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * ApplyLoanBasicDetails.jsx — Enhanced Dynamic Form (~500 lines)
 * ----------------------------------------------------------------
 * Feature highlights:
 * - Prefills product from query (?product=Home%20Loan)
 * - Multi-step UX with visual progress and keyboard navigation
 * - Client-side validations (email, phone, amount ranges)
 * - Input helpers (amount formatter, phone mask, name casing)
 * - Live EMI preview (based on amount, rate slider, tenure slider)
 * - Purpose presets + custom purpose field
 * - Consent checkbox + privacy statement + terms modal
 * - OTP mock flow with timer to simulate verification
 * - Save & Resume with localStorage
 * - Basic anti-spam honeypot and submit debounce
 * - Accessible labels, roles, aria-invalid, aria-live regions
 * - Success screen with summary and next steps CTA
 * - Structured data (JSON-LD) for the form page
 * - Clean, modern inline styles (no external deps)
 */

const fontFamily = `'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`;
const LS_KEY = "applyLoanBasicDetails_v1";

// ----------------------------- Utilities ----------------------------- //
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const rupee = (n) => new Intl.NumberFormat("en-IN").format(Math.round(n || 0));
const isEmail = (v) => /.+@.+\..+/.test(v);
const isPhone = (v) => /^(\+91\s?)?[6-9]\d{9}$/.test(v.replace(/\s|-/g, ""));
const titleCase = (s) => s.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());

function useDebouncedCallback(cb, delay) {
  const ref = useRef();
  useEffect(() => { ref.current = cb; });
  return useMemo(() => {
    let t; return (...args) => { clearTimeout(t); t = setTimeout(() => ref.current?.(...args), delay); };
  }, [delay]);
}

// EMI math (rate annual %, tenure months)
function calcEMI({ amount, rate, tenure }) {
  const r = rate / 12 / 100; // monthly decimal
  const n = tenure; const P = amount;
  if (!P || !r || !n) return { emi: 0, total: 0, interest: 0 };
  const pow = Math.pow(1 + r, n);
  const emi = (P * r * pow) / (pow - 1);
  const total = emi * n;
  const interest = total - P;
  return { emi, total, interest };
}

// ----------------------------- Components ----------------------------- //
const Field = ({ label, error, children, hint, required, htmlFor }) => (
  <div style={{ display: "grid", gap: 6 }}>
    {label && (
      <label htmlFor={htmlFor} style={{ fontWeight: 700, color: "#0f172a" }}>
        {label} {required && <span aria-hidden style={{ color: "#ef4444" }}>*</span>}
      </label>
    )}
    {children}
    {hint && <div style={{ fontSize: 12, color: "#64748b" }}>{hint}</div>}
    {!!error && (
      <div role="alert" style={{ fontSize: 12, color: "#ef4444" }}>
        {error}
      </div>
    )}
  </div>
);

const Input = ({ id, ...rest }) => (
  <input
    id={id}
    {...rest}
    style={{
      padding: 12,
      borderRadius: 10,
      border: "1.5px solid #e2ecff",
      fontSize: 15,
      fontWeight: 500,
      background: "#f5faff",
      outline: "none",
    }}
  />
);

const Select = ({ id, children, ...rest }) => (
  <select
    id={id}
    {...rest}
    style={{
      padding: 12,
      borderRadius: 10,
      border: "1.5px solid #e2ecff",
      fontSize: 15,
      fontWeight: 600,
      background: "#f5faff",
      outline: "none",
    }}
  >
    {children}
  </select>
);

const Button = ({ children, variant = "primary", ...rest }) => {
  const base = {
    border: "none",
    borderRadius: 10,
    padding: "12px 16px",
    fontSize: 16,
    fontWeight: 800,
    cursor: "pointer",
    transition: "transform 0.15s ease, box-shadow 0.2s ease",
    boxShadow: "0 8px 16px rgba(0,112,243,0.10)",
  };
  const styles = {
    primary: { background: "linear-gradient(90deg, #0070f3 0%, #6228d7 100%)", color: "#fff" },
    ghost: { background: "transparent", color: "#1e293b", border: "1px solid #cbd5e1", boxShadow: "none" },
    accent: { background: "linear-gradient(90deg, #22c55e 0%, #16a34a 100%)", color: "#fff" },
  };
  return (
    <button
      {...rest}
      style={{ ...base, ...styles[variant] }}
      onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.98)"}
      onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
    >
      {children}
    </button>
  );
};

const Progress = ({ step, total }) => {
  const pct = (step / total) * 100;
  return (
    <div aria-label={`Step ${step} of ${total}`} role="progressbar" aria-valuemin={1} aria-valuemax={total} aria-valuenow={step}>
      <div style={{ height: 8, background: "#e2e8f0", borderRadius: 999 }}>
        <div style={{ width: `${pct}%`, height: 8, background: "linear-gradient(90deg, #38bdf8 0%, #6366f1 100%)", borderRadius: 999, transition: "width 250ms ease" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#475569", marginTop: 6 }}>
        <span>Step {step}</span>
        <span>{Math.round(pct)}%</span>
      </div>
    </div>
  );
};

const InlinePill = ({ children, tone = "blue" }) => {
  const tones = {
    blue: { bg: "#eff6ff", color: "#1d4ed8" },
    amber: { bg: "#fffbeb", color: "#92400e" },
    green: { bg: "#ecfdf5", color: "#047857" },
  };
  const t = tones[tone] || tones.blue;
  return (
    <span style={{ background: t.bg, color: t.color, fontWeight: 700, fontSize: 12, padding: "4px 8px", borderRadius: 999 }}>
      {children}
    </span>
  );
};

const TermsModal = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label="Terms and Conditions" style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.5)", display: "grid", placeItems: "center", zIndex: 60 }}>
      <div style={{ background: "#fff", maxWidth: 680, width: "92%", borderRadius: 16, boxShadow: "0 20px 60px rgba(0,0,0,0.25)", padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <h3 style={{ fontSize: 18, fontWeight: 900, color: "#0f172a" }}>Terms & Privacy</h3>
          <button onClick={onClose} aria-label="Close" style={{ border: 0, background: "transparent", fontSize: 22, cursor: "pointer" }}>×</button>
        </div>
        <div style={{ color: "#334155", fontSize: 14, lineHeight: 1.6, maxHeight: 300, overflow: "auto" }}>
          <p>
            By submitting this form, you authorize our team and partner lenders to contact you via phone, SMS, email, or WhatsApp for application processing. Your data is processed in accordance with applicable laws. We do not sell your personal information.
          </p>
          <ul>
            <li>We collect only what is necessary to evaluate eligibility.</li>
            <li>We may share your details securely with select lenders relevant to your case.</li>
            <li>You may request data access/correction by contacting support.</li>
          </ul>
          <p>
            This page does not constitute a loan offer. Sanction/disbursal is at the sole discretion of the lender. Rates and fees are subject to change without prior notice.
          </p>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 12 }}>
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};

// ----------------------------- Main Component ----------------------------- //
export default function ApplyLoanBasicDetails() {
  const [params] = useSearchParams();
  const prefillProduct = params.get("product") || "Personal Loan";

  const [step, setStep] = useState(1); // 1: details, 2: verify, 3: review, 4: done
  const totalSteps = 4;
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [otpRequested, setOtpRequested] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpTimeLeft, setOtpTimeLeft] = useState(0);
  const [toast, setToast] = useState("");

  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem(LS_KEY);
    return (
      saved ? JSON.parse(saved) : {
        name: "",
        email: "",
        phone: "",
        amount: "",
        purpose: prefillProduct,
        customPurpose: "",
        tenure: 36,
        rate: 12,
        consent: false,
        referral: "",
        honey: "", // honeypot field
      }
    );
  });

  const [errors, setErrors] = useState({});
  const debouncedSave = useDebouncedCallback((state) => {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  }, 300);

  useEffect(() => { debouncedSave(form); }, [form]);

  // OTP countdown
  useEffect(() => {
    if (!otpRequested || otpTimeLeft <= 0) return;
    const t = setTimeout(() => setOtpTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [otpRequested, otpTimeLeft]);

  // Derived EMI
  const amountNum = Number(String(form.amount).replace(/[,\s]/g, "")) || 0;
  const emi = useMemo(() => calcEMI({ amount: amountNum, rate: form.rate, tenure: form.tenure }), [amountNum, form.rate, form.tenure]);

  // Handlers
  const setField = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const handleName = (e) => setField("name", titleCase(e.target.value));

  const handleEmail = (e) => setField("email", e.target.value.trim());

  const handlePhone = (e) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 10);
    const pretty = raw.replace(/(\d{5})(\d{5})/, "$1 $2");
    setField("phone", pretty);
  };

  const handleAmount = (e) => {
    const raw = e.target.value.replace(/\D/g, "");
    const val = raw ? Number(raw) : 0;
    const clamped = clamp(val, 10000, 50000000); // ₹10k — ₹5Cr
    const pretty = new Intl.NumberFormat("en-IN").format(clamped);
    setField("amount", pretty);
  };

  const validate = () => {
    const errs = {};
    if (!form.name || form.name.length < 3) errs.name = "Please enter your full name.";
    if (!isEmail(form.email)) errs.email = "Enter a valid email address.";
    if (!isPhone(form.phone)) errs.phone = "Enter a valid Indian mobile number.";
    if (!amountNum || amountNum < 10000) errs.amount = "Enter a loan amount of at least ₹10,000.";
    if (!form.purpose) errs.purpose = "Please select a loan type.";
    if (form.purpose === "Other" && !form.customPurpose) errs.customPurpose = "Tell us a bit about the purpose.";
    if (!form.consent) errs.consent = "Please agree to Terms & Privacy to proceed.";
    if (form.honey) errs.honey = "Spam detected.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const requestOtp = () => {
    if (!validate()) { setToast("Please correct the highlighted fields."); return; }
    setOtpRequested(true);
    setOtpTimeLeft(45);
    setToast("We sent a 4-digit OTP to your phone/email (demo mode).");
  };

  const verifyOtp = () => {
    if (otp === "1234") {
      setToast("Number verified. Moving to review.");
      setStep(3);
    } else {
      setToast("Invalid OTP. Try 1234 (demo).");
    }
  };

  const handleSubmit = async () => {
    if (!validate()) { setToast("Please fix errors before submitting."); return; }
    if (!otpRequested) { setToast("Please verify your contact with OTP first."); return; }
    setSubmitting(true);
    try {
      const payload = { ...form, amount: amountNum, product: form.purpose === "Other" ? form.customPurpose : form.purpose };
      const res = await fetch("/api/loan-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to submit application");
      localStorage.removeItem(LS_KEY);
      setStep(4);
      setToast("Application submitted successfully.");
    } catch (e) {
      console.error(e);
      setToast("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    localStorage.removeItem(LS_KEY);
    setForm({
      name: "",
      email: "",
      phone: "",
      amount: "",
      purpose: prefillProduct,
      customPurpose: "",
      tenure: 36,
      rate: 12,
      consent: false,
      referral: "",
      honey: "",
    });
    setErrors({});
    setOtp("");
    setOtpRequested(false);
    setOtpTimeLeft(0);
    setStep(1);
  };

  // Keyboard: Enter to go next on step 1, etc.
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      if (step === 1) requestOtp();
      else if (step === 2) verifyOtp();
    }
  };

  // ----------------------------- UI ----------------------------- //
  return (
    <main style={{ background: "linear-gradient(135deg, #eaf5ff 0%, #f9fbff 100%)", minHeight: "100vh", fontFamily }} onKeyDown={onKeyDown}>
      <section style={{ maxWidth: 540, margin: "40px auto", padding: 20 }}>
        <header style={{ textAlign: "center", marginBottom: 16 }}>
          <span style={{ fontSize: 40, color: "#0070f3", display: "inline-block", marginBottom: 6 }}>💳</span>
          <h1 style={{ fontSize: 30, fontWeight: 900, background: "linear-gradient(90deg, #0070f3 0%, #6228d7 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 6 }}>Apply Loan — Basic Details</h1>
          <div style={{ fontSize: 14, color: "#1f2937", fontWeight: 600 }}>Fill in your details to get personalised offers from India’s top lenders.</div>
        </header>

        <div style={{ background: "#fff", borderRadius: 20, boxShadow: "0 8px 32px rgba(0,112,243,0.10)", padding: 20, position: "relative" }}>
          <div style={{ position: "absolute", left: -28, top: -28, width: 72, height: 72, background: "#0070f3", opacity: 0.08, borderRadius: "50%", zIndex: 0 }} />
          <div style={{ position: "absolute", right: -18, bottom: -18, width: 60, height: 60, background: "#6228d7", opacity: 0.10, borderRadius: "50%", zIndex: 0 }} />

          <div style={{ position: "relative", zIndex: 1, display: "grid", gap: 16 }}>
            <Progress step={step} total={totalSteps} />

            {step === 1 && (
              <section aria-label="Your Details" style={{ display: "grid", gap: 14 }}>
                <InlinePill>Step 1 — Contact & Loan Info</InlinePill>
                <Field label="Full Name" htmlFor="name" required error={errors.name}>
                  <Input id="name" name="name" placeholder="e.g., Karanveer Aujla" value={form.name} onChange={handleName} aria-invalid={!!errors.name} />
                </Field>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <Field label="Email" htmlFor="email" required error={errors.email}>
                    <Input id="email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleEmail} aria-invalid={!!errors.email} />
                  </Field>

                  <Field label="Phone (India)" htmlFor="phone" required error={errors.phone}>
                    <Input id="phone" name="phone" type="tel" inputMode="numeric" placeholder="98765 43210" value={form.phone} onChange={handlePhone} aria-invalid={!!errors.phone} />
                  </Field>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <Field label="Loan Amount (₹)" htmlFor="amount" required error={errors.amount} hint={`EMI preview below`}>
                    <Input id="amount" name="amount" inputMode="numeric" placeholder="5,00,000" value={form.amount} onChange={handleAmount} aria-invalid={!!errors.amount} />
                  </Field>

                  <Field label="Loan Type" htmlFor="purpose" required error={errors.purpose}>
                    <Select id="purpose" name="purpose" value={form.purpose} onChange={(e) => setField("purpose", e.target.value)} aria-invalid={!!errors.purpose}>
                      {["Home Loan","Personal Loan","Loan Against Property","Car Loan","Loan On Mutual Funds","Low CIBIL Loan","Business Loan","Education Loan","Other"].map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </Select>
                  </Field>
                </div>

                {form.purpose === "Other" && (
                  <Field label="Tell us the purpose" htmlFor="customPurpose" required error={errors.customPurpose}>
                    <Input id="customPurpose" name="customPurpose" placeholder="e.g., Medical expenses, Travel, etc." value={form.customPurpose} onChange={(e) => setField("customPurpose", e.target.value)} aria-invalid={!!errors.customPurpose} />
                  </Field>
                )}

                {/* EMI Preview */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 12, padding: 12 }}>
                  <div>
                    <label style={{ fontWeight: 700, color: "#0f172a" }}>Rate (p.a. %)</label>
                    <input type="range" min={8} max={24} value={form.rate} onChange={(e) => setField("rate", Number(e.target.value))} style={{ width: "100%" }} />
                    <div style={{ fontSize: 12, color: "#475569" }}>{form.rate}%</div>
                  </div>
                  <div>
                    <label style={{ fontWeight: 700, color: "#0f172a" }}>Tenure (months)</label>
                    <input type="range" min={6} max={360} value={form.tenure} onChange={(e) => setField("tenure", Number(e.target.value))} style={{ width: "100%" }} />
                    <div style={{ fontSize: 12, color: "#475569" }}>{form.tenure} mo</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 900, color: "#1e293b" }}>EMI ~ ₹{rupee(emi.emi)}</div>
                    <div style={{ fontSize: 12, color: "#64748b" }}>Total ₹{rupee(emi.total)} · Interest ₹{rupee(emi.interest)}</div>
                  </div>
                </div>

                {/* Consent & Referral */}
                <div style={{ display: "grid", gap: 10 }}>
                  <label style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <input type="checkbox" checked={form.consent} onChange={(e) => setField("consent", e.target.checked)} aria-invalid={!!errors.consent} />
                    <span style={{ fontSize: 13, color: "#334155" }}>
                      I agree to the <a href="#" onClick={(e) => { e.preventDefault(); setModalOpen(true); }} style={{ color: "#2563eb", textDecoration: "underline" }}>Terms & Privacy</a> and consent to be contacted for this application.
                    </span>
                  </label>
                  {!!errors.consent && <div role="alert" style={{ fontSize: 12, color: "#ef4444" }}>{errors.consent}</div>}

                  <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 12, alignItems: "end" }}>
                    <Field label="Referral Code (optional)" htmlFor="ref">
                      <Input id="ref" name="referral" placeholder="e.g., FRIEND50" value={form.referral} onChange={(e) => setField("referral", e.target.value.toUpperCase())} />
                    </Field>
                    <InlinePill tone="green">No Hidden Charges</InlinePill>
                  </div>

                  {/* Honeypot */}
                  <div style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}>
                    <label>Do not fill</label>
                    <input value={form.honey} onChange={(e) => setField("honey", e.target.value)} />
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10, justifyContent: "space-between" }}>
                  <Button variant="ghost" onClick={resetForm}>Reset</Button>
                  <div style={{ display: "flex", gap: 10 }}>
                    <Button variant="ghost" onClick={() => setStep(2)}>Skip OTP (demo)</Button>
                    <Button onClick={requestOtp}>Continue</Button>
                  </div>
                </div>
              </section>
            )}

            {step === 2 && (
              <section aria-label="Verify" style={{ display: "grid", gap: 14 }}>
                <InlinePill tone="amber">Step 2 — Verify Contact</InlinePill>
                <div style={{ color: "#334155", fontSize: 14 }}>
                  We sent a 4-digit OTP to <b>{form.phone || "your phone"}</b> and <b>{form.email || "your email"}</b> (demo mode). Use <b>1234</b> to verify. {otpTimeLeft > 0 && (<span>Resend in {otpTimeLeft}s</span>)}
                </div>

                <Field label="Enter OTP" htmlFor="otp">
                  <Input id="otp" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))} placeholder="1234" inputMode="numeric" />
                </Field>

                <div style={{ display: "flex", gap: 10, justifyContent: "space-between" }}>
                  <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                  <div style={{ display: "flex", gap: 10 }}>
                    <Button variant="ghost" disabled={otpTimeLeft > 0} onClick={() => { setOtpTimeLeft(45); setToast("OTP resent."); }}>Resend OTP</Button>
                    <Button onClick={verifyOtp}>Verify</Button>
                  </div>
                </div>
              </section>
            )}

            {step === 3 && (
              <section aria-label="Review" style={{ display: "grid", gap: 14 }}>
                <InlinePill tone="green">Step 3 — Review & Submit</InlinePill>

                <div style={{ border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden" }}>
                  <div style={{ background: "#f8fafc", padding: 12, fontWeight: 800, color: "#0f172a" }}>Your Details</div>
                  <div style={{ padding: 12, display: "grid", gap: 8, fontSize: 14, color: "#334155" }}>
                    <Row k="Name" v={form.name} />
                    <Row k="Email" v={form.email} />
                    <Row k="Phone" v={form.phone} />
                    <Row k="Loan Type" v={form.purpose === "Other" ? form.customPurpose : form.purpose} />
                    <Row k="Amount" v={`₹${rupee(amountNum)}`} />
                    <Row k="Rate / Tenure" v={`${form.rate}% · ${form.tenure} mo`} />
                    {form.referral && <Row k="Referral" v={form.referral} />}
                  </div>
                </div>

                <div style={{ background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: 12, padding: 12 }}>
                  <div style={{ fontWeight: 900, color: "#0c4a6e" }}>EMI Estimate</div>
                  <div style={{ fontSize: 14, color: "#155e75" }}>₹{rupee(emi.emi)} / month · Total ₹{rupee(emi.total)} · Interest ₹{rupee(emi.interest)}</div>
                </div>

                <div style={{ display: "flex", gap: 10, justifyContent: "space-between" }}>
                  <Button variant="ghost" onClick={() => setStep(2)}>Back</Button>
                  <Button onClick={handleSubmit} disabled={submitting}>{submitting ? "Submitting..." : "Submit Application"}</Button>
                </div>
              </section>
            )}

            {step === 4 && (
              <section aria-label="Done" style={{ textAlign: "center", display: "grid", gap: 10 }}>
                <div style={{ fontSize: 40 }}>✅</div>
                <h2 style={{ fontSize: 24, fontWeight: 900, color: "#0f172a", margin: 0 }}>Thank you! Application submitted.</h2>
                <div style={{ fontSize: 14, color: "#334155" }}>Our advisor will reach out shortly with the best matching offers.</div>

                <div style={{ border: "1px dashed #cbd5e1", borderRadius: 12, padding: 12, textAlign: "left", marginTop: 6 }}>
                  <div style={{ fontWeight: 800, color: "#0f172a" }}>Summary</div>
                  <div style={{ display: "grid", gap: 6, fontSize: 14, color: "#334155" }}>
                    <Row k="Name" v={form.name} />
                    <Row k="Loan Type" v={form.purpose === "Other" ? form.customPurpose : form.purpose} />
                    <Row k="Amount" v={`₹${rupee(amountNum)}`} />
                    <Row k="Expected EMI" v={`₹${rupee(emi.emi)}`} />
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 10 }}>
                  <Button variant="accent" onClick={resetForm}>New Application</Button>
                  <Button variant="ghost" onClick={() => window.history.back()}>Back to Loans</Button>
                </div>
              </section>
            )}

            {/* Toast */}
            {!!toast && (
              <div role="status" aria-live="polite" style={{ background: "#111827", color: "#fff", borderRadius: 12, padding: 12, fontSize: 13 }}>
                {toast}
              </div>
            )}
          </div>
        </div>

        <footer style={{ textAlign: "center", marginTop: 14, color: "#64748b", fontSize: 12 }}>
          Protected by basic anti-spam. This is a demo; integrate with your backend to receive submissions.
        </footer>
      </section>

      {/* Terms Modal */}
      <TermsModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Apply Loan — Basic Details",
            description: "Collects applicant contact and loan preferences for pre-qualification.",
            potentialAction: {
              "@type": "CommunicateAction",
              target: { "@type": "EntryPoint", urlTemplate: typeof window !== 'undefined' ? window.location.href : '' },
            },
          }),
        }}
      />
    </main>
  );
}

// ----------------------------- Minor helpers ----------------------------- //
function Row({ k, v }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 8 }}>
      <div style={{ color: "#64748b" }}>{k}</div>
      <div style={{ color: "#0f172a", fontWeight: 700 }}>{v}</div>
    </div>
  );
}

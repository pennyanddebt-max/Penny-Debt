import React from 'react';

const LeadForm = () => {
  // TODO: Implement form fields for name, phone, email, loan type, etc.
  return (
    <form>
      <h2>Lead Generation</h2>
      {/* Fields: Name, Phone, Email, Loan Type, Loan Amount, EMI, Income, Source */}
      <input placeholder="Name" />
      <input placeholder="Phone" />
      <input placeholder="Email" />
      <input placeholder="Loan Type" />
      <input placeholder="Loan Amount" />
      <input placeholder="Current EMI" />
      <input placeholder="Monthly Income" />
      <input placeholder="Source" />
      <button type="submit">Submit Lead</button>
    </form>
  );
};

export default LeadForm;

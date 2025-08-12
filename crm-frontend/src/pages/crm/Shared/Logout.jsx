import React from 'react';
const Logout = () => {
  const handleLogout = () => {
    // Logic for logging out the user
    console.log('User logged out');
  };

  return (
    <div>
      <h1>Logout Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
export default Logout;
import React, { useState } from "react";

const Roles = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: "Admin", description: "Full system access" },
    { id: 2, name: "Credit Manager", description: "Handles loan eligibility and approvals" },
    { id: 3, name: "Collection Officer", description: "Manages overdue payments and follow-ups" },
    { id: 4, name: "Sales Executive", description: "Generates leads and follows up" },
  ]);

  const [newRole, setNewRole] = useState({ name: "", description: "" });

  const handleAddRole = () => {
    if (!newRole.name || !newRole.description) return;

    const newId = roles.length + 1;
    const updatedRoles = [...roles, { id: newId, ...newRole }];
    setRoles(updatedRoles);
    setNewRole({ name: "", description: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h1 className="text-2xl font-bold text-blue-800 mb-6">User Roles Management</h1>

        {/* Role Table */}
        <div className="overflow-x-auto mb-8">
          <table className="w-full table-auto text-sm text-left border border-gray-200">
            <thead className="bg-blue-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Role Name</th>
                <th className="px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {roles.map((role) => (
                <tr key={role.id}>
                  <td className="px-4 py-2">{role.id}</td>
                  <td className="px-4 py-2 font-medium text-gray-800">{role.name}</td>
                  <td className="px-4 py-2">{role.description}</td>
                </tr>
              ))}
              {roles.length === 0 && (
                <tr>
                  <td colSpan="3" className="px-4 py-4 text-center text-gray-500">
                    No roles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Add New Role */}
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Add New Role</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Role Name"
            value={newRole.name}
            onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Role Description"
            value={newRole.description}
            onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleAddRole}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Role
        </button>
      </div>
    </div>
  );
};

export default Roles;

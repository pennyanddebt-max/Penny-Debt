import React, { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated API call
    const fetchUsers = async () => {
      setTimeout(() => {
        const dummyUsers = [
          {
            id: 1,
            name: "Karanveer Singh",
            email: "karanveer@loancrm.com",
            phone: "9876543210",
            role: "Admin",
            status: "Active",
          },
          {
            id: 2,
            name: "Ravi Mehra",
            email: "ravi@loancrm.com",
            phone: "9812345678",
            role: "Credit Manager",
            status: "Active",
          },
          {
            id: 3,
            name: "Sneha Kapoor",
            email: "sneha@loancrm.com",
            phone: "9102345678",
            role: "Collection Officer",
            status: "Inactive",
          },
        ];
        setUsers(dummyUsers);
        setLoading(false);
      }, 1000);
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h1 className="text-2xl font-bold text-blue-800 mb-6">Users Management</h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading users...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border border-gray-200">
              <thead className="bg-blue-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{user.id}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{user.name}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">{user.phone}</td>
                    <td className="px-4 py-3">{user.role}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}

                {users.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center text-gray-500 py-6">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;

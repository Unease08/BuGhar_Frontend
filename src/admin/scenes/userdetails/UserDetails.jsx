import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { Header } from "../../components";
import { Link } from "react-router-dom";
import api from "../../../library/Api";
import { toast } from "react-hot-toast";

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/user/all");

        const sortedUsers = response.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        setUsers(sortedUsers);
        setFilteredUsers(sortedUsers);
      } catch (error) {
        toast.error("Failed to fetch user data");
      }
    };
    fetchUsers();
  }, []);

  const handleRoleChange = (event) => {
    const role = event.target.value;
    setSelectedRole(role);
    setCurrentPage(1);

    if (role === "All Roles") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter((user) => user.role === role));
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box m="20px">
      <Header title="User Details" subtitle="List of Users" />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-gray-900">
          <div className="flex gap-5 ml-2">
            <div>
              <select
                className="border text-sm rounded-lg p-2.5 bg-gray-700 border-gray-600 text-white"
                value={selectedRole}
                onChange={handleRoleChange}
              >
                <option value="All Roles">All Roles</option>
                <option value="company">Company</option>
                <option value="user">Researcher</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        </div>
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-md uppercase bg-gray-700 text-gray-400">
            <tr>
              <th className="px-6 py-3">S.N.</th>
              <th className="px-6 py-3">User Identity</th>
              <th className="px-6 py-3">Full Name</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Country</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Verification</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user, index) => (
                <tr
                  className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600 hover:text-white"
                  key={user.user_id}
                >
                  <td className="px-6 py-4">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-6 py-4">
                    {user.email} {user.username ? `[${user.username}]` : ""}
                  </td>
                  <td className="px-6 py-4">
                    {user.first_name} {user.last_name}
                  </td>
                  <td className="px-6 py-4">
                    {user.role === "user"
                      ? "Researcher"
                      : user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </td>
                  <td className="px-6 py-4">{user.country || "null"}</td>
                  <td className="px-6 py-4">
                    {new Date(user.created_at).toLocaleDateString("en-US")}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full mr-2 ${
                          user.is_verified ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></div>
                      <span>{user.is_verified ? "Verified" : "Pending"}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <Link>
                      <button className="py-2 px-3 text-white bg-blue-700 rounded-lg hover:bg-blue-900">
                        View
                      </button>
                    </Link>
                    <Link to={`/update-user/${user.id}`}>
                      <button className="py-2 px-3 text-white bg-green-700 rounded-lg hover:bg-green-900">
                        Update
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center text-white">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-center mt-8">
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border bg-gray-800 text-white rounded-md disabled:opacity-50"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 border rounded-md ${
                  currentPage === index + 1
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-800 text-white"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border bg-gray-800 text-white rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </Box>
  );
};

export default UserDetails;

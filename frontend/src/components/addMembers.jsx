import React, { useState, useEffect } from "react";
import UserCard from "./cards/userCard";
import axiosInstance from "../utils/axiosInstance";

const UserList = ({ fetchMemberDetails, groupId, onClose }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axiosInstance.get("/users");
      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching users", err);
      setError("Error Fetching Users");
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async (userId) => {
    try {
      const response = await axiosInstance.post(`/groups/${groupId}/addMember`, { userId });
      onClose();
      fetchMemberDetails(); 
      getUsers(); 
    } catch (error) {
      console.error("Error adding member", error);
      alert(error.response?.data?.message || "Error adding member");
    }
  };

  return (
    <div className="relative w-full max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-gray-100 border-b">
        <h2 className="text-xl font-semibold">Add Members</h2>
        <button
          className="text-red-600 hover:text-red-800 transition duration-200"
          onClick={onClose}
        >
          Close
        </button>
      </div>

      {/* Content */}
      <div className="p-4 overflow-y-auto max-h-[60vh] md:max-h-[70vh] lg:max-h-[80vh]">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
          </div>
        ) : error ? (
          <p className="text-red-600 text-center">{error}</p>
        ) : users.length > 0 ? (
          <ul className="space-y-4">
            {users.map((user) => (
              <li key={user._id}>
                <UserCard
                  user={user}
                  onAddMember={handleAddMember} 
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">No users available</p>
        )}
      </div>
    </div>
  );
};

export default UserList;

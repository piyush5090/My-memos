import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance"; 

const AddEditGroup = ({ getAllGroups, type, groupData, onClose }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (type === "edit" && groupData) {
      setName(groupData.name);
    }
  }, [type, groupData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (type === "add") {
        const response = await axiosInstance.post("/createGroup", { name });
        getAllGroups();
        console.log(response);
      } else if (type === "edit") {
        await axiosInstance.put(`/groups/${groupData._id}`, { name });
      }
      onClose();
    } catch (error) {
      console.error("Error saving group:", error);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl w-full mx-auto">
      <h2 className="text-3xl font-semibold text-blue-600 mb-6 text-center">
        {type === "add" ? "Create New Group" : "Edit Group"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Group Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter group name"
            required
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {type === "add" ? "Create" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditGroup;

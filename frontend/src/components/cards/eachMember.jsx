import React from "react";

const MemberCard = ({ member, onRemove }) => {
  const getInitials = (name) => {
    const nameArray = name.split(" ");
    return nameArray
      .map((n) => n.charAt(0).toUpperCase())
      .join("")
      .substring(0, 2); 
  };

  return (
    <div className="w-full p-4 mb-4 bg-white shadow-md rounded-lg transform hover:scale-105 transition-all duration-300 ease-in-out">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-full text-2xl">
            {getInitials(member.name)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
            <p className="text-sm text-gray-600">{member.email}</p>
          </div>
        </div>
        <button 
          onClick={() => onRemove(member._id)} 
          className="text-red-500 hover:underline"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default MemberCard;

import React, { useState } from "react";

const UserCard = ({ user, onAddMember }) => {
  const getInitials = () => {
    const firstNameInitial = user?.name?.charAt(0) || ""; 
    const surnameInitial = user?.surname?.charAt(0) || ""; 
    return `${firstNameInitial}${surnameInitial}`.toUpperCase(); 
  };

  
  const [isAdded, setIsAdded] = useState(false);

 
  const handleClick = () => {
    onAddMember(user._id); 
    setIsAdded(true); 
   
    setTimeout(() => {
      setIsAdded(false); 
    }, 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out max-w-full">
      <div className="flex items-center space-x-4 flex-grow mb-2 sm:mb-0">
       
        <div className="w-12 h-12 bg-gray-300 text-white rounded-full flex items-center justify-center text-lg font-bold">
          {getInitials()}
        </div>
        <div className="flex-1">
          <h3 className="text-md font-semibold truncate">{user.name}</h3>
          <p className="text-sm text-gray-600 truncate">{user.email}</p>
        </div>
      </div>

     
      <button
        className={`py-2 px-4 rounded-lg transition duration-200 focus:outline-none ${
          isAdded
            ? "bg-green-600 text-white" 
            : "bg-green-500 text-white hover:bg-green-600" 
        }`}
        onClick={handleClick} 
      >
        {isAdded ? (
          <span className="animate-pulse">Added</span> 
        ) : (
          "Add"
        )}
      </button>
    </div>
  );
};

export default UserCard;

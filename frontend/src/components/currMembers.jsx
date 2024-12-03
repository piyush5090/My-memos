import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const CurrentMembers = ({ groupData, onAddMembers }) => {
  const [members, setMembers] = useState([]); 
  const [loading, setLoading] = useState(true);

  const fetchMemberDetails = async () => {
    try {
      const memberDetailsPromises = groupData.members.map((memberId) =>
        axiosInstance.get(`/members/${memberId}`)
      );
      const memberDetailsResponses = await Promise.all(memberDetailsPromises);
      const detailedMembers = memberDetailsResponses.map((res) => res.data); 
      setMembers(detailedMembers);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching member details:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemberDetails();
  }, [groupData.members]); 

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{groupData.name}</h2>
      {loading ? (
        <p>Loading members...</p>
      ) : (
        <ul className="space-y-2">
          {members.length > 0 ? (
            members.map((member) => (
              <li key={member._id} className="flex items-center justify-between p-2 border rounded">
                <span>{`${member.name}`}</span>
                <button
                  className="text-red-500"
                  onClick={() => {
                  }}
                >
                  Remove
                </button>
              </li>
            ))
          ) : (
            <p>No members in this group.</p>
          )}
        </ul>
      )}
      <button className="mt-4 py-2 px-4 bg-blue-500 text-white rounded" onClick={onAddMembers}>
        Add Members
      </button>
    </div>
  );
};

export default CurrentMembers;

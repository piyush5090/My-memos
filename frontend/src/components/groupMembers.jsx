import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import Navbar from "../components/Navbar";
import Sidebar from "../components/sidebar";
import axiosInstance from "../utils/axiosInstance";
import MemberCard from "./cards/eachMember"; 
import BottomNavbar from "../components/bottomBar"; 
import Modal from "react-modal"; 
import UserList from "./addMembers"; 
import { MdAdd, MdArrowBack } from "react-icons/md"; 

const GroupMembersPage = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [groupData, setGroupData] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const { groupId } = useParams(); 
  const [openAddMemberModal, setOpenAddMemberModal] = useState(false);

  const getGroupData = async () => {
    try {
      const response = await axiosInstance.get(`/getmembers/${groupId}`);
      setGroupData(response.data); 
    } catch (err) {
      console.error("Error fetching group data", err);
    }
  };

  const fetchMemberDetails = async (membersIds) => {
    try {
      const memberDetailsPromises = membersIds.map((memberId) =>
        axiosInstance.get(`/members/${memberId}`)
      );
      const memberDetailsResponses = await Promise.all(memberDetailsPromises);
      const detailedMembers = memberDetailsResponses.map((res) => res.data); 
      setMembers(detailedMembers);
    } catch (error) {
      console.error("Error fetching member details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveMember = async (memberId) => {
    try {
      await axiosInstance.delete(`/removeMember/${groupId}/${memberId}`);
      setMembers((prevMembers) => prevMembers.filter((member) => member.id !== memberId));
      getGroupData();
    } catch (error) {
      console.error("Error removing member:", error);
    }
  };

  const handleAddMember = (newMember) => {
    setMembers((prevMembers) => [...prevMembers, newMember]);
  };

  const navigateBack = () => {
    window.history.back(); 
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/getUser");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/");
      }
    }
  };
  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getGroupData(); 
    };
    fetchData();
  }, [groupId]);

  useEffect(() => {
    if (groupData && groupData.members) {
      fetchMemberDetails(groupData.members); 
      getUserInfo();
    }
  }, [groupData]);

  return (
    <div className="relative min-h-screen bg-gray-100">
      <Navbar userInfo={userInfo} />
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row mt-20">
          <Sidebar />
          <div className="md:ml-64 w-full px-4 sm:px-6 py-4">
            {/* Back Button */}
            <button
              className="flex items-center text-gray-600 hover:text-blue-500 mb-4"
              onClick={navigateBack} 
            >
              <MdArrowBack className="mr-2" /> Back
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Group Members</h2>
            <button
              className="flex items-center bg-blue-500 text-white rounded-lg px-4 py-2 mb-4 hover:bg-blue-600 transition duration-200"
              onClick={() => setOpenAddMemberModal(true)}
            >
              <MdAdd className="mr-2" /> Add Members
            </button>
            <div className="flex flex-col">
              {members.length > 0 ? (
                members.map((member) => (
                  <MemberCard key={member.id} member={member} onRemove={handleRemoveMember} />
                ))
              ) : (
                <p className="text-gray-600">No members found</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      <Modal
        isOpen={openAddMemberModal}
        onRequestClose={() => setOpenAddMemberModal(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            borderRadius: '10px',
            backgroundColor: '#fff',
            maxWidth: '90%',
            width: '500px',
            marginTop: '50px',
          }
        }}
        contentLabel="Add Member"
      >
        <UserList fetchMemberDetails={getGroupData} groupId={groupId} onAddMember={handleAddMember} onClose={() => setOpenAddMemberModal(false)} />
      </Modal>

      {/* Mobile Bottom Navbar */}
      <BottomNavbar />
    </div>
  );
};

export default GroupMembersPage;

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/sidebar";
import BottomNavbar from "../components/bottomBar";
import Modal from "react-modal";
import { MdAdd } from "react-icons/md";
import GroupCard from "../components/cards/groupCard"; 
import AddEditGroup from "./addEditGroup"; 
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const Group = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [allGroups, setAllGroups] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([getUserInfo(), getAllGroups()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/getUser");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      console.error("Error fetching user info", error);
    }
  };

  const getAllGroups = async () => {
    try {
      const response = await axiosInstance.get("/groups");
      if (response.data && response.data.groups) {
        setAllGroups(response.data.groups);
      } else {
        console.log("No groups found in response:", response.data);
      }
    } catch (error) {
      console.error("Error fetching groups", error);
    }
  };

  const handleDeleteGroup = async (groupId) => {
    try {
      const response = await axiosInstance.delete(`/deleteGroup/${groupId}`);
      if (response.data && !response.data.error) {
        console.log("Group deleted successfully, refreshing groups...");
        await getAllGroups(); 
      } else {
        console.error("Error deleting group:", response.data.error);
      }
    } catch (error) {
      console.error("Error deleting group:", error);
    }
  };

  return (
    <div className="relative bg-gray-100 min-h-screen">
      <Navbar userInfo={userInfo} />

      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="flex mt-20">
          <Sidebar />

          <div className="md:ml-64 w-full">
            <div className="container mx-auto px-4 mt-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-6 ml-3">Your Groups</h1>
              {allGroups.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {allGroups.map((group) => (
                    <GroupCard
                      key={group._id}
                      group={group}
                      onDelete={() => handleDeleteGroup(group._id)} 
                      onView={() => navigate(`/groupNotes/${group._id}`)}
                      getAllGroups={getAllGroups} 
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-600 mt-4">No Groups Found</div>
              )}
            </div>
          </div>
        </div>
      )}

      <button
        className="w-16 h-16 flex items-center justify-center rounded-full bg-primary hover:bg-blue-600 fixed right-8 bottom-20 shadow-lg transition-shadow duration-300"
        onClick={() =>
          setOpenAddEditModal({ isShown: true, type: "add", data: null })
        }
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() =>
          setOpenAddEditModal({ isShown: false, type: "add", data: null })
        }
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
          },
        }}
        contentLabel="Add/Edit Group"
        className="md:w-[40%] w-full max-h-3/4 rounded-md mx-auto mt-[300px] p-5 overflow-y-auto bg-white"
      >
        <AddEditGroup
          getAllGroups={getAllGroups}
          type={openAddEditModal.type}
          groupData={openAddEditModal.data}
          onClose={() =>
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }
        />
      </Modal>

      <BottomNavbar />
    </div>
  );
};

export default Group;

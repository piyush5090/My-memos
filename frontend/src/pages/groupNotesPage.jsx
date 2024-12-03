import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoteCardGroup from "../components/cards/noteCradGroup";
import { MdAdd, MdArrowBack } from "react-icons/md";
import AddEditNoteForGroup from "./addEditNoteGroup";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import moment from "moment";
import Toast from "../components/cards/Toast";
import EmptyCard from "../components/cards/EmptyCard";
import Sidebar from "../components/sidebar";
import BottomNavbar from "../components/bottomBar";
import CurrentMembers from "../components/currMembers"; 
import Modal from "react-modal";
import './group.css'
import axios from "axios";

const GroupNotesPage = () => {
  const [groupNotes, setGroupNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { groupId } = useParams(); 
  const navigate = useNavigate();
  const [showToastMsg, setShowToastMsg] = useState({ isShown: false, message: "", type: "" });
  const [openAddEditModal, setOpenAddEditModal] = useState({ isShown: false, type: "add", data: null });
  const [showCurrentMembers, setShowCurrentMembers] = useState(false);
  const [groupData, setGroupData] = useState(null);
  const [error, setError] = useState(null);

  const getGroupData = async () => {
    try {
      const response = await axiosInstance.get(`/getmembers/${groupId}`);
      if (response.data && response.data.notes) {
        setGroupData(response.data);
      }
      console.log(response);
    } catch (err) {
      setError("Internal Server error");
      console.log("Internal Server error", err);
    }
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

  const getGroupNotes = async () => {
    try {
      const response = await axiosInstance.get(`/NotesOfgroup/${groupId}`);
      if (response.data && response.data.notes) {
        setGroupNotes(response.data.notes);
      }
    } catch (error) {
      console.error("Error fetching group notes", error);
    }
  };

  const ShowToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });
  };

  const deleteNote = async (noteId) => {
    try {
      const response = await axiosInstance.delete(`/groups/${groupId}/notes/${noteId}`);
      if (response.data && !response.data.error) {
        ShowToastMessage(response.data.message, "success"); 
        getGroupNotes(); 
      }
    } catch (error) {
      console.error("Delete Error:", error.response?.data || error.message);
      ShowToastMessage(error.response.data.message, "error");
    }
  };

  useEffect(() => {
    setLoading(true);
    getUserInfo();
    getGroupNotes();
    getMembers();
    getGroupData();
    setLoading(false);
  }, [groupId]);

  const getMembers = async () => {
    try {
      const response = await axiosInstance.get(`getmembers/${groupId}`);
      if (response.data && !response.data.error) {
        setGroupData(response.data);
      }
    } catch (err) {
      console.log("Error fetching members", err);
    }
  };

  const onPinGroupNote = async (noteData) => {
    try {
      const response = await axiosInstance.put(
        `/group/pin/${groupId}/${noteData._id}`,
        { isPinned: !noteData.isPinned }
      );
      ShowToastMessage(response.data.message, "success");
      getGroupNotes();
    } catch (err) {
      console.error("Internal Server Error", err);
      setError("Failed to update pin status.");
    }
  };
  
 
  const navigateBack = () => {
    window.history.back(); 
  };

  return (
    <div className="relative">
      <Navbar userInfo={userInfo} showSearchIcon={false} />

      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="flex mt-20">
          <Sidebar />
          <div className="md:ml-64 w-full">
            <div className="container mx-auto px-4 mt-4">
              {/* Back Button */}
              <button
                className="flex items-center text-gray-600 hover:text-blue-500 mb-4"
                onClick={navigateBack} 
              >
                <MdArrowBack className="mr-2" /> Back
              </button>

              {/* Group Name and View Members Button */}
              <div className="flex items-center justify-between bg-blue-100 p-4 rounded-lg shadow mb-4 group-bar">
                <div className="flex items-center">
                  <img 
                    src="https://via.placeholder.com/40" 
                    alt="Group Avatar"
                    className="rounded-full border border-gray-300 shadow-md mr-3 avatar"
                  />
                  <span className="text-black font-bold text-lg md:text-3xl">
                    {groupData ? (
                      groupData.name
                    ) : (
                      <div className="loader"></div> 
                    )}
                  </span>
                </div>
                <button
                  className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 button"
                  onClick={() => navigate(`/group/${groupId}/members`)}
                  aria-label="View Group Members"
                >
                  View Members
                </button>
              </div>

              {showCurrentMembers && (
                <CurrentMembers 
                  onClose={() => setShowCurrentMembers(false)}
                  groupData={groupData} 
                />
              )}

              {groupNotes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {groupNotes.map((item) => (
                    <NoteCardGroup
                      key={item._id}
                      title={item.title}
                      date={moment(item.createOn).format("Do MMM YYYY")}
                      content={item.content}
                      tags={item.tags}
                      isPinned={item.isPinned}
                      onEdit={() => setOpenAddEditModal({ isShown: true, data: item, type: "edit" })}
                      onDelete={() => deleteNote(item._id)}
                      onPinGroupNote={() => onPinGroupNote(item)}
                      lastUpdatedBy={item.lastUpdatesBy || "Unknown"}
                      updatedAt={moment(item.updatesAt).format("Do MMM YYYY")}
                    />
                  ))}
                </div>
              ) : (
                <EmptyCard />
              )}
            </div>
          </div>
        </div>
      )}

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 fixed right-8 bottom-20"
        onClick={() => setOpenAddEditModal({ isShown: true, type: "add", data: null })}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
        style={{ overlay: { backgroundColor: "rgba(0,0,0,0.2)" } }}
        contentLabel="Add/Edit Group Note"
        className="md:w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-24 p-5 overflow-y-auto"
      >
        <AddEditNoteForGroup
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
          ShowToastMessage={ShowToastMessage}
          groupId={groupId}
          getGroupNotes={getGroupNotes}
        />
      </Modal>

      {showToastMsg.isShown && (
        <Toast
          isShown={showToastMsg.isShown}
          message={showToastMsg.message}
          type={showToastMsg.type}
          onClose={() => setShowToastMsg({ isShown: false, message: "", type: "" })}
        />
      )}

      <BottomNavbar />
    </div>
  );
};

export default GroupNotesPage;

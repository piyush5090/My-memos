import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNote from "./AddEditNote";
import Modal from "react-modal";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import moment from "moment";
import Toast from "../components/cards/Toast";
import EmptyCard from "../components/cards/EmptyCard";
import Sidebar from "../components/sidebar";
import BottomNavbar from "../components/bottomBar"; 

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "",
  });
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();
  const location = useLocation();
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

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

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/getAll");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.error("Error fetching notes", error);
    }
  };

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
      type: "",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      await Promise.all([getAllNotes(), getUserInfo()]);
      setLoading(false); 
    };
    fetchData();
  }, []);

  
  const ShowToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });
  };

  const deleteNote = async (data) => {
    try {
      const response = await axiosInstance.delete(`/delete/${data._id}`);
      if (response.data && !response.data.error) {
        ShowToastMessage("Note Deleted Successfully", "delete");
        getAllNotes();
      }
    } catch (error) {
      console.error("Error deleting note", error);
    }
  };

  const handlePinNote = async (noteData) => {
    try {
      const response = await axiosInstance.put(`/pin/${noteData._id}`, {
        isPinned: !noteData.isPinned,
      });
      if (response.data && response.data.note) {
        ShowToastMessage("Note Updated Successfully", "success");
        getAllNotes();
      }
    } catch (error) {
      console.error("Error pinning note", error);
    }
  };

  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search", {
        params: { query },
      });
      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };


  return (
    <div className="relative">
      {/* Top Navbar */}
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
        showSearchIcon={true}
      />

      {loading ? ( 
        <div className="flex items-center justify-center h-screen">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="flex mt-20">
          {/* Side Navbar */}
          <Sidebar />

          {/* Main Content */}
          <div className="md:ml-64 w-full">
            <div className="container mx-auto px-4 mt-8">
              {allNotes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {allNotes.map((item) => (
                    <NoteCard
                      key={item._id}
                      title={item.title}
                      date={moment(item.createOn).format("Do MMM YYYY")}
                      content={item.content}
                      tags={item.tags}
                      isPinned={item.isPinned}
                      onEdit={() => handleEdit(item)}
                      onDelete={() => deleteNote(item)}
                      onPinNote={() => handlePinNote(item)}
                    />
                  ))}
                </div>
              ) : (
                <EmptyCard isSearch={isSearch} />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Add Button */}
      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 fixed right-8 bottom-20"
        onClick={() =>
          setOpenAddEditModal({ isShown: true, type: "add", data: null })
        }
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() =>
          setOpenAddEditModal({ isShown: false, type: "add", data: null })
        }
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel="Add/Edit Note"
        className="md:w-[40%] w-full max-h-3/4 bg-white rounded-md mx-auto mt-24 p-5 overflow-y-auto"
      >
        <div>
          <AddEditNote
            getAllNotes={getAllNotes}
            type={openAddEditModal.type}
            noteData={openAddEditModal.data}
            onClose={() =>
              setOpenAddEditModal({ isShown: false, type: "add", data: null })
            }
            ShowToastMessage={ShowToastMessage}
          />
        </div>
      </Modal>

      {/* Toast Message */}
      {showToastMsg.isShown && (
        <Toast
        isShown={showToastMsg.isShown}
          message={showToastMsg.message}
          type={showToastMsg.type}
          onClose={handleCloseToast}
        />
      )}

      {/* Mobile Bottom Navbar */}
      <BottomNavbar />
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import TagInput from "../components/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../utils/axiosInstance";

const AddEditNoteForGroup = ({ getGroupNotes, groupId, noteData, type, onClose, ShowToastMessage }) => {
    const [title, setTitle] = useState(noteData?.title || "");
    const [content, setContent] = useState(noteData?.content || "");
    const [tags, setTags] = useState(noteData?.tags || []);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log(groupId);
        console.log(noteData);  
    }, [groupId]);

    const addNewNote = async () => {
        try {
            const response = await axiosInstance.post(`/groups/${groupId}/notes`, {
                title,
                content,
                tags
            });
            if (response.data && response.data.note) {
                ShowToastMessage("Note Added Successfully");
                getGroupNotes();
                onClose();
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            }
        }
    };

    const editNote = async () => {
        try {
            const response = await axiosInstance.put(`/groups/${groupId}/notes/${noteData._id}`, {
                title,
                content,
                tags
            });
            
                ShowToastMessage("Note Updated Successfully");
                getGroupNotes();
                onClose();
           
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            }
        }
      };
      

    const handleAddNote = () => {
        if (!title) {
            setError("Please Enter Title");
            return;
        }
        if (!content) {
            setError("Please Enter Content");
            return;
        }
        setError("");
        if (type === "edit") {
            editNote();
        } else {
            addNewNote();
        }
    };

    return (
        <div className="relative">
            <button
                className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
                onClick={onClose}
            >
                <MdClose className="text-xl text-slate-400" />
            </button>
            <div className="flex flex-col gap-2">
                <label className="input-label text-sm sm:text-base lg:text-lg">Title</label>
                <input
                    type="text"
                    className="text-lg sm:text-xl lg:text-2xl text-slate-950 outline-none w-full p-2 border rounded"
                    placeholder="Group Activity"
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div className="flex flex-col gap-2 mt-4">
                <label className="input-label text-sm sm:text-base lg:text-lg">Content</label>
                <textarea
                    type="text"
                    className="text-sm sm:text-base lg:text-lg text-slate-950 outline-none bg-slate-50 p-2 rounded w-full border"
                    placeholder="Content for group members"
                    rows={10}
                    value={content}
                    onChange={({ target }) => setContent(target.value)}
                />
            </div>
            <div className="mt-3">
                <label className="input-label text-sm sm:text-base lg:text-lg">Tags</label>
                <TagInput tags={tags} setTags={setTags} />
            </div>
            {error && <p className="pt-4 text-red-500 text-xs sm:text-sm lg:text-base">{error}</p>}
            <button
                className="btn-primary font-medium mt-5 p-3 w-full text-sm sm:text-base lg:text-lg"
                onClick={handleAddNote}
            >
                {type === 'edit' ? 'UPDATE' : 'ADD'}
            </button>
        </div>
    );
};

export default AddEditNoteForGroup;

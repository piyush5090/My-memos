import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const addNewTag = () => {
        if (inputValue.trim() !== "") {
            setTags([...tags, inputValue.trim()]);
            setInputValue("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") addNewTag();
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    return (
        <div className="flex flex-col">
            {tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 items-center mt-2">
                    {tags.map((tag, index) => (
                        <span key={index} className="flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded">
                            #{tag}
                            <button onClick={() => handleRemoveTag(tag)}>
                                <MdClose />
                            </button>
                        </span>
                    ))}
                </div>
            )}
            <div className="flex items-center mt-3">
                <input 
                    type="text" 
                    className="text-sm bg-transparent border px-3 py-2 rounded outline-none flex-grow mr-2"
                    value={inputValue}
                    placeholder="Add tags" 
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
                <button 
                    className="w-10 h-10 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700 text-blue-700"
                    onClick={addNewTag}
                >
                    <MdAdd className="text-lg" />
                </button>
            </div>
        </div>
    );
};

export default TagInput;

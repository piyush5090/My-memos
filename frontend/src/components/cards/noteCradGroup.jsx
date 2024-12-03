import React from "react";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";

const NoteCardGroup = ({ 
    title, 
    date, 
    content, 
    tags, 
    isPinned, 
    onEdit, 
    onDelete, 
    onPinGroupNote, 
    lastUpdatedBy, 
    updatedAt 
}) => {
    return (
        <div
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 cursor-pointer"
            onClick={onEdit}
        >
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <h6 className="text-xl font-semibold text-gray-800 hover:text-primary transition-all">
                        {title}
                    </h6>
                    <span className="text-sm text-gray-500">{date}</span>
                </div>
                <MdOutlinePushPin
                    className={`text-2xl cursor-pointer transition-colors duration-300 ${
                        isPinned ? 'text-primary' : 'text-gray-400 hover:text-primary'
                    }`}
                    onClick={(e) => {
                        e.stopPropagation();
                        onPinGroupNote();
                    }}
                />
            </div>
            <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                {content?.slice(0, 100)}{content?.length > 100 && '...'}
            </p>
            <div className="flex items-center justify-between mt-4">
                <div className="flex flex-wrap gap-2">
                    {tags?.map((tag, index) => (
                        <span
                            key={index}
                            className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
                <div className="flex items-center gap-4">
                    <MdCreate
                        className="text-gray-500 hover:text-green-500 transition-all cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit();
                        }}
                    />
                    <MdDelete
                        className="text-gray-500 hover:text-red-500 transition-all cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete();
                        }}
                    />
                </div>
            </div>
            {lastUpdatedBy && (
                <div className="text-sm text-gray-600 mt-4">
                    Last updated by: <span className="font-medium">{lastUpdatedBy}</span>
                </div>
            )}
            {updatedAt && ( 
                <div className="text-sm text-gray-500 mt-2">
                    Updated At: <span className="font-medium">{updatedAt}</span>
                </div>
            )}
        </div>
    );
};

export default NoteCardGroup;

import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const GroupCard = ({ getAllGroups, group, onDelete, onView }) => {
    const [userInfo, setUserinfo] = useState(null);
    const navigate = useNavigate();
    const id = group.createdBy;

    useEffect(() => {
        getUser();
    }, [id]);

    const getUser = async () => {
        try {
            const response = await axiosInstance.get(`getIndiUser/${id}`);
            setUserinfo(response.data.response);
        } catch (err) {
            console.log('Error getting user', err);
        }
    };

    const formatDate = (dataString) => {
        if (dataString) {
            const date = new Date(dataString);
            return date.toLocaleDateString();
        }
        return '';
    };

    const handleDelete = async () => {
        try {
            console.log('Deleting group with ID:', group._id); // Log the ID
            const response = await axiosInstance.delete(`/deleteGroup/${group._id}`);
            if (response.status === 200) {
                getAllGroups();
            }
        } catch (err) {
            console.error('Error deleting group', err);
        }
    };

    return (
        <motion.div
            className="bg-white border border-gray-200 p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <h3 className="text-2xl font-semibold text-gray-800">{group.name}</h3>
            <p className="text-gray-600 mt-2">Created by: <span className="font-medium text-blue-600">{userInfo?.name}</span></p>
            <p className="text-gray-500 mt-1">{userInfo?.createdOn && formatDate(userInfo.createdOn)}</p>
            <div className="mt-6 flex justify-between items-center">
                <button
                    onClick={onView}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                    View Group
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300"
                >
                    Delete
                </button>
            </div>
        </motion.div>
    );
};

export default GroupCard;

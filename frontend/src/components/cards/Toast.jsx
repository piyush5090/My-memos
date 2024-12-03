import React, { useEffect } from "react";
import { LuCheck } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";

const Toast = ({ isShown, message, type, onClose }) => {
    useEffect(() => {
        if (isShown) {
            const timeoutId = setTimeout(() => {
                onClose();
            }, 3000);
            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [isShown, onClose]);

    return (
        <div
            className={`fixed top-20 right-6 sm:right-10 md:right-16 lg:right-20 transition-all duration-400 z-50 ${
                isShown ? "opacity-100" : "opacity-0"
            }`}
        >
            <div
                className={`min-w-[200px] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-white border shadow-2xl rounded-md relative ${
                    type === "delete" ? "after:bg-red-500" : "after:bg-green-500"
                } after:w-[5px] after:h-full after:absolute after:left-0 after:top-0 after:rounded-1-lg`}
            >
                <div className="flex items-center gap-3 py-2 px-4">
                    <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full ${
                            type === "delete" ? "bg-red-50" : "bg-green-50"
                        }`}
                    >
                        {type === "delete" ? (
                            <MdDeleteOutline className="text-lg sm:text-xl text-red-500" />
                        ) : (
                            <LuCheck className="text-lg sm:text-xl text-green-500" />
                        )}
                    </div>
                    <p className="text-xs sm:text-sm md:text-base text-slate-800">{message}</p>
                </div>
            </div>
        </div>
    );
};

export default Toast;

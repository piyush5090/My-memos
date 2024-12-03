import React from "react";
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ userInfo, onLogout }) => {
    return (
        userInfo && (
            <div className="flex items-center gap-3 p-2 sm:p-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full text-slate-900 bg-slate-100 font-medium">
                    {getInitials(userInfo.name)}
                </div>
                <div>
                    <p className="text-xs sm:text-sm font-medium">{userInfo.name}</p>
                    <button
                        className="text-xs sm:text-sm text-slate-100 underline"
                        onClick={onLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        )
    );
};

export default ProfileInfo;

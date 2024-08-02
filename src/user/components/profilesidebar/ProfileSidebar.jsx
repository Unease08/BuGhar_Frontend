import React from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { RiLockPasswordFill } from "react-icons/ri";

const ProfileSidebar = () => {
  return (
    <div className="bg-gray-800 shadow rounded-lg p-6">
      <div className="flex flex-col">
        <ul className="font-sans">
          <li className="mb-6 flex items-center gap-3 cursor-pointer">
            <i className="text-xl">
              <CgProfile />
            </i>
            <span className="text-sm font-semibold">
              <Link to="/profile" className="text-white">Profile</Link>
            </span>
          </li>
          <li className="mb-2 flex items-center gap-3 cursor-pointer">
            <i className="text-xl">
              <RiLockPasswordFill />
            </i>
            <span className="text-sm font-semibold">
              <Link to="/change-password" className="text-white">Change Password</Link>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileSidebar;

import React from "react";
import { useState, useEffect } from "react";
import api from "../../../library/Api"
import config from "../../../config"


const DashboardSidebar = () => {

   const [userData, setUserData] = useState({
     first_name: "",
     last_name: "",
     profile_picture: "",
     username: ""
   });

   useEffect(() => {
     const fetchUserDetails = async () => {
       try {
         const response = await api.get("/user/details/");
         setUserData(response.data);
       } catch (error) {
         console.error("Failed to fetch user details", error);
       }
     };

     fetchUserDetails();
   }, []);

   const imageUrl = userData.profile_picture
     ? `${config.BASE_URL}/${userData.profile_picture}`
     : "https://saugat-nepal.com.np/assets/img/profile-img.png";

  return (
    <div className="bg-gray-800 shadow rounded-lg p-6">
      <div className="flex flex-col">
        <div className="flex justify-center">
          <img src={imageUrl} alt="" className="rounded-full w-20 h-20" />
        </div>
        <div className="mt-3 flex flex-col items-center">
          <span className="text-xl font-semibold text-gray-200">
            {userData.first_name} {userData.last_name}
          </span>
          <span className="text-md text-gray-400 mt-1">
            {" "}
            {userData.username}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;

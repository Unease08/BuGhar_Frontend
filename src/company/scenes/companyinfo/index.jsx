import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import { Header } from "../../components";
import { useState } from "react";
import logo from "../../assets/images/avatar.png";
import useCountries from "../../../customhooks/UseCountries";
import CustomDropdown from "../../../library/CustomDropdown";

const CompanyInfo = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const countries = useCountries().map((country) => country.name);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedImage, setSelectedImage] = useState(logo); // Default image is the logo

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result); // Update the selected image
      };
      reader.readAsDataURL(file); // Read the uploaded file as a data URL
    }
  };

  return (
    <Box m="20px">
      <Header title="Company Information" />
      <form className="max-w-8xl mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-lg flex flex-col gap-8">
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center">
            <label className="w-32 h-32 overflow-hidden rounded-full border-4 border-blue-300 flex justify-center items-center cursor-pointer">
              <img
                src={selectedImage}
                alt="Logo"
                className="object-cover w-full h-full"
              />
              <input
                type="file"
                accept="image/*" // Allow only image files
                onChange={handleImageChange}
                className="hidden" // Hide the input element
              />
            </label>
          </div>
        </div>

        <div className="grid gap-6 mt-5 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-lg font-medium text-white"
            >
              Company Name
            </label>
            <input
              type="text"
              id="first_name"
              name="firstName"
              className="border text-lg rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Company Name"
            />
          </div>
          <div>
            <label
              htmlFor="company_website"
              className="block mb-2 text-lg font-medium  text-white"
            >
              Company Website
            </label>
            <input
              type="text"
              id="company_website"
              name="companyWebsite"
              className=" border  text-lg rounded-lg   block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Company Website"
            />
          </div>
          <div>
            <label
              htmlFor="country"
              className="block mb-2 text-lg font-medium  text-white"
            >
              Country{" "}
            </label>
            <CustomDropdown
              id="country"
              name="country"
              style={{ padding: "14px" }}
              options={countries}
              value={selectedCountry}
              onChange={(e) => {
                setSelectedCountry(e.target.value);
              }}
              className="p-[14px]"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block mb-2 text-lg font-medium  text-white"
            >
              Phone number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="border   text-lg rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="company_bio"
            className="block mb-2 text-lg font-medium  text-white"
          >
            Company Bio
          </label>
          <textarea
            id="company_bio"
            name="companyBio"
            className=" border  text-lg rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            rows="6"
            placeholder="Write your company bio here..."
          />
        </div>

        <div className="flex justify-end">
          <button className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
            Submit
          </button>
        </div>
      </form>
    </Box>
  );
};

export default CompanyInfo;

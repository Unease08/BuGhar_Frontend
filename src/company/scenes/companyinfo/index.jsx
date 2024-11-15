import { Box } from "@mui/material";
import { Header } from "../../components";
import { useState, useEffect } from "react";
import useCountries from "../../../customhooks/UseCountries";
import CustomDropdown from "../../../library/CustomDropdown";
import api from "../../../library/Api";
import config from "../../../config";
import toast from "react-hot-toast";

const CompanyInfo = () => {
  const countries = useCountries().map((country) => country.name);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedImage, setSelectedImage] = useState(
    "https://saugat-nepal.com.np/assets/img/profile-img.png"
  );
  const [imageFile, setImageFile] = useState(null);
  const [companyDetails, setCompanyDetails] = useState({
    company_name: "",
    website: "",
    phone_number: "",
    description: "",
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await api.get(`/company/company-detail/`);

        if (response.data && response.data.length > 0) {
          const {
            company_name = "",
            website = "",
            phone_number = "",
            description = "",
            country = "",
            company_logo,
          } = response.data[0];

          setCompanyDetails({
            company_name,
            website,
            phone_number,
            description,
          });
          setSelectedCountry(country);

          const imageUrl = company_logo
            ? `${config.BASE_URL}/${company_logo}`
            : "https://saugat-nepal.com.np/assets/img/profile-img.png";
          setSelectedImage(imageUrl);
        } else {
          console.warn("No company details found.");
        }
      } catch (error) {
        console.error("Error fetching company details:", error);
      }
    };

    fetchCompanyDetails();
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("company_name", companyDetails.company_name || "");
      formData.append("website", companyDetails.website || "");
      formData.append("phone_number", companyDetails.phone_number || "");
      formData.append("description", companyDetails.description || "");
      formData.append("country", selectedCountry || "");

      if (imageFile) {
        formData.append("company_logo", imageFile);
      }

      const response = await api.put(`/company/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Update Response:", response.data);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error updating company details:", error);
      toast.error("Failed to update company details");
    }
  };

  return (
    <Box m="20px">
      <Header title="Company Information" />
      <form
        onSubmit={handleFormSubmit}
        className="max-w-8xl mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-lg flex flex-col gap-8"
      >
        <div className="flex justify-center items-center">
          <label className="w-32 h-32 overflow-hidden rounded-full border-4 border-blue-300 flex justify-center items-center cursor-pointer">
            <img
              src={selectedImage}
              alt="Company Logo"
              className="object-cover w-full h-full"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        <div className="grid gap-6 mt-5 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="company_name"
              className="block mb-2 text-lg font-medium text-white"
            >
              Company Name
            </label>
            <input
              type="text"
              id="company_name"
              name="company_name"
              value={companyDetails.company_name}
              onChange={(e) =>
                setCompanyDetails((prevState) => ({
                  ...prevState,
                  company_name: e.target.value,
                }))
              }
              className="border text-lg rounded-lg w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Company Name"
            />
          </div>
          <div>
            <label
              htmlFor="company_website"
              className="block mb-2 text-lg font-medium text-white"
            >
              Company Website
            </label>
            <input
              type="text"
              id="company_website"
              name="website"
              value={companyDetails.website}
              onChange={(e) =>
                setCompanyDetails((prevState) => ({
                  ...prevState,
                  website: e.target.value,
                }))
              }
              className="border text-lg rounded-lg w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Company Website"
            />
          </div>
          <div>
            <label
              htmlFor="country"
              className="block mb-2 text-lg font-medium text-white"
            >
              Country
            </label>
            <CustomDropdown
              id="country"
              name="country"
              options={countries}
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="p-[14px]"
            />
          </div>
          <div>
            <label
              htmlFor="phone_number"
              className="block mb-2 text-lg font-medium text-white"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone_number"
              name="phone_number"
              value={companyDetails.phone_number}
              onChange={(e) =>
                setCompanyDetails((prevState) => ({
                  ...prevState,
                  phone_number: e.target.value,
                }))
              }
              className="border text-lg rounded-lg w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="company_bio"
            className="block mb-2 text-lg font-medium text-white"
          >
            Company Bio
          </label>
          <textarea
            id="company_bio"
            name="description"
            value={companyDetails.description}
            onChange={(e) =>
              setCompanyDetails((prevState) => ({
                ...prevState,
                description: e.target.value,
              }))
            }
            className="border text-lg rounded-lg w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            rows="6"
            placeholder="Write your company bio here..."
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="text-white font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      </form>
    </Box>
  );
};

export default CompanyInfo;

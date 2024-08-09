import React, { useState, useEffect } from "react";
import useCountries from "../../../customhooks/UseCountries";
import CustomDropdown from "../../../library/CustomDropdown";
import ProfileSidebar from "../../components/profilesidebar/ProfileSidebar";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../../../library/Api";

// Validation schema
const validationSchema = Yup.object({
  firstName: Yup.string()
    .required("First name is required")
    .matches(
      /^[A-Za-z]+$/,
      "First name should not contain numbers or special characters"
    ),
  lastName: Yup.string()
    .required("Last name is required")
    .matches(
      /^[A-Za-z]+$/,
      "Last name should not contain numbers or special characters"
    ),
  gender: Yup.string().required("Gender is required"),
  dob: Yup.date().required("Date of birth is required").nullable(),
  bio: Yup.string()
    .required("Bio is required")
    .test("min-words", "Bio must be at least 5 words", (value) => {
      if (!value) return false;
      const wordCount = value.trim().split(/\s+/).length;
      return wordCount >= 5;
    }),
  country: Yup.string().required("Country is required"),
  address: Yup.string().required("Address is required"),
  profilePicture: Yup.mixed()
    .required("Profile picture is required")
    .test("fileSize", "File size is too large", (value) => {
      return value && value.size <= 5 * 1024 * 1024; // 5MB limit
    })
    .test("fileType", "Unsupported file format", (value) => {
      return (
        value &&
        ["image/jpeg", "image/png", "image/gif"].includes(value.type)
      );
    }),
});

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const countries = useCountries().map((country) => country.name);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [fileName, setFileName] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = React.useRef(null); // Create a ref for the file input

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await api.get("/user/details", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        const data = response.data;

        setUserData(data);
        if (data.profile_picture) {
          const imageUrl = `http://127.0.0.1:8000/${data.profile_picture}`;
          setImagePreview(imageUrl);
        } else {
          setImagePreview(null);
        }
        setSelectedCountry(data.country || "");
      } catch (error) {
        console.error("Error fetching user details:", error.message || error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleFileChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFieldValue("profilePicture", file);
      };
      reader.readAsDataURL(file);
    } else {
      setFileName("");
      setImagePreview(null);
      setFieldValue("profilePicture", null);
    }
  };

  // Trigger the file input click
  const handleProfilePicClick = () => {
    fileInputRef.current.click();
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          <div className="col-span-4 sm:col-span-3">
            <ProfileSidebar />
          </div>
          <div className="col-span-4 sm:col-span-9">
            <Formik
              initialValues={{
                firstName: userData.first_name || "",
                lastName: userData.last_name || "",
                gender: userData.gender || "",
                dob: userData.dob ? new Date(userData.dob).toISOString().split('T')[0] : "",
                bio: userData.bio || "",
                country: userData.country || selectedCountry,
                address: userData.address || "",
                profilePicture: null,
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                const formData = new FormData();
                Object.keys(values).forEach((key) => {
                  formData.append(key, values[key]);
                });
                api.post("/user/update", formData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                  },
                })
                .then(response => {
                  console.log("Profile updated:", response.data);
                })
                .catch(error => {
                  console.error("Error updating profile:", error.message || error);
                });
              }}
            >
              {({ setFieldValue, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="bg-gray-800 shadow rounded-lg p-4">
                    <div className="bg-gradient-to-r from-gray-700 to-gray-900 p-6 rounded-lg shadow-lg h-[180px] relative">
                      <h2 className="text-white text-2xl font-bold mb-4">Profile</h2>
                      <div className="flex justify-center items-center relative">
                        <img
                          src={imagePreview || 'https://saugat-nepal.com.np/assets/img/profile-img.png'}
                          className="rounded-full w-40 h-40 border-2 border-black shadow-xl cursor-pointer"
                          alt="Profile"
                          onClick={handleProfilePicClick}
                        />
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          onChange={(event) => handleFileChange(event, setFieldValue)}
                        />
                      </div>
                    </div>
                    <div className="mt-10 ml-10 flex gap-96">
                      <div>
                        <span className="font-semibold text-xl">Username</span>
                        <p className="text-lg mt-1">{userData.username || "Loading..."}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-xl">Email</span>
                        <p className="text-lg mt-1">{userData.email || "Loading..."}</p>
                      </div>
                    </div>
                    <div className="mt-10 ml-10">
                      <h1 className="text-indigo-400 font-bold text-lg">Personal details</h1>
                      <p className="text-gray-400">Personal details are visible on your profile page</p>
                      <div className="mt-5 space-y-4">
                        <div className="flex space-x-4">
                          <div className="flex-1">
                            <label className="block text-sm font-bold text-gray-400" htmlFor="first-name">
                              First Name
                            </label>
                            <Field
                              type="text"
                              id="first-name"
                              name="firstName"
                              placeholder="Anish"
                              className="mt-1 block w-full border border-gray-700 rounded-md p-2 bg-gray-900 text-white focus:ring focus:ring-ring"
                            />
                            <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-2" />
                          </div>
                          <div className="flex-1">
                            <label className="block text-sm font-bold text-gray-400" htmlFor="last-name">
                              Last Name
                            </label>
                            <Field
                              type="text"
                              id="last-name"
                              name="lastName"
                              placeholder="Shrestha"
                              className="mt-1 block w-full border border-gray-700 rounded-md p-2 bg-gray-900 text-white focus:ring focus:ring-ring"
                            />
                            <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-2" />
                          </div>
                        </div>
                        <div className="flex space-x-4">
                          <div className="flex-1">
                            <label className="block text-sm font-bold text-gray-400" htmlFor="gender">
                              Gender
                            </label>
                            <Field as="select" id="gender" name="gender" className="mt-1 block w-full border border-gray-700 rounded-md p-2 bg-gray-900 text-white focus:ring focus:ring-ring">
                              <option value="" label="Select gender" />
                              <option value="male" label="Male" />
                              <option value="female" label="Female" />
                              <option value="other" label="Other" />
                            </Field>
                            <ErrorMessage name="gender" component="div" className="text-red-500 text-sm mt-2" />
                          </div>
                          <div className="flex-1">
                            <label className="block text-sm font-bold text-gray-400" htmlFor="dob">
                              Date of Birth
                            </label>
                            <Field
                              type="date"
                              id="dob"
                              name="dob"
                              placeholder="YYYY-MM-DD"
                              className="mt-1 block w-full border border-gray-700 rounded-md p-2 bg-gray-900 text-white focus:ring focus:ring-ring"
                            />
                            <ErrorMessage name="dob" component="div" className="text-red-500 text-sm mt-2" />
                          </div>
                        </div>
                        <div className="flex space-x-4">
                          <div className="flex-1">
                            <label className="block text-sm font-bold text-gray-400" htmlFor="bio">
                              Bio
                            </label>
                            <Field
                              as="textarea"
                              id="bio"
                              name="bio"
                              placeholder="Tell us about yourself"
                              className="mt-1 block w-full border border-gray-700 rounded-md p-2 bg-gray-900 text-white focus:ring focus:ring-ring"
                            />
                            <ErrorMessage name="bio" component="div" className="text-red-500 text-sm mt-2" />
                          </div>
                        </div>
                        <div className="flex space-x-4">
                          <div className="flex-1">
                            <label className="block text-sm font-bold text-gray-400" htmlFor="country">
                              Country
                            </label>
                            <CustomDropdown
                              id="country"
                              name="country"
                              options={countries}
                              value={selectedCountry}
                              onChange={(e) => {
                                setFieldValue("country", e.target.value);
                                setSelectedCountry(e.target.value);
                              }}
                            />
                            <ErrorMessage name="country" component="div" className="text-red-500 text-sm mt-2" />
                          </div>
                          <div className="flex-1">
                            <label className="block text-sm font-bold text-gray-400" htmlFor="address">
                              Address
                            </label>
                            <Field
                              type="text"
                              id="address"
                              name="address"
                              placeholder="Enter Address"
                              className="mt-1 block w-full border border-gray-700 rounded-md p-2 bg-gray-900 text-white focus:ring focus:ring-ring"
                            />
                            <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-2" />
                          </div>
                        </div>
                        <div className="mt-6 flex justify-end">
                          <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

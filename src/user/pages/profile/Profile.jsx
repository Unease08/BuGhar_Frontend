import React, { useState } from "react";
import profile1 from "../../../assets/profile1.jpg";
import useCountries from "../../../customhooks/UseCountries";
import CustomDropdown from "../../../library/CustomDropdown";
import ProfileSidebar from "../../components/profilesidebar/ProfileSidebar";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  gender: Yup.string().required("Gender is required"),
  dob: Yup.date().required("Date of birth is required").nullable(),
  bio: Yup.string()
    .required("Bio is required")
    .test("min-words", "Bio must be at least 10 words", (value) => {
      if (!value) return false;
      const wordCount = value.trim().split(/\s+/).length;
      return wordCount >= 10;
    }),
  country: Yup.string().required("Country is required"),
  address: Yup.string().required("Address is required"),
  profilePicture: Yup.mixed().required("Profile picture is required"),
});

const Profile = () => {
  const countries = useCountries().map((country) => country.name);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [fileName, setFileName] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

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
                firstName: "",
                lastName: "",
                gender: "",
                dob: "",
                bio: "",
                country: selectedCountry,
                address: "",
                profilePicture: null,
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {({ setFieldValue, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="bg-gray-800 shadow rounded-lg p-4">
                    <div className="bg-gradient-to-r from-gray-700 to-gray-900 p-6 rounded-lg shadow-lg h-[180px]">
                      <h2 className="text-white text-2xl font-bold mb-4">
                        Profile
                      </h2>
                      <div className="flex justify-center absolute left-[55%] top-40">
                        <img
                          alt="Profile Picture"
                          src={profile1}
                          className="rounded-full w-40 h-40 border-2 border-black shadow-xl"
                        />
                      </div>
                    </div>
                    <div className="mt-10 ml-10 flex gap-96">
                      <div>
                        <span className="font-semibold text-xl">Username</span>
                        <p className="text-lg mt-1">Unease21</p>
                      </div>
                      <div>
                        <span className="font-semibold text-xl">Email</span>
                        <p className="text-lg mt-1">anisheyyy@gmail.com</p>
                      </div>
                    </div>
                    <div className="mt-10 ml-10">
                      <h1 className="text-indigo-400 font-bold text-lg">
                        Personal details
                      </h1>
                      <p className="text-gray-400">
                        Personal details are visible on your profile page
                      </p>
                      <div className="mt-5 space-y-4">
                        <div className="flex space-x-4">
                          <div className="flex-1">
                            <label
                              className="block text-sm font-bold text-gray-400"
                              htmlFor="first-name"
                            >
                              First Name
                            </label>
                            <Field
                              type="text"
                              id="first-name"
                              name="firstName"
                              placeholder="Anish"
                              className="mt-1 block w-full border border-gray-700 rounded-md p-2 bg-gray-900 text-white focus:ring focus:ring-ring"
                            />
                            <ErrorMessage
                              name="firstName"
                              component="div"
                              className="text-red-500 text-sm mt-2"
                            />
                          </div>
                          <div className="flex-1">
                            <label
                              className="block text-sm font-bold text-gray-400"
                              htmlFor="last-name"
                            >
                              Last Name
                            </label>
                            <Field
                              type="text"
                              id="last-name"
                              name="lastName"
                              placeholder="Shrestha"
                              className="mt-1 block w-full border border-gray-700 rounded-md p-2 bg-gray-900 text-white focus:ring focus:ring-ring"
                            />
                            <ErrorMessage
                              name="lastName"
                              component="div"
                              className="text-red-500 text-sm mt-2"
                            />
                          </div>
                        </div>
                        <div className="flex space-x-4">
                          <div className="flex-1">
                            <label
                              className="block text-sm font-bold text-gray-400"
                              htmlFor="gender"
                            >
                              Gender
                            </label>
                            <Field
                              as="select"
                              id="gender"
                              name="gender"
                              className="mt-1 block w-full border border-gray-700 rounded-md p-2 bg-gray-900 text-white focus:ring focus:ring-ring"
                            >
                              <option value="">Select Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </Field>
                            <ErrorMessage
                              name="gender"
                              component="div"
                              className="text-red-500 text-sm mt-2"
                            />
                          </div>
                          <div className="flex-1">
                            <label
                              className="block text-sm font-bold text-gray-400"
                              htmlFor="dob"
                            >
                              Date Of Birth
                            </label>
                            <Field
                              type="date"
                              id="dob"
                              name="dob"
                              className="mt-1 block w-full border border-gray-700 rounded-md p-2 bg-gray-900 text-white focus:ring focus:ring-ring"
                            />
                            <ErrorMessage
                              name="dob"
                              component="div"
                              className="text-red-500 text-sm mt-2"
                            />
                          </div>
                        </div>
                        <div className="flex space-x-4">
                          <div className="flex-1">
                            <label
                              className="block text-sm font-bold text-gray-400"
                              htmlFor="bio"
                            >
                              Bio
                            </label>
                            <Field
                              as="textarea"
                              id="bio"
                              name="bio"
                              placeholder="Enter Your Message"
                              className="mt-3 block w-full h-40 border border-gray-700 rounded-md p-2 bg-gray-900 text-white focus:ring focus:ring-ring"
                            />
                            <ErrorMessage
                              name="bio"
                              component="div"
                              className="text-red-500 text-sm mt-2"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-10 ml-10">
                      <h1 className="text-indigo-400 font-bold text-lg">
                        Contact details
                      </h1>
                      <p className="text-gray-400">
                        Contact details are visible on your profile page
                      </p>
                      <div className="mt-5">
                        <div className="flex space-x-4">
                          <div className="flex-1">
                            <label
                              className="block text-sm font-bold text-gray-400"
                              htmlFor="country"
                            >
                              Select Country
                            </label>
                            <CustomDropdown
                              options={countries}
                              value={selectedCountry}
                              onChange={(e) => {
                                setSelectedCountry(e.target.value);
                                setFieldValue("country", e.target.value);
                              }}
                            />
                            <ErrorMessage
                              name="country"
                              component="div"
                              className="text-red-500 text-sm mt-2"
                            />
                          </div>
                          <div className="flex-1">
                            <label
                              className="block text-sm font-bold text-gray-400"
                              htmlFor="address"
                            >
                              Address
                            </label>
                            <Field
                              type="text"
                              id="address"
                              name="address"
                              placeholder="Address"
                              className="mt-1 block w-full border border-gray-700 rounded-md p-2 bg-gray-900 text-white focus:ring focus:ring-ring"
                            />
                            <ErrorMessage
                              name="address"
                              component="div"
                              className="text-red-500 text-sm mt-2"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-10 ml-10">
                      <h1 className="text-indigo-400 font-bold text-lg">
                        Documents
                      </h1>
                      <p className="text-gray-400">
                        Contact details are visible on your profile page
                      </p>
                      <div className="mt-5">
                        <label className="block text-sm font-bold text-gray-400">
                          Profile Picture
                        </label>
                        <div className="flex items-center justify-start mt-2 w-full">
                          <label
                            htmlFor="dropzone-file"
                            className="flex flex-col items-center justify-center w-64 h-80 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 relative"
                          >
                            {imagePreview ? (
                              <img
                                src={imagePreview}
                                alt="Selected Preview"
                                className="w-full h-full rounded-lg object-cover absolute inset-0"
                              />
                            ) : (
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 20 16"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                  />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                  <span className="font-semibold">
                                    Click to upload
                                  </span>{" "}
                                  or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                                </p>
                              </div>
                            )}
                            <input
                              id="dropzone-file"
                              type="file"
                              className="hidden"
                              onChange={(event) =>
                                handleFileChange(event, setFieldValue)
                              }
                            />
                          </label>
                        </div>
                        <ErrorMessage
                          name="profilePicture"
                          component="div"
                          className="text-red-500 text-sm mt-2"
                        />
                        {fileName && (
                          <div className="mt-2">
                            <p className="text-gray-500 dark:text-gray-400">
                              Selected file: {fileName}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-10 ml-10">
                      <div className="flex flex-col items-center justify-center mt-6 md:flex-row">
                        <button
                          type="submit"
                          className="inline-block w-auto text-center min-w-[180px] px-6 py-4 text-white transition-all rounded-md shadow-xl sm:w-auto bg-gradient-to-r from-blue-600 to-blue-500 hover:bg-gradient-to-b dark:shadow-blue-900 shadow-blue-200 hover:shadow-2xl hover:shadow-blue-400 hover:-translate-y-px"
                        >
                          Save Details
                        </button>
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

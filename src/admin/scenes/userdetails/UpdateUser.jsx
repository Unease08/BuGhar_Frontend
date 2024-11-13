import { Box } from "@mui/material";
import { Header } from "../../components";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomDropdown from "../../../library/CustomDropdown";
import useCountries from "../../../customhooks/UseCountries";
import api from "../../../library/Api";
import config from "../../../config";
import toast from "react-hot-toast";

const UpdateUser = () => {
  const countries = useCountries().map((country) => country.name);
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    gender: "",
    role: "",
    address: "",
    country: "",
    is_verified: false,
    bio: "",
  });
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedImage, setSelectedImage] = useState(
    "https://saugat-nepal.com.np/assets/img/profile-img.png"
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`/user/${id}`);
        const userData = response.data;

        const imageUrl = userData.profile_picture
          ? `${config.BASE_URL}/${userData.profile_picture}`
          : "https://saugat-nepal.com.np/assets/img/profile-img.png";
        setInitialValues({
          first_name: userData.first_name || "",
          last_name: userData.last_name || "",
          email: userData.email || "",
          username: userData.username || "",
          gender: userData.gender || "",
          role: userData.role || "",
          address: userData.address || "",
          country: userData.country || "",
          is_verified: userData.is_verified || false,
          bio: userData.bio || "",
        });
        setSelectedCountry(userData.country || "");
      } catch (error) {
        toast.error("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, [id]);

  const validationSchema = Yup.object({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    username: Yup.string().required("Username is required"),
    gender: Yup.string().required("Gender is required"),
    role: Yup.string().required("Role is required"),
    address: Yup.string().required("Address is required"),
    country: Yup.string().required("Country is required"),
    is_verified: Yup.bool().required("Verification status is required"),
    bio: Yup.string()
      .max(500, "Bio must be 500 characters or less")
      .required("Bio is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        if (key === "profile_picture" && value) {
          formData.append(key, value);
        } else if (key !== "profile_picture") {
          formData.append(key, value);
        }
      });

      const response = await api.put(`/user/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("User updated successfully");
      navigate("../users");
      console.log("Updated user data:", values);
    } catch (error) {
      toast.error("Failed to update user");
    }
  };

  return (
    <Box m="20px">
      <Header title="Update User" />
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="max-w-8xl mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-lg flex flex-col gap-8">
            <div className="flex justify-center items-center">
              <label className="w-32 h-32 overflow-hidden rounded-full border-4 border-blue-300 flex justify-center items-center cursor-pointer">
                <img
                  src={selectedImage}
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setSelectedImage(URL.createObjectURL(file));
                      setFieldValue("profile_picture", file);
                    }
                  }}
                />
              </label>
            </div>
            <div className="grid gap-6 mt-2 md:grid-cols-3">
              <div>
                <label className="block mb-2 text-lg font-medium text-white">
                  First Name
                </label>
                <Field
                  type="text"
                  name="first_name"
                  className="border text-lg rounded-lg w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                  placeholder="First Name"
                />
                <ErrorMessage
                  name="first_name"
                  component="div"
                  className="text-red-500 mt-2"
                />
              </div>
              <div>
                <label className="block mb-2 text-lg font-medium text-white">
                  Last Name
                </label>
                <Field
                  type="text"
                  name="last_name"
                  className="border text-lg rounded-lg w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                  placeholder="Last Name"
                />
                <ErrorMessage
                  name="last_name"
                  component="div"
                  className="text-red-500 mt-2"
                />
              </div>
              <div>
                <label className="block mb-2 text-lg font-medium text-white">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  className="border text-lg rounded-lg w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                  placeholder="Email"
                  disabled
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 mt-2"
                />
              </div>
            </div>
            <div className="grid gap-6 mt-2 md:grid-cols-3">
              <div>
                <label className="block mb-2 text-lg font-medium text-white">
                  Username
                </label>
                <Field
                  type="text"
                  name="username"
                  className="border text-lg rounded-lg w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                  placeholder="Username"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 mt-2"
                />
              </div>
              <div>
                <label className="block mb-2 text-lg font-medium text-white">
                  Gender
                </label>
                <Field
                  as="select"
                  name="gender"
                  className="border text-lg rounded-lg w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                >
                  <option value="">Select a gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Others</option>
                </Field>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="text-red-500 mt-2"
                />
              </div>
              <div>
                <label className="block mb-2 text-lg font-medium text-white">
                  Role
                </label>
                <Field
                  as="select"
                  name="role"
                  className="border text-lg rounded-lg w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                >
                  <option value="">Select a role</option>
                  <option value="admin">Admin</option>
                  <option value="company">Company</option>
                  <option value="user">Researcher</option>
                </Field>
                <ErrorMessage
                  name="role"
                  component="div"
                  className="text-red-500 mt-2"
                />
              </div>
            </div>
            <div className="grid gap-6 mt-2 md:grid-cols-3">
              <div>
                <label className="block mb-2 text-lg font-medium text-white">
                  Address
                </label>
                <Field
                  type="text"
                  name="address"
                  className="border text-lg rounded-lg w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                  placeholder="Address"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-500 mt-2"
                />
              </div>
              <div>
                <label className="block mb-2 text-lg font-medium text-white">
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
                  className="border text-lg rounded-lg w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                />
                <ErrorMessage
                  name="country"
                  component="div"
                  className="text-red-500 mt-2"
                />
              </div>
              <div>
                <label className="block mb-2 text-lg font-medium text-white">
                  Is Verified
                </label>
                <Field
                  as="select"
                  name="is_verified"
                  className="border text-lg rounded-lg w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                >
                  <option value="">Select a status</option>
                  <option value="true">Verified</option>
                  <option value="false">Not Verified</option>
                </Field>
                <ErrorMessage
                  name="is_verified"
                  component="div"
                  className="text-red-500 mt-2"
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 text-lg font-medium text-white">
                Bio
              </label>
              <Field
                as="textarea"
                name="bio"
                className="border text-lg rounded-lg w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                placeholder="Bio"
                rows="6"
              />
              <ErrorMessage
                name="bio"
                component="div"
                className="text-red-500 mt-2"
              />
            </div>

            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-6 rounded-lg"
              >
                Update
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default UpdateUser;

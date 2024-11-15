import { Box, Grid, Dialog, DialogContent} from "@mui/material";
import { useState, useEffect } from "react";
import { Header } from "../../components";
import api from "../../../library/Api";
import { toast } from "react-hot-toast";
import config from "../../../config";
import { Link } from "react-router-dom";

const ViewDocument = () => {
  const [documents, setDocuments] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchDocumentData = async () => {
      try {
        const response = await api.get("/company/company-detail");
        console.log("API response:", response.data);

        const company = response.data[0];
        if (company && company.documents) {
          setDocuments(company.documents);
        }
      } catch (error) {
        console.error("Error fetching document data:", error);
        toast.error("Error fetching document data");
      }
    };

    fetchDocumentData();
  }, []);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleOpenModal = (image) => {
    setSelectedImage(image);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedImage(null);
  };

  return (
    <Box m="20px">
      <div className="flex justify-between items-center">
        <Header title="Company Information" />
        <Link to="/company-verification">
          <button className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center focus:ring-gray-700">
            Back
          </button>
        </Link>
      </div>
      <div className="max-w-8xl mx-auto mt-10 p-6 bg-gray-900 rounded-lg shadow-lg flex flex-col gap-8">
        <Grid container spacing={8}>
          {documents.map((doc) => (
            <Grid item xs={12} md={6} key={doc.id}>
              <div className="flex gap-1">
                <p className="font-bold text-gray-200 text-xl">
                  {doc.document_type}{" "}
                </p>
                <span className="text-gray-300 mt-1">
                  (Uploaded on: {formatDate(doc.uploaded_at)})
                </span>
              </div>

              <img
                src={`${config.BASE_URL}/${doc.document_url}`}
                alt={doc.document_type}
                className="mt-3 w-[500px] h-[500px] object-cover rounded-lg shadow-md cursor-pointer"
                onClick={() =>
                  handleOpenModal(`${config.BASE_URL}/${doc.document_url}`)
                }
              />
            </Grid>
          ))}
        </Grid>

        {/* Dialog for full-size image preview */}
        <Dialog
          open={openModal}
          onClose={handleCloseModal}
          maxWidth="lg"
          fullWidth
        >
          <div className="relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-1 right-0 bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-700"
              aria-label="Close image"
            >
              &times;
            </button>
            <DialogContent style={{ padding: 0 }}>
              <img
                src={selectedImage}
                alt="Large view"
                className="w-full h-auto max-w-full max-h-[90vh] object-contain"
              />
            </DialogContent>
          </div>
        </Dialog>
      </div>
    </Box>
  );
};

export default ViewDocument;

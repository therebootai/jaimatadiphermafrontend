import React, { useState, useEffect } from "react";
import axios from "axios";
import ManagePopup from "../../component/adminpannel/ManagePopup";
import AdminDashboardTemplate from "../../template/AdminDashboardTemplate";
import LogoutButton from "../../component/adminpannel/LogoutButton";

const AddAndManagePopup = () => {
  const [popupName, setPopupName] = useState("");
  const [popupImage, setPopupImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [popups, setPopups] = useState([]);

  useEffect(() => {
    fetchPopups();
  }, []);

  // Fetch popups from the backend
  const fetchPopups = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/popups/get`
      );
      setPopups(response.data);
    } catch (error) {
      setError("Failed to load popups.");
    }
  };

  // Handle form submission for creating a new popup
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    const formData = new FormData();
    formData.append("popupName", popupName);
    formData.append("popupImage", popupImage);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/popups/create`,
        formData
      );
      if (response.status === 201) {
        setMessage("Popup created successfully.");
        setPopupName("");
        setPopupImage(null);
        fetchPopups(); // Refresh the popup list after creating a new popup
      }
    } catch (error) {
      setError("Require All Filed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminDashboardTemplate>
      <div className="flex justify-end items-end w-full">
        <LogoutButton />
      </div>
      <div className="p-4 flex flex-col gap-6">
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-2 py-4"
        >
          <label>Popup</label>
          <div className="flex flex-col gap-2">
            <div className="w-full flex items-center gap-4">
              <input
                type="text"
                value={popupName}
                onChange={(e) => setPopupName(e.target.value)}
                required
                className="xl:w-[40%] lg:w-[50%] sm:w-[60%] h-[3.5rem] p-2 focus:outline-none outline-[#191919] bg-[white] text-black rounded-md border border-[#CCCCCC]"
              />

              <input
                type="file"
                onChange={(e) => setPopupImage(e.target.files[0])}
                required
                className="xl:w-[40%] lg:w-[50%] sm:w-[60%] h-[3.5rem] p-2 focus:outline-none outline-[#191919] bg-[white] text-black rounded-md border border-[#CCCCCC]"
              />

              <button
                type="submit"
                disabled={loading}
                className="xl:w-[15%] lg:w-[25%] sm:w-[30%] h-[3.5rem] bg-[#2AAA8A] rounded-md shadow-custom text-lg text-[white] font-medium flex justify-center items-center"
              >
                {loading ? "Uploading..." : "Submit"}
              </button>
            </div>
            {error && <p className="text-red-600">{error}</p>}
            {message && <p className="text-green-600">{message}</p>}
          </div>
        </form>

        {/* Manage popups (listing, editing, deleting, toggling active status) */}
        <ManagePopup popups={popups} fetchPopups={fetchPopups} />
      </div>
    </AdminDashboardTemplate>
  );
};

export default AddAndManagePopup;

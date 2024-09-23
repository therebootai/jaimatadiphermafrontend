import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminDashboardTemplate from "../../template/AdminDashboardTemplate";
import ManagePackagingSize from "../../component/adminpannel/ManagePackagingSizes";
import LogoutButton from "../../component/adminpannel/LogoutButton";

const AddAndManagePackagingSize = () => {
  const [packagingSizeName, setPackagingSizeName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [packagingSizes, setPackagingSizes] = useState([]);
  const [error, setError] = useState("");

  // Fetch packaging sizes when the component loads
  useEffect(() => {
    fetchPackagingSizes();
  }, []);

  // Function to fetch all packaging sizes from the server
  const fetchPackagingSizes = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/packagingsize/get`
      );
      setPackagingSizes(response.data); // Set the packaging sizes data in state
    } catch (error) {
      console.error("Error fetching packaging sizes:", error);
      setError("Failed to load packaging sizes.");
    }
  };

  // Function to handle form submission for adding a new packaging size
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading spinner or button text
    setMessage(""); // Reset message and error before new request
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/packagingsize/create`,
        { packagingsizeName: packagingSizeName }
      );

      if (response.status === 201) {
        setMessage(response.data.message); // Set success message
        setPackagingSizeName(""); // Clear the form input
        fetchPackagingSizes(); // Refresh packaging sizes list
      } else {
        setError(response.data.error || "Failed to create packaging size");
      }
    } catch (error) {
      console.error("Error creating packaging size:", error);
      setError(error.response?.data?.error || "Server error");
    } finally {
      setLoading(false); // Stop the loading spinner or button text
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
          <label className="text-lg text-black font-medium">
            Packaging Size Name
          </label>
          <div className="w-full flex items-center gap-4">
            <input
              type="text"
              value={packagingSizeName}
              onChange={(e) => setPackagingSizeName(e.target.value)}
              className="w-[30%] h-[3.5rem] p-2 focus:outline-none outline-[#191919] bg-[white] text-black rounded-md border border-[#CCCCCC]"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-[15%] h-[3.5rem] bg-[#2AAA8A] rounded-md shadow-custom text-lg text-[white] font-medium flex justify-center items-center"
            >
              {loading ? "Adding..." : "Submit"}
            </button>
          </div>
          {error && <p className="text-red-600">{error}</p>}
          {message && <p className="text-black">{message}</p>}
        </form>

        {/* Packaging size management with pagination */}
        <ManagePackagingSize
          packagingSizes={packagingSizes}
          fetchPackagingSizes={fetchPackagingSizes}
        />
      </div>
    </AdminDashboardTemplate>
  );
};

export default AddAndManagePackagingSize;

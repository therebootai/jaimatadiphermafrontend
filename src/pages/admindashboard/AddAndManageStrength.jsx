import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminDashboardTemplate from "../../template/AdminDashboardTemplate";
import ManageStrengths from "../../component/adminpannel/ManageStrength";
import LogoutButton from "../../component/adminpannel/LogoutButton";
import { useNavigate } from "react-router-dom";
import { MdAddCircleOutline } from "react-icons/md";

const AddAndManageStrength = () => {
  const [strengthName, setStrengthName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [strengths, setStrengths] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchStrengths();
  }, []);

  const fetchStrengths = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/strengths/get`
      );
      setStrengths(response.data);
    } catch (error) {
      console.error("Error fetching strengths:", error);
      setError("Failed to load strengths.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/strengths/create`,
        { strengthName }
      );

      if (response.status === 201) {
        setMessage(response.data.message);
        setStrengthName("");
        fetchStrengths();
      } else {
        setError(response.data.error || "Failed to create strength");
      }
    } catch (error) {
      console.error("Error creating strength:", error);
      setError(error.response?.data?.error || "Server error");
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewClick = () => {
    navigate("/admin/add&manageproduct", {
      state: { showAddNewProduct: true },
    });
  };

  return (
    <AdminDashboardTemplate>
      <div className="flex justify-end items-center gap-6 w-full">
        <button
          onClick={handleAddNewClick}
          className="h-[2.5rem] px-6 text-base bg-[#2AAA8A] gap-2 flex justify-center items-center text-white rounded-md"
        >
          <MdAddCircleOutline /> Add New
        </button>
        <LogoutButton />
      </div>
      <div className="p-4 flex flex-col gap-6">
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-2 py-4"
        >
          <label className="text-lg text-black font-medium">
            Strength Name
          </label>
          <div className="w-full flex items-center gap-4">
            <input
              type="text"
              value={strengthName}
              onChange={(e) => setStrengthName(e.target.value)}
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

        {/* Strength management with pagination */}
        <ManageStrengths
          strengths={strengths}
          fetchStrengths={fetchStrengths}
        />
      </div>
    </AdminDashboardTemplate>
  );
};

export default AddAndManageStrength;

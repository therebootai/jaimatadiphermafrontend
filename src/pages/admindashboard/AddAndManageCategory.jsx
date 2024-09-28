import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminDashboardTemplate from "../../template/AdminDashboardTemplate";
import ManageCategories from "../../component/adminpannel/ManageCategories";
import LogoutButton from "../../component/adminpannel/LogoutButton";
import { MdAddCircleOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const AddAndManageCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/categories/get`
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Failed to load categories.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/categories/create`,
        { categoryName }
      );

      if (response.status === 201) {
        setMessage(response.data.message);
        setCategoryName("");
        fetchCategories();
      } else {
        setError(response.data.error || "Failed to create category");
      }
    } catch (error) {
      console.error("Error creating category:", error);
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
      <div className="flex justify-end items-center  gap-6 w-full">
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
            Category Name
          </label>
          <div className="w-full flex items-center gap-4">
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="xl:w-[40%] lg:w-[50%] sm:w-[60%] h-[3.5rem] p-2 focus:outline-none outline-[#191919] bg-[white] text-black rounded-md border border-[#CCCCCC]"
              required
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
          {message && <p className="text-black">{message}</p>}
        </form>

        {/* Render the ManageCategories component and pass the fetched categories */}
        <ManageCategories
          categories={categories}
          fetchCategories={fetchCategories}
        />
      </div>
    </AdminDashboardTemplate>
  );
};

export default AddAndManageCategory;

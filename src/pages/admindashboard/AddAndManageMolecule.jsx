import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminDashboardTemplate from "../../template/AdminDashboardTemplate";
import ManageMolecules from "../../component/adminpannel/ManageMolecule";
import LogoutButton from "../../component/adminpannel/LogoutButton";
import { useNavigate } from "react-router-dom";
import { MdAddCircleOutline } from "react-icons/md";

const AddAndManageMolecule = () => {
  const [moleculeName, setMoleculeName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [molecules, setMolecules] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchMolecules();
  }, []);

  const fetchMolecules = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/molecules/get`
      );
      setMolecules(response.data);
    } catch (error) {
      console.error("Error fetching molecules:", error);
      setError("Failed to load molecules.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/molecules/create`,
        { moleculeName }
      );

      if (response.status === 201) {
        setMessage(response.data.message);
        setMoleculeName("");
        fetchMolecules();
      } else {
        setError(response.data.error || "Failed to create molecule");
      }
    } catch (error) {
      console.error("Error creating molecule:", error);
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
            Molecule Name
          </label>
          <div className="w-full flex items-center gap-4">
            <input
              type="text"
              value={moleculeName}
              onChange={(e) => setMoleculeName(e.target.value)}
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

        {/* Molecule management with pagination */}
        <ManageMolecules
          molecules={molecules}
          fetchMolecules={fetchMolecules}
        />
      </div>
    </AdminDashboardTemplate>
  );
};

export default AddAndManageMolecule;

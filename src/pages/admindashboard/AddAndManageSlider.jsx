import React, { useState, useEffect } from "react";
import axios from "axios";
import ManageSliders from "../../component/adminpannel/ManageSlider";
import AdminDashboardTemplate from "../../template/AdminDashboardTemplate";
import LogoutButton from "../../component/adminpannel/LogoutButton";
import { MdAddCircleOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const AddAndManageSlider = () => {
  const [sliderName, setSliderName] = useState("");
  const [sliderImage, setSliderImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sliders, setSliders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/sliders/get`
      );
      setSliders(response.data);
    } catch (error) {
      console.error("Error fetching sliders:", error);
      setError("Failed to load sliders.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    if (sliderImage && sliderImage.size > 1 * 1024 * 1024) {
      setError("Image size should not exceed 1MB.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("sliderName", sliderName);
    formData.append("sliderImage", sliderImage);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/sliders/create`,
        formData
      );

      if (response.status === 201) {
        setMessage("Slider created successfully.");
        setSliderName("");
        setSliderImage(null);
        fetchSliders();
      }
    } catch (error) {
      setError("Require All Filed");
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
          <label className="text-lg text-black font-medium">Slider</label>
          <div className="w-full flex items-center gap-4">
            <input
              type="text"
              value={sliderName}
              onChange={(e) => setSliderName(e.target.value)}
              className="xl:w-[40%] lg:w-[50%] sm:w-[60%] h-[3.5rem] p-2 focus:outline-none outline-[#191919] bg-[white] text-black rounded-md border border-[#CCCCCC]"
              required
            />
            <input
              type="file"
              onChange={(e) => setSliderImage(e.target.files[0])}
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

        <ManageSliders sliders={sliders} fetchSliders={fetchSliders} />
      </div>
    </AdminDashboardTemplate>
  );
};

export default AddAndManageSlider;

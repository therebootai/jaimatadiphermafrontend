import React, { useState } from "react";
import axios from "axios";
import { FaCheck } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

const ManagePopup = ({ popups, fetchPopups }) => {
  const [loading, setLoading] = useState(false);
  const [editingPopup, setEditingPopup] = useState(null);
  const [editedPopupName, setEditedPopupName] = useState("");
  const [editedPopupImage, setEditedPopupImage] = useState(null); // New image state
  const [showModal, setShowModal] = useState(false);
  const [popupToDelete, setPopupToDelete] = useState(null);

  const baseURL = `${import.meta.env.VITE_BASE_URL}/upload`; // Assuming the images are stored in 'upload' folder on the server

  // Handle editing a popup
  const handleEditClick = (popup) => {
    setEditingPopup(popup);
    setEditedPopupName(popup.popupName);
    setEditedPopupImage(null); // Reset image state
  };

  // Handle saving the edited popup
  const handleSaveClick = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("popupName", editedPopupName);
      if (editedPopupImage) {
        formData.append("popupImage", editedPopupImage); // Add new image if uploaded
      }

      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/popups/update/${
          editingPopup.popupId
        }`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchPopups(); // Refresh the popup list after update
      setEditingPopup(null);
      setEditedPopupName("");
      setEditedPopupImage(null);
    } catch (error) {
      console.error("Error updating popup:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle canceling the edit
  const handleCancelClick = () => {
    setEditingPopup(null);
    setEditedPopupName("");
    setEditedPopupImage(null);
  };

  // Handle deleting a popup
  const handleDeleteClick = (popup) => {
    setPopupToDelete(popup);
    setShowModal(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/popups/delete/${
          popupToDelete.popupId
        }`
      );
      fetchPopups(); // Refresh the popup list after deletion
      setShowModal(false);
      setPopupToDelete(null);
    } catch (error) {
      console.error("Error deleting popup:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle toggling the active status
  const handleToggleActive = async (popupId, isActive) => {
    setLoading(true);
    try {
      await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/api/popups/setactive/${popupId}`,
        {
          active: !isActive,
        }
      );
      fetchPopups();
    } catch (error) {
      console.error("Error toggling active status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="lg:w-[90%] sm:w-full">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row p-4 gap-4 font-medium text-base bg-[#2AAA8A] text-white w-full border-b">
            <div className="w-[30%]">Popup Name</div>
            <div className="w-[30%]">Popup Image</div>
            <div className="w-[20%]">Actions</div>
            <div className="w-[20%]">Active</div>
          </div>
          <div className="flex flex-col h-[50vh] no-scrollbar overflow-auto">
            {popups.map((popup) => (
              <div
                className="flex flex-row p-4 items-center border-b border-[#BBBBBB] gap-4 font-medium text-base w-full"
                key={popup.popupId}
              >
                {editingPopup && editingPopup.popupId === popup.popupId ? (
                  <>
                    <div className="w-[30%]">
                      <input
                        type="text"
                        value={editedPopupName}
                        onChange={(e) => setEditedPopupName(e.target.value)}
                        className="w-full h-[3.5rem] p-2 focus:outline-none outline-[#5BC0DE] bg-[white] border text-[#FF2722] rounded-sm"
                      />
                    </div>
                    <div className="w-[30%]">
                      <input
                        type="file"
                        onChange={(e) => setEditedPopupImage(e.target.files[0])}
                        className="w-full h-[3.5rem] p-2 focus:outline-none outline-[#5BC0DE] bg-[white] border text-[#FF2722] rounded-sm"
                      />
                    </div>
                    <div className="flex flex-row items-center w-[20%] font-semibold gap-5">
                      <button
                        className="text-[#5BC0DE]"
                        disabled={loading}
                        onClick={handleSaveClick}
                      >
                        {loading ? "Saving..." : <FaCheck />}
                      </button>
                      <button
                        className="text-[#D53F3A]"
                        onClick={handleCancelClick}
                      >
                        <RxCross2 />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-sm font-semibold w-[30%]">
                      {popup.popupName}
                    </div>
                    <div className="text-sm font-semibold w-[30%]">
                      <img
                        src={`${import.meta.env.VITE_BASE_URL}${
                          popup.popupImage
                        }`}
                        alt="Popup"
                        className="h-[5rem]"
                      />
                    </div>
                    <div className="flex flex-row w-[20%] items-center font-semibold gap-5">
                      <button
                        className="text-[#5BC0DE]"
                        onClick={() => handleEditClick(popup)}
                      >
                        <FiEdit />
                      </button>
                      <button
                        className="text-[#D53F3A]"
                        onClick={() => handleDeleteClick(popup)}
                      >
                        <RiDeleteBin5Line />
                      </button>
                    </div>
                    <div className="w-[20%]">
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={popup.active}
                          onChange={() =>
                            handleToggleActive(popup.popupId, popup.active)
                          }
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this popup?</p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={() => setShowModal(false)}
              >
                No
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={confirmDelete}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePopup;

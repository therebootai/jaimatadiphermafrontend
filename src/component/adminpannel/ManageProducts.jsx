import React, { useEffect, useState } from "react";
import { MdAddCircleOutline, MdVisibility } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import AdminDashboardTemplate from "../../template/AdminDashboardTemplate";
import LogoutButton from "./LogoutButton";
import DashboardComponent from "./DashboardComponent";
import AddNewProduct from "./AddNewProduct";
import EditProduct from "./EditProduct";
import ViewProduct from "./ViewProduct";
import LoadingAnimation from "../LoadingAnimation";
import { useLocation } from "react-router-dom";

const ManageProducts = ({ showthissection }) => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(20);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showViewProduct, setShowViewProduct] = useState(false);
  const [viewProductId, setViewProductId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [noDataMessage, setNoDataMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const getCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/categories/get`
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (location.state?.showAddNewProduct) {
      setShowAddProduct(true);
    }
  }, [location]);

  const headers = [
    "Brand Name",
    "Category",
    "Molecule",
    "Strength",
    "Packing Size",
    "Action",
    "Bulk Action",
  ];

  const handleAddNewClick = () => {
    setShowAddProduct(true);
  };

  const handleClose = () => {
    setShowAddProduct(false);
  };
  const handleCloseEditProduct = () => {
    setShowEditProduct(false);
    setEditProductId(null);
  };

  const handleEditClick = (productId) => {
    setEditProductId(productId);
    setShowEditProduct(true);
  };

  const handleNewProductAdded = (newProduct) => {
    setProducts([newProduct, ...products]);
    setShowAddProduct(false);
  };

  const handleViewClick = (productId) => {
    setViewProductId(productId);
    setShowViewProduct(true);
  };

  const handleCloseViewProduct = () => {
    setShowViewProduct(false);
    setViewProductId(null);
  };

  const getProducts = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/products/get`,
        {
          params: {
            page,
            limit: pageSize,
            category: selectedCategory,
            search: searchQuery,
          },
        }
      );

      const fetchedProducts = response.data.data;
      setProducts(fetchedProducts);
      setTotalPages(response.data.totalPages);

      if (fetchedProducts.length === 0) {
        if (selectedCategory) {
          setNoDataMessage("This category is not created");
        } else if (searchQuery) {
          setNoDataMessage(
            `No results found for "${searchQuery}" in brand name or molecule`
          );
        } else {
          setNoDataMessage("No products found");
        }
      } else {
        setNoDataMessage("");
      }
    } catch (error) {
      console.error("Error fetching products", error);
      setNoDataMessage("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts(1);
  }, [selectedCategory, searchQuery]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    getProducts(newPage);
  };

  const handlePageJump = (event) => {
    const newPage = parseInt(event.target.value);
    handlePageChange(newPage);
  };

  const handleProductUpdated = (updatedProduct) => {
    const updatedProducts = products.map((product) =>
      product.productId === updatedProduct.productId ? updatedProduct : product
    );
    setProducts(updatedProducts);
    setShowEditProduct(false);
  };

  useEffect(() => {
    getProducts(currentPage);
  }, [currentPage]);

  const generatePageMilestones = () => {
    const milestones = [];
    milestones.push(1);

    for (let i = 10; i < totalPages; i += 20) {
      milestones.push(i);
    }

    if (totalPages > 1 && !milestones.includes(totalPages)) {
      milestones.push(totalPages);
    }

    return milestones;
  };

  const handleToggleActive = async (productId, active) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/api/products/setactive/${productId}`,
        { active: !active }
      );

      const updatedProducts = products.map((product) =>
        product.productId === productId
          ? { ...product, active: !active }
          : product
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error toggling product active status:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/products/delete/${productToDelete}`
      );
      alert("Product deleted successfully!");

      setProducts(
        products.filter((product) => product.productId !== productToDelete)
      );

      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const renderPagination = () => {
    const maxPagesToShow = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

    const paginationButtons = [];
    for (let i = startPage; i <= endPage; i++) {
      paginationButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 border ${
            i === currentPage
              ? "bg-[#2AAA8A] text-white"
              : "bg-white text-[#555555]"
          } rounded-md mx-1`}
        >
          {i}
        </button>
      );
    }

    return paginationButtons;
  };

  return (
    <AdminDashboardTemplate>
      <div className="flex flex-col gap-6 relative">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center gap-4">
            <button className="xlg:h-[2.5rem] sm:h-[2rem] px-6 sm:text-sm xlg:text-base bg-[#2AAA8A] flex justify-center items-center text-white rounded-md">
              Import
            </button>
            <button className="xlg:h-[2.5rem] sm:h-[2rem] px-6 sm:text-sm xlg:text-base bg-[#2AAA8A] flex justify-center items-center text-white rounded-md">
              Export
            </button>
            <div className="flex flex-row items-center gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)} // Update selected category
                className="xlg:h-[2.5rem] sm:h-[2rem] px-2 text-base bg-white outline-none rounded-md"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category._id} value={category.categoryName}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-row gap-4 items-center">
            <div>
              <input
                type="text"
                placeholder="Search by Brand or Molecule"
                className="xlg:h-[2.5rem] sm:h-[2rem] w-full sm:text-sm xlg:text-base bg-white px-2 outline-none rounded-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              onClick={handleAddNewClick}
              className="xlg:h-[2.5rem] sm:h-[2rem] px-6 sm:text-sm xlg:text-base bg-[#2AAA8A] gap-2 flex justify-center items-center text-white rounded-md"
            >
              <MdAddCircleOutline /> Add New
            </button>
            <div>
              <LogoutButton />
            </div>
          </div>
        </div>
        {showthissection && (
          <div className="">
            <DashboardComponent addproduct={handleAddNewClick} />
          </div>
        )}

        <div className="w-full">
          {loading ? (
            <LoadingAnimation />
          ) : (
            <div className="flex flex-col">
              {noDataMessage ? (
                <div className="text-center py-4 text-red-500">
                  {noDataMessage}
                </div>
              ) : (
                <>
                  <div className="flex flex-row px-2 py-4 gap-4 font-medium sm:text-sm xlg:text-base bg-[#2AAA8A] text-white w-full border-b">
                    {headers.map((header, index) => (
                      <div className="flex-1" key={index}>
                        {header}
                      </div>
                    ))}
                  </div>
                  <div>
                    {products.map((product) => (
                      <div
                        key={product.productId}
                        className="flex flex-row xlg:text-base sm:text-xs  px-2 py-4 gap-4 w-full border-b"
                      >
                        <div className="flex-1 twolinelimit">
                          {product.brandName}
                        </div>
                        <div className="flex-1 twolinelimit">
                          {product.categoryName}
                        </div>
                        <div className="flex-1 twolinelimit">
                          {product.moleculeName}
                        </div>
                        <div className="flex-1 twolinelimit">
                          {product.strengthName}
                        </div>
                        <div className="flex-1 twolinelimit">
                          {product.packagingsizeName}
                        </div>

                        <div className="flex-1">
                          <label className="switch">
                            <input
                              type="checkbox"
                              checked={product.active}
                              onChange={() =>
                                handleToggleActive(
                                  product.productId,
                                  product.active
                                )
                              }
                            />
                            <span className="slider"></span>
                          </label>
                        </div>

                        <div className="flex-1 flex gap-4 text-xl items-center">
                          <button
                            className="text-[#7F03FA]"
                            onClick={() => handleViewClick(product.productId)}
                          >
                            <MdVisibility />
                          </button>
                          <button
                            className="text-[#00B252]"
                            onClick={() => handleEditClick(product.productId)}
                          >
                            <TbEdit />
                          </button>
                          <button
                            className="text-[#E40000]"
                            onClick={() => {
                              setProductToDelete(product.productId);
                              setShowDeleteModal(true);
                            }}
                          >
                            <RiDeleteBin6Line />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex flex-row gap-4 items-center">
            <label htmlFor="pageJump">Jump to page: </label>
            <select
              id="pageJump"
              value={currentPage}
              onChange={handlePageJump}
              className="ml-2 p-2  px-6 outline-none rounded-md"
            >
              {generatePageMilestones().map((page) => (
                <option key={page} value={page}>
                  {page}
                </option>
              ))}
            </select>
            <button
              onClick={() => handlePageChange(totalPages)}
              className="flex flex-row gap-1 hover:text-[#2AAA8A] font-medium items-center"
            >
              <h1>Total Pages:</h1>
              <span className=" cursor-pointer ">{totalPages}</span>
            </button>
          </div>

          <div className="flex justify-center items-center mt-4">
            <button
              className="px-3 py-1 text-[#555555]  mx-1"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {renderPagination()}
            <button
              className="px-3 py-1 text-[#555555] mx-1"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>

        <div
          className={`fixed top-0 right-0 h-screen w-[50%] overflow-scroll no-scrollbar bg-[#EDF4F7] shadow-lg transform transition-transform duration-300 ease-in-out ${
            showAddProduct ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-end p-4">
            <button onClick={handleClose}>
              <AiOutlineClose size={24} />
            </button>
          </div>

          <div className="p-4">
            <AddNewProduct onProductAdded={handleNewProductAdded} />
          </div>
        </div>
        <div
          className={`fixed top-0 right-0 h-screen overflow-scroll no-scrollbar w-[50%] bg-[#EDF4F7] shadow-lg transform transition-transform duration-300 ease-in-out ${
            showEditProduct ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-end p-4">
            <button onClick={handleCloseEditProduct}>
              <AiOutlineClose size={24} />
            </button>
          </div>

          <div className="p-4">
            {editProductId && (
              <EditProduct
                productId={editProductId}
                onProductUpdated={handleProductUpdated}
                onClose={handleCloseEditProduct}
              />
            )}
          </div>
        </div>
        {/* Sliding View Product Panel */}
        <div
          className={`fixed top-0 right-0 h-screen w-[50%] overflow-scroll no-scrollbar bg-[#EDF4F7] shadow-lg transform transition-transform duration-300 ease-in-out ${
            showViewProduct ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-end p-4">
            <button onClick={handleCloseViewProduct}>
              <AiOutlineClose size={24} />
            </button>
          </div>

          <div className="p-4">
            {viewProductId && (
              <ViewProduct
                productId={viewProductId}
                onClose={handleCloseViewProduct}
              />
            )}
          </div>
        </div>

        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <p className="mb-4">
                Are you sure you want to delete this product?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Yes
                </button>
                <button
                  onClick={handleDeleteCancel}
                  className="px-4 py-2 bg-gray-300 rounded-md"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminDashboardTemplate>
  );
};

export default ManageProducts;

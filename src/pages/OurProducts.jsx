import React, { useEffect, useState } from "react";
import MainPageTemplate from "../template/MainPageTemplate";
import SubBanner from "../component/SubBanner";
import axios from "axios";
import SearchComponent from "../component/SearchComponent";
import { useLocation } from "react-router-dom";
import PopupEnquiryBox from "../component/PopupEnquiryBox";

const OurProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(20);
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null); // Track selected product for enquiry
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Handle "Order Now" click
  const handleOrderNowClick = (product) => {
    setSelectedProduct(product); // Set the selected product
    setIsPopupVisible(true); // Show the popup
  };

  // Close the popup
  const closePopup = () => {
    setIsPopupVisible(false); // Hide the popup
  };

  // Fetch categories from API
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

  const getProducts = async (category = "", page = 1, search = "") => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/products/get`,
        {
          params: {
            active: true,
            category: category ? category : undefined,
            search: search ? search : undefined,
            page: page,
            limit: limit,
          },
        }
      );
      setProducts(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };
  useEffect(() => {
    if (searchQuery) {
      getProducts(selectedCategory, currentPage, searchQuery);
    } else {
      getProducts(selectedCategory, currentPage, "");
    }
  }, [searchQuery, selectedCategory, currentPage]);

  useEffect(() => {
    getCategories();
  }, []);

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory((prevCategory) => {
      const newCategory = prevCategory === categoryName ? "" : categoryName;
      setSearchQuery(""); // Clear the search query when a new category is selected
      window.history.pushState({}, "", "/ourproducts"); // Remove search query from URL

      getProducts(
        newCategory,
        1,
        "" // Pass an empty string for search when a category is clicked
      );

      setCurrentPage(1); // Reset to first page when changing category
      return newCategory;
    });
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPagination = () => {
    const buttons = [];
    const maxVisiblePages = 5; // Maximum number of pages to display at a time
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2)
    ); // Calculate the start page
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1); // Calculate the end page

    // Adjust startPage if we're near the end to always show 5 pages
    const adjustedStartPage = Math.max(
      1,
      Math.min(startPage, totalPages - maxVisiblePages + 1)
    );

    for (let i = adjustedStartPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 mx-1 ${
            currentPage === i
              ? "bg-[#2AAA8A] text-white"
              : "bg-white text-[#2AAA8A]"
          } rounded-lg border border-[#2AAA8A]`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-white text-[#2AAA8A] border border-[#2AAA8A] rounded-lg disabled:opacity-50"
        >
          Prev
        </button>

        {buttons}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-white text-[#2AAA8A] border border-[#2AAA8A] rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <MainPageTemplate>
      <SubBanner heading={"Our Products"} bannerimg={"/images/subbanner.png"} />
      <SearchComponent
        getProducts={getProducts}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        currentPage={currentPage}
      />

      <div className="xl:p-16 lg:p-8 sm:p-4 flex flex-col gap-8">
        <div className="w-full flex items-center gap-2">
          <div className="flex w-full border-b-2 border-[#2AAA8A]">
            <span className="h-[3rem] px-8 flex justify-center items-center bg-[#2AAA8A] text-xl font-semibold text-white rounded-t-xl">
              Our Products
            </span>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 sm:gap-2 lg:gap-4">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(category.categoryName)}
              className={`w-full rounded-md flex justify-center items-center sm:text-xs lg:text-sm h-[2rem] ${
                selectedCategory === category.categoryName
                  ? "bg-[#2AAA8A] text-white"
                  : "text-[#2AAA8A] border border-[#2AAA8A]"
              }`}
            >
              {category.categoryName}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 sm:grid-cols-2  xlg:grid-cols-4 sm:gap-2 lg:gap-4">
          {products.length > 0 ? (
            products.map((item, index) => (
              <div key={index} className="flex flex-col gap-4">
                <div className="flex flex-col sm:gap-1 md:gap-2 sm:p-2 lg:p-4 boxshinside rounded-lg">
                  <span>
                    <img
                      src={`${import.meta.env.VITE_BASE_URL}${
                        item.productImage
                      }`}
                      alt={item.brandName}
                      className="boxshinside rounded-lg "
                    />
                  </span>
                  <div className="flex flex-col sm:h-[8rem] md:h-fit justify-center sm:text-xs lg:text-sm font-medium text-[#666666] items-center gap-1">
                    <div className="text-lg font-semibold">
                      {item.brandName}
                    </div>
                    <div>{item.moleculeName}</div>
                    <div>Strength: {item.strengthName}</div>
                    <div>Packing: {item.packagingsizeName}</div>
                    <div>Price: {item.productPrice}/-</div>
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={() => handleOrderNowClick(item)}
                      className="h-[2rem] md:w-[70%] sm:w-full lg:w-[50%] flex rounded-lg justify-center items-center bg-gradient-to-r from-[#2AAA8A] to-[#114437] sm:text-base xlg:text-base font-semibold text-white"
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-4 text-center text-red-500">
              {selectedCategory || searchQuery
                ? "No products found for this category or search."
                : "No products available."}
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4">{renderPagination()}</div>

        {isPopupVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center h-screen z-50">
            <div className="lg:w-[50%] sm:w-[95%] md:w-[80%]">
              <PopupEnquiryBox
                product={selectedProduct}
                closePopup={closePopup}
              />
            </div>
          </div>
        )}
      </div>
    </MainPageTemplate>
  );
};

export default OurProducts;

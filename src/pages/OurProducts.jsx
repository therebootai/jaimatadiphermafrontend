import React, { useEffect, useState } from "react";
import MainPageTemplate from "../template/MainPageTemplate";
import SubBanner from "../component/SubBanner";
import axios from "axios";
import SearchComponent from "../component/SearchComponent";
import { useLocation, useNavigate } from "react-router-dom";
import PopupEnquiryBox from "../component/PopupEnquiryBox";
import HomeLoadingAnimation from "../component/HomeLoadingAnimation";

const OurProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(20);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOrderNowClick = (product) => {
    setSelectedProduct(product);
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

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
      setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQueryFromUrl = queryParams.get("search");
    if (searchQueryFromUrl) {
      setSearchQuery(searchQueryFromUrl);
      getProducts(selectedCategory, currentPage, searchQueryFromUrl);
    } else {
      getProducts(selectedCategory, currentPage, "");
    }
  }, [location.search, selectedCategory, currentPage]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryFromUrl = queryParams.get("category");

    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
      getProducts(categoryFromUrl, 1);
    }
  }, [location.search]);

  useEffect(() => {
    getCategories();
  }, []);

  const formatMoleculeAndStrength = (moleculeName, strengthName) => {
    const molecules = moleculeName.split("+").map((mol) => mol.trim());
    const strengths = strengthName.split("+").map((str) => str.trim());

    return molecules
      .map((molecule, index) => {
        const strength = strengths[index] ? `(${strengths[index]})` : "";
        return `${molecule}${strength}`;
      })
      .join(", ");
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory((prevCategory) => {
      const newCategory = prevCategory === categoryName ? "" : categoryName;
      getProducts(newCategory, 1, searchQuery);
      setCurrentPage(1);
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
    const maxVisiblePages = 5;
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    const adjustedStartPage = Math.max(
      1,
      Math.min(startPage, totalPages - maxVisiblePages + 1)
    );

    for (let i = adjustedStartPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`md:px-4 md:py-2 sm:px-2 sm:py-1 mx-1 md:text-base sm:text-xs ${
            currentPage === i
              ? "bg-[#0047AD] text-white"
              : "bg-white text-[#0047AD]"
          } sm:rounded-sm md:rounded-lg border border-[#2AAA8A]`}
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
          className="md:px-4 md:py-2 sm:px-2 sm:py-1 md:text-base sm:text-xs bg-white text-[#0047AD] border border-[#0047AD] sm:rounded-sm md:rounded-lg disabled:opacity-50"
        >
          Prev
        </button>

        {buttons}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="md:px-4 md:py-2 sm:px-2 sm:py-1 md:text-base sm:text-xs bg-white text-[#0047AD] border border-[#0047AD] sm:rounded-sm md:rounded-lg disabled:opacity-50"
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
        initialQuery={searchQuery}
        setSearchQueryProp={setSearchQuery}
      />

      <div className="xl:p-16 lg:p-8 sm:p-4 flex flex-col gap-8">
        <div className="w-full flex items-center gap-2">
          <div className="flex w-full border-b-2 border-[#0047AD]">
            <span className="h-[3rem] px-8 flex justify-center items-center bg-gradient-to-r from-[#0047AD] to-[#001D47] text-xl font-semibold text-white rounded-t-xl">
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
                  ? "bg-[#0047AD] text-white"
                  : "text-[#0047AD] border border-[#0047AD]"
              }`}
            >
              {category.categoryName}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 sm:grid-cols-2  xlg:grid-cols-4 sm:gap-2 lg:gap-4">
          {loading ? (
            <div className="">
              <HomeLoadingAnimation />
            </div>
          ) : (
            <>
              {products.length > 0 ? (
                products.map((item, index) => (
                  <div key={index} className="flex flex-col gap-4">
                    <div className="flex flex-col sm:gap-2 md:gap-2 sm:p-2 lg:p-4 h-full boxshinside rounded-lg">
                      <span>
                        <img
                          src={`${import.meta.env.VITE_BASE_URL}${
                            item.productImage
                          }`}
                          alt={item.brandName}
                          className="boxshinside rounded-lg w-full lg:h-[16rem] sm:h-[12rem] xl:h-[18rem] "
                        />
                      </span>
                      <div className="flex flex-col  text-center md:h-fit justify-center sm:text-xs lg:text-xs font-medium text-[#666666] items-center gap-1">
                        <div className="text-sm font-semibold">
                          {item.brandName}
                        </div>
                        <div>
                          {formatMoleculeAndStrength(
                            item.moleculeName,
                            item.strengthName
                          )}
                        </div>
                        <div>Packing: {item.packagingsizeName}</div>
                        <div>Price: {item.productPrice}/-</div>
                      </div>
                      <div className="flex items-end justify-center h-full ">
                        <button
                          onClick={() => handleOrderNowClick(item)}
                          className="h-[2rem] md:w-[70%] sm:w-full lg:w-[50%] flex sm:rounded-md md:rounded-lg justify-center items-center bg-gradient-to-r from-[#0047AD] to-[#001D47] sm:text-base xlg:text-base font-semibold text-white"
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
            </>
          )}
        </div>

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

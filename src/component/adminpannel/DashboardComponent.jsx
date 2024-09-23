import React, { useEffect, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";

const DashboardComponent = ({ addproduct }) => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);

  useEffect(() => {
    const fetchTotalProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/products/get`
        );
        setTotalProducts(response.data.totalDocuments);
      } catch (error) {
        console.error("Error fetching total products:", error);
      }
    };

    const fetchTotalCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/categories/get`
        );
        if (Array.isArray(response.data)) {
          setTotalCategories(response.data.length);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching total categories:", error);
      }
    };

    fetchTotalProducts();
    fetchTotalCategories();
  }, []);

  return (
    <div className="p-4 border-t border-[#666666]">
      <div className="grid grid-cols-4 gap-6">
        <div className="p-6 flex flex-col justify-center gap-2 items-center bg-white rounded-lg boxsh">
          <h1 className="text-3xl text-center flex justify-center text-[#555555] items-center font-semibold w-[40%]">
            Total Products
          </h1>
          <p className="text-2xl text-[#2AAA8A] font-bold">{totalProducts}</p>
        </div>
        <div className="p-6 flex flex-col justify-center gap-2 items-center bg-white rounded-lg boxsh">
          <h1 className="text-3xl text-center flex justify-center text-[#555555] items-center font-semibold w-[40%]">
            Total Categories
          </h1>
          <p className="text-2xl text-[#2AAA8A] font-bold">{totalCategories}</p>
        </div>
        <button
          onClick={addproduct}
          className="p-6 flex flex-col justify-center gap-2 items-center bg-white rounded-lg boxsh"
        >
          <h1 className="text-3xl text-center flex justify-center text-[#555555] items-center font-semibold w-[40%]">
            Add Products
          </h1>
          <span className="text-[#2AAA8A] text-2xl">
            <FiPlusCircle />
          </span>
        </button>
        <Link
          to="/admin/add&manageproduct"
          className="p-6 flex flex-col justify-center items-center gap-2 bg-white rounded-lg boxsh"
        >
          <h1 className="text-3xl text-center flex justify-center text-[#555555] items-center font-semibold w-[40%]">
            Manage Products
          </h1>
          <span>
            <img
              src="/images/manageproducts.svg"
              alt="Manage Products"
              className="h-[2rem]"
            />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default DashboardComponent;

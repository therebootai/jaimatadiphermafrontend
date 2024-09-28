import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewProduct = ({ productId, onClose }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/products/get/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    if (productId) fetchProduct();
  }, [productId]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="xlg:p-8 sm:p-4">
      <h2 className="text-lg font-bold mb-4">Product Details</h2>
      <div className="grid grid-cols-1 sm:text-sm xlg:text-base sm:gap-4 xlg:gap-6">
        <div className="flex flex-row items-center gap-2">
          <label htmlFor="brandName">Brand Name:</label>
          <span>{product.brandName}</span>
        </div>

        <div className="flex flex-row items-center gap-2">
          <label htmlFor="categoryName">Category Name:</label>
          <span>{product.categoryName}</span>
        </div>

        <div className="flex flex-row items-center gap-2">
          <label htmlFor="moleculeName">Molecule Name:</label>
          <span>{product.moleculeName}</span>
        </div>

        <div className="flex flex-row items-center gap-2">
          <label htmlFor="strengthName">Strength Name:</label>
          <span>{product.strengthName}</span>
        </div>

        <div className="flex flex-row items-center gap-2">
          <label htmlFor="packagingsizeName">Packaging Size:</label>
          <span>{product.packagingsizeName}</span>
        </div>

        <div className="flex flex-row items-center gap-2">
          <label htmlFor="productPrice">M.R.P:</label>
          <span>{product.productPrice}</span>
        </div>

        <div className="flex flex-row items-center gap-2">
          <label htmlFor="active">Active Status:</label>
          <span>{product.active ? "Active" : "Inactive"}</span>
        </div>

        {/* Product Image */}
        <div className="flex flex-col gap-2">
          <label htmlFor="productImage">Thumbnail Image:</label>
          <img
            src={`${import.meta.env.VITE_BASE_URL}${product.productImage}`}
            alt="Product Thumbnail"
            className="w-32 h-32 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;

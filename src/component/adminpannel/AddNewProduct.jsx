import React, { useState, useEffect } from "react";
import axios from "axios";

const AddNewProduct = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({
    brandName: "",
    categoryName: "",
    moleculeName: "",
    strengthName: "",
    packagingsizeName: "",
    productPrice: "",
    productImage: null,
  });
  const [categories, setCategories] = useState([]);
  const [molecules, setMolecules] = useState([]);
  const [strengths, setStrengths] = useState([]);
  const [packagingSizes, setPackagingSizes] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryRes, moleculeRes, strengthRes, packagingSizeRes] =
          await Promise.all([
            axios.get(`${import.meta.env.VITE_BASE_URL}/api/categories/get`),
            axios.get(`${import.meta.env.VITE_BASE_URL}/api/molecules/get`),
            axios.get(`${import.meta.env.VITE_BASE_URL}/api/strengths/get`),
            axios.get(`${import.meta.env.VITE_BASE_URL}/api/packagingsize/get`),
          ]);

        setCategories(categoryRes.data);
        setMolecules(moleculeRes.data);
        setStrengths(strengthRes.data);
        setPackagingSizes(packagingSizeRes.data);
      } catch (error) {
        console.error("Error fetching dropdown data", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // Check if file size is greater than 512 KB
    if (file && file.size > 512 * 1024) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        productImage: "Image size should be less than 512 KB",
      }));
      setFormData({
        ...formData,
        productImage: null, // Reset the file if it exceeds the size
      });
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        productImage: "",
      }));
      setFormData({
        ...formData,
        productImage: file,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.brandName) newErrors.brandName = "Brand Name is required";
    if (!formData.categoryName) newErrors.categoryName = "Category is required";
    if (!formData.moleculeName) newErrors.moleculeName = "Molecule is required";
    if (!formData.strengthName) newErrors.strengthName = "Strength is required";
    if (!formData.packagingsizeName)
      newErrors.packagingsizeName = "Packaging Size is required";
    if (!formData.productPrice) newErrors.productPrice = "M.R.P is required";
    if (!formData.productImage)
      newErrors.productImage = "Thumbnail Image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (formData.productImage && formData.productImage.size > 512 * 1024) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        productImage: "Image size should be less than 512 KB",
      }));
      return; // Prevent submission if the image size is too large
    }

    const productData = new FormData();
    productData.append("brandName", formData.brandName);
    productData.append("categoryName", formData.categoryName);
    productData.append("moleculeName", formData.moleculeName);
    productData.append("strengthName", formData.strengthName);
    productData.append("packagingsizeName", formData.packagingsizeName);
    productData.append("productPrice", formData.productPrice);
    productData.append("productImage", formData.productImage);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/products/create`,
        productData
      );

      onProductAdded(response.data.data);
      setFormData({
        brandName: "",
        categoryName: "",
        moleculeName: "",
        strengthName: "",
        packagingsizeName: "",
        productPrice: "",
        productImage: null,
      });
    } catch (error) {
      console.error("Error creating product", error);
    }
  };

  return (
    <div className="p-8">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6">
          {/* Brand Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="brandName">Brand Name</label>
            <input
              type="text"
              name="brandName"
              placeholder="Brand Name"
              value={formData.brandName}
              onChange={handleChange}
              className="bg-white rounded-md px-2 h-[3.5rem] text-[#666666] "
            />
            {errors.brandName && (
              <span className="text-red-500">{errors.brandName}</span>
            )}
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <label htmlFor="categoryName">Category</label>
            <select
              name="categoryName"
              value={formData.categoryName}
              onChange={handleChange}
              className="bg-white rounded-md px-2 h-[3.5rem] text-[#666666]"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.categoryId} value={category.categoryName}>
                  {category.categoryName}
                </option>
              ))}
            </select>
            {errors.categoryName && (
              <span className="text-red-500">{errors.categoryName}</span>
            )}
          </div>

          {/* Molecule */}
          <div className="flex flex-col gap-2">
            <label htmlFor="moleculeName">Molecule/Composition</label>
            <select
              name="moleculeName"
              value={formData.moleculeName}
              onChange={handleChange}
              className="bg-white rounded-md px-2 h-[3.5rem] text-[#666666]"
            >
              <option value="">Select Molecule</option>
              {molecules.map((molecule) => (
                <option key={molecule.moleculeId} value={molecule.moleculeName}>
                  {molecule.moleculeName}
                </option>
              ))}
            </select>
            {errors.moleculeName && (
              <span className="text-red-500">{errors.moleculeName}</span>
            )}
          </div>

          {/* Strength */}
          <div className="flex flex-col gap-2">
            <label htmlFor="strengthName">Strength</label>
            <select
              name="strengthName"
              value={formData.strengthName}
              onChange={handleChange}
              className="bg-white rounded-md px-2 h-[3.5rem] text-[#666666]"
            >
              <option value="">Select Strength</option>
              {strengths.map((strength) => (
                <option key={strength.strengthId} value={strength.strengthName}>
                  {strength.strengthName}
                </option>
              ))}
            </select>
            {errors.strengthName && (
              <span className="text-red-500">{errors.strengthName}</span>
            )}
          </div>

          {/* Packaging Size */}
          <div className="flex flex-col gap-2">
            <label htmlFor="packagingsizeName">Packaging Size</label>
            <select
              name="packagingsizeName"
              value={formData.packagingsizeName}
              onChange={handleChange}
              className="bg-white rounded-md px-2 h-[3.5rem] text-[#666666]"
            >
              <option value="">Select Packaging Size</option>
              {packagingSizes.map((size) => (
                <option
                  key={size.packagingsizeId}
                  value={size.packagingsizeName}
                >
                  {size.packagingsizeName}
                </option>
              ))}
            </select>
            {errors.packagingsizeName && (
              <span className="text-red-500">{errors.packagingsizeName}</span>
            )}
          </div>

          {/* MRP */}
          <div className="flex flex-col gap-2">
            <label htmlFor="productPrice">M.R.P</label>
            <input
              type="text"
              name="productPrice"
              placeholder="M.R.P"
              value={formData.productPrice}
              onChange={handleChange}
              className="bg-white rounded-md px-2 h-[3.5rem] text-[#666666] "
            />
            {errors.productPrice && (
              <span className="text-red-500">{errors.productPrice}</span>
            )}
          </div>

          {/* Thumbnail Image */}
          <div className="flex flex-col gap-2">
            <label htmlFor="productImage">Thumbnail Image</label>
            <input
              type="file"
              name="productImage"
              accept="image/*"
              onChange={handleFileChange}
              className="bg-white rounded-md  p-2 h-[3.5rem] text-[#666666] "
            />
            {errors.productImage && (
              <span className="text-red-500">{errors.productImage}</span>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 bg-[#2AAA8A] w-fit px-8 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNewProduct;

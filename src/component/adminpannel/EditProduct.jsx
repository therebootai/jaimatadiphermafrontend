import React, { useState, useEffect } from "react";
import axios from "axios";

const EditProduct = ({ productId, onClose, onProductUpdated }) => {
  const [formData, setFormData] = useState({
    brandName: "",
    categoryName: "",
    moleculeName: "",
    strengthName: "",
    packagingsizeName: "",
    productPrice: "",
    productImage: null,
  });

  const [previewImage, setPreviewImage] = useState("");
  const [categories, setCategories] = useState([]);
  const [molecules, setMolecules] = useState([]);
  const [strengths, setStrengths] = useState([]);
  const [packagingSizes, setPackagingSizes] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          categoryRes,
          moleculeRes,
          strengthRes,
          packagingSizeRes,
          productRes,
        ] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BASE_URL}/api/categories/get`),
          axios.get(`${import.meta.env.VITE_BASE_URL}/api/molecules/get`),
          axios.get(`${import.meta.env.VITE_BASE_URL}/api/strengths/get`),
          axios.get(`${import.meta.env.VITE_BASE_URL}/api/packagingsize/get`),
          axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/products/get/${productId}`
          ),
        ]);

        setCategories(categoryRes.data);
        setMolecules(moleculeRes.data);
        setStrengths(strengthRes.data);
        setPackagingSizes(packagingSizeRes.data);
        const productData = productRes.data;
        setFormData({
          brandName: productData.brandName,
          categoryName: productData.categoryName,
          moleculeName: productData.moleculeName,
          strengthName: productData.strengthName,
          packagingsizeName: productData.packagingsizeName,
          productPrice: productData.productPrice,
        });

        setPreviewImage(productData.productImage.secure_url);
      } catch (error) {
        console.error("Error fetching product or dropdown data", error);
      }
    };
    fetchData();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      productImage: file,
    });

    setPreviewImage(URL.createObjectURL(file));
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) return;

    const productData = new FormData();
    productData.append("brandName", formData.brandName);
    productData.append("categoryName", formData.categoryName);
    productData.append("moleculeName", formData.moleculeName);
    productData.append("strengthName", formData.strengthName);
    productData.append("packagingsizeName", formData.packagingsizeName);
    productData.append("productPrice", formData.productPrice);

    if (formData.productImage) {
      productData.append("productImage", formData.productImage);
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/products/update/${productId}`,
        productData
      );
      onProductUpdated(response.data.data);
      onClose();
    } catch (error) {
      console.error("Error updating product", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="xlg:p-8 sm:p-4">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 sm:gap-3 xlg:gap-6">
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
              className="bg-white rounded-md p-2 h-[3.5rem] text-[#666666] "
            />
            {errors.productImage && (
              <span className="text-red-500">{errors.productImage}</span>
            )}

            {/* Preview existing image */}
            {previewImage && (
              <div className="mt-2">
                <img
                  src={previewImage}
                  alt="Product Thumbnail"
                  className="w-32 h-32 object-cover"
                />
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 bg-[#2AAA8A] w-fit px-8 text-white py-2 rounded-md hover:bg-blue-700"
        >
          {loading ? "Uploading..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;

import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const PopupEnquiryBox = ({ product, closePopup }) => {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!mobileNumber) newErrors.mobileNumber = "Mobile number is required";
    if (!product) newErrors.product = "Product is required";
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const encodedMessage = encodeURIComponent(
      `Enquiry Details:
      \nName: ${name}
      \nMobile: ${mobileNumber}
      \nProduct: ${product?.brandName}
      \nMolecule Name: ${product?.moleculeName}
      \nStrength: ${product?.strengthName}
      \nPacking: ${product?.packagingsizeName}
      \nPrice: ${product?.productPrice}
      \nMessage: ${message || "No additional message"}`
    );

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const whatsappUrl = isDesktop
      ? `https://web.whatsapp.com/send?phone=91&text=${encodedMessage}`
      : `https://api.whatsapp.com/send?phone=91&text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="relative flex flex-col gap-4 xl:p-8 lg:p-4 sm:p-3 w-full opacity-100 rounded-lg bg-[#0047AD] justify-center items-center">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 rounded-lg"
        style={{ backgroundImage: `url(/images/enquirybg.png)` }}
      ></div>
      <div className="w-full flex justify-center items-center ">
        <img src="/images/klip.svg" alt="" className="h-[3rem]" />
      </div>

      {product && (
        <div className="bg-white sm:p-2 xlg:p-4 rounded-md shadow-md w-full">
          <h2 className="text-lg font-semibold xlg:mb-2">
            Product Enquiry Details
          </h2>
          <p>Brand Name: {product.brandName}</p>
          <p>Molecule Name: {product.moleculeName}</p>
          <p>Strength: {product.strengthName}</p>
          <p>Packing: {product.packagingsizeName}</p>
          <p>Price: {product.productPrice}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid sm:grid-cols-1 md:grid-cols-2 sm:gap-2 xlg:gap-4 w-full relative mt-4"
      >
        <div className="flex flex-col gap-2">
          <label className="text-white">Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="xlg:h-[4rem] sm:h-[3.5rem] px-2 rounded-md outline-none w-full bg-white"
            required
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-white">Mobile Number</label>
          <input
            type="text"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className="xlg:h-[4rem] sm:h-[3.5rem] px-2 rounded-md w-full bg-white"
            required
          />
          {errors.mobileNumber && (
            <p className="text-red-500">{errors.mobileNumber}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-white">Select Product Name</label>
          <input
            type="text"
            value={product ? product.brandName : ""}
            className="xlg:h-[4rem] sm:h-[3.5rem] px-2 rounded-md w-full bg-white"
            readOnly
          />
          {errors.product && <p className="text-red-500">{errors.product}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-white">Message</label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="xlg:h-[4rem] sm:h-[3.5rem] px-2 rounded-md w-full bg-white"
          />
        </div>

        <button
          className="w-full xlg:h-[4rem] sm:h-[3.5rem] lg:mt-5 bg-white flex justify-center items-center text-xl font-semibold rounded-md"
          type="submit"
        >
          Enquiry Now
        </button>
      </form>

      <button
        onClick={closePopup}
        className="absolute top-4 right-4 bg-white text-[#0047AD] w-6 h-6 flex justify-center items-center rounded-full"
      >
        <RxCross2 />
      </button>
    </div>
  );
};

export default PopupEnquiryBox;

import React from "react";
import { RxCross2 } from "react-icons/rx";

const PopupEnquiryBox = ({ product, closePopup }) => {
  return (
    <div className="relative flex flex-col gap-4 xl:p-8 lg:p-4 sm:p-3 w-full opacity-100 rounded-lg bg-[#0047AD] justify-center items-center">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 rounded-lg"
        style={{ backgroundImage: `url(/images/enquirybg.png)` }}
      ></div>
      <div className="w-full flex justify-center items-center ">
        <img src="/images/klip.svg" alt="" className="h-[3rem]" />
      </div>

      {/* Display product information */}
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

      <form className="grid sm:grid-cols-1 md:grid-cols-2  sm:gap-2 xlg:gap-4 w-full relative mt-4">
        <div className="flex flex-col gap-2">
          <label className="text-white" htmlFor="">
            Your Name
          </label>
          <input
            type="text"
            className="xlg:h-[4rem] sm:h-[3.5rem] px-2 rounded-md outline-none w-full bg-white "
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white" htmlFor="">
            Mobile Number
          </label>
          <input
            type="text"
            className="xlg:h-[4rem] sm:h-[3.5rem] px-2 rounded-md w-full bg-white "
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white" htmlFor="">
            Select Product Name
          </label>
          <input
            type="text"
            value={product ? product.brandName : ""}
            className="xlg:h-[4rem] sm:h-[3.5rem] px-2 rounded-md w-full bg-white "
            readOnly
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white" htmlFor="">
            Message
          </label>
          <input
            type="text"
            className="xlg:h-[4rem] sm:h-[3.5rem] px-2 rounded-md w-full bg-white "
          />
        </div>
        <button
          className=" w-full xlg:h-[4rem] sm:h-[3.5rem] lg:mt-5 bg-white flex justify-center items-center text-xl font-semibold rounded-md"
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

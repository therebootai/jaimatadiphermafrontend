import React, { useState } from "react";
import MainPageTemplate from "../template/MainPageTemplate";
import SubBanner from "../component/SubBanner";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

const OurGallery = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openModal = (index) => {
    setSelectedImageIndex(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const navigateImage = (direction) => {
    if (direction === "prev") {
      setSelectedImageIndex((prevIndex) =>
        prevIndex === 0 ? gallery.length - 1 : prevIndex - 1
      );
    } else if (direction === "next") {
      setSelectedImageIndex((prevIndex) =>
        prevIndex === gallery.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const gallery = ["/images/about2.png", "/images/about3.png"];
  return (
    <MainPageTemplate>
      <SubBanner heading={"Our Gallery"} bannerimg={"/images/subbanner.png"} />
      <div className="grid md:grid-cols-3 sm:grid-cols-2 xlg:grid-cols-4 sm:gap-4 lg:gap-6">
        {gallery.map((item, index) => (
          <div key={index} className="p-2 bg-[#26B4D7] rounded-lg">
            <img
              src={item}
              onClick={() => openModal(index)}
              alt=""
              className="rounded-lg border-2 border-white cursor-pointer"
            />
          </div>
        ))}
      </div>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full z-[100] flex justify-center items-center bg-black bg-opacity-80">
          <div className="relative w-full flex justify-center items-center">
            <div className="flex flex-col gap-4 items-center justify-center">
              <span>
                <img
                  src={gallery[selectedImageIndex]}
                  alt=""
                  className="xlg:h-[40rem] lg:h-[30rem] md:h-[30rem] sm:h-[20rem]"
                />
              </span>
            </div>
            <div className="absolute w-full flex justify-between p-4">
              <FaChevronLeft
                className="text-white text-3xl cursor-pointer"
                onClick={() => navigateImage("prev")}
              />
              <FaChevronRight
                className="text-white text-3xl cursor-pointer"
                onClick={() => navigateImage("next")}
              />
            </div>
          </div>
          <div className="absolute top-0 right-0 p-16">
            <FaTimes
              className="text-white text-3xl cursor-pointer"
              onClick={closeModal}
            />
          </div>
        </div>
      )}
    </MainPageTemplate>
  );
};

export default OurGallery;

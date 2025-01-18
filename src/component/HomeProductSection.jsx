import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Slider from "react-slick";
import PopupEnquiryBox from "./PopupEnquiryBox";
import { Link } from "react-router-dom";

const HomeProductSection = () => {
  const [products, setProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null); // Track selected product for enquiry
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleOrderNowClick = (product) => {
    setSelectedProduct(product);
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/products/get?active=true`
      );
      const fetchedProducts = response.data.data || [];

      const randomProducts = shuffleArray(fetchedProducts).slice(0, 10);

      setProducts(randomProducts);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  useEffect(() => {
    if (isPopupVisible) {
      const firstInput = document.querySelector("#popup-input");
      if (firstInput) {
        firstInput.focus();
      }
    }
  }, [isPopupVisible]);

  useEffect(() => {
    getProducts();
  }, []);

  const [slidesToShow, setSlidesToShow] = useState(3);
  const [autoplay, setAutoplay] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 550) {
        setSlidesToShow(1);
        setAutoplay(true);
      } else if (window.innerWidth <= 850) {
        setSlidesToShow(2);
        setAutoplay(true);
      } else if (window.innerWidth <= 1024) {
        setSlidesToShow(3);
        setAutoplay(true);
      } else if (window.innerWidth <= 1280) {
        setSlidesToShow(3);
        setAutoplay(true);
      } else if (window.innerWidth <= 1780) {
        setSlidesToShow(4);
        setAutoplay(true);
      } else {
        setSlidesToShow(5);
        setAutoplay(true);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute top-1/2 sm:hidden lg:block sm:left-[-2rem] lg:left-[-1.5rem] xl:left-[-3rem] transform -translate-y-1/2 z-10  rounded-full flex justify-center items-center "
      >
        <span className="w-5 h-5  bg-[#0047AD] flex justify-center items-center rounded-full">
          <BiLeftArrowAlt className="text-base text-white" />
        </span>
      </button>
    );
  };

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute top-1/2 sm:hidden lg:block sm:right-[-2rem] xlg:right-[-2rem] lg:right-[-2rem] xl:right-[-3rem] transform -translate-y-1/2 z-10 flex justify-center items-center "
      >
        <span className="w-5 h-5  bg-[#0047AD] flex justify-center items-center rounded-full">
          <BiRightArrowAlt className="text-base text-white" />
        </span>
      </button>
    );
  };

  const settings = {
    infinite: products.length > slidesToShow,
    speed: 2000,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: autoplay,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    centerMode: false,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  const formatMoleculeAndStrength = (moleculeName = "", strengthName = "") => {
    const molecules = moleculeName.split("+").map((mol) => mol.trim());
    const strengths = strengthName.split("+").map((str) => str.trim());

    return molecules
      .map((molecule, index) => {
        const strength = strengths[index] ? `(${strengths[index]})` : "";
        return `${molecule}${strength}`;
      })
      .join(", ");
  };

  return (
    <div className="xl:p-16 lg:p-8 sm:p-4 flex flex-col gap-6">
      <div className="w-full flex items-center gap-2">
        <div className="flex sm:w-[60%] md:w-[75%]  lg:w-[85%] border-b-2 border-[#0047AD]">
          <span className="md:h-[3rem] sm:h-[2.5rem] md:px-4 sm:px-4 lg:px-8 flex justify-center items-center bg-gradient-to-r from-[#0047AD] to-[#001D47] md:text-base sm:text-sm lg:text-xl font-semibold text-white sm:rounded-t-md lg:rounded-t-xl">
            Our Products
          </span>
        </div>
        <Link
          to={"/ourproducts"}
          className="lg:w-[15%] sm:w-[40%] md:w-[25%] text-[#0047AD] from-[#0047AD] to-[#001D47] flex items-center justify-center sm:text-sm md:text-base xl:text-xl"
        >
          <span>View all products</span>
          <MdKeyboardDoubleArrowRight />
        </Link>
      </div>
      <div className="w-full">
        <Slider {...settings}>
          {products.map((item, index) => (
            <div key={index} className="p-4 !flex flex-col gap-4">
              <div className="flex flex-col gap-2 p-4 boxshinside h-full rounded-lg">
                <span>
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}${item.productImage}`}
                    alt={item.brandName}
                    className="boxshinside rounded-lg w-full h-[18rem]"
                  />
                </span>
                <div className="flex flex-col justify-center text-center sm:text-xs lg:text-xs font-medium text-[#666666] items-center gap-1">
                  <div className="text-sm font-semibold h-[2.5rem]">
                    {item.brandName}
                  </div>
                  <div className="onelinelimit">
                    {formatMoleculeAndStrength(
                      item.moleculeName || "",
                      item.strengthName || ""
                    )}
                  </div>
                  <div>Packing: {item.packagingsizeName}</div>
                  <div>Price: {item.productPrice}/-</div>
                </div>
              </div>
              <div className="flex flex-row items-center gap-4">
                <button
                  onClick={() => handleOrderNowClick(item)}
                  className="h-[2.5rem] w-[50%] flex rounded-lg justify-center items-center bg-gradient-to-r from-[#0047AD] to-[#001D47] sm:text-base xlg:text-base font-semibold text-white"
                >
                  Order Now
                </button>
                <button
                  onClick={() => handleOrderNowClick(item)}
                  className="h-[2.5rem] w-[50%] rounded-lg flex justify-center items-center bg-gradient-to-r from-[#FF9900] to-[#995C00] sm:text-base xlg:text-base lg:text-base font-semibold text-white"
                >
                  Enquiry Now
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center h-screen z-50">
          <div className="lg:w-[50%] sm:w-[95%] md:w-[80%]" inert>
            <PopupEnquiryBox
              product={selectedProduct}
              closePopup={closePopup}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeProductSection;

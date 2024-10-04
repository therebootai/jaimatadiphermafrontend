import React, { useEffect, useState } from "react";
import Slider from "react-slick";

const ImportantBgComponent = () => {
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
        setSlidesToShow(5);
        setAutoplay(false);
      } else if (window.innerWidth <= 1780) {
        setSlidesToShow(5);
        setAutoplay(false);
      } else {
        setSlidesToShow(5);
        setAutoplay(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const settings = {
    infinite: true,
    speed: 3000,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: autoplay,
    autoplaySpeed: 5000,
    pauseOnHover: false,

    centerMode: false,
    arrows: false,
  };
  const important = [
    { img: "/images/120+products.svg", text: "1000+ Products" },
    { img: "/images/delivery.svg", text: "Door-step Medicine Delivery" },
    { img: "/images/available.svg", text: "120+ Cities Serviceable" },
    { img: "/images/payment.svg", text: "Online Payment" },
    { img: "/images/totalproduct.svg", text: "Best Product pricing" },
  ];
  return (
    <div className="p-4 xl:p-16 lg:p-8 ">
      <div className="bg-[url('/images/informationbg.jpg')] rounded-lg w-full h-full resize bg-cover bg-center flex items-center justify-center">
        <div className="xlg:p-16 lg:p-8 sm:p-6 sm:w-full xlg:w-full">
          <Slider {...settings}>
            {important.map((item, index) => (
              <div
                key={index}
                className="w-full !flex justify-center items-center"
              >
                <div className="w-[80%] flex flex-col gap-4 items-center justify-center">
                  <img src={item.img} alt="" className="h-[5rem]" />

                  <h1 className="xl:text-2xl xlg:text-xl sm:text-2xl text-center font-semibold text-white">
                    {item.text}
                  </h1>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ImportantBgComponent;

import React, { useEffect, useState } from "react";
import Slider from "react-slick";

const MissionVissionComponent = () => {
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
        setAutoplay(false);
      } else if (window.innerWidth <= 1280) {
        setSlidesToShow(3);
        setAutoplay(false);
      } else if (window.innerWidth <= 1780) {
        setSlidesToShow(3);
        setAutoplay(false);
      } else {
        setSlidesToShow(3);
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
    speed: 2000,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: autoplay,
    autoplaySpeed: 3000,
    pauseOnHover: false,

    centerMode: false,
    arrows: false,
  };
  const missionvission = [
    {
      icons: "/images/mission.svg",
      heading: "Our Mission",
      description:
        "Our mission at Jai Matadi Enterprise is to empower healthcare professionals with reliable access to essential and critical medications. We are dedicated to building a supply chain that consistently delivers quality products to hospitals, clinics, and pharmacies. Through ethical practices, transparency, and a customer-focused approach, we aim to support the healthcare community’s mission of saving lives. By maintaining high standards, we ensure that patients receive timely care and contribute to the overall well-being of communities across India.",
    },
    {
      icons: "/images/vision.svg",
      heading: "Our Vision",
      description:
        "Jai Matadi Enterprise envisions becoming the foremost trusted partner in the critical healthcare sector, ensuring the seamless availability of life-saving medicines across India. We aspire to be known not just for our extensive product range but for the reliability and dedication we bring to healthcare providers and patients alike. Our vision is to support healthcare systems by providing consistent, high-quality access to essential drugs, fostering a healthier society where everyone has timely access to the treatments they need, whenever and wherever they need them.",
    },
    {
      icons: "/images/value.svg",
      heading: "Our Value",
      description:
        "At Jai Matadi Enterprise, our core values are Reliability, Integrity, and Service. We prioritize consistent reliability in every aspect of our operations, ensuring that our partners can depend on us. Our commitment to integrity drives us to uphold transparency and honesty, building trust within the healthcare sector. Service is central to our purpose, as we strive to meet and exceed the needs of healthcare providers. Together, these values shape our identity, guiding our mission to make essential medicines accessible and available to all.",
    },
  ];
  return (
    <div className="xl:p-16 lg:p-8 sm:p-4 flex justify-center items-center ">
      <div className="w-full">
        <Slider {...settings}>
          {missionvission.map((item, index) => (
            <div
              key={index}
              className="!flex justify-center items-center w-full sm:p-2 lg:p-4"
            >
              <div className="xlg:p-8 lg:p-4 sm:p-4 boxsh bg-gradient-to-b from-[#FFFFFF] to-[#E9E9E9] rounded-lg !flex flex-col justify-center xl:w-[95%] items-center gap-4">
                <div className=" h-[3.5rem] w-[3.5rem] rounded-lg bg-[#2AAA8A1A] flex justify-center items-center">
                  <img src={item.icons} alt="" className="h-[1.6rem]" />
                </div>
                <h1 className="xl:text-2xl lg:text-xl sm:text-lg font-semibold text-[#0047AD]">
                  {item.heading}
                </h1>
                <p className="text-[#666666] xm:text-sm lg:text-xs/[18px] xlg:text-sm/[22px] xl:text-sm/[24px] ">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default MissionVissionComponent;

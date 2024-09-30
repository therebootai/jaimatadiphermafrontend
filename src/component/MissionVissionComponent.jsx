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
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      icons: "/images/vision.svg",
      heading: "Our Vision",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      icons: "/images/value.svg",
      heading: "Our Value",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
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

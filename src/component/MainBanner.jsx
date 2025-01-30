import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
const preloadImages = (imageUrls) => {
  imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
};
const MainBanner = () => {
  const [sliders, setSliders] = useState([]);

  const settings = {
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    fade: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    arrows: false,
  };

  useEffect(() => {
    const imageUrls = sliders.map((sliders) => sliders.imgsrc);
    preloadImages(imageUrls);
  }, [sliders]);

  const fetchSliders = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/sliders/get?active=true`
      );
      setSliders(response.data);
    } catch (error) {
      console.error("Error fetching sliders:", error);
    }
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  return (
    <div className="w-full ">
      <Slider {...settings}>
        {sliders.map((slider, index) => (
          <div key={index} className="">
            <img
              src={slider.sliderImage.secure_url}
              loading="lazy"
              alt="slider"
              className="h-auto w-full object-cover z-[-10]"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MainBanner;

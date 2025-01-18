import React, { useEffect, useState } from "react";
import axios from "axios";
import MainPageTemplate from "../template/MainPageTemplate";
import MainBanner from "../component/MainBanner";
import SearchComponent from "../component/SearchComponent";
import AboutUsComponent from "../component/AboutUsComponent";
import MissionVissionComponent from "../component/MissionVissionComponent";
import ImportantBgComponent from "../component/ImportantBgComponent";
import HomeProductSection from "../component/HomeProductSection";
import ComitmentSection from "../component/ComitmentSection";
import { FaRegWindowClose } from "react-icons/fa";

const Home = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const fetchPopupData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/popups/get?active=true`
        );

        if (response.status === 200 && response.data.length > 0) {
          const activePopup = response.data.find((popup) => popup.active);
          if (activePopup) {
            setPopupData(activePopup);

            if (!sessionStorage.getItem("popupShown")) {
              setIsPopupVisible(true);
              sessionStorage.setItem("popupShown", "true");
            }
          } else {
            console.warn("No active popup found");
          }
        } else {
          console.warn("No popup data found");
        }
      } catch (error) {
        console.warn("Failed to fetch popup data:", error);
      }
    };

    fetchPopupData();
  }, []);

  useEffect(() => {
    if (popupData && popupData.popupImage) {
      const imageUrl = `${import.meta.env.VITE_BASE_URL}${
        popupData.popupImage
      }`;

      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        setIsImageLoaded(true);
      };
    }
  }, [popupData]);

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <MainPageTemplate>
      <MainBanner />
      <SearchComponent />
      <AboutUsComponent />
      <MissionVissionComponent />
      <ImportantBgComponent />
      <HomeProductSection />
      <ComitmentSection />
      {isPopupVisible && isImageLoaded && popupData && (
        <div className="fixed top-0 z-[100] left-0 w-full bg-black bg-opacity-25 h-full flex items-center justify-center overflow-y-scroll">
          <div className="w-full sm:h-[50vh] lg:h-[100vh] justify-center items-center flex flex-col rounded-lg">
            <div className="sm:w-[85%] md:w-[60%] lg:w-[40%] xl:w-[35%] relative rounded-lg bg-white">
              <div className="w-full h-[4rem] border-b border-[#A8579C]">
                <button
                  className="bg-[#0047AD] text-white lg:w-16 absolute transform -translate-y-1/2 top-8 right-2 lg:h-10 sm:w-12 sm:h-8 flex items-center justify-center rounded-lg hover:bg-white hover:text-[#0047AD] border-2 border-[#0047AD]"
                  onClick={handleClosePopup}
                >
                  <FaRegWindowClose className="lg:text-2xl sm:text-xl" />
                </button>
              </div>
              <div className="p-4">
                <img
                  src={`${import.meta.env.VITE_BASE_URL}${
                    popupData.popupImage
                  }`}
                  alt="Popup"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </MainPageTemplate>
  );
};

export default Home;

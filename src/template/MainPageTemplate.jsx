import React, { useEffect } from "react";
import TopHeader from "../component/TopHeader";
import Header from "../component/Header";
import FooterComponent from "../component/FooterComponent";

const MainPageTemplate = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="flex  w-full h-full flex-col font-lexend  overflow-x-hidden ">
        <div>
          <TopHeader />
        </div>
        <div>
          <Header />
        </div>

        <div className=" sm:mt-[3.5rem] md:mt-[5.5rem] lg:mt-[5rem] xlg:mt-[5.9rem]">
          {children}
        </div>
        <FooterComponent />
      </div>
    </div>
  );
};

export default MainPageTemplate;

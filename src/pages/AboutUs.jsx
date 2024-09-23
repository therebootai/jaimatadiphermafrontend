import React from "react";
import MainPageTemplate from "../template/MainPageTemplate";
import SubBanner from "../component/SubBanner";
import AboutUsComponent from "../component/AboutUsComponent";
import ImportantBgComponent from "../component/ImportantBgComponent";

const AboutUs = () => {
  return (
    <MainPageTemplate>
      <SubBanner heading={"About Us"} bannerimg={"/images/subbanner.png"} />
      <AboutUsComponent />
      <ImportantBgComponent />
    </MainPageTemplate>
  );
};

export default AboutUs;

import React, { useState } from "react";
import MainPageTemplate from "../template/MainPageTemplate";
import MainBanner from "../component/MainBanner";
import SearchComponent from "../component/SearchComponent";
import AboutUsComponent from "../component/AboutUsComponent";
import MissionVissionComponent from "../component/MissionVissionComponent";
import ImportantBgComponent from "../component/ImportantBgComponent";
import HomeProductSection from "../component/HomeProductSection";
import ComitmentSection from "../component/ComitmentSection";

const Home = () => {
  return (
    <MainPageTemplate>
      <MainBanner />
      <SearchComponent />
      <AboutUsComponent />
      <MissionVissionComponent />
      <ImportantBgComponent />
      <HomeProductSection />
      <ComitmentSection />
    </MainPageTemplate>
  );
};

export default Home;

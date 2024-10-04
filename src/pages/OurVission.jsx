import React from "react";
import MainPageTemplate from "../template/MainPageTemplate";
import SubBanner from "../component/SubBanner";
import MissionVissionComponent from "../component/MissionVissionComponent";
import ComitmentSection from "../component/ComitmentSection";

const OurVission = () => {
  return (
    <MainPageTemplate>
      <SubBanner heading={"Our Vission"} bannerimg={"/images/subbanner.png"} />
      <div className="xl:px-16 lg:px-8 sm:px-4 pt-8 text-lg">
        <span className="text-xl font-semibold">J</span>ai Matadi Enterprise
        envisions being the leading, trusted partner in critical healthcare by
        ensuring uninterrupted access to essential medicines across India. Our
        goal is to support healthcare providers with dependable, high-quality
        products, contributing to a healthier society where patients receive
        timely treatment and care, whenever and wherever needed.
      </div>
      <MissionVissionComponent />
      <ComitmentSection />
    </MainPageTemplate>
  );
};

export default OurVission;

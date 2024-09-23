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
        <span className="text-xl font-semibold">L</span>orem ipsum dolor sit
        amet consectetur. Non et pellentesque et quam feugiat mi. Massa eu et
        fames eu adipiscing pellentesque ac quam posuere. Mauris cum felis
        pulvinar ac amet non nec. Enim donec volutpat elit rhoncus vitae
        suscipit libero. Tincidunt nec sit vestibulum tellus est malesuada.
        Pulvinar ac a hendrerit est ornare
      </div>
      <MissionVissionComponent />
      <ComitmentSection />
    </MainPageTemplate>
  );
};

export default OurVission;

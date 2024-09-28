import React from "react";
import EnquiryBoxComponent from "./EnquiryBoxComponent";

const ComitmentSection = () => {
  return (
    <div className="xl:p-16 lg:p-8 sm:p-4 ">
      <div className="grid sm:grid-cols-1 md:grid-cols-2  gap-6">
        <div className="">
          <EnquiryBoxComponent />
        </div>
        <div className="flex flex-col lg:gap-8 sm:gap-6 xlg:gap-10 ">
          <h1 className="lg:text-4xl sm:text-2xl md:text-3xl font-semibold text-[#0047AD]">
            Our Commitment To Our Society
          </h1>
          <p className="lg:text-lg sm:text-sm md:text-base">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing
          </p>
          <div>
            <img src="/images/comitmentimg.jpg" alt="" className="rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComitmentSection;

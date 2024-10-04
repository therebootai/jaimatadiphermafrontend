import React from "react";
import EnquiryBoxComponent from "./EnquiryBoxComponent";

const ComitmentSection = () => {
  return (
    <div className="xl:p-16 lg:p-8 sm:p-4 ">
      <div className="sm:grid sm:grid-cols-1 md:flex md:flex-row   gap-6">
        <div className="lg:w-[40%] md:w-[45%]">
          <EnquiryBoxComponent />
        </div>
        <div className="flex flex-col lg:gap-4 sm:gap-6 xl:gap-4 lg:w-[60%] md:w-[55%] ">
          <h1 className="xl:text-4xl lg:text-2xl xlg:text-2xl sm:text-2xl md:text-2xl font-semibold text-[#0047AD]">
            Our Commitment To Our Society
          </h1>
          <p className="xl:text-base lg:text-[13px]/[20px] xlg:text-sm sm:text-sm md:text-sm">
            Jai Matadi Enterprise is committed to corporate social
            responsibility (CSR) through initiatives that enhance community
            health and well-being. By supporting healthcare awareness programs,
            contributing essential medical supplies to underprivileged areas,
            and organizing health camps, they strive to make healthcare
            accessible to all. Jai Matadi Enterprise believes in giving back to
            the community, especially focusing on preventive care and education,
            helping create a healthier, more informed society and extending
            their impact beyond business operations.
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

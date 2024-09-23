import React from "react";

const AboutUsComponent = () => {
  return (
    <div className="xl:p-16 lg:p-8 sm:p-4 ">
      <div className="flex sm:flex-col md:flex-row gap-6">
        <div className="lg:w-[45%] md:w-[50%] sm:w-full">
          <img src="/images/aboutbg.png" alt="" className="w-full" />
        </div>
        <div className="lg:w-[55%] md:w-[50%] sm:w-full flex flex-col sm:gap-4 md:gap-2 lg:gap-4 xl:gap-8">
          <h1 className="text-[#333333] font-semibold sm:text-4xl md:text-2xl lg:text-3xl xl:text-5xl xlg:text-4xl">
            About <span className="text-[#2AAA8A]">Pharma</span>
          </h1>
          <div className="flex flex-col gap-4 sm:text-base md:text-xs lg:text-sm xlg:text-lg xl:text-xl text-[#333333]">
            <p>
              Lorem ipsum dolor sit amet consectetur. Non et pellentesque et
              quam feugiat mi. Massa eu et fames eu adipiscing pellentesque ac
              quam posuere. Mauris cum felis pulvinar ac amet non nec. Enim
              donec volutpat elit rhoncus vitae suscipit libero. Tincidunt nec
              sit vestibulum tellus est malesuada. Pulvinar ac a hendrerit est
              ornare id. Pellentesque vulputate felis ultricies dolor turpis
              ipsum blandit blandit. Pellentesque volutpat justo accumsan
              vestibulum velit nibh tincidunt. Velit suscipit metus tincidunt
              morbi ut. Vitae eget facilisis nec vulputate tincidunt imperdiet
              tellus est
            </p>
            <p>
              Egestas magna mauris volutpat velit hendrerit morbi nibh lectus.
              Posuere mi enim gravida maecenas non venenatis amet enim ipsum.
              Sit a vulputate id dolor id. Adipiscing ut curabitur auctor rutrum
              praesent pretium amet ac diam. Libero volutpat facilisis auctor
              laoreet pretium tempus. Ac bibendum lobortis ultrices ut.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:gap-4 lg:gap-8 items-center  text-white">
            <button className="xl:h-[4.5rem] lg:h-[3.5rem] sm:h-[3rem] rounded-lg flex justify-center items-center bg-gradient-to-r from-[#0047AD] to-[#001D47] sm:text-sm lg:text-lg xl:text-xl font-semibold">
              Our Products
            </button>
            <button className="xl:h-[4.5rem] lg:h-[3.5rem]  sm:h-[3rem] rounded-lg flex justify-center items-center bg-gradient-to-r from-[#2AAA8A] to-[#114437] sm:text-sm lg:text-lg xl:text-xl font-semibold">
              Enquiry Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsComponent;

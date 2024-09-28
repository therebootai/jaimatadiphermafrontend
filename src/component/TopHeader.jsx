import React from "react";
import { CiMobile3 } from "react-icons/ci";
import { IoLogoWhatsapp } from "react-icons/io";

import { MdOutgoingMail } from "react-icons/md";
import { PiPhoneCallFill } from "react-icons/pi";

import { Link } from "react-router-dom";

const TopHeader = () => {
  const socialmedia = [
    {
      name: "/images/facebookwhite.svg",
      link: "",
    },
    { name: "/images/instagramwhite.svg", link: "" },
    {
      name: "/images/linkedinwhite.svg",
      link: "",
    },
    { name: "/images/twitterwhite.svg", link: "" },
    { name: "/images/youtubewhite.svg", link: "" },
  ];

  return (
    <div className=" z-[60] w-full">
      <div className=" flex md:flex-row sm:flex-col  justify-between sm:gap-2 md:gap-0 items-center bg-[#0047AD]  text-white">
        <div className="flex gap-4  md:w-[60%] lg:w-[50%] sm:w-full bg-[#0047AD] sm:rounded-br-0  md:rounded-br-[4rem] sm:h-[2rem] md:h-[2.5rem] justify-center items-center sm:text-xs lg:text-sm xlg:text-base">
          <span className="flex md:gap-2 sm:gap-1 items-center sm:text-[10px] lg:text-sm xlg:text-base font-semibold">
            <span>
              <PiPhoneCallFill />
            </span>
            <span>+91-12345 67890</span>
          </span>
          <span className="flex md:gap-2 sm:gap-1 items-center sm:text-[10px] lg:text-sm xlg:text-base font-semibold">
            <span>
              <IoLogoWhatsapp />
            </span>
            <span>+91-12345 67890</span>
          </span>
          <span className="flex md:gap-2 sm:gap-1 items-center font-semibold">
            <span>
              <MdOutgoingMail />
            </span>
            <Link to={"mailto:contact@jmpharma.com"}>contact@jmpharma.com</Link>
          </span>
        </div>
        <div className="flex gap-4 sm:hidden md:flex sm:w-full md:w-[40%] lg:w-[50%] bg-[#0047AD]  sm:h-[2rem] md:h-[2.5rem] justify-end pr-8 items-center sm:text-xs lg:text-sm xlg:text-base">
          <span className="flex gap-2 items-center">
            {socialmedia.map((social, index) => (
              <div key={index} className=" ">
                <Link to={social.link}>
                  <img src={social.name} alt="" className="h-[1.3rem]" />
                </Link>
              </div>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;

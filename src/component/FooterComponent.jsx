import React from "react";
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

const FooterComponent = () => {
  const socialmedia = [
    {
      name: "/images/facebook.svg",
      link: "",
    },
    { name: "/images/instagram.svg", link: "" },
    {
      name: "/images/linkedin.svg",
      link: "",
    },
    { name: "/images/twitter.svg", link: "" },
    { name: "/images/youtube.svg", link: "" },
  ];
  const products = [
    {
      name: "Quick View Link",
      link: "",
    },
    {
      name: "Quick View Link",
      link: "",
    },
    {
      name: "Quick View Link",
      link: "",
    },
    {
      name: "Quick View Link",
      link: "",
    },
    {
      name: "Quick View Link",
      link: "",
    },
  ];
  const quicklink = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/aboutus" },
    { name: "Our Products", link: "/ourproducts" },
    { name: "Our Vision", link: "/ourvission" },
    { name: "Our Gallery", link: "" },

    { name: "Contact Us", link: "/contactus" },
  ];
  return (
    <div className="xl:p-16 lg:p-8 sm:p-4 bg-[#F1F1F1] flex flex-col gap-4">
      <div className="flex sm:flex-col lg:flex-row sm:gap-8 lg:gap-5 xl:gap-8">
        <div className="lg:w-[35%] sm:w-full flex flex-col gap-6">
          <div className="">
            <img
              src="/images/jaimatadilogo.png"
              alt=""
              className="xl:h-[3rem] sm:h-[2.5rem] lg:h-[2rem]"
            />
          </div>
          <div className="flex flex-col gap-4 sm:text-base lg:text-sm xlg:text-lg xl:text-lg text-[#333333] font-medium">
            <div className="flex items-center gap-2">
              <h1 className="xlg:text-2xl lg:text-lg sm:text-xl font-semibold">
                Contact Info
              </h1>
              <div className="xl:w-[8rem] sm:w-[6rem]  h-[1px] bg-[#2AAA8A]"></div>
            </div>
            <div className="flex flex-row gap-2 xl:items-center">
              <FaLocationDot className="text-[#2AAA8A]" />
              Hill Cart Road, Siliguri, West Bengal - 734001
            </div>
            <div className="flex flex-row gap-2 xl:items-center">
              <MdEmail className="text-[#2AAA8A]" />
              contact@yourwebsite.com
            </div>
            <div className="flex flex-row gap-2 xl:items-center">
              <BiSolidPhoneCall className="text-[2AAA8A]" />
              +91 12345 67890
            </div>
            <span className="flex sm:gap-4 lg:gap-2 xl:gap-6 items-center">
              {socialmedia.map((social, index) => (
                <div key={index} className=" ">
                  <Link to={social.link}>
                    <img
                      src={social.name}
                      alt=""
                      className="xl:h-[1.5rem] sm:h-[1.4rem] lg:h-[1.2rem]"
                    />
                  </Link>
                </div>
              ))}
            </span>
          </div>
        </div>
        <div className="flex sm:w-full lg:w-[20%] flex-col sm:gap-6 lg:gap-4 xl:gap-8">
          <div className="flex ">
            <span className="xl:text-3xl lg:text-xl xlg:text-3xl sm:text-xl text-[#2AAA8A] font-semibold">
              Quick Links
            </span>
          </div>

          <div className="flex flex-col sm:gap-4 xl:gap-4 sm:text-base  xlg:text-base">
            {quicklink.map((service, index) => (
              <Link
                to={service.link}
                className="flex flex-row gap-2 font-medium items-center"
                key={index}
              >
                <span>
                  <MdOutlineKeyboardArrowRight />
                </span>
                <span>{service.name}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex sm:w-full lg:w-[20%] flex-col sm:gap-6 lg:gap-4 xl:gap-8">
          <div className="flex ">
            <span className="xl:text-3xl lg:text-xl xlg:text-3xl sm:text-xl text-[#2AAA8A] font-semibold">
              Our Products
            </span>
          </div>

          <div className="flex flex-col sm:gap-4 xl:gap-4 sm:text-base  xlg:text-base">
            {products.map((service, index) => (
              <Link
                to={service.link}
                className="flex flex-row gap-2 font-medium items-center"
                key={index}
              >
                <span>
                  <MdOutlineKeyboardArrowRight />
                </span>
                <span>{service.name}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex sm:w-full lg:w-[25%] flex-col gap-4">
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14720.815820343256!2d88.36891705!3d22.72065945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89bb35cd6842b%3A0x20bb52604e2c74fb!2sCroma!5e0!3m2!1sen!2sin!4v1726855050364!5m2!1sen!2sin"
              className="rounded-lg w-full sm:h-[10rem] lg:h-[8rem] xlg:h-[10rem]"
              loading="lazy"
            ></iframe>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <input
                type="text"
                placeholder="Enter Email..."
                className="bg-transparent sm:h-[3.5rem] lg:h-[3rem] xl:h-[3.5rem] w-full px-2 border border-[#cccccc] text-[#666666] rounded-lg"
              />
            </div>
            <button className="w-[70%] flex justify-center items-center sm:h-[3rem] lg:h-[2.5rem] xl:h-[3rem] lg:text-lg sm:text-xl xl:text-2xl font-semibold bg-[#2AAA8A] rounded-lg text-white ">
              Trade Enquiry
            </button>
          </div>
        </div>
      </div>
      <div className="pt-6 border-t-2 border-[#cccccc] ">
        <div className="flex sm:flex-col lg:flex-row sm:gap-4 lg:gap-0 text-center items-center justify-between text-[#666666]">
          <span>
            Copyright 2024
            <Link to={"/"} className="font-bold text-[#0047AD] ml-2">
              JM Pherma
            </Link>
            | All Rights Reserved. Privacy Policy
          </span>
          <span>
            Developed By:
            <Link
              to={"https://rebootmarketing.in/"}
              className="ml-2 font-bold text-[#0047AD]"
              target="_blank"
            >
              Reboot Marketing Pvt. Ltd.
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;

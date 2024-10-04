import React from "react";
import MainPageTemplate from "../template/MainPageTemplate";
import SubBanner from "../component/SubBanner";
import EnquiryBoxComponent from "../component/EnquiryBoxComponent";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidPhoneCall } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";

const ContactUS = () => {
  return (
    <MainPageTemplate>
      <SubBanner heading={"Contact US"} bannerimg={"/images/subbanner.png"} />
      <div className="xl:p-16 lg:p-8 sm:p-4 sm:grid sm:grid-cols-1 md:flex md:flex-row gap-6">
        <div className="md:w-[40%]">
          <EnquiryBoxComponent />
        </div>
        <div className="flex flex-col sm:gap-3 md:w-[60%] lg:gap-3 xlg:gap-5">
          <h1 className="xlg:text-4xl lg:text-2xl sm:text-2xl font-semibold text-[#0047AD]">
            Get In Touch
          </h1>
          <p className="xlg:text-lg sm:text-base text-[#666666]">
            At Jai Matadi Enterprise, we value open communication and are here
            to support all your critical medicine needs. Whether you’re a
            healthcare provider, pharmacy, or supplier, we’re ready to assist
            you with product inquiries, order details, or any other assistance
            you may need.
          </p>
          <div className="flex flex-col gap-4">
            <h1 className="xlg:text-4xl lg:text-xl sm:text-2xl font-semibold text-[#0047AD]">
              Contact Details
            </h1>
            <div className="flex flex-col gap-2 sm:text-base lg:text-sm xlg:text-base xxl:text-lg">
              <div className="flex flex-row gap-2">
                <FaLocationDot className="text-[#0047AD] mt-1" />
                <span>
                  Vivekananda Rd, Ward No.- 8, Khalpara, Siliguri, West Bengal
                  734005
                </span>
              </div>
              <div className="flex flex-row gap-2">
                <BiSolidPhoneCall className="text-[#0047AD] mt-1" />
                <span>Phone: 9434072559</span>
              </div>
              <div className="flex flex-row gap-2">
                <IoLogoWhatsapp className="text-[#0047AD] mt-1" />
                <span>Whatsapp: +91 9434072559</span>
              </div>
              <div className="flex flex-row gap-2">
                <MdEmail className="text-[#0047AD] mt-1" />
                <span>E-mail: jaimatadienterpriseslg@gmail.com</span>
              </div>
            </div>
          </div>
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14256.380009881912!2d88.4251498!3d26.7094118!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e441693048af99%3A0x1e6947765d6e2a15!2sJai%20Matadi%20Enterprise!5e0!3m2!1sen!2sin!4v1727548193942!5m2!1sen!2sin"
              className="rounded-lg w-full sm:h-[12rem] lg:h-[15rem] xl:h-[20rem]"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </MainPageTemplate>
  );
};

export default ContactUS;

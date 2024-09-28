import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [menuopen, setMenuopen] = useState(false);
  const togglemenuopen = () => setMenuopen(!menuopen);

  const location = useLocation();
  const navigate = useNavigate();

  const NavElement = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/aboutus" },
    { name: "Our Products", link: "/ourproducts" },
    { name: "Our Vision", link: "/ourvission" },
    { name: "Our Gallery", link: "/ourgallery" },

    { name: "Contact Us", link: "/contactus" },
  ];

  const [scrolled, setScrolled] = useState(false);
  const [hashLink, setHashLink] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname === "/" && hashLink) {
      const section = document.querySelector(hashLink);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        setHashLink("");
      }
    }
  }, [location.pathname, hashLink]);

  const handleNavClick = (link) => {
    if (link.includes("#")) {
      if (location.pathname !== "/") {
        setHashLink(link);
        navigate("/");
      } else {
        const section = document.querySelector(link);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      navigate(link);
    }
  };

  return (
    <header
      className={`bg-[white] fixed z-50 w-full font-lexend ${
        scrolled ? "top-0 header-transition" : ""
      }`}
    >
      <div className="lg:flex sm:hidden w-full lg:h-[5rem] xlg:h-[6rem] shadow-lg justify-between items-center  px-5">
        <Link to="/" className="sm:hidden md:block">
          <img
            src="/images/jaimatadilogo.png"
            alt="Jai Matadi Pherma Logo"
            className="xl:h-[2rem] xlg:h-[2rem] lg:h-[2rem] w-full"
          />
        </Link>
        <div className="flex justify-end lg:text-base xlg:text-lg xl:text-xl relative">
          {NavElement.map((navbar, index) => (
            <div
              key={index}
              className={`font-medium lg:px-4 xlg:px-6 xl:px-8 lg:h-[5rem] xlg:h-[6rem] flex justify-center items-center hover:bg-gradient-to-b from-[#FFFFFF] to-[#EDF2F8] ${
                location.pathname === navbar.link
                  ? "text-[#0047AD] bg-gradient-to-b from-[#ffffff] to-[#d9dee2] border-b-4 border-[#0047AD]"
                  : "text-[#333333]"
              }`}
            >
              <span
                className=" cursor-pointer"
                onClick={() => handleNavClick(navbar.link)}
              >
                {navbar.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="sm:flex md:justify-between md:items-center sm:justify-between sm:items-center w-full md:p-6 sm:p-3 sm:px-3 px-0 lg:hidden">
        <Link to="/" className="lg:hidden">
          <img
            src="/images/jaimatadilogo.png"
            alt="Jai Matadi Pherma Logo"
            className="sm:h-[1.5rem] md:h-[1.8rem]"
          />
        </Link>

        <button onClick={togglemenuopen} className="">
          <label
            htmlFor="checkbox"
            className={`toggle ${menuopen ? "menu-open" : ""}`}
          >
            <div className="bars" id="bar1"></div>
            <div className="bars" id="bar2"></div>
            <div className="bars" id="bar3"></div>
          </label>
        </button>
      </div>
      {menuopen && (
        <div className="sm:flex bg-[#0047AD] flex-col sm:h-[40vh] md:h-[60vh] md:text-3xl sm:text-xl overflow-scroll lg:hidden px-9 relative">
          {NavElement.map((navbar, index) => (
            <div
              key={index}
              className="font-medium text-[white] p-4 md:py-10 border-b-2 border-gray-200"
            >
              <span
                className=" cursor-pointer"
                onClick={() => handleNavClick(navbar.link)}
              >
                {navbar.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;

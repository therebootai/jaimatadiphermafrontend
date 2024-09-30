import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SearchComponent = ({ initialQuery, setSearchQueryProp }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState(initialQuery || "");
  const [randomSuggestions, setRandomSuggestions] = useState([]);
  const [isRandom, setIsRandom] = useState(true);
  const suggestionBoxRef = useRef(null);
  const inputRef = useRef(null);
  useEffect(() => {
    setSearchQuery(initialQuery || "");
  }, [initialQuery]);

  const fetchRandomSuggestions = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/products/random-suggestions`,
        {
          params: { limit: 30 },
        }
      );
      setRandomSuggestions(response.data);
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching random suggestions", error);
    }
  };

  const fetchSuggestions = async (query) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/products/search`,
        {
          params: { query },
        }
      );
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching suggestions", error);
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setIsRandom(query.length === 0);

    if (query.length > 0) {
      fetchSuggestions(query);
    } else {
      setSuggestions(randomSuggestions);
      setSearchQueryProp("");
      window.location.href = "/ourproducts";
    }
  };

  const handleInputFocus = () => {
    if (searchQuery.length === 0) {
      fetchRandomSuggestions();
    }
  };
  const handleClickOutside = (event) => {
    // Check if the clicked element is outside the input field or suggestion box
    if (
      suggestionBoxRef.current &&
      !suggestionBoxRef.current.contains(event.target) &&
      inputRef.current &&
      !inputRef.current.contains(event.target)
    ) {
      setSuggestions([]); // Hide suggestions
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener when the component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const matchQuery = (suggestion) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    if (suggestion.moleculeName.toLowerCase().includes(lowerCaseQuery)) {
      return suggestion.moleculeName;
    } else if (suggestion.brandName.toLowerCase().includes(lowerCaseQuery)) {
      return suggestion.brandName;
    }
    return null;
  };

  const handleSearchSubmit = () => {
    if (searchQuery.length > 0) {
      setSearchQueryProp(searchQuery);
    } else {
      setSearchQueryProp("");
      window.location.href = "/ourproducts";
    }
  };

  return (
    <div className="sm:p-4 xl:p-16 lg:p-8 relative">
      <div className="bg-[url('/images/searchbg.jpg')] rounded-lg w-full h-full bg-cover bg-center flex items-center justify-center">
        <div className="flex flex-col  w-full  rounded-lg  sm:p-4 lg:p-8 shadow-lg">
          <h1 className="md:text-lg sm:text-sm text-white font-bold ml-4 mb-6">
            Lorem ipsum dolor sit amet consectetur. Purus non.
          </h1>
          <div className="relative w-full">
            <div className="flex sm:flex-row md:flex-row w-full items-center sm:gap-4 md:gap-2 lg:gap-4">
              <div className="md:w-[80%] sm:w-[80%]">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  ref={inputRef}
                  className="w-full sm:h-[3.5rem] md:h-[4rem] p-4 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0047ad]"
                  placeholder="Write a Medicine name"
                />

                {suggestions.length > 0 && (
                  <ul
                    ref={suggestionBoxRef}
                    className="absolute z-10 w-full h-[20rem] overflow-y-scroll !overflow-x-hidden customScrollbar  bg-white border border-gray-300 rounded-lg shadow-md mt-2"
                  >
                    {suggestions.map((suggestion, index) => {
                      const matchedText = isRandom
                        ? suggestion.moleculeName || suggestion.brandName // Show random suggestions
                        : matchQuery(suggestion);
                      return (
                        matchedText && (
                          <li key={index}>
                            <Link
                              to={`/ourproducts?search=${matchedText}`}
                              className="block p-2 cursor-pointer hover:bg-gray-100"
                              onClick={() => {
                                setSearchQuery(matchedText);
                                setSuggestions([]);
                              }}
                            >
                              {matchedText}
                            </Link>
                          </li>
                        )
                      );
                    })}
                  </ul>
                )}
              </div>
              <Link
                to={`/ourproducts?search=${searchQuery}`}
                onClick={handleSearchSubmit}
                className="h-[3.5rem] sm:flex md:hidden sm:w-[20%] bg-gradient-to-r from-[#FF9900] to-[#995C00] text-[white] text-sm font-semibold rounded-lg hover:bg-indigo-700 transition duration-300 flex justify-center items-center"
              >
                Find
              </Link>
              <Link
                to={`/ourproducts?search=${searchQuery}`}
                onClick={handleSearchSubmit}
                className="h-[4rem] sm:hidden md:flex md:w-[20%] bg-gradient-to-r from-[#FF9900] to-[#995C00] text-[white] text-lg font-semibold rounded-lg hover:bg-indigo-700 transition duration-300 flex justify-center items-center"
              >
                Find Medicine
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SearchComponent = ({ initialQuery, setSearchQueryProp }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState(initialQuery || "");

  useEffect(() => {
    // Update the search query when the initialQuery changes (from URL or other sources)
    setSearchQuery(initialQuery || "");
  }, [initialQuery]);

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

    if (query.length > 0) {
      fetchSuggestions(query);
    } else {
      setSuggestions([]);
      setSearchQueryProp(""); // Notify parent component to reset search
      window.location.href = "/ourproducts"; // Clear the search query from the URL
    }
  };

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
      <div className="bg-[url('/images/searchbg.png')] rounded-lg w-full h-full bg-cover bg-center flex items-center justify-center">
        <div className="flex flex-col  w-full  rounded-lg  sm:p-4 lg:p-8 shadow-lg">
          <h1 className="text-lg text-white font-bold ml-4 mb-6">
            Lorem ipsum dolor sit amet consectetur. Purus non.
          </h1>
          <div className="relative w-full">
            <div className="flex sm:flex-col md:flex-row w-full items-center sm:gap-2 lg:gap-4">
              <div className="md:w-[80%] sm:w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleInputChange}
                  className="w-full h-[4rem] p-4 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Write a Medicine name"
                />

                {suggestions.length > 0 && (
                  <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-md mt-2">
                    {suggestions.map((suggestion, index) => {
                      const matchedText = matchQuery(suggestion);
                      return (
                        matchedText && (
                          <li key={index}>
                            <Link
                              to={`/ourproducts?search=${matchedText}`}
                              className="block p-2 cursor-pointer hover:bg-gray-100"
                              onClick={() => setSearchQuery(matchedText)}
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
                className="h-[4rem] sm:w-[50%] md:w-[20%] bg-gradient-to-r from-[#E5FFF8] to-[#BBFFEE] text-[#2AAA8A] text-lg font-semibold rounded-lg hover:bg-indigo-700 transition duration-300 flex justify-center items-center"
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

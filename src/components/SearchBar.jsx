import { ArrowRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React, {useState, useEffect, useRef} from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const debounceTimeout = useRef(null);

    const fetchSuggestions = (q) => {
        if(!q.trim()) {
            setSuggestions([]);
            return;
        }
        fetch(`http://localhost:3001/suggest?q=${encodeURIComponent(q)}`)
            .then(response => response.json())
            .then(data => {
                setSuggestions(data.map(item => item.phrase));
                setShowSuggestions(true);
            })
            .catch(err =>{
                console.error("Error fetching suggestions:", err);
                setSuggestions([]);
            });
    };

    const handleInputChange = (e) => {
        const val = e.target.value;
        setQuery(val);

        if(debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        debounceTimeout.current = setTimeout(() => {
            fetchSuggestions(val);
        }, 300);
    };

    const handleSearch = (searchQuery=query) => {
        const finalQuery = String(searchQuery || '');
        setShowSuggestions(false);
        if (onSearch && finalQuery.trim() !== "") {
            onSearch(finalQuery.trim());
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion);
        handleSearch(suggestion);
    };

  return (
    <div className='relative w-full max-w-lg'>
        {/* Input field */}
        <input
            type="text"
            placeholder="Search or enter URL"
            value={query}
            onChange={handleInputChange}
            onFocus={() => {if (suggestions.length) setShowSuggestions(true);}}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            className="w-full pl-10 pr-10 py-2 rounded-full border border-gray-300 focus:ring-2 focus-ring-blue-500 transition-all"
        />

        {/* search icon left*/}
        <MagnifyingGlassIcon 
            className='absolute left-3 top-1/2 h-5 w-5 text-gray-400 transform -translate-y-1/2'
        />

        {/* Arrow icon (right), shown only when there is text */}
        {query.trim() !== "" && (
            <button 
                onClick={handleSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700"
            >
                <ArrowRightIcon className='h-5 w-5' />
            </button>
        )}

        {/* Suggestions dropdown */}
        {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 z-10 mt-1 max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg">
                {suggestions.map((suggestion, index) => (
                    <li
                        key={index}
                        className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                        onMouseDown={() => handleSuggestionClick(suggestion)}

                    >
                        {suggestion}
                    </li>
                ))}
            </ul>
        )}
    </div>
  );
};

export default SearchBar;
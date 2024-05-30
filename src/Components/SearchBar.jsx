import React from 'react';

function SearchBar({ location, setLocation, searchLocation }) {
  return (
    <div className="search">
      <input
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyDown={searchLocation}
        placeholder="Enter a City"
        type="text"
      />
    </div>
  );
}

export default SearchBar;

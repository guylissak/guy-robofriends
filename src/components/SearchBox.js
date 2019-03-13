import React from 'react';

const SearchBox = ({ searchChang}) => {
    return (
        <div>
        <input
         className ="pa3 ba b--green bg-lightest-blue"
         type="search"
         placeholder="search robot"
         onChange={searchChang}/>
        </div>
    );
}

export default SearchBox;
import React from 'react';
import { useLocation } from 'react-router-dom';
import SearchComponent from './SearchComponent';
 
const SearchPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const keyword = query.get('keyword');
 
  return (
    <div>
      <h1 className="searchH1">{keyword}</h1>
      <SearchComponent keyword={keyword} />
    </div>
  );
};
 
export default SearchPage;
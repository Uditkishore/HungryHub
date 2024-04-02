import React, { useState } from "react";
import Select from 'react-select';

const SortBy = ({ inputValue, options, placeholder }) => {
  const [query, setQuery] = useState('');

  const getValue = (selectedOption) => {
    const {value} = selectedOption;
    setQuery(value);
    inputValue(value);
  };
  
  return (
    <Select
      value={query}
      placeholder={placeholder}
      onChange={getValue}
      options={options}
    />
  );
};

export default SortBy;

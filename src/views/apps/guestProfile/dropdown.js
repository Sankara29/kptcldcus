import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

const DropdownComponent = ({optionlist,defaultoption}) => {
  const [options, setOptions] = useState([]);
  const [defaultValue, setDefaultValue] = useState(null);
  console.log(optionlist);
  console.log(defaultoption);
  // const ab = pr;
  // console.log(this.props.ab);
  useEffect(() => {
    // Fetch options from API
    axios.get('https://api.ms-tech.in/v3/options')
      .then(response => {
        setOptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching options:', error);
      });

    // Fetch default value from API
    axios.get('https://api.ms-tech.in/v3/default-value')
      .then(response => {
        setDefaultValue(response.data);
      })
      .catch(error => {
        console.error('Error fetching default value:', error);
      });
  }, []);

  return (
    <Select
      options={options}
      value={defaultValue}
      onChange={selectedOption => setDefaultValue(selectedOption)}
    />
  );
};

export default DropdownComponent;
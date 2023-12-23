'use client';

import { useState, useEffect } from 'react';

const WeatherContent = ({ data }) => {
  const [locationName, setLocationName] = useState('');
  const [countryName, setCountryName] = useState('');
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (data) {
      setLocationName(data.locationName);
      setCountryName(data.countryName);
      setLocation(data.location);
    }
  }, [data]);

  return (
    <div>
      {locationName && <p> {locationName}</p>}
      {countryName && <p> {countryName}</p>}
    </div>
  );
};

export default WeatherContent;

import React, { useState, useEffect } from "react";
import axios from "axios";

const Location = ({ setLocation }) => {
  const [ip, setIp] = useState(null);
  const [country, setCountry] = useState(null);
  const [region, setRegion] = useState(null);

  const getGeoLocationData = async () => {
    try {
      console.log("Fetching IP...");
      const ipResponse = await axios.get(process.env.REACT_APP_API_IP_ADDRESS);
      const ip = ipResponse.data.ip;
      console.log("Fetched IP:", ip);
  
      const geoApiUrl = `${process.env.REACT_APP_API_KEY}&ipAddress=${ip}`;
      console.log("Geo API URL:", geoApiUrl);
  
      const geoResponse = await axios.get(geoApiUrl);
      console.log("Geo API Response:", geoResponse.data);
  
      const { country, region } = geoResponse.data.location;
      setIp(ip);
      setCountry(country);
      setRgion(region);
    } catch (error) {
      console.error("Error fetching geolocation data:", error.message, error.response);
      setIp("Unavailable");
      setCountry("Unavailable");
      setRgion("Unavailable");
    }
  };
  
  
  
  useEffect(() => {
    getGeoLocationData();
  }, []);

  return (
    <div>
      <h6>{ip || "Fetching IP..."}</h6>
      <h6>{country || "Fetching Country..."}</h6>
      <h6>{region || "Fetching Region..."}</h6>
    </div>
  );
};

export default Location;

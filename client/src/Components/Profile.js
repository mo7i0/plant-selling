import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [ip, setIp] = useState(null);
  const [country, setCountry] = useState(null);
  const [region, setRgion] = useState(null);

  const getGeoLocationData = async () => {
    try {
      const ipResponse = await axios.get(process.env.REACT_APP_API_IP_ADDRESS);
      const ip = ipResponse.data.ip;

      const geoApiUrl = `${process.env.REACT_APP_API_KEY}&ipAddress=${ip}`;
      const geoResponse = await axios.get(geoApiUrl);

      const { country, region } = geoResponse.data.location;
      setIp(ip);
      setCountry(country);
      setRgion(region);
    } catch (error) {
      console.error("Error fetching geolocation data:", error.message);
      setIp("Unavailable");
      setCountry("Unavailable");
      setRgion("Unavailable");
    }
  };

  useEffect(() => {
    getGeoLocationData();
  }, []);

  return (
    <div style={{ padding: "20px", backgroundColor: "#ffffff", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <h1 style={{ textAlign: "center", color: "#333", fontSize: "2rem", marginBottom: "20px" }}>Profile</h1>
      <div style={{ textAlign: "center", fontSize: "1.2rem", lineHeight: "1.8" }}>
        <p><strong>IP Address:</strong> {ip || "Loading..."}</p>
        <p><strong>Country:</strong> {country || "Loading..."}</p>
        <p><strong>Region:</strong> {region || "Loading..."}</p>
      </div>
    </div>
  );
};

export default Profile;

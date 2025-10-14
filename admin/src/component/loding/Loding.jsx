import React from "react";
import './Loding.css'

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading_p">Loading...</p>
    </div>
  );
};

export default Loading;

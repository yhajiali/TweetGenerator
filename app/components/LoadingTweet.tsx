import React from "react";

const LoadingTweet = () => {
  return (
    <div className="loading-wrapper">
      <div className="loading-spinner"></div>
      <span className="highlight">Generating Tweet...</span>
    </div>
  );
};

export default LoadingTweet;

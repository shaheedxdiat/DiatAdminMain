import React, { useState, useEffect } from 'react';

const DisappearingMessage = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1000);

    // Clear the timeout when the component unmounts
    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div>
      {isVisible && <div>{message}</div>}
    </div>
  );
};

export default DisappearingMessage;

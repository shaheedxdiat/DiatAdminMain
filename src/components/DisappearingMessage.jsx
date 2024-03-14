import React, { useState, useEffect } from 'react';

const DisappearingMessage = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []); 

  return (
    <div>
      {isVisible && <div>{message}</div>}
    </div>
  );
};

export default DisappearingMessage;

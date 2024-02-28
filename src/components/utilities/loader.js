import React from 'react';

const Spinner = () => {
  const spinnerStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #3498db',
    animation: 'spin 1s linear infinite',
    zIndex: 10,
  };
 
  return (
    <>
    <div style={spinnerStyle}></div>
    </>
  );
};

export default Spinner;

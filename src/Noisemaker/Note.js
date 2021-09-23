import React from "react";

const Note = ({isActive, color, onClick, className}) => {
  const styling = 
    isActive ? 
      {backgroundImage: `linear-gradient(rgba(${color[1]}, 1), rgba(${color[0]}, 1)`} : 
      {backgroundImage: `linear-gradient(rgba(${color[1]}, 1), rgba(${color[1]}, 1)`};
  
  return(
    <button 
    style={styling} 
    onClick={onClick}
    className={className}>
    </button>
  )
}

export default Note
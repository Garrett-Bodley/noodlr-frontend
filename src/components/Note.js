import './Note.css'

const Note = ({color, onClick, className}) => {
  
  const edgeColor = {backgroundImage: 
    `linear-gradient(
      to left,
      ${color[2]} 0%,
      ${color[1]} 15%,
      ${color[1]} 85%,
      ${color[2]} 100%
    )`
  }

  const frontColor = {backgroundColor: 
    color[0]
  }


  // const newStyling = isActive ? active : inactive
  
  return(
    // <button 
    // style={newStyling} 
    // onClick={onClick}
    // className={className}>
    // </button>

    <button className={className} onClick={onClick}>
      <span className="shadow" />
      <span className="edge" style={edgeColor} />
      <span className="front" style={frontColor} />
    </button>
  )
}

export default Note
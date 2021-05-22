import './Key.css'
import * as TinyColor from 'tinycolor2'

const Key = ({ note, hidden, color, handleMouseDown, handleMouseUp, handleMouseEnter, handleMouseLeave }) => {

  const edgeGradient = (hex) => {
    let gradient = `linear-gradient(
      to left,
      ${TinyColor(hex).darken(30).toHslString()} 0%,
      ${TinyColor(hex).darken(15).toHslString()} 15%,
      ${TinyColor(hex).darken(15).toHslString()} 85%,
      ${TinyColor(hex).darken(30).toHslString()} 100%
    )`
    return gradient
  }

  if(hidden === true){
    return(
      <label className = "pushable" style={ { visibility: 'hidden' } }>
        <span className="shadow" style={ { visibility: 'hidden' } }></span>
        <span className="edge" style={ { visibility: 'hidden' } }></span>
        <span className="front" style={ { visibility: 'hidden' } }></span>
      </label>
    )
  }else{
    return(
      <label 
        className = "pushable"
        onMouseDown = { handleMouseDown }
        onMouseUp = { handleMouseUp }
        onMouseEnter = { handleMouseEnter }
        onMouseLeave = { handleMouseLeave }
      >
        <span className="shadow"></span>
        <span className="edge" style={ { backgroundImage: edgeGradient(color) } }></span>
        <span className="front" style={ { backgroundColor: TinyColor(color).toHslString() } }></span>
      </label>
    )
  }
}

export default Key
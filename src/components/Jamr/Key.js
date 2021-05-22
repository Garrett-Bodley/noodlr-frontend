import './Key.css'
import * as TinyColor from 'tinycolor2'

const Key = ({note, handleMouseDown, handleMouseUp, handleMouseEnter, handleMouseLeave}) => {
  return(
    <label 
      className="pushable"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="shadow"></span>
      <span className="edge"></span>
      <span className="front"></span>
    </label>
  )
}

export default Key
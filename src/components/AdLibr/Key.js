import './Key.css'
import * as TinyColor from 'tinycolor2'

const Key = ({ note, trigger, handleOnClick, hidden, color, handleMouseDown, handleMouseUp, handleMouseEnter, handleMouseLeave }) => {

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
      <label className="pushable" style={ { visibility: 'hidden' } } draggable={ false }>
        <span className="shadow--key" style={ { visibility: 'hidden' } } draggable={ false }></span>
        <span className="edge--key" style={ { visibility: 'hidden' } } draggable={ false }></span>
        <span className="front--key" style={ { visibility: 'hidden' } } draggable={ false }></span>
      </label>
    )
  }else{
    return(
      <label 
        id={ note }
        className="pushable"
        onMouseDown={ handleMouseDown }
        onMouseUp={ handleMouseUp }
        onMouseEnter={ handleMouseEnter }
        onMouseLeave={ handleMouseLeave }
        draggable={ false }
        onClick={ handleOnClick }
      >
        <input hidden={true} type="checkbox" className="toggle" draggable={ false }></input>
        <span className="shadow" draggable={ false }></span>
        <span className="edge" style={ { backgroundImage: edgeGradient(color) } } draggable={ false }></span>
        <span className="front" style={ { backgroundColor: TinyColor(color).toHslString() } } draggable={ false }>{trigger}</span>
      </label>
    )
  }
}

export default Key
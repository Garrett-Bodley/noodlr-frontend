import './Key.css'

const Key = ({note, handleMouseDown, handleMouseUp, handleMoustOut}) => {
  return(
    <div>
      <label 
        className="pushable"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMoustOut}
      >
        <input hidden={true} type="checkbox" className="checkbox"></input>
        <span className="shadow"></span>
        <span className="edge"></span>
        <span className="front">{note}</span>

      </label>
    </div>
  )
}

export default Key
const TempoDisplay = ({tempo, handleTempoChange}) => {
  return (
    <>
      <input 
      className="tempo-slider" 
      type="range" 
      min={40} 
      max={200} 
      step={1} 
      value={tempo || 120} 
      onChange={handleTempoChange}/>

      {/* Display Tempo */}
      <p 
      className="tempo-display content">
        {tempo}
      </p>
    </>
  )
}

export default TempoDisplay
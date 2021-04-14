const VolumeDisplay = ({volume, handleVolumeChange}) => {
  
  const displayVolume = () => {
    const volumeDisplay = Math.round((volume + 20) * 10)/10
    return volumeDisplay
  }

  return(
    <>
      <input
      className="volume-slider"
      type="range"
      min={-40}
      max={0}
      step={0.1}
      value={volume || -20}
      onChange={handleVolumeChange}
      />

      <p className="volume-display content">
        {displayVolume()}
      </p>
    </>
  )
}

export default VolumeDisplay
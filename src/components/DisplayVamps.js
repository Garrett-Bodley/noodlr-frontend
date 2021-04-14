const DisplayVamps = ({vamps, selectedVamp, handleOnChange, handleVampLoad, handleDelete}) => {
  
  const displayVamps = () => {
    return vamps.map(vamp => <option key={vamp.id} value={vamp.id} >{vamp.name}</option>)
  }
  
  return(
    <div className="field has-addons">
      <div className="control is-expanded">
        <div className="select is-fullwidth">
          <select value={selectedVamp} onChange={handleOnChange}>
            {displayVamps()}
          </select>
        </div>
      </div>
      {(vamps.length > 0) ?
        <>
          <button onClick={handleVampLoad} className="button mx-1 is-grouped is-link">Load</button>
          <button onClick={handleDelete} className="button is-grouped is-danger">Delete</button>
        </>
      : null}
    </div>

  )
}

export default DisplayVamps
import classNames from 'classnames/bind'
import Note from './Note'

const DisplayGrid = ({grid, beat, handleOnClick}) => {
  
  const colors = [
    ['239, 50, 217', '137, 255, 253'],
    ['239, 50, 217', '137, 255, 253'],

    ['5, 118, 230', '0, 242, 97'],
    ['5, 118, 230', '0, 242, 97'],
    
    ['194, 21, 0', '255, 197, 0'],
    ['194, 21, 0', '255, 197, 0'],

    ['40, 60, 134', '255, 0, 204'],
    ['40, 60, 134', '255, 0, 204'],
    ['40, 60, 134', '255, 0, 204'],
  ]

  
  return grid.map((row, rowIndex) => {
    return <div key={rowIndex} className="note-row">
      {row.map(({note, isActive}, noteIndex) => {
        return(
          <Note 
          color={colors[rowIndex]} 
          className={classNames("note", {"on-beat": beat === (noteIndex + 1) % 16}, {'note-is-active': isActive})} 
          key={noteIndex + note} 
          isActive={isActive} 
          note={note} 
          onClick={() => handleOnClick(rowIndex, noteIndex)} 
          />
        )
      })}
    </div>
  })

}

export default DisplayGrid
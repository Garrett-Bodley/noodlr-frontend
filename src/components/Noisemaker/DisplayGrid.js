import classNames from 'classnames/bind'
import Note from './Note'

const DisplayGrid = ({grid, beat, handleOnClick}) => {
  
  const newColors = [
    ['hsl(42deg, 100%, 75%)', 'hsl(42deg, 100%, 64%)', 'hsl(42deg, 100%, 49%)'],
    ['hsl(42deg, 100%, 75%)', 'hsl(42deg, 100%, 64%)', 'hsl(42deg, 100%, 49%)'],
    
    ['hsl(100deg, 86%, 74%)', 'hsl(100deg, 86%, 63%)', 'hsl(100deg, 86%, 47%)'],
    ['hsl(100deg, 86%, 74%)', 'hsl(100deg, 86%, 63%)', 'hsl(100deg, 86%, 47%)'],
    
    ['hsl(147deg, 57%, 60%)', 'hsl(147deg, 57%, 51%)', 'hsl(147deg, 57%, 35%)'],
    ['hsl(147deg, 57%, 60%)', 'hsl(147deg, 57%, 51%)', 'hsl(147deg, 57%, 35%)'],
    
    ['hsl(4deg, 82%, 63%)', 'hsl(4deg, 82%, 54%)', 'hsl(4deg, 82%, 38%)'],
    ['hsl(4deg, 82%, 63%)', 'hsl(4deg, 82%, 54%)', 'hsl(4deg, 82%, 38%)'],
    ['hsl(4deg, 82%, 63%)', 'hsl(4deg, 82%, 54%)', 'hsl(4deg, 82%, 38%)']

  ]

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
          color={newColors[rowIndex]} 
          className={classNames({"on-beat": beat === (noteIndex + 1) % 16, "active": isActive, "pushable": true})} 
          key={noteIndex + note} 
          note={note} 
          onClick={() => handleOnClick(rowIndex, noteIndex)} 
          />
        )
      })}
    </div>
  })

}

export default DisplayGrid
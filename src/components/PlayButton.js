import classNames from 'classnames/bind'

const PlayButton = ({playing, togglePlay}) => {
  return(
    <>
      <button 
      className={
        classNames(
          'button',
          'is-rounded',
          'play-button', 
          {'play-button-playing': playing},
          {'play-button-stopped': !playing}
        )
      } 
      onClick={togglePlay}>
        {playing ? 'Stop' : 'Start'}
      </button>
    </>
  )
}

export default PlayButton
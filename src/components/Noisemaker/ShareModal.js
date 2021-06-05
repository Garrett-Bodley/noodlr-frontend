import { useState } from 'react'
import { useLocation, useRouteMatch } from 'react-router-dom'

const ShareModal = ({ generateLink }) => {

  const [visible, setVisible] = useState(false);
  // grid can be passed as an encoded URI safe string. Just need to offer that as a url in a field that can be copied by a user
  // then need to figure out how to catch if there's a query string and then load the vamp, but only if that string is valid

  let match = useRouteMatch()
  let location = useLocation()
  debugger

  return(
    <>
      <div className={visible ? 'modal is-active' : 'modal'}>
        <div className="modal-background" onClick={() => setVisible(!visible)}></div>
        <div className="modal-content">
          <header className="modal-card-head">
            <p className="modal-card-title">Send this link to your friends to share your vamp!</p>
            <button className="delete" onClick={() => setVisible(!visible)}></button>
          </header>
          <div className="modal-card-body">
            <p>boop</p>
          </div>
        </div>
      </div>
      <button onClick={generateLink}>Share Vamp</button>
    </>
  )
}

export default ShareModal
import { useState } from 'react'

const ShareModal = ({ encodeGrid }) => {

  const [visible, setVisible] = useState(false);
  const [shareURL, setShareURL] = useState('')
  // grid can be passed as an encoded URI safe string. Just need to offer that as a url in a field that can be copied by a user
  // then need to figure out how to catch if there's a query string and then load the vamp, but only if that string is valid

  // let match = useRouteMatch()
  // let location = useLocation()
  // debugger

  const showModal = () => {
    setShareURL(createShareableURL())
    setVisible(!visible)
  }

  const hideModal = () => {
    setVisible(false)
  }

  const createShareableURL = () => {
    return `${window.location.host}?vamp=${encodeGrid()}`
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(createShareableURL())
  }

  return(
    <>
      <div className={visible ? 'modal is-active' : 'modal'}>
        <div className="modal-background" onClick={hideModal}></div>
        <div className="modal-content">
          <header className="modal-card-head">
            <p className="modal-card-title">Send this link to your friends to share your vamp!</p>
            <button className="delete" onClick={hideModal}></button>
          </header>
          <div className="modal-card-body">
            <div className="field has-addons has-addons-centered">
              <div className="control is-expanded">
                <input readOnly type="text" value={shareURL} className="input is-rounded"></input>
              </div>
              <div className="control">
                <button className="button is-link is-rounded" onClick={copyToClipboard}>Copy to Clipboard</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="button is-rounded is-link my-3" onClick={showModal}>Share Vamp</button>
    </>
  )
}

export default ShareModal
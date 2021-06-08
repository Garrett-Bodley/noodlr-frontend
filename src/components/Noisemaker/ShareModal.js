import { useState } from 'react'

const ShareModal = ({ encodeGrid }) => {

  const [visible, setVisible] = useState(false);
  const [shareURL, setShareURL] = useState('')

  const showModal = () => {
    setShareURL(createShareableURL())
    setVisible(!visible)
  }

  const hideModal = () => {
    setVisible(false)
  }

  const createShareableURL = () => {
    return `https://${window.location.host}?vamp=${encodeGrid()}`
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
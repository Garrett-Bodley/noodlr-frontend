
const DeleteUserModal = () => {

  return(
    <div className="modal is-active">
      <div className="modal-background" onClick={hideModal} ></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Warning</p>
          <button className="delete" aria-label="close" onClick={hideModal} ></button>
        </header>
        <div className="modal-card-body">
          <div className="field">
            <p className="has-text-danger">This action will permanently delete your account and is irreversible</p>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-danger">Delete Account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteUserModal
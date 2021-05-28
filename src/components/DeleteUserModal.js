
const DeleteUserModal = ({hideModal, deleteUser}) => {

  return(
    <div className="modal is-active">
      <div className="modal-background" onClick={hideModal} ></div>
      <div className="modal-card">
        <header className="modal-card-head has-text-centered">
          <p className="modal-card-title has-text-danger has-text-weight-bold">Warning!</p>
          <button className="delete" aria-label="close" onClick={hideModal} ></button>
        </header>
        <div className="modal-card-body">
          <div className="field">
            <p className="has-text-danger">This action will permanently delete your account and is irreversible. Are you sure you want to proceed?</p>
          </div>
          <div className="field">
            <div className="control">
              <button className="button  is-fullwidth is-danger" onClick={deleteUser}>Delete Account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteUserModal
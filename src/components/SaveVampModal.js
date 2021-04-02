import classNames from 'classnames/bind'
import React, { Component } from 'react'

const SaveVampModal = ({pending, error, hideModal, handleOnSubmit, handleOnChange}) => {
  return(
    <div id="save-vamp" className="modal is-active">
      <div className="modal-background" onClick={hideModal} ></div>
      <div className="modal-content">
        <header className="modal-card-head">
          <p className="modal-card-title">Save Vamp</p>
          <button className="delete" onClick={hideModal} ></button>
        </header>
        <div className="modal-card-body">
          <form onSubmit={handleOnSubmit} onChange={handleOnChange}>
            <p className="has-text-danger has-background-danger-light">{error ? `${error}` : null}</p>
            <div className="field">
              <label className="label">Name:</label>
              <div className="control">
                <input className="input" name="name" type="text"></input>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button className={classNames('button', 'is-link', {'is-loading': pending})} type="submit">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SaveVampModal
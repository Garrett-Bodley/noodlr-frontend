import React from 'react'

export const ProfileErrors = ({vampError, vampStatus}) => {
  return(
    <div className="field">
      <p className="has-text-danger has-background-danger-light">{vampError ? vampError : null}</p>
      <p className="has-text-success has-background-success-light">{vampStatus ? vampStatus : null}</p>
    </div>
  )
}
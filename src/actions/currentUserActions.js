const SUBMIT_URL = 'http://localhost:3001'

export const createNewUser = (user) => {

  const configObj = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ user })
  }

  return (dispatch) => {
    fetch(SUBMIT_URL + '/users', configObj).then(resp => resp.json()).then(json => {
      localStorage.setItem('token', json.token)
      dispatch(loginUser(json.user))
    })
  }
}

export const loginUser = (userObj) => {
  return {type: "LOGIN", payload: userObj}
}
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
      dispatch(loginUser(json))
    })
  }
}

export const loginPostFetch = (user) => {
  const configObj = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({user})
  }
  return (dispatch) => {
    fetch(SUBMIT_URL + '/login', configObj).then(resp => resp.json()).then(json => {
      localStorage.setItem('token', json.token)
      dispatch(loginUser(json))
    })
  }
}

export const loginUser = (payload) => {
  return {type: "LOGIN", payload: payload}
}

export const logOutUser = () => {
  return {type: 'LOGOUT'}
}
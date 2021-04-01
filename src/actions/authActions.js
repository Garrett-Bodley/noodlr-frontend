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
    fetch(SUBMIT_URL + '/users', configObj).then(resp => {
      if(resp.ok){
        setToken(resp.headers.get("Authorization"))
        return resp.json().then(json => dispatch({type: 'AUTHENTICATED', payload: json}))
      }else{
        return resp.json().then(errors => {
          dispatch({type: 'NOT_AUTHENTICATED'})
          return Promise.reject(errors)
        })
      }
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

const setToken = (token) => {
  localStorage.setItem("token", token);
  localStorage.setItem("lastLoginTime", new Date(Date.now()).getTime());
};

const getToken = () => {
  const now = new Date(Date.now()).getTime();
  const thirtyMinutes = 1000 * 60 * 30;
  const timeSinceLastLogin = now - localStorage.getItem("lastLoginTime");
  if (timeSinceLastLogin < thirtyMinutes) {
    return localStorage.getItem("token");
  }
};
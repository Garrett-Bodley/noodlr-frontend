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
        return resp.json().then((json) => {
          setUserToken(json)
          return dispatch({type: 'AUTHENTICATED', payload: json.user})
        })
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
    fetch(SUBMIT_URL + '/login', configObj).then(resp => {
      if(resp.ok){
        return resp.json().then(json => {
          debugger
          return dispatch({type: 'AUTHENTICATED', payload: json})
        })
      }else{
        return resp.json().then(errors => {
          dispatch({type: 'NOT_AUTHENTICATED'})
          return Promise.reject(errors)
        })
      }
    })
  }
}

const setUserToken = ({user, token}) => {
  localStorage.setItem("token", token);
  localStorage.setItem('user', JSON.stringify(user))
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

export const getUser = () => {
  const now = new Date(Date.now()).getTime();
  const thirtyMinutes = 1000 * 60 * 30;
  const timeSinceLastLogin = now - localStorage.getItem("lastLoginTime");
  if (timeSinceLastLogin < thirtyMinutes) {
    const user = JSON.parse(localStorage.getItem("user"))
    return (dispatch) => dispatch({type: "AUTHENTICATION_PERSISTED", payload: user})
  }else{
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }
}
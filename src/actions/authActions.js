const SUBMIT_URL = 'https://noodlr.herokuapp.com'

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
        return resp.json().then(json => {
          dispatch({type: 'NOT_AUTHENTICATED', payload: json.messages})
          return Promise.reject(json)
        })
      }
    })
  }
}

export const patchUser = (user) => {
  const token = getToken()
  const configObj = {
    method: "PATCH",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ user })
  }

  return (dispatch) => fetch(SUBMIT_URL + `/users/${user.id}`, configObj).then(resp => {
    if(resp.ok){
      return resp.json().then(json => dispatch({type: 'EDIT_USER', payload: json}))
    }else{
      return resp.json().then(errors => {
        dispatch({type: 'UPDATE_FAILED', payload: errors.messages})
        return Promise.reject(errors)
      })
    }
  })
}

export const deleteUser = (userId) => {
  const token = getToken()
  const configObj = {
    method: "DELETE",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  }

  return (dispatch) => fetch(SUBMIT_URL + `/users/${userId}`, configObj).then(resp => {
    if(resp.ok){
      return resp.json().then(json => {
        dispatch({type: 'USER_DELETED', payload: json.messages})
        dispatch(logoutUser())
      })
    }else{
      return resp.json().then(errors => {
        dispatch({type: 'UPDATE_FAILED', payload: errors.messages})
        return Promise.reject(errors)
      })
    }
  })
}

export const loginUser = (user) => {
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
          setUserToken(json)
          return dispatch({type: 'AUTHENTICATED', payload: json.user})
        })
      }else{
        return resp.json().then(errors => {
          dispatch(notAuthenticated(errors))
          return Promise.reject(errors)
        })
      }
    })
  }
}

export const logoutUser = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  return dispatch => dispatch({type: "CLIENT_LOGOUT"})
}

export const notAuthenticated = (errors) => {
  return {type: 'NOT_AUTHENTICATED', payload: errors.messages}
}

const setUserToken = ({user, token}) => {
  localStorage.setItem("token", token);
  localStorage.setItem('user', JSON.stringify(user))
  localStorage.setItem("lastLoginTime", new Date(Date.now()).getTime());
};

export const getToken = () => {
  const now = new Date(Date.now()).getTime();
  const thirtyMinutes = 1000 * 60 * 30;
  const timeSinceLastLogin = now - localStorage.getItem("lastLoginTime");
  if (timeSinceLastLogin < thirtyMinutes) {
    return localStorage.getItem("token");
  }
};

export const getUser = () => {
  const token = getToken()
  const user = JSON.parse(localStorage.getItem("user"))
  if (token && user) {
    return (dispatch) => dispatch({type: "AUTHENTICATION_PERSISTED", payload: user})
  }else{
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    return (dispatch) => dispatch({type: "AUTHENTICATION_NOT_PERSISTED"})
  }
}

export const clearStatus = () => {
  return dispatch => dispatch({type: 'CLEAR_STATUS'})
}
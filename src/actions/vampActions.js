import { getToken } from './authActions'

const SUBMIT_URL = 'http://localhost:3001'

export const saveVamp = ({name, notation}) => {

  const vamp = {
    name: name,
    notation: JSON.stringify(notation)
  }
  
  const token = getToken()
  // debugger
  const configObj = {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({vamp})
  }

  return (dispatch) => {
    dispatch({type: 'SENDING_VAMP'});
    fetch(SUBMIT_URL + '/vamps', configObj).then(resp => {
      if(resp.ok){
        return resp.json().then(json => dispatch({type: "ADD_VAMP", payload: json}))
      }else{
        return resp.json().then(message => {
          return dispatch({type:'FAILURE', payload: message})
        })
      }
    })
  }
}

export const getUserVamps = () => {
  
  const token = getToken()
  const configObj = {
    method: "GET",
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  }

  return (dispatch) => {
    fetch(SUBMIT_URL + '/vamps', configObj)
      .then(
        resp => resp.json()
      )
      .then(
        json => dispatch({type: "ADD_VAMPS", payload: json})
      )
  }
}
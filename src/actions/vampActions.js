import { getToken } from './authActions'

const SUBMIT_URL = 'http://localhost:3001/vamps'

export const saveVamp = ({name, notation}) => {

  const vamp = {
    name: name,
    notation: JSON.stringify(notation)
  }
  debugger
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
    dispatch({type: 'CONTACTING_SERVER'});
    fetch(SUBMIT_URL, configObj).then(resp => {
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

export const editVamp = ({name, notation}) => {

  const vamp = {
    name: name,
    notation: JSON.stringify(notation)
  }
  
  const token = getToken()
  // debugger
  const configObj = {
    method: "PATCH",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({vamp})
  }

  return (dispatch) => {
    dispatch({type: 'CONTACTING_SERVER'});
    fetch(SUBMIT_URL, configObj).then(resp => {
      if(resp.ok){
        return resp.json().then(json => dispatch({type: "EDIT_VAMP", payload: json}))
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
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  }

  return (dispatch) => {
    fetch(SUBMIT_URL, configObj)
      .then(resp => {
        if(resp.ok){
          return resp.json().then(json => dispatch({type: "ADD_VAMPS", payload: json}))
        }else{
          return resp.json().then(message => {
            return dispatch({type:'FAILURE', payload: message})
          })
        }
      }
    )
  }
}

export const getVamp = (vampId) => {
  const token = getToken()
  const configObj = {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  }

  return (dispatch) => {
    fetch(SUBMIT_URL + `/${vampId}`, configObj).then(resp => {
      if(resp.ok){
        return resp.json().then(json =>{ 
          dispatch({type: "ADD_VAMP", payload: json[0]})})
      }else{
        return resp.json().then(message => {
          return dispatch({type:'FAILURE', payload: message})
        })
      }
    })
  }
}
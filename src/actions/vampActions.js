import { getToken, notAuthenticated } from './authActions'

const SUBMIT_URL = 'https://noodlr.herokuapp.com/vamps'

export const saveVamp = ({name, notation, volume, tempo}) => {

  const vamp = {
    name: name,
    notation: JSON.stringify(notation),
    volume: volume,
    tempo: tempo
  }
  const token = getToken()
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
        if(resp.status === 401){
          return resp.json().then(errors => {
            dispatch(notAuthenticated(errors))
          })
        }else{
          return resp.json().then(message => {
            dispatch({type:'FAILURE', payload: message})
          })
        }
      }
    })
  }
}

export const editVamp = ({id, name, notation, volume, tempo}) => {
  const vamp = {
    name: name,
    notation: JSON.stringify(notation),
    volume: volume,
    tempo: tempo
  }
  
  const token = getToken()
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
    fetch(SUBMIT_URL + `/${id}`, configObj).then(resp => {
      if(resp.ok){
        return resp.json().then(json => dispatch({type: "EDIT_VAMP", payload: json}))
      }else{
        if(resp.status === 401){
          return resp.json().then(errors => {
            dispatch(notAuthenticated(errors))
          })
        }else{
          return resp.json().then(message => {
            dispatch({type:'FAILURE', payload: message})
          })
        }
      }
    })
  }
}

export const resetVampStatus = () => {
  return {type:'CLEAR_STATUS'}
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
          if(resp.status === 401){
            return resp.json().then(errors => {
              dispatch(notAuthenticated(errors))
            })
          }else{
            return resp.json().then(message => {
              dispatch({type:'FAILURE', payload: message})
            })
          }
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
          dispatch({type: "ADD_VAMP", payload: json})})
      }else{
        if(resp.status === 401){
          return resp.json().then(errors => {
            dispatch(notAuthenticated(errors))
          })
        }else{
          return resp.json().then(message => {
            dispatch({type:'FAILURE', payload: message})
          })
        }
      }
    })
  }
}

export const deleteVamp = (vampId) => {
  const token = getToken()
  const configObj = {
    method: "DELETE",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  }

  return (dispatch) => {
    fetch(SUBMIT_URL + `/${vampId}`, configObj).then(resp => {
      if(resp.ok){
        return resp.json().then(json => dispatch({type: 'DELETE_VAMP', payload: parseInt(json)}))
      }else{
        if(resp.status === 401){
          return resp.json().then(errors => {
            dispatch(notAuthenticated(errors))
          })
        }else{
          return resp.json().then(message => {
            dispatch({type:'FAILURE', payload: message})
          })
        }
      }
    })
  }
}
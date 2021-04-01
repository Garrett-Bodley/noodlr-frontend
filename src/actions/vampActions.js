const SUBMIT_URL = 'http://localhost:3001'

export const createVamp = (configObj) => {
  console.log('inside createVamp')
  console.log(configObj)
  return (dispatch) => {
    dispatch({type: 'SENDING_VAMP'});
    fetch(SUBMIT_URL + '/vamps', configObj).then(resp => resp.json()).then(json => console.log(json))
  }
}
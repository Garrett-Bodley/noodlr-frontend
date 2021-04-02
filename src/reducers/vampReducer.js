export const vampReducer = (
  state = {
    vamps: [],
    pending: false,
    error: null
  }, action) => {
  switch(action.type){
    case 'SENDING_VAMP':
      return {...state, pending: true}
    case 'FAILURE':
      const error = action.payload.message
      return {...state, pending: false, error: error}
    case 'CLEAR_ERRORS':
      return {...state, pending: false,  error: null}
    case 'ADD_VAMPS':
      return {...state, vamps: action.payload}
    case 'ADD_VAMP':
      return {...state, vamps: [...state.vamps, action.payload.vamp]}
    default:
      return state
  }
}
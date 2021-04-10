export const vampReducer = (
  state = {
    vamps: [],
    pending: false,
    error: null,
    status: null
  }, action) => {
  switch(action.type){
    case 'CONTACTING_SERVER':
      return {...state, pending: true}
    case 'FAILURE':
      const error = action.payload.message
      return {...state, pending: false, error: error}
    case 'CLEAR_ERRORS':
      return {...state, pending: false,  error: null, status: null}
    case 'ADD_VAMPS':
      const vamps = action.payload
      vamps.forEach((vamp, index) => {
        vamp.notation = JSON.parse(action.payload[index].notation)
      });
      return {...state, vamps: vamps, pending: false}
    case 'ADD_VAMP':
      const vamp = action.payload
      vamp.notation = JSON.parse(action.payload.notation)
      return {...state, vamps: [...state.vamps, vamp], pending: false, status: 'Vamp saved!'}
    case 'EDIT_VAMP':
      const editedVamp = action.payload
      editedVamp.notation = JSON.parse(action.payload.notation)
      const newVamps = state.vamps.map(vamp => {
        return vamp.id === editedVamp.id ? editedVamp : vamp
      })
      return {...state, vamps: newVamps, pending: false, status: 'Vamp saved!'}
    case 'DELETE_VAMP':
      const vampId = action.payload
      const index = state.vamps.findIndex(vamp => vamp.id === vampId)
      // debugger
      if(index >= 0){
        // debugger
        const newVamps = [...state.vamps.slice(0, index), ...state.vamps.slice(index + 1)]
        return {...state, vamps: newVamps, pending: false, status: 'Vamp deleted!'}
      }else{
        return {...state, pending: false, error: 'Something went wrong...'}
      }
    case 'CLEAR_STATUS':
      return {
        ...state, 
        pending: false,
        error: null,
        status: null
      }
    default:
      return state
  }
}
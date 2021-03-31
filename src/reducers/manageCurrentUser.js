export const manageCurrentUser = (state = {current_user: null}, action) => {
  switch(action.type){
    case "LOGIN":
      return {...state, current_user: action.user}
    case "LOGOUT":
      return {...state, current_user: null}
    case "UPDATE_USER":
      return {...state, current_user: action.user}
    case "DELETE_USER":
      return {...state, current_user: null}
    default:
      return state
  }
}
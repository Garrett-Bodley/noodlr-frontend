export const authReducer = (state = {current_user: null, loggedIn: false}, action) => {
  switch(action.type){
    case "LOGIN":
      const { user_id, token } = action.payload
      localStorage.setItem('token', token)
      return {...state, current_user: user_id, loggedIn: true}
    case "LOGOUT":
      return {...state, current_user: null, loggedIn: false}
    default:
      return state
  }
}
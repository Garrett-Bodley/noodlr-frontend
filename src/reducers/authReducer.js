export const authReducer = (
  state = {
    loggedIn: false, 
    authChecked: false, 
    currentUser: {},
    status: {}
  }, action) => {
  switch(action.type){
    case "AUTHENTICATED":
      return ({...state,
        authChecked: true,
        loggedIn: true,
        currentUser: action.payload,
      })
    case "NOT_AUTHENTICATED":
      return ({...state,
        authChecked: true,
        loggedIn: false,
        currentUser: {},
        status: {failed: true, messages: [...action.payload]}
      })
    case "AUTHENTICATION_PERSISTED":
      return ({...state,
        authChecked: false,
        loggedIn: true,
        currentUser: action.payload
      })
    case "AUTHENTICATION_NOT_PERSISTED":
      return { ...state,
        loggedIn: false,
        currentUser: {}
      }
    case "CLIENT_LOGOUT":
      return {...state, 
        loggedIn: false,
        currentUser: {}
      }
    case "EDIT_USER":
      return {
        ...state,
        loggedIn: true,
        authChecked: true, 
        currentUser: action.payload, 
        status: {
          success: true, 
          messages: ["Update Successful!"]
        }
      }
    case "UPDATE_FAILED":
      return {...state, status: {failed: true, messages: [...action.payload]}}
    case "USER_DELETED":
      return {
        ...state, 
        loggedIn: false, 
        currentUser: {}, 
        status: {success: true, messages: [...action.payload]}
      }
    case "CLEAR_STATUS":
      return {...state, status: {}}
    default:
      return state
  }
}
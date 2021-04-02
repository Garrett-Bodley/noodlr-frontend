export const authReducer = (state = {loggedIn: false, authChecked: false, currentUser: {}}, action) => {
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
        loggedIn: false
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
    default:
      return state
  }
}
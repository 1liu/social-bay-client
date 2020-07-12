import { SET_USER, SET_AUTHTICATED, SET_UNAUTHTICATED, LOADING_USER } from '../types'

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  likes: [],
  notifications: []
}
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHTICATED:
      return {
        ...state,
        authenticated: true
      }
    case SET_UNAUTHTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload
      }
    case LOADING_USER:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
}

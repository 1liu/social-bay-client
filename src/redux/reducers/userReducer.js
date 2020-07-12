import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_AUTHTICATED, SET_UNAUTHTICATED } from '../types'

const initialState = {
  authenticated: false,
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
        ...action.payload
      }
    default:
      return state;
  }
}

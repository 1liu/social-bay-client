import { SET_USER, SET_AUTHTICATED, SET_UNAUTHTICATED, LOADING_USER, LIKE_POST, UNLIKE_POST } from '../types'

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
    case LIKE_POST:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            screamId: action.payload.screamId
          }
        ]
      };
    case UNLIKE_POST:
      return {
        ...state,
        likes: state.likes.filter(like => like.postId !== action.payload.postId)
      }
    default:
      return state;
  }
}

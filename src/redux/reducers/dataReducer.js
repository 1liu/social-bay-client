import { SET_POSTS, LOADING_POST, LIKE_POST, UNLIKE_POST, DELETE_POST, CREATE_POST } from '../types'

const initialState = {
  posts: [],
  post: {},
  loading: false
}
export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_POST:
      return {
        ...state,
        loading: true
      }
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case LIKE_POST:
    case UNLIKE_POST:
      let index = state.posts.findIndex(post => post.postId === action.payload.postId);
      state.posts[index] = action.payload;
      return {
        ...state
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.postId !== action.payload)
      }
    case CREATE_POST:
      return {
        ...state,
        posts: [
          action.payload,
          ...state.posts
        ]
      }
    default:
      return state;
  }
}

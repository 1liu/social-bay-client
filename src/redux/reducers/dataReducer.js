import { SET_POSTS, LOADING_POST, LIKE_POST, UNLIKE_POST } from '../types'
import { act } from 'react-dom/test-utils';

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
    default:
      return state;
  }
}

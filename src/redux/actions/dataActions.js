import { SET_POSTS, LOADING_POST, LIKE_POST, UNLIKE_POST, SET_ERRORS } from '../types'
import axios from 'axios'

// get all posts
export const getPosts = () => (dispatch) => {
  dispatch({ type: LOADING_POST });
  axios.get('/posts')
    .then(res => {
      dispatch({
        type: SET_POSTS,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: SET_POSTS,
        payload: []
      })
    })
}

//like
export const likePost = (postId) => (dispatch) => {
  axios.get(`/posts/${postId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_POST,
        payload: res.data
      })
    })
    .catch(err => console.log(err))
}

//unlike
export const unlikePost = (postId) => (dispatch) => {
  axios.get(`/posts/${postId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_POST,
        payload: res.data
      })
    })
    .catch(err => console.log(err))
}

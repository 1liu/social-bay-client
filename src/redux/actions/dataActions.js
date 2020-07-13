import { SET_POST, SET_POSTS, LOADING_POST, LIKE_POST, UNLIKE_POST, SET_ERRORS, DELETE_POST, CREATE_POST, LOADING_UI, STOP_LOADING_UI, CLEAR_ERRORS } from '../types'
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

// get one post
export const getPost = (postId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios.get(`/posts/${postId}`)
    .then(res => {
      dispatch({
        type: SET_POST,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI })
    })
    .catch(err => {
      console.log(err)
    })
}
//create a post
export const createPost = (newPost) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios.post('/posts', newPost)
    .then(res => {
      dispatch({
        type: CREATE_POST,
        payload: res.data
      })
      dispatch({
        type: CLEAR_ERRORS
      })
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
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

//delete post
export const deletePost = (postId) => (dispatch) => {
  axios.delete(`/posts/${postId}`)
    .then(() => {
      dispatch({
        type: DELETE_POST,
        payload: postId
      })
    })
}

//clear errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS })
}

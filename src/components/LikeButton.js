import React, { Component } from 'react'
import MyButton from '../lib/MyButton'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
//mui
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
//redux
import { connect } from 'react-redux'
import { likePost, unlikePost } from '../redux/actions/dataActions'

export class LikeButton extends Component {
  likedPost = () => {
    if (this.props.user.likes && this.props.user.likes.find(like => like.postId === this.props.postId)) {
      return true;
    } else {
      return false;
    }

  }
  likePost = () => {
    this.props.likePost(this.props.postId)
  }
  unlikePost = () => {
    this.props.unlikePost(this.props.postId)
  }

  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <MyButton tip="Like">
        <Link to='/login'>
          <FavoriteBorderIcon color="primary" />
        </Link>
      </MyButton>
    ) : (
        this.likedPost() ? (
          <MyButton tip="Unlike" onClick={this.unlikePost}>
            <FavoriteIcon color="primary" />
          </MyButton>
        ) : (
            <MyButton tip="Like" onClick={this.likePost}>
              <FavoriteBorderIcon color="primary" />
            </MyButton>
          )
      )
    return likeButton
  }
}

LikeButton.protoTypes = {
  user: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired
}

const mapStatetoProps = state => ({
  user: state.user
})

const mapActionstoProps = {
  likePost,
  unlikePost
}
export default connect(mapStatetoProps, mapActionstoProps)(LikeButton)

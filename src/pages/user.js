import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Post from '../components/Post'
import StaticProfile from '../components/StaticProfile'
import PostSkeleton from '../lib/PostSkeleton'
import ProfileSkeketon from '../lib/ProfileSkeleton'
//mui
import Grid from '@material-ui/core/Grid'
//redux
import { connect } from 'react-redux'
import { getUserData } from '../redux/actions/dataActions'

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
      postIdParam: null
    }
  }
  /*   componentWillReceiveProps = (nextProps) => {
      if (nextProps.match.params.postId !== this.state.postIdParam) {
        window.location.reload();
      }
    }; */

  componentDidMount() {
    const handle = this.props.match.params.handle;
    const postId = this.props.match.params.postId;

    if (postId) this.setState({ postIdParam: postId });

    this.props.getUserData(handle);
    console.log('starts axio')
    axios
      .get(`/user/${handle}`)
      .then(res => {
        this.setState({ profile: res.data.user });
        console.log('complete axio')
      })
      .catch(err => console.log(err));

  }
  /*
    static getDerivedStateFromProps(props, state) {
      if (props.UI.errors) {
        return {
          errors: props.UI.errors
        };
      }
      if (!props.UI.errors && !props.UI.loading) {
        return { body: '' }
      }
      // Return null to indicate no change to state.
      return null;
    } */


  render() {
    const { posts, loading } = this.props.data;
    const { postIdParam } = this.state;
    console.log('postIdParam', postIdParam)
    console.log('state', this.state)
    const postsMarkup = loading ? (
      // <p>loading...</p>
      <PostSkeleton />
    ) : (
        posts === null ? (
          <p>No post from this user</p>
        ) : !postIdParam ? (
          posts.map(post =>
            <Post key={post.postId} post={post} />
          )
        ) : (
              posts.map(post => {
                if (post.postId !== postIdParam) {
                  return <Post key={post.postId} post={post} />
                }
                else {
                  return <Post key={post.postId} post={post} openDialog={true} />
                }
              })
            )
      )

    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          <p>Content</p>
          {postsMarkup}
        </Grid>

        <Grid item sm={4} xs={12}>
          <p>Profile</p>
          {this.state.profile === null ? (
            // <p>loading profile...</p>
            <ProfileSkeketon />
          ) : (
              <StaticProfile profile={this.state.profile} />
            )}
        </Grid>
      </Grid>
    )
  }
}

User.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}

const mapStatestoProps = state => ({
  data: state.data
})
export default connect(mapStatestoProps, { getUserData })(User)

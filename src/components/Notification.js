import React, { Fragment, Component } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'

//mui
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'
import IconButton from '@material-ui/core/IconButton'
import NotificationIcon from '@material-ui/icons/Notifications'
import FavIcon from '@material-ui/icons/Favorite'
import ChatIcon from '@material-ui/icons/Chat'

//redux
import { connect } from 'react-redux'
import { markNotificationRead } from '../redux/actions/userActions'

class Notification extends Component {
  state = {
    anchorEl: null
  }

  handleOpen = event => {
    this.setState({ anchorEl: event.target })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  onMenuOpened = () => {
    let unreadNotificationIds = this.props.notifications.filter(n => !n.read)
      .map(n => n.nofificationId);
    this.props.markNotificationRead(unreadNotificationIds);
  }
  render() {
    dayjs.extend(relativeTime);
    const notifications = this.props.notifications;
    const anchorEl = this.state.anchorEl;

    let notificationIcon;
    if (notifications && notifications.length > 0) {
      notifications.filter(notification => notification.read === false).length > 0 ? (
        notificationIcon = (<Badge badgeContent={notifications.filter(n => n.read === false).length}
          color="secondary">
          <NotificationIcon />
        </Badge>)
      ) : (
          notificationIcon = (<NotificationIcon />)
        )
    }
    else {
      notificationIcon = (<NotificationIcon />)
    }

    let notificationMarkup = notifications && notifications.length > 0 ? (
      notifications.map(n => {
        const verb = n.type === 'like' ? 'liked' : 'commented on';
        const time = dayjs(n.createdAt).fromNow();
        const iconColor = n.read ? 'primary' : 'secondary';
        const icon = n.type === 'like' ? (
          <FavIcon color={iconColor} style={{ marginRight: 10 }} />
        ) : (
            <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
          )

        return (
          <MenuItem key={n.createdAt} onClick={this.handleClose}>
            {icon}
            <Typography
              component={Link}
              to={`/users/${n.recipient}/post/${n.postId}`}
              color="primary"
              variant="body1">
              {n.sender} {verb} your post {time}
            </Typography>
          </MenuItem>
        )
      })
    ) : (
        <MenuItem onClick={this.handleClose}>
          You have no notification
        </MenuItem>
      )
    return (
      <Fragment>
        <Tooltip placement="top" title="Notifications">
          <IconButton aria-owns={anchorEl ? "simple-menu" : undefined} aria-haspopup="true" onClick={this.handleOpen}>
            {notificationIcon}
          </IconButton>
        </Tooltip>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          onEntered={this.onMenuOpened}
        >
          {notificationMarkup}
          {/* <MenuItem onClick={this.handleClose}>Profile</MenuItem>
          <MenuItem onClick={this.handleClose}>My account</MenuItem>
          <MenuItem onClick={this.handleClose}>Logout</MenuItem> */}
        </Menu>
      </Fragment>
    );
  }
}
Notification.propTypes = {
  markNotificationRead: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  notifications: state.user.notifications
})

export default connect(mapStateToProps, { markNotificationRead })(Notification)

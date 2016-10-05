import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import * as UserActions from '../actions/user';
import UserCard from '../components/UserCard';

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

class User extends Component {
  componentDidMount() {
    return Promise.all([
      this.props.dispatch(UserActions.fetchUserIfNeeded(this.props.params.id)),
    ]);
  }

  getUser() {
    return this.props.user[this.props.params.id];
  }

  renderUser() {
    const user = this.getUser();

    if (!user || user.readyState === UserActions.USER_FETCHING) {
      return <p>Loading...</p>;
    }

    if (user.readyState === UserActions.USER_FETCH_FAILED) {
      return <p>Failed to fetch user</p>;
    }

    return <UserCard user={user.info} />;
  }

  render() {
    return (
      <div>
        <Helmet
          title={this.getUser() ? this.getUser().name : ''}
          meta={[
            { name: 'description', content: 'User Profile' },
          ]}
        />
        {this.renderUser()}
      </div>
    );
  }
}

export default connect(mapStateToProps)(User);

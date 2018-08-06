import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPublicDragons } from '../actions/publicDragons';
import { Link } from 'react-router-dom';

class PublicDragons extends Component {
  componentDidMount() {
    this.props.fetchPublicDragons();
  }

  render() {
    return (
      <div>
        <h3>Public Dragons</h3>
        <Link to='/'>Home</Link>
      </div>
    );
  }
}

export default connect(
  ({ publicDragons }) => ({ publicDragons }),
  { fetchPublicDragons }
)(PublicDragons);

// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index';
import Search from '../components/search';

type Props = {
  actions: {
    findMoviesList: (options?: {}) => void
  }
};

class SearchContainer extends Component<Props> {
  props: Props;
  state = {
    value: ''
  }

  handleSubmit = event => {
    event.preventDefault();

    if (!this.input.value.length > 0) {
      this.props.actions.findMoviesList({
        sort_by: 'year'
      });
    } else {
      this.props.actions.findMoviesList({
        query_term: this.input.value
      });
    }
  }

  setInputRef = element => {
    this.input = element;
  }

  handleInputChange = event => {
    this.setState({
      value: event.target.value
    });
  }

  render() {
    return (
      <Search
        setRef={this.setInputRef}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleInputChange}
        value={this.state.value}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(SearchContainer);

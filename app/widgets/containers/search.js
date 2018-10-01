// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index';
import Search from '../components/search';

type Props = {
  actions: {
    findMoviesList: (options?: {}) => void,
    searchMovies: (options?: {}) => void,
    updateSearchList: () => void
  }
};

class SearchContainer extends Component<Props> {
  props: Props;

  state = {
    value: ''
  };

  handleSubmit = event => {
    event.preventDefault();
    const { actions: $actions } = this.props;
    if (!this.input.value.length > 0) {
      $actions.updateSearchList([]);
    } else {
      $actions.searchMovies({
        query_term: this.input.value
      });
    }
  };

  setInputRef = element => {
    this.input = element;
  };

  handleInputChange = event => {
    const { actions: $actions } = this.props;
    this.setState({
      value: event.target.value
    });

    if (!event.target.value.length > 0) {
      $actions.updateSearchList([]);
    }
  };

  render() {
    const { value } = this.state;
    return (
      <Search
        setRef={this.setInputRef}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleInputChange}
        value={value}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(SearchContainer);

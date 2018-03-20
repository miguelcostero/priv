// @flow
import React, { Component } from 'react';
import styles from './SearchInput.sass';

type Props = {};

export default class SearchInput extends Component<Props> {
  props: Props;

  handleSubmit = event => {
    event.preventDefault();
    console.log('SUBMITTED');
  }

  render() {
    return (
      <div className={styles.container}>
        <form onSubmit={this.handleSubmit}>
          <div className={styles.formContainer}>
            <input type="text" placeholder="Search movies" />
            <button type="submit">
              <i className="fa fa-search" aria-hidden="true" />
            </button>
          </div>
        </form>
      </div>
    );
  }
}

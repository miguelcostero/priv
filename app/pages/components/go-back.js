// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/fontawesome-free-solid';
import styles from './go-back.sass';

type Props = {
  path: string
};

const GoBack = (props: Props) => (
  <div className={styles.GoBack}>
    <Link to={props.path}>
      <FontAwesomeIcon icon={faArrowAltCircleLeft} />
    </Link>
  </div>
);

export default GoBack;

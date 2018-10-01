// @flow
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './go-back.sass';

type Props = {
  path: string
};

const GoBack = ({ path }: Props) => (
  <div className={styles.GoBack}>
    <Link to={path}>
      <FontAwesomeIcon icon={faArrowAltCircleLeft} />
    </Link>
  </div>
);

export default GoBack;

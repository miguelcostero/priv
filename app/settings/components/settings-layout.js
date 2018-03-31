// @flow
import * as React from 'react';
import styles from './settings-layout.sass';

type Props = {
  children: React.Node
};

const SettingsLayout = (props: Props) => (
  <div className={styles.SettingsLayout}>
    {props.children}
  </div>
);

export default SettingsLayout;
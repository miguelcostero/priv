// @flow
import * as React from 'react';
import styles from './settings-layout.sass';

type Props = {
  children: React.Node
};

const SettingsLayout = ({ children }: Props) => (
  <div className={styles.SettingsLayout}>{children}</div>
);

export default SettingsLayout;

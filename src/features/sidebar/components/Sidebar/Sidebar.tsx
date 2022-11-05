import React from 'react';
import styles from './Sidebar.module.css';

export const Sidebar: React.FC = (props) => {
  return (
    <div className={styles.root}>
      <button>login</button>
    </div>
  );
};

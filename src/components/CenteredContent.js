import React from 'react';
import styles from '@/styles/CenteredContent.module.css'; 

const CenteredContent = ({ children }) => {
  return <div className={styles.centered}>{children}</div>;
};

export default CenteredContent;

import React from 'react';
import styles from './PostCreationInfo.module.scss';

export const PostCreationInfo = ({ avatarUrl, fullName, createdAt }) => {
const creationDate = createdAt.slice(0,10).split('-').join('.')
const creationTime = createdAt.slice(11,19)
  return (
    <div className={styles.postPostCreationInfo}>
      <img className={styles.avatar} src={`http://localhost:4444${avatarUrl}` || '/noavatar.png'} alt={fullName} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{creationDate + ' ' + creationTime}</span>
      </div>
    </div>
  );
};

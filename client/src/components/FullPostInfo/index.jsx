import React from 'react';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

import styles from './Post.module.scss';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';
import { fetchRemovePost } from '../../redux/slices/posts';

export const FullPostInfo = ({
  id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  tags,
  children,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch()
  if (isLoading) {
    return <PostSkeleton />;
  } 

  const onClickRemove = () => {
    if (window.confirm('Вы действитльно хотите удалить статью?')) {
      dispatch(fetchRemovePost(id))
    }
    
  };

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: true})}>
   {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {imageUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: true })}
          src={imageUrl}
          alt={title}
        />
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={createdAt} />
        <div className={styles.indention}>
          <h2 className={clsx(styles.title, { [styles.titleFull]: true })}>
            { title }
          </h2>
          <ul className={styles.tags}>
            {tags.map((name) => (
              <li key={name}>
                <Link to={`/tag/${name}`}>#{name}</Link>
              </li>
            ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
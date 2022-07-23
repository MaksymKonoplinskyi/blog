import React from 'react';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ReactMarkdown from "react-markdown"

import styles from '../../Home/Post/Post.module.scss';
import { fetchRemovePost } from '../../../redux/slices/posts';
import { PostCreationInfo } from '../../../components/PostInfo/PostCreationInfo';
import { CountWithIcon } from '../../../components/PostInfo/CountWithIcon';

export const FullPostInfo = ({
  curentPostData,
  isEditable,
  children,
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const onClickRemove = async () => {
    if (window.confirm('Вы действитльно хотите удалить статью?')) {
      await dispatch(fetchRemovePost(curentPostData._id))
      navigate('/')
    }

  };
  const { viewsCount, commentsCount } = curentPostData
  const countsData = {
    viewsCount,
    commentsCount
  }

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: true })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${curentPostData._id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>

          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>

        </div>
      )}
      {curentPostData.imageUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: true })}
          src={`http://localhost:4444${curentPostData.imageUrl}`}
          alt={curentPostData.title}
        />
      )}
      <div className={styles.wrapper}>
        <PostCreationInfo {...curentPostData.user} createdAt={curentPostData.createdAt} />

        <div className={styles.indention}>
          <h2 className={clsx(styles.title, { [styles.titleFull]: true })}>
            {curentPostData.title}
          </h2>
          <ul className={styles.tags}>
            {curentPostData.tags.map((name) => (
              <li key={name}>
                <Link to={`/tag/${name}`}>#{name}</Link>
              </li>
            ))}
          </ul>
          <ReactMarkdown children={curentPostData.text} />
          <CountWithIcon countsData={countsData} />
          {/* <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{curentPostData.viewsCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>{curentPostData.commentsCount}</span>
            </li>
          </ul> */}
        </div>
      </div>
    </div>
  );
};

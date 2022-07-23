import React from 'react'
import clsx from 'clsx'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Clear'
import EditIcon from '@mui/icons-material/Edit'
import styles from './Post.module.scss'
import { fetchPostsWithTag, fetchRemovePost } from '../../../redux/slices/posts'
import { PostCreationInfo } from '../../../components/PostInfo/PostCreationInfo'
import { CountWithIcon } from '../../../components/PostInfo/CountWithIcon'
import { Button } from '@mui/material'
import { Tags } from '../../../components/TagsBlock/Tags'


export const Post = ({
  postItem,
  isEditable,
}) => {
  const dispatch = useDispatch()

  const onClickRemove = () => {
    if (window.confirm('Вы действитльно хотите удалить статью?')) {
      dispatch(fetchRemovePost(postItem._id))
    }
  };

  const { viewsCount, commentsCount } = postItem
  const countsData = {
    viewsCount,
    commentsCount
  }

  const onClickTag = (value) => {
    console.log(value);
    dispatch(fetchPostsWithTag(value))
  }

  return (
    <div className={clsx(styles.root)}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${postItem._id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {postItem.imageUrl && (
        <img
          className={clsx(styles.image)}
          src={`http://localhost:4444${postItem?.imageUrl}`}
          alt={postItem.title}
        />
      )}
      <div className={styles.wrapper}>
        <PostCreationInfo {...postItem.user} createdAt={postItem.createdAt} />
        <div className={styles.indention}>
          <h2 className={clsx(styles.title)}>
            <Link to={`/fullPost/${postItem._id}`}>{postItem.title}</Link>
          </h2>
          <ul className={styles.tags}>
            {postItem.tags.map((name) => (
              <li key={name} >
                <Button onClick={(name) => onClickTag(name)} key={name} >#{name}</Button>
              </li>
            ))}
          </ul>
          {/*
          to={`/tag/${name}`}
          <ul className={styles.tags}>
            {postItem.tags.map((name) => (
              <li key={name}>
                <Link to={`/tag/${name}`}>#{name}</Link>
              </li>
            ))}
          </ul> */}
          <Tags className={styles.tagsInPost} tagsItems={postItem.tags} />


            <CountWithIcon countsData={countsData} />
        </div>
      </div>
    </div>
  );
};

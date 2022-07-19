import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPostsNew, fetchPostsPopular, fetchTags } from '../redux/slices/posts';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@mui/material';


export const Home = () => {
  const dispatch = useDispatch()
  const curentUserData = useSelector(state => state.auth.curentUserData)
  const { posts, tags } = useSelector(state => state.posts)

  const isPostsLoading = posts.status === 'loading'
  const isTagsLoading = tags.status === 'loading'
  const { curentSort } = useParams()
  // const sort = curentSort ? curentSort : 'new'


  React.useEffect(() => {
    switch (curentSort) {
      case 'new':
        dispatch(fetchPostsNew());
        break;

      case 'popular':
        dispatch(fetchPostsPopular());
        break;

      default:
        dispatch(fetchPostsNew());
        break;
    }

    dispatch(fetchTags())
  }, [dispatch, curentSort]);

  // console.log(sort);

  return (
    <>
      {/* <Tabs indicator="false" style={{ marginBottom: 15 }} value={sort} aria-label="basic tabs example">
        <Link style={{ textDecoration: 'none' }} to="/new" value={'new'}>
          <p style={{ margin: 15 }}>
            Новые
          </p>
        </Link>
        <Link style={{ textDecoration: 'none' }} to="/popular" value={'popular'}>
          <p style={{ margin: 15 }}>
            Популярные
          </p>
        </Link>
      </Tabs> */}
      <Link to="/new" >
        <Button style={{ margin: 15 }}>
          Новые
        </Button>
      </Link>
      <Link to="/popular" >
        <Button style={{ margin: 15 }}>
          Популярные
        </Button>
      </Link>

      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                key={index}
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj.tags}
                isEditable={curentUserData?._id === obj.user._id}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};

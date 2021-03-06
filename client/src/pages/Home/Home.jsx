import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import { TagsBlock } from '../../components/TagsBlock/TagsBlock';

import { fetchPostsNew, fetchPostsPopular } from '../../redux/slices/posts';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { PostsBlock } from './PostsBlock/PostsBlock';



export const Home = () => {
  const dispatch = useDispatch()
  const curentUserData = useSelector(state => state.auth.curentUserData)
  const posts = useSelector(state => state.posts)

  const isPostsLoading = posts.status === 'loading'
  // const isTagsLoading = tags.status === 'loading'
  const { curentSort } = useParams()
  //  const sort = curentSort ? curentSort : 'new'


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

    // dispatch(fetchTags())
  }, [dispatch, curentSort]);

  // console.log(sort);

  return (
    <>
      <Link style={{ textDecoration: "none" }} to="/new" >
        <Button style={{ margin: 15 }}>
          Новые
        </Button>
      </Link >
      <Link style={{ textDecoration: "none" }} to="/popular" >
        <Button style={{ margin: 15 }}>
          Популярные
        </Button>
      </Link>

      <Grid container spacing={4}>
        <Grid xs={8} item>
          <PostsBlock
            isPostsLoading={isPostsLoading}
            items={posts.items}
            curentUserId={curentUserData?._id}
          />
        </Grid>
        <Grid xs={4} item>
          <TagsBlock />
          {/* <CommentsBlock
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
          /> */}
        </Grid>
      </Grid>
    </>
  );
};

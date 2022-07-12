import React from "react";
import ReactMarkdown from "react-markdown"
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { fetchGetFullPost } from "../redux/slices/post";
import { FullPostInfo } from "../components/FullPostInfo";


export const FullPost = () => {
  const dispatch = useDispatch()
  const data = useSelector(state => state.post.postData)
  const { post } = useSelector(state => state)
  const isPostsLoading = post.status === 'loading'
  const curentUserId = useSelector(state => state.auth.curentUserData._id)
  const { id } = useParams()
  console.log(post);

  React.useEffect(() => {
    dispatch(fetchGetFullPost(id));
  }, [dispatch, id]);

  if (isPostsLoading) {
    return <Post isLoading={isPostsLoading} isFullPost />
  }

  return (
    <>


      <FullPostInfo
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isEditable={curentUserId === data.user._id}
      >
        <ReactMarkdown children={data.text} />,

      </FullPostInfo>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};

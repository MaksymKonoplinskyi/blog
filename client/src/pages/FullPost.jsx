import React from "react";
import ReactMarkdown from "react-markdown"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { fetchGetFullPost } from "../redux/slices/post";
import { FullPostInfo } from "../components/FullPostInfo";
import { PostSkeleton } from "../components/Post/Skeleton";

export const FullPost = () => {
  const dispatch = useDispatch()
  const { id } = useParams();
  const data = useSelector(state => state.post.curentPostData)
  const curentPostStatus = useSelector(state => state.post.status)
  const isCurentPostsLoading = curentPostStatus === 'loading'
  const curentUserData = useSelector(state => state.auth.curentUserData)

  React.useEffect(() => {
    dispatch(fetchGetFullPost(id))
  }, [dispatch, id])

  return (
    <>
      {isCurentPostsLoading ? <PostSkeleton /> : (
      <FullPostInfo
        curentPostData={data}
        // commentsCount={3}
        isEditable={curentUserData?._id === data.user._id}
      >
        <ReactMarkdown children={data.text} />
      </FullPostInfo>  
      )
      }
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

import React from "react";
import ReactMarkdown from "react-markdown"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock/CommentsBlock";
import { fetchGetFullPost } from "../redux/slices/post";
import { FullPostInfo } from "../components/FullPostInfo";
import { PostSkeleton } from "../components/Post/Skeleton";
import { fetchAllComments } from "../redux/slices/post";
import { CommentsBlockSkeleton } from "../components/CommentsBlock/CommentsBlockSkeleton";

export const FullPost = () => {
  const dispatch = useDispatch()
  const { id } = useParams();
  const curentPostData = useSelector(state => state.fullPost.curentPostData)
  const curentPostStatus = useSelector(state => state.fullPost.status)
  const isCurentPostsLoading = curentPostStatus === 'loading'
  const curentUserData = useSelector(state => state.auth.curentUserData)
  const commentsItems = useSelector(state => state.fullPost.comments.items)
  const curentCommentsStatus = useSelector(state => state.fullPost.comments.status)
  const isCommentsLoading = curentCommentsStatus === 'loading'
  console.log(commentsItems);

  React.useEffect(() => {
    dispatch(fetchGetFullPost(id))
    dispatch(fetchAllComments(id))
  }, [dispatch, id])

  return (
    <>
      {isCurentPostsLoading ? <PostSkeleton /> : (
        <FullPostInfo
          curentPostData={curentPostData}
          isEditable={curentUserData?._id === curentPostData.user._id}
        >
          <ReactMarkdown children={curentPostData.text} />
        </FullPostInfo>
      )
      }
      {isCommentsLoading ? <CommentsBlockSkeleton /> : (
        <CommentsBlock
          items={commentsItems}
          isLoading={false}
        >
          <Index />
        </CommentsBlock>
      )}
    </>


  );
};

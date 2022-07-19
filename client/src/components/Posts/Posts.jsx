import React from 'react';
import { Post } from '../Post';
import {PostsBlockSkeleton} from '../Posts/PostsBlockSkeleton';




export const Posts = ({
    isPostsLoading,
    items,
    curentUserId,
}) => {
    if (isPostsLoading) {
        return (
        <>
        <PostsBlockSkeleton />
                </>
        );
    }

    return (
        <>{(isPostsLoading ? [...Array(3)] : items).map((obj, index) =>
            isPostsLoading ? (
                <Post key={index} isLoading={isPostsLoading} />
            ) : (
                <Post
                    key={index}
                    postItem={obj}
                    commentsCount={3}
                    isLoading={isPostsLoading}
                    isEditable={curentUserId === obj.user._id}
                />
            )
        )}
        </>

    )
}


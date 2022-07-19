import React from 'react';
import { Post } from '../Post';



export const Posts = ({
    isPostsLoading,
    items,
    curentUserId,
}) => {

    
    return (
        <>{(isPostsLoading ? [...Array(5)] : items).map((obj, index) =>
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
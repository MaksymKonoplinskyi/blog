import React from 'react';
import { Post } from '../Post';

export const Posts = ({
    items,
    curentUserId,
}) => {

    return (
        <>{items.map((obj, index) =>
            <Post
                key={index}
                postItem={obj}
                commentsCount={3}
                isEditable={curentUserId === obj.user._id}
            />
        )}
        </>

    )
}


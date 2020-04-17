import React from 'react';
import PostComponentDetail from "./PostComponentDetail";

const PostBlockDetail = ({posts}) => {
    return (
        <div>
            {
                posts &&
                posts.map(post=>{
                    return <PostComponentDetail key={post._id} post={post} />
                })
            }
        </div>
    );
};

export default PostBlockDetail;

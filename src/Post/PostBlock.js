import React from 'react';
import PostComponent from "./PostComponent";
import {FormControl, InputGroup} from "react-bootstrap";

const PostBlock = ({posts}) => {
    return (
        <div>
            {
                posts &&
                posts.map(post=>{
                    return <PostComponent key={post._id} post={post} />
                })
            }
        </div>
    );
};

export default PostBlock;

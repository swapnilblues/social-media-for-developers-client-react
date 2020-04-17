import React, {Component,Fragment} from 'react';
import axios from "axios";
import {Link} from 'react-router-dom';
import NeoPostItem from "./NeoPostItem";
import CommentItem from "./CommentItem";
class NeoPostDetail extends Component {

    state = {
        id: this.props.match.params.id,
        post:[],
        comment:'',
        comments:[],
        commentNumber:0
    }

    handleComment = (e) =>{
        this.setState({
            comment:e.target.value
        })
    }

    handlePostComponent=(comment)=>{
        axios.post('http://localhost:3002/codebook/posts/comment/'+this.state.post[0]._id,
            {
                text: comment
            }).then((res)=>{
            if(res){
                this.setState({
                    commentNumber: this.state.commentNumber+1,
                    inputComment:''
                })
                axios.get('http://localhost:3002/codebook/posts/'+this.state.post[0]._id).then(res=>{
                    if(res){
                        this.setState({
                            comments:res.data.comments
                        })
                    }
                })
            }
        });
    }

    handleDeleteOfComment=()=>{
        this.setState({
            commentNumber:this.state.commentNumber-1
        })
    }

    componentDidMount = async () => {
        let postData = await axios.get('http://localhost:3002/codebook/posts/'+this.state.id,{
            headers:{
                "x-auth-token": localStorage.getItem('token')
            }
        })
        let data = [];
        data.push(postData.data);
        this.setState({
            post:data,
            comments:data.comments
        })
    }

    render() {
        return (
            <div className={"container"}>
                <Fragment>
                    <Link to="/posts" className="btn">
                        Back To Posts
                    </Link>

                    {this.state.post && this.state.post.length>0 && this.state.post.map(p=>(
                        <NeoPostItem showDelete={false} {...p} />
                    ))}

                    <div className='post-form'>
                        <div className='bg-primary p'>
                            <h3>Leave a Comment</h3>
                        </div>
                        <form
                            className='form my-1'>
        <textarea
            name='text'
            cols='30'
            rows='5'
            placeholder='Comment the post'
            value={this.state.comment}
            onChange={e => this.handleComment(e)}
            required
        />
                            <input type='submit' className='btn btn-dark my-1' value='Submit' onClick={()=>this.handlePostComponent(this.state.comment)} />
                        </form>
                        {/*{this.state.comments && this.state.comments.length>0 &&  this.state.comments.map(com=>(*/}
                        {/*    <CommentItem*/}
                        {/*        postId={this.state.post[0]._id} {...com} />*/}
                        {/*))}*/}

                    </div>
                </Fragment>
            </div>
        );
    }
}

export default NeoPostDetail;

import React, {Component, Fragment} from 'react';
import axios from "axios";
import {Link} from 'react-router-dom';
import NeoPostItem from "./NeoPostItem";
import CommentItem from "./CommentItem";
import {API_URL} from "../common/constants";
import NavBarComponent from "../Component/NavBar/NavBarComponent";
import NavBarInSessionComponent from "../Component/NavBar/NavBarInSessionComponent";

class NeoPostDetail extends Component {

    state = {
        id: this.props.match.params.id,
        post: {},
        comment: '',
        comments: [],
        commentNumber: 0
    }

    handleComment = (e) => {
        this.setState({
            comment: e.target.value
        })
    }

    handlePostComponent = async (comment) => {

        await fetch(`${API_URL}/posts/comment/${this.state.post._id}`, {
            method: "POST",
            headers: {
                'x-auth-token': localStorage.getItem('token'),
                'content-type': 'application/json'
            },
            body: JSON.stringify({text: comment})
        });

        let postData = await axios.get(`${API_URL}/posts/'${this.state.post._id}`, {
            headers: {
                "x-auth-token": localStorage.getItem('token')
            }
        });
        let data = [];

        data.push(postData.data);

        this.setState({
            post: data[0],
            comments: data[0].comments,
            comment: ''
        })
    }

    handleDeleteOfComment = () => {
        this.setState({
            commentNumber: this.state.commentNumber - 1
        })
    }

    componentDidMount = async () => {

        let postData = await axios.get(`${API_URL}/posts/${this.state.id}`, {
            headers: {
                "x-auth-token": localStorage.getItem('token')
            }
        })

        let data = [];

        data.push(postData.data);

        this.setState({
            post: data[0],
            comments: data[0].comments
        })
        console.log("posts" + this.state.post.user)
        // console.log('here 3'+this.state.comments.length);
    }

    render() {
        return (
            <div>
                {
                    localStorage.getItem('token') === null &&
                    <NavBarComponent/>
                }
                {
                    localStorage.getItem('token') !== null &&
                    <NavBarInSessionComponent/>
                }
                <div className={"container"}>
                    <Fragment>
                        <Link to="/posts" className="btn">
                            Back To Posts
                        </Link>

                        {/*{console.log(...this.state.post)}*/}

                        {this.state.post.likes &&
                        <NeoPostItem showDelete={false} likes={this.state.post.likes}
                                     _id={this.state.post._id}
                                     user={this.state.post.user}
                                     showBtns={false}
                                     comments={this.state.post.comments}
                                     text={this.state.post.text}
                                     date={this.state.post.date}
                                     image={this.state.post.user.image}
                        />}

                        <div className='post-form'>
                            <div className='bg-prim ary p'>
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
                                <input type='submit' className='btn btn-dark my-1' value='Submit'
                                       onClick={() => this.handlePostComponent(this.state.comment)}/>
                            </form>

                            {this.state.comments && this.state.comments.length > 0 && this.state.comments.map(com => (
                                <CommentItem
                                    postId={this.state.id}
                                    _id={com._id}
                                    text={com.text}
                                    user={com.user}
                                    {...com} />

                            ))}

                        </div>
                    </Fragment>
                </div>
            </div>
        );
    }
}

export default NeoPostDetail;

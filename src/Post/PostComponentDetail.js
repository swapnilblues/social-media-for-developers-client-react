import React, {Component} from 'react';
import {Card} from "react-bootstrap";
import axios from 'axios';
import CommentComponent from "./CommentComponent";

class PostComponentDetail extends Component {

    state = {
        id: this.props.match.params.id,
        userName:'',
        post:{},
        likeNumber:0,
        commentNumber:0,
        text:'',
        comments:[],
        inputComment:''
    }

    handleChange=(e)=>{
        this.setState({
                          inputComment:e.target.value
                      })
    };

    handleLike = () =>{
        axios.put('http://localhost:3002/codebook/posts/like/'+this.state.id).then((res)=>{
            if(res)
                this.setState({
                                  likeNumber:this.state.likeNumber+1
                              });
        });
    }

    handleUnlike = () =>{
        axios.put('http://localhost:3002/codebook/posts/unlike/'+this.state.id).then((res)=>{
            if(res)
                this.setState({
                                  likeNumber:this.state.likeNumber-1
                              });
        });
    }

    handlePostComponent=()=>{
        axios.post('http://localhost:3002/codebook/posts/comment/'+this.state.id,{text: this.state.inputComment}).then((res)=>{
            if(res){
                this.setState({
                    commentNumber: this.state.commentNumber+1,
                    inputComment:''
                              })
                axios.get('http://localhost:3002/codebook/posts/'+this.state.id).then(res=>{
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
        axios.get('http://localhost:3002/codebook/posts/'+this.state.id,{
            headers:{
                "x-auth-token":'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWU5NGM1ZGE3NTJiNjMwMDA0NGUxYTk0In0sImlhdCI6MTU4NjgwODI4MiwiZXhwIjoxNTg3MTY4MjgyfQ.c5VZhqxOpUogyqrPNL9rM-yDIP5GhXT6upMmDTvOqHI'
            }
        }).then((res)=>{
            console.log(res.data);
            this.setState({
                post:res.data,
                likeNumber:res.data.likes.length,
                commentNumber:res.data.comments.length,
                text:res.data.text,
                comments:res.data.comments,
                userName:res.data.user.name
                          })

        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-4 col-xl-6">
                        <Card>
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-2">
                                        <img src="https://i.imgur.com/ld0FiN2.jpg" style={{width:75,height:75}}/>
                                    </div>
                                    <div className="col-sm-10">
                                        <h5>{this.state.userName}</h5>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <p>{this.state.text}</p>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <button onClick={this.handleLike}><i className="fa fa-thumbs-o-up" style={{fontSize:36}}></i></button>
                                            </div>
                                            <div className="col-sm-5">
                                                <b style={{fontSize:20}}>{this.state.likeNumber}</b>
                                            </div>
                                            <div className="col-sm-3">
                                                <button onClick={this.handleUnlike}><i className="fa fa-thumbs-o-down" style={{fontSize:36}}></i></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="row">
                                            <div className="col-sm-3">

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <i className="fa fa-comments" style={{fontSize:36}}></i>
                                            </div>
                                            <div className="col-sm-9">
                                                <h4>{this.state.commentNumber}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            <div className="container">
                                <div className="input-group mb-3">
                                    <input name="inputComment"
                                           value={this.state.inputComment} onChange={e=>this.handleChange(e)} type="text" className="form-control" placeholder="Comment"
                                           aria-label="Comment" aria-describedby="basic-addon2"/>
                                    <div className="input-group-append">
                                        <span onClick={this.handlePostComponent} className="input-group-text" id="basic-addon2">Post</span>
                                    </div>
                                </div>
                            </div>
                            <div className="container">
                                <div className="input-list-item mb-3">
                                    {this.state.comments.map((comment,index)=>(
                                        <CommentComponent key={this.state.id} handleDeleteOfComment={this.handleDeleteOfComment} index={index} postId={this.state.id} comment={comment} />
                                    ))
                                    }
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default PostComponentDetail;

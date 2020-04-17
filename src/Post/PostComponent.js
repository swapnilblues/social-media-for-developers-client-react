import React, {Component} from 'react';
import {Card} from "react-bootstrap";
import {Container} from "react-bootstrap";
import axios from 'axios';

class PostComponent extends Component {

    state={
        likeNumber: this.props.post.likes.length,
        commentsNumber: this.props.post.comments.length
    }

    handleLike = () =>{
        axios.put('http://localhost:3002/codebook/posts/like/'+this.props.post._id).then((res)=>{
            if(res)
                    this.setState({
                                      likeNumber:this.state.likeNumber+1
                    });
        });
    }

    handleUnlike = () =>{
        axios.put('http://localhost:3002/codebook/posts/unlike/'+this.props.post._id).then((res)=>{
            if(res)
                this.setState({
                                  likeNumber:this.state.likeNumber-1
                              });
        });
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
                                        <br/>
                                        <img src="https://i.imgur.com/ld0FiN2.jpg" style={{width:75,height:75}}/>
                                    </div>
                                    <div className="col-sm-10">
                                        <br/>
                                        <h5>{this.props.post.user.name}</h5>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                       <p>{this.props.post.text}</p>
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

                                            <div className="col-sm-9">
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <a href={"http://localhost:3000/"+this.props.post._id}><i className="fa fa-comments" style={{fontSize:36}}></i></a>
                                            </div>
                                            <div className="col-sm-9">
                                                <h4>{this.state.commentsNumber}</h4>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <br/>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default PostComponent;

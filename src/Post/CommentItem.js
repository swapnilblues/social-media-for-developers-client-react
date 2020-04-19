
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import React, {Component} from 'react';
import axios from "axios";
import {API_URL} from "../common/constants";

class CommentItem extends Component {

    state={
        show:true,
        userName:''
    }

    handleDeleteComment =()=>{
        axios.delete(`${API_URL}/posts/comment/${this.props.postId}/${this.props._id}`,{
            headers:{
                "x-auth-token": localStorage.getItem('token')
            }
        }).then((res)=>{
            if(res){
                this.setState({
                                  show:false
                              })
            }
        });
    }

    componentDidMount() {
            axios.get(`${API_URL}/users/id/${this.props.user}`,{
                headers:{
                    "x-auth-token": localStorage.getItem('token')
                }
            }).then((res)=>{
            this.setState({
                userName:res.data.name
                          })
        });
    }

    render() {
        return (
            this.state.show?
            <div className='post bg-white p-1 my-1'>
                <div>
                    <Link >
                        <h4>{this.state.userName}</h4>
                    </Link>
                </div>
                <div>
                    <p className='my-1'>{this.props.text}</p>
                    <p className='post-date'>
                        Posted on {this.props.date}
                    </p>
                    <button
                        onClick={this.handleDeleteComment}
                        type='button'
                        className='btn btn-danger'
                    >
                        <i className='fa fa-times' />
                    </button>
                </div>
            </div>
            :
            null
        );
    }
}

export default CommentItem;

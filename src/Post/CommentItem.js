import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import React, {Component} from 'react';
import axios from "axios";
import {API_URL} from "../common/constants";
import NavBarComponent from "../Component/NavBar/NavBarComponent";
import NavBarInSessionComponent from "../Component/NavBar/NavBarInSessionComponent";

class CommentItem extends Component {

    state = {
        show: true,
        commentUser: '',
        image: '',
        dashboardToken: '',
        currentUser: ''
    }

    handleDeleteComment = () => {
        axios.delete(`${API_URL}/posts/comment/${this.props.postId}/${this.props._id}`, {
            headers: {
                "x-auth-token": localStorage.getItem('token')
            }
        }).then((res) => {
            if (res) {
                this.setState({
                    show: false
                })
            }
        });
    }

    componentDidMount() {

        this.state.dashboardToken = localStorage.getItem('token')
        console.log("Dashboard token: ", this.state.dashboardToken)
        {
            this.state.dashboardToken === null &&
            this.props.history.push('/login')
        }

        axios.get(`${API_URL}/users/id/${this.props.user}`, {
            headers: {
                "x-auth-token": localStorage.getItem('token')
            }
        }).then((res) => {
            this.setState({
                commentUser: res.data,
                image: res.data.image
            })
        }).then(() =>
            fetch(
                `${API_URL}/profile/me`, {
                    headers: {
                        'x-auth-token': localStorage.getItem('token')
                    }
                }
            )
                .then(response => response.json())
                .then(results => this.setState({
                    currentUser: results.user
                })))

        ;
    }

    render() {
        return (

            this.state.show ?

                    <div className='post bg-white p-1 my-1'>
                        <img src={this.state.image}/>
                        <div>
                            <Link>
                                <h4>{this.state.commentUser.name}</h4>
                            </Link>
                        </div>
                        <div>
                            <p className='my-1'>{this.props.text}</p>
                            <p className='post-date'>
                                Posted on {this.props.date}
                            </p>
                            {this.state.currentUser && this.state.currentUser._id === this.state.commentUser._id &&


                            <button
                                onClick={this.handleDeleteComment}
                                type='button'
                                className='btn btn-danger'
                            >

                                <i className='fa fa-times'/>
                            </button>
                            }
                        </div>
                    </div>

                :
                null
        );
    }
}

export default CommentItem;

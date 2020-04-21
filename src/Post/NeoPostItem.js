import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import img1 from '../img/showcase.jpg';
import Moment from 'react-moment';
import axios from "axios";
import './main.css';
import {API_URL} from "../common/constants";

class NeoPostItem extends Component {

    constructor(props) {
        console.log(props)
        super(props);
    }

    state = {
        likeNumber: this.props.likes.length,
        commentsNumber: this.props.comments.length,
        show: true,
        showDelete: this.props.showDelete,
        token: '',
        likes:this.props.likes,
        comments:this.props.comments,
        likeStatus: false,
        userId: this.props.id,
        image: '',
        currentUser: '',
        name: this.props.name
    }


    async componentDidMount() {
        {
            localStorage.getItem('token') === null &&
            this.props.history.push('/sign-in')
        }

        this.setState({
                          token: localStorage.getItem('token')
                      })

       await fetch(
            `${API_URL}/profile/me`, {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            }
        )
            .then(response => response.json())
            .then(results => this.setState({
                                               currentUser: results.user,
                                           }));
    }

    // handleLike = (id) => {
    //     fetch(`${API_URL}/posts/like/${id}`, {
    //         method: "PUT",
    //         headers: {
    //             'x-auth-token': localStorage.getItem('token')
    //         }
    //     })
    //         .then(res => {
    //                   if (res) {
    //                       if (res.status !== 200) {
    //                           this.setState({
    //                                             likeStatus: true
    //                                         })
    //                       } else {
    //                           this.setState({
    //                                             likeNumber: this.state.likeNumber + 1,
    //                                         })
    //                       }
    //                       setTimeout(function () {
    //                           this.setState({likeStatus: false});
    //                       }.bind(this), 3000);
    //                   }
    //               }
    //         )
    // }
    //
    // handleUnlike = (id) => {
    //     fetch(`${API_URL}/posts/unlike/${id}`, {
    //         method: "PUT",
    //         headers: {
    //             'x-auth-token': localStorage.getItem('token')
    //         }
    //     })
    //         .then(res => {
    //                   if (res) {
    //                       this.setState({
    //                                         likeNumber: this.state.likeNumber - 1
    //                                     })
    //                   }
    //               }
    //         )
    // }

    render() {
        return (
            this.state.show ?
            <div>
                {this.state.likeStatus && <div className="alert alert-danger" role="alert">
                    You have already liked this post
                </div>}
                <div className='post bg-white p-1 my-1'>
                    <div>
                        <Link>
                            <img style={{height: 130, width: 100}}
                                 src={this.props.image}
                                 alt=''/>
                            <h4>{this.props.name}</h4>
                            {/*<h3>{this.state.image}</h3>*/}
                        </Link>
                    </div>
                    <div>
                        <p className='my-1'>{this.props.text}</p>
                        <p className='post-date'>
                            Posted on <Moment format='YYYY/MM/DD'>{this.props.date}</Moment>
                        </p>
                        <Fragment>
                            {this.props.showBtns &&<button
                                onClick={()=>this.props.like(this.props._id)}
                                type='button'
                                className='btn btn-light'
                            >
                                <i className='fa fa-thumbs-up'/>
                                <span>{this.props.likes.length > 0 &&
                                       <span>{this.props.likes.length}</span>}</span>
                            </button>}
                            {this.props.showBtns &&<button
                                onClick={()=>this.props.unlike(this.props._id)}
                                type='button'
                                className='btn btn-light'
                            >
                                <i className='fa fa-thumbs-down'/>
                            </button>}
                            {this.props.showBtns &&<Link to={'/posts/' + this.props._id} className='btn btn-primary'>
                                Comment {this.state.showDelete ? <span>{this.props.comments.length
                                                                        > 0 &&
                                                                        <span>{this.props.comments.length}</span>}</span>
                                                               : null}
                            </Link>}
                            {this.props.user._id === this.state.currentUser._id && this.props.showBtns &&
                             <button
                                 onClick={() => this.props.delete(this.props._id)}
                                 type='button'
                                 className='btn btn-danger'
                             >
                                 <i className='fa fa-times'/>
                             </button>
                            }
                        </Fragment>

                    </div>
                </div>
            </div>
                            :
            null
        );
    }
}

export default NeoPostItem;

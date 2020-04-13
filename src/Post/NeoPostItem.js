import React, {Component,Fragment} from 'react';
import {Link} from 'react-router-dom';
import img1 from '../img/showcase.jpg';
import Moment from 'react-moment';
import axios from "axios";
import './main.css';

class NeoPostItem extends Component {

    state={
        likeNumber: this.props.likes.length,
        commentsNumber: this.props.comments.length,
        show: true,
        showDelete:this.props.showDelete
    }

    componentDidMount() {

    }


    handleLike = () =>{
        axios.put('http://localhost:3002/codebook/posts/like/'+this.props._id).then((res)=>{
            if(res)
                this.setState({
                                  likeNumber:this.state.likeNumber+1
                              });
        });
    }

    handleUnlike = () =>{
        axios.put('http://localhost:3002/codebook/posts/unlike/'+this.props._id).then((res)=>{
            if(res)
                this.setState({
                                  likeNumber:this.state.likeNumber-1
                              });
        });
    }

    // deletePost = async () =>{
    //     axios.delete('http://localhost:3002/codebook/posts/'+this.props._id).then((res)=>{
    //         if(res){
    //             this.setState({
    //                 show:false
    //                           })
    //         }
    //     })
    // }

    render() {
        return (
            this.state.show?
            <div>
                <div className='post bg-white p-1 my-1'>
                    <div>
                        <Link >
                            <img className='round-img'
                                 src={img1}
                                 alt='' />
                            <h4>{this.props.user.name}</h4>
                        </Link>
                    </div>
                    <div>
                        <p className='my-1'>{this.props.text}</p>
                        <p className='post-date'>
                            Posted on <Moment format='YYYY/MM/DD'>{this.props.date}</Moment>
                        </p>
                        <Fragment>
                            <button
                                onClick={this.handleLike}
                                type='button'
                                className='btn btn-light'
                            >
                                <i className='fa fa-thumbs-up' />
                                <span>{this.state.likeNumber>0 && <span>{this.state.likeNumber}</span> }</span>
                            </button>
                            <button
                                onClick={this.handleUnlike}
                                type='button'
                                className='btn btn-light'
                            >
                                <i className='fa fa-thumbs-down' />
                            </button>
                            <Link to={'/posts/'+this.props._id} className='btn btn-primary'>
                                Comment {this.state.showDelete?<span>{this.state.commentsNumber>0 && <span>{this.state.commentsNumber}</span>}</span>:null}
                            </Link>
                            {/*{!auth.loading && user === auth.user._id && (*/}
                            {this.props.showDelete?
                            <button
                                    onClick={()=>this.props.delete(this.props._id)}
                                    type='button'
                                    className='btn btn-danger'
                                >
                                    <i className='fa fa-times' />
                                </button>
                            :
                            null}
                            {/*)}*/}
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

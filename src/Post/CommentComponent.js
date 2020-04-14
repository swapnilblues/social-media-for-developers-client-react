import React, {Component} from 'react';
import axios from "axios";
import {LOCALHOST_URL} from "../common/constants";

class CommentComponent extends Component {

    state = {
        show: true,
        token: ''
    }

    componentDidMount() {

        {
            localStorage.getItem('token') === null &&
            this.props.history.push('/sign-in')
        }

        this.setState({
            token: localStorage.getItem('token')
        })
    }

    handleDeleteComment = () => {

        fetch(`${LOCALHOST_URL}/profile/education/${this.props.postId}`, {
            method: "DELETE",
            headers: {
                'x-auth-token': localStorage.getItem('token'),

            }
        })
            .then(res => {
                if (res) {
                    this.setState({
                        show: false
                    })
                    this.props.handleDeleteOfComment()
                }
            })
        ;
    }

    render() {
        return (
            <div>
                {
                    this.state.show ?
                        <div>
                            <li type="text" className="form-control" placeholder="Comment"
                                aria-label="Comment"
                                aria-describedby="basic-addon2">{this.props.comment.text}</li>
                            <div className="input-group-append">
                             <span onClick={this.handleDeleteComment} className="input-group-text"
                                   id="basic-addon2">Delete</span>
                            </div>
                        </div>
                        :
                        null
                }
            </div>

        );
    }
}

export default CommentComponent;
